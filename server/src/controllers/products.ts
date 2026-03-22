import { z } from "zod";
import Product from "@/models/product";
import { Store } from "@/models/store";
import cache from "@/ext/cache";
import { Sanitizer } from "@/ext/sanitize";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const createProductSchema = z.object({
    name:        z.string().min(1),
    store:       z.string().min(1, "Store ID is required"),
    price:       z.number().min(0),
    description: z.string().min(1).max(500),
    images:      z.array(z.string().url()).min(1, "At least one image is required"),
    categories:  z.array(z.string()).optional(),
    stock:       z.number().int().min(0).optional(),
    discount:    z.tuple([z.number().min(0).max(100), z.number()]).optional(), // [percentage, expiryMs]
    misc: z.object({
        refund:       z.string().optional(),
        return:       z.string().optional(),
        warranty:     z.string().optional(),
        cod:          z.boolean().optional(),
        delivery_fee: z.number().min(0).optional(),
        offers:       z.array(z.string()).optional(),
        service_highlights: z.array(z.object({
            icon:    z.string(),
            text:    z.string(),
            subtext: z.string().optional(),
        })).optional(),
    }).optional(),
});

const updateProductSchema = createProductSchema.partial().refine(
    data => Object.keys(data).length > 0,
    { message: "At least one field is required" }
);


// ─── Helper: check store ownership ───────────────────────────────────────────

async function verifyStoreOwnership(storeId: string, userId: string, isAdmin: boolean) {
    const store = await Store.findById(storeId);
    if (!store) return { store: null, permitted: false };
    const permitted = String(store.owner) === userId || isAdmin;
    return { store, permitted };
}


// ─── Controller ───────────────────────────────────────────────────────────────

export default class ProductsController {

    /**
     * @route  GET /products?q=&page=&limit=&store=&category=
     * @access Public
     */
    static async getProducts(req: Request, res: Response) {
        const q        = req.query.q        ? String(req.query.q)        : null;
        const storeId  = req.query.store    ? String(req.query.store)    : null;
        const category = req.query.category ? String(req.query.category) : null;
        const page     = Math.max(1, parseInt(String(req.query.page  ?? 1)));
        const limit    = Math.min(50, parseInt(String(req.query.limit ?? 20)));
        const skip     = (page - 1) * limit;

        const filter: Record<string, any> = {};
        if (q)        filter.name       = { $regex: Sanitizer.string(q), $options: "i" };
        if (storeId)  filter.store      = storeId;
        if (category) filter.categories = category;

        const [products, total] = await Promise.all([
            Product.find(filter).skip(skip).limit(limit).populate("store", "name logo").select("-__v"),
            Product.countDocuments(filter),
        ]);

        return res.handler.success(res, "Products retrieved", {
            products,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    }


    /**
     * @route  GET /products/:id
     * @access Public
     */
    static async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        const cached = cache.products.get(id);
        if (cached) return res.handler.success(res, "Product retrieved", cached);

        const product = await Product.findById(id).populate("store", "name logo contact_email").select("-__v");
        if (!product) return res.handler.notFound(res, "Product not found");

        cache.products.set(id, product);
        return res.handler.success(res, "Product retrieved", product);
    }


    /**
     * @route  POST /products
     * @access store_owner / manager / admin
     */
    static async createProduct(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const isAdmin = !!req.user?.permissions?.admin;
            const isStoreOwner = !!req.user?.permissions?.store_owner;

            if (!isStoreOwner && !isAdmin) {
                return res.handler.forbidden(res, "Only store owners or admins can create products");
            }

            const body = createProductSchema.parse(req.body);

            const { permitted } = await verifyStoreOwnership(body.store, userId, isAdmin);
            if (!permitted) {
                return res.handler.forbidden(res, "You do not own this store");
            }

            const product = await Product.create(body);
            return res.handler.created(res, "Product created", product);
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  PUT /products/:id
     * @access store_owner / manager / admin
     */
    static async updateProduct(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const isAdmin = !!req.user?.permissions?.admin;
            const isStoreOwner = !!req.user?.permissions?.store_owner;

            if (!isStoreOwner && !isAdmin) {
                return res.handler.forbidden(res, "Only store owners or admins can update products");
            }

            const product = await Product.findById(req.params.id);
            if (!product) return res.handler.notFound(res, "Product not found");

            const { permitted } = await verifyStoreOwnership(String(product.store), userId, isAdmin);
            if (!permitted) {
                return res.handler.forbidden(res, "You do not own this product's store");
            }

            const body = updateProductSchema.parse(req.body);
            Object.assign(product, body);
            await product.save();

            cache.products.delete(req.params.id);
            return res.handler.success(res, "Product updated", product);
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  DELETE /products/:id
     * @access store_owner / manager / admin
     */
    static async deleteProduct(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const isAdmin = !!req.user?.permissions?.admin;
        const isStoreOwner = !!req.user?.permissions?.store_owner;

        if (!isStoreOwner && !isAdmin) {
            return res.handler.forbidden(res, "Only store owners or admins can delete products");
        }

        const product = await Product.findById(req.params.id);
        if (!product) return res.handler.notFound(res, "Product not found");

        const { permitted } = await verifyStoreOwnership(String(product.store), userId, isAdmin);
        if (!permitted) {
            return res.handler.forbidden(res, "You do not own this product's store");
        }

        await product.deleteOne();
        cache.products.delete(req.params.id);

        return res.handler.success(res, "Product deleted successfully");
    }


    /**
     * @route  GET /products/:id/reviews?page=
     * @access Public
     * (stub — reviews model not yet implemented)
     */
    static async getProductReviews(req: Request, res: Response) {
        return res.handler.success(res, "Reviews coming soon", []);
    }
}