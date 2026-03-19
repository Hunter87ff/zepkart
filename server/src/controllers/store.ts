import { z } from "zod";
import { tokens } from "@/middleware/auth";
import { Token } from "@/utils/token";
import User from "@/models/user";
import { Store } from "@/models/store";
import cache from "@/ext/cache";
import { Sanitizer } from "@/ext/sanitize";
import { PermissionLevels } from "@/utils/constants";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const createStoreSchema = z.object({
    name:          z.string().min(2).max(100),
    description:   z.string().min(1).max(500),
    logo:          z.string().url(),
    banner:        z.string().url(),
    contact_email: z.string().email(),
    contact_phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    policies: z.object({
        shipping: z.string().optional(),
        return:   z.string().optional(),
        refund:   z.string().optional(),
        warranty: z.string().optional(),
    }).optional(),
});

const updateStoreSchema = createStoreSchema.partial().refine(
    data => Object.keys(data).length > 0,
    { message: "At least one field is required" }
);


// ─── Helper: re-issue token with elevated perms ───────────────────────────────

function elevateToStoreOwner(userId: string, name: string): string {
    const token = new Token({
        id: userId,
        name,
        permissions: [PermissionLevels.store_owner],
    });
    const jwt = token.save();
    tokens.set(userId, jwt);
    return jwt;
}


// ─── Controller ───────────────────────────────────────────────────────────────

export default class StoreController {

    /**
     * @route  GET /stores?q=&page=&limit=
     * @access Public
     */
    static async getStores(req: Request, res: Response) {
        const q     = req.query.q     ? String(req.query.q)     : null;
        const page  = Math.max(1, parseInt(String(req.query.page  ?? 1)));
        const limit = Math.min(50, parseInt(String(req.query.limit ?? 20)));
        const skip  = (page - 1) * limit;

        const filter: Record<string, any> = {};
        if (q) filter.name = { $regex: q, $options: "i" };

        const [stores, total] = await Promise.all([
            Store.find(filter).skip(skip).limit(limit).select("-__v"),
            Store.countDocuments(filter),
        ]);

        return res.handler.success(res, "Stores retrieved", {
            stores,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    }


    /**
     * @route  GET /stores/:id
     * @access Public
     */
    static async getStoreById(req: Request, res: Response) {
        const { id } = req.params;

        const cached = cache.stores.get(id);
        if (cached) return res.handler.success(res, "Store retrieved", cached);

        const store = await Store.findById(id).select("-__v");
        if (!store) return res.handler.notFound(res, "Store not found");

        cache.stores.set(id, store);
        return res.handler.success(res, "Store retrieved", store);
    }


    /**
     * @route  POST /stores
     * @access Auth (any user → becomes store_owner)
     */
    static async createStore(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const body = createStoreSchema.parse(req.body);

            const store = await Store.create({ ...body, owner: userId });

            // Elevate user to store_owner and re-issue JWT
            const user = await User.findById(userId);
            const jwt = user ? elevateToStoreOwner(userId, user.name) : null;

            return res.handler.created(res, "Store created", { store, token: jwt });
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  POST /stores/:id   (update)
     * @access Store owner / Admin
     */
    static async updateStore(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const store = await Store.findById(req.params.id);
            if (!store) return res.handler.notFound(res, "Store not found");

            const isOwner = String(store.owner) === userId;
            const isAdmin = req.user?.permissions?.admin;

            if (!isOwner && !isAdmin) {
                return res.handler.forbidden(res, "You do not have permission to update this store");
            }

            const body = updateStoreSchema.parse(req.body);
            Object.assign(store, body);
            await store.save();

            // Invalidate cache
            cache.stores.delete(req.params.id);

            return res.handler.success(res, "Store updated", store);
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  DELETE /stores/:id
     * @access Store owner / Admin
     */
    static async deleteStore(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const store = await Store.findById(req.params.id);
        if (!store) return res.handler.notFound(res, "Store not found");

        const isOwner = String(store.owner) === userId;
        const isAdmin = req.user?.permissions?.admin;

        if (!isOwner && !isAdmin) {
            return res.handler.forbidden(res, "You do not have permission to delete this store");
        }

        await store.deleteOne();
        cache.stores.delete(req.params.id);

        return res.handler.success(res, "Store deleted successfully");
    }
}