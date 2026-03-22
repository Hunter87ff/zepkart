import { z } from "zod";
import { tokens } from "@/middleware/auth";
import User from "@/models/user";
import cache from "@/ext/cache";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const updateMeSchema = z.object({
    name:  z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\d{10}$/, "Phone must be a 10-digit number").optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
    address: z.object({
        address_line: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
    }).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
});

const updateAvatarSchema = z.object({
    avatar: z.string().url("Avatar must be a valid URL"),
});


// ─── Controller ───────────────────────────────────────────────────────────────

export default class UserController {

    /**
     * @route  GET /users/
     * @access Auth
     */
    static async me(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        // Try cache first
        const cached = cache.users.get(userId);
        if (cached) {
            return res.handler.success(res, "User profile", cached);
        }

        const user = await User.findById(userId).select("-password");
        if (!user) return res.handler.notFound(res, "User not found");

        const profile = {
            id:     user._id,
            name:   user.name,
            email:  user.email,
            phone:  user.phone,
            avatar: user.avatar,
            address: user.address,
            permissions: user.permissions,
        };

        cache.users.set(userId, profile);
        return res.handler.success(res, "User profile", profile);
    }


    /**
     * @route  PUT /users/
     * @access Auth
     */
    static async updateMe(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const body = updateMeSchema.parse(req.body);

            // Sanitize fields that are present
            const update: Record<string, string> = {};
            if (body.name)  update.name  = Sanitizer.string(body.name);
            if (body.email) update.email = Sanitizer.email(body.email);
            if (body.phone) update.phone = Sanitizer.string(body.phone);
            if (body.avatar) update.avatar = body.avatar;
            if (body.address) (update as any).address = body.address;

            // Check uniqueness for email / phone
            if (update.email || update.phone) {
                const conditions: object[] = [];
                if (update.email) conditions.push({ email: update.email });
                if (update.phone) conditions.push({ phone: update.phone });

                const conflict = await User.findOne({
                    $or: conditions,
                    _id: { $ne: userId },
                });
                if (conflict) {
                    return res.handler.conflict(res, "Email or phone already in use");
                }
            }

            const user = await User.findByIdAndUpdate(userId, update, { new: true }).select("-password");
            if (!user) return res.handler.notFound(res, "User not found");

            // Invalidate cache
            cache.users.delete(userId);

            return res.handler.success(res, "Profile updated", {
                id:     user._id,
                name:   user.name,
                email:  user.email,
                phone:  user.phone,
                avatar: user.avatar,
                address: user.address,
                permissions: user.permissions,
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.handler.badRequest(res, "Validation Error", err.issues);
            }
            throw err;
        }
    }


    /**
     * @route  PUT /users/avatar
     * @access Auth
     * Body: { avatar: "<valid URL>" }
     */
    static async updateAvatar(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const { avatar } = updateAvatarSchema.parse(req.body);

            const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true }).select("-password");
            if (!user) return res.handler.notFound(res, "User not found");

            cache.users.delete(userId);

            return res.handler.success(res, "Avatar updated", { avatar: user.avatar });
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.handler.badRequest(res, "Validation Error", err.issues);
            }
            throw err;
        }
    }


    /**
     * @route  DELETE /users/
     * @access Auth
     */
    static async deleteAccount(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.handler.notFound(res, "User not found");

        // Invalidate session and cache
        tokens.delete(userId);
        cache.users.delete(userId);

        return res.handler.success(res, "Account deleted successfully");
    }
}