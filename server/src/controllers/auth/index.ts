import { z } from "zod";
import { tokens } from "@/middleware/auth";
import { Token } from "@/utils/token";
import Helper from "@/utils/helper";
import User from "@/models/user";
import { PermissionLevels } from "@/utils/constants";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/, "Phone must be a 10-digit number"),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

const updatePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
});


// ─── Helper: issue + persist token ────────────────────────────────────────────

function issueToken(user: { _id: any; name: string; permissions?: number[] }): string {
    const token = new Token({
        id: String(user._id),
        name: user.name,
        permissions: user.permissions ?? [PermissionLevels.user],
    });
    const jwt = token.save();
    tokens.set(String(user._id), jwt);
    return jwt;
}


// ─── Controller ───────────────────────────────────────────────────────────────

export default class AuthController {

    /**
     * @route  POST /auth/register
     * @access Public
     */
    static async register(req: Request, res: Response) {
        try {
            const body = registerSchema.parse(req.body);

            const email = Sanitizer.email(body.email);
            const name  = Sanitizer.string(body.name);
            const phone = Sanitizer.string(body.phone);
            const password = Sanitizer.password(body.password);

            // Check uniqueness
            const existing = await User.findOne({ $or: [{ email }, { phone }] });
            if (existing) {
                return res.handler.conflict(res, "User already exists", {
                    field: existing.email === email ? "email" : "phone",
                });
            }

            const hashedPassword = await Helper.hashPassword(password);

            const user = await User.create({
                name,
                email,
                phone,
                password: hashedPassword,
            });

            const jwt = issueToken({ _id: user._id, name: user.name, permissions: user.permissions });

            return res.handler.created(res, "Account created successfully", {
                token: jwt,
                user: { id: user._id, name: user.name, email: user.email, permissions: user.permissions },
            });
        } catch (err) {
            throw err; // handled by global errorHandler (ZodError → 400)
        }
    }


    /**
     * @route  POST /auth/login
     * @access Public
     */
    static async login(req: Request, res: Response) {
        try {
            const body = loginSchema.parse(req.body);

            const email = Sanitizer.email(body.email);

            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.handler.unAuthorized(res, "Invalid credentials");
            }

            const isMatch = await Helper.comparePassword(body.password, user.password);
            if (!isMatch) {
                return res.handler.unAuthorized(res, "Invalid credentials");
            }

            const jwt = issueToken({ _id: user._id, name: user.name, permissions: user.permissions });

            return res.handler.success(res, "Login successful", {
                token: jwt,
                user: { id: user._id, name: user.name, email: user.email, permissions: user.permissions },
            });
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  POST /auth/logout
     * @access Auth
     */
    static async logout(req: Request, res: Response) {
        if (!req.user?.id) {
            return res.handler.unAuthorized(res, "Unauthorized");
        }

        tokens.delete(req.user.id);
        return res.handler.success(res, "Logged out successfully");
    }


    /**
     * @route  POST /auth/refresh
     * @access Auth
     */
    static async refreshToken(req: Request, res: Response) {
        if (!req.user?.id) {
            return res.handler.unAuthorized(res, "Unauthorized");
        }

        // Fetch latest user data to embed fresh permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.handler.notFound(res, "User not found");
        }

        const jwt = issueToken({ _id: user._id, name: user.name, permissions: user.permissions });

        return res.handler.success(res, "Token refreshed", { token: jwt });
    }


    /**
     * @route  POST /auth/update-password
     * @access Auth
     */
    public async updatePassword(req: Request, res: Response) {
        try {
            if (!req.user?.id) {
                return res.handler.unAuthorized(res, "Unauthorized");
            }

            const body = updatePasswordSchema.parse(req.body);

            const user = await User.findById(req.user.id).select("+password");
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }

            const isMatch = await Helper.comparePassword(body.oldPassword, user.password);
            if (!isMatch) {
                return res.handler.badRequest(res, "Old password is incorrect");
            }

            user.password = await Helper.hashPassword(body.newPassword);
            await user.save();

            // Invalidate existing session → re-issue
            const jwt = issueToken({ _id: user._id, name: user.name, permissions: user.permissions });

            return res.handler.success(res, "Password updated successfully", { token: jwt });
        } catch (err) {
            throw err;
        }
    }
}