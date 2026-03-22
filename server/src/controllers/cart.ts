import { z } from "zod";
import { Cart, CartItem } from "@/models/cart";
import Product from "@/models/product";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const addToCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity:  z.number().int().min(1, "Quantity must be at least 1"),
});

const removeFromCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
});

const updateCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity:  z.number().int().min(1, "Quantity must be at least 1"),
});


// ─── Helper: get or create user cart ─────────────────────────────────────────

async function getOrCreateCart(userId: string) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId });
    return cart;
}


// ─── Controller ───────────────────────────────────────────────────────────────

export default class CartController {

    /**
     * @route  GET /cart
     * @access Auth
     */
    static async getCart(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const cart = await getOrCreateCart(userId);

        const allItems = await CartItem.find({ cart: cart._id })
            .populate("product", "name images price discount image mrp stock store");

        const items = allItems.filter(item => item.status === 'cart');
        const saved = allItems.filter(item => item.status === 'saved');

        // Compute totals for cart items only
        const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);

        return res.handler.success(res, "Cart retrieved", { cart, items, saved, subtotal });
    }


    /**
     * @route  POST /cart/add
     * @access Auth
     * Body: { productId, quantity }
     */
    static async addToCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const { productId, quantity } = addToCartSchema.parse(req.body);

            const product = await Product.findById(productId);
            if (!product) return res.handler.notFound(res, "Product not found");

            if (product.stock < quantity) {
                return res.handler.badRequest(res, `Only ${product.stock} items in stock`);
            }

            const cart = await getOrCreateCart(userId);

            // Discount: [percentage, expiryTimestamp]
            const [discountPct = 0, discountExpiry = 0] = Array.isArray(product.discount)
                ? product.discount
                : [];
            const effectiveDiscountPct = discountExpiry > Date.now() ? discountPct : 0;

            const effectivePrice = product.price * (1 - effectiveDiscountPct / 100);
            const totalPrice = effectivePrice * quantity;

            // Check if item already in cart
            const existingItem = await CartItem.findOne({ cart: cart._id, product: productId });

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.status = 'cart';
                existingItem.total_price = effectivePrice * existingItem.quantity;
                await existingItem.save();
                return res.handler.success(res, "Cart item updated", existingItem);
            }

            const item = await CartItem.create({
                cart:             cart._id,
                product:          productId,
                quantity,
                price_at_addition: product.price,
                discount:         effectiveDiscountPct,
                total_price:      totalPrice,
            });

            return res.handler.created(res, "Item added to cart", item);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.handler.badRequest(res, "Validation Error", err.issues);
            }
            throw err;
        }
    }


    /**
     * @route  POST /cart/remove
     * @access Auth
     * Body: { productId }
     */
    static async removeFromCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const { productId } = removeFromCartSchema.parse(req.body);

            const cart = await Cart.findOne({ user: userId });
            if (!cart) return res.handler.notFound(res, "Cart not found");

            const deleted = await CartItem.findOneAndDelete({ cart: cart._id, product: productId });
            if (!deleted) return res.handler.notFound(res, "Item not found in cart");

            return res.handler.success(res, "Item removed from cart");
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  POST /cart/update
     * @access Auth
     * Body: { productId, quantity }
     */
    static async updateCart(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const { productId, quantity } = updateCartSchema.parse(req.body);

            const cart = await Cart.findOne({ user: userId });
            if (!cart) return res.handler.notFound(res, "Cart not found");

            const item = await CartItem.findOne({ cart: cart._id, product: productId });
            if (!item) return res.handler.notFound(res, "Item not found in cart");

            const product = await Product.findById(productId);
            if (!product) return res.handler.notFound(res, "Product not found");

            if (product.stock < quantity) {
                return res.handler.badRequest(res, `Only ${product.stock} items in stock`);
            }

            const effectivePrice = item.price_at_addition * (1 - item.discount / 100);
            item.quantity    = quantity;
            item.total_price = effectivePrice * quantity;
            await item.save();

            return res.handler.success(res, "Cart updated", item);
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  POST /cart/clear
     * @access Auth
     */
    static async clearCart(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.handler.success(res, "Cart is already empty");

        await CartItem.deleteMany({ cart: cart._id });
        return res.handler.success(res, "Cart cleared");
    }


    /**
     * @route  POST /cart/save-later
     * @access Auth
     * Body: { productId }
     */
    static async toggleSaveForLater(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const { productId } = removeFromCartSchema.parse(req.body);

            const cart = await Cart.findOne({ user: userId });
            if (!cart) return res.handler.notFound(res, "Cart not found");

            const item = await CartItem.findOne({ cart: cart._id, product: productId });
            if (!item) return res.handler.notFound(res, "Item not found in cart/saved");

            item.status = item.status === 'cart' ? 'saved' : 'cart';
            await item.save();

            return res.handler.success(res, `Item ${item.status === 'saved' ? 'saved for later' : 'moved to cart'}`, item);
        } catch (err) {
            throw err;
        }
    }
}