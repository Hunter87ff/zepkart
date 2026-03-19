import { z } from "zod";
import { Order, OrderItem } from "@/models/order";
import { Cart, CartItem } from "@/models/cart";
import Product from "@/models/product";
import type { Request, Response } from "express";


// ─── Zod Schemas ─────────────────────────────────────────────────────────────

const updateOrderSchema = z.object({
    status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
});


// ─── Controller ───────────────────────────────────────────────────────────────

export default class OrdersController {

    /**
     * @route  GET /orders?status=&page=&limit=
     * @access Auth — user sees own orders; admin sees all
     */
    static async getOrders(req: Request, res: Response) {
        const userId  = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const isAdmin  = !!req.user?.permissions?.admin;
        const status   = req.query.status ? String(req.query.status) : null;
        const page     = Math.max(1, parseInt(String(req.query.page  ?? 1)));
        const limit    = Math.min(50, parseInt(String(req.query.limit ?? 20)));
        const skip     = (page - 1) * limit;

        const filter: Record<string, any> = {};
        if (!isAdmin) filter.user = userId;
        if (status)   filter.status = status;

        const [orders, total] = await Promise.all([
            Order.find(filter).skip(skip).limit(limit).sort({ _id: -1 }).select("-__v"),
            Order.countDocuments(filter),
        ]);

        return res.handler.success(res, "Orders retrieved", {
            orders,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    }


    /**
     * @route  GET /orders/:id
     * @access Auth (own order) / Admin
     */
    static async getOrderById(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const isAdmin = !!req.user?.permissions?.admin;

        const order = await Order.findById(req.params.id);
        if (!order) return res.handler.notFound(res, "Order not found");

        if (!isAdmin && String(order.user) !== userId) {
            return res.handler.forbidden(res, "You cannot access this order");
        }

        const items = await OrderItem.find({ order: order._id })
            .populate("product", "name images price");

        return res.handler.success(res, "Order retrieved", { order, items });
    }


    /**
     * @route  POST /orders
     * @access Auth — converts current cart to order
     */
    static async createOrder(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        // 1. Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.handler.badRequest(res, "No cart found");

        const cartItems = await CartItem.find({ cart: cart._id }).populate<{
            product: {
                _id: any;
                price: number;
                discount: number[];
                stock: number;
            };
        }>("product");

        if (!cartItems.length) {
            return res.handler.badRequest(res, "Your cart is empty");
        }

        // 2. Compute totals
        let subtotal = 0;
        let totalDiscount = 0;

        for (const item of cartItems) {
            const product = item.product as any;
            if (!product) continue;

            // Check stock
            if (product.stock < item.quantity) {
                return res.handler.badRequest(
                    res,
                    `Insufficient stock for "${product.name}". Only ${product.stock} available.`
                );
            }

            const discountPct = Array.isArray(product.discount) && product.discount[1] > Date.now()
                ? product.discount[0]
                : 0;

            const lineTotal = product.price * item.quantity;
            const lineSaved = (product.price * discountPct / 100) * item.quantity;

            subtotal      += lineTotal;
            totalDiscount += lineSaved;
        }

        const totalAmount = subtotal - totalDiscount;
        const discountPct = subtotal > 0 ? Math.round((totalDiscount / subtotal) * 100) : 0;

        // 3. Create Order
        const order = await Order.create({
            user:         userId,
            amount:       subtotal,
            discount:     discountPct,
            total_amount: totalAmount,
            status:       "pending",
        });

        // 4. Create OrderItems + decrement stock in parallel
        const orderItemDocs = cartItems.map(item => {
            const product = item.product as any;
            const discountPct2 = Array.isArray(product.discount) && product.discount[1] > Date.now()
                ? product.discount[0]
                : 0;
            const priceAtPurchase = product.price * (1 - discountPct2 / 100);

            return {
                order:             order._id,
                product:           product._id,
                quantity:          item.quantity,
                price_at_purchase: priceAtPurchase,
            };
        });

        await Promise.all([
            OrderItem.insertMany(orderItemDocs),
            // Decrement stock for each product
            ...cartItems.map(item =>
                Product.findByIdAndUpdate((item.product as any)._id, {
                    $inc: { stock: -item.quantity },
                })
            ),
            // Clear the cart
            CartItem.deleteMany({ cart: cart._id }),
        ]);

        return res.handler.created(res, "Order placed successfully", {
            order,
            items: orderItemDocs,
            total_amount: totalAmount,
        });
    }


    /**
     * @route  PUT /orders/:id
     * @access Admin / Manager only
     */
    static async updateOrder(req: Request, res: Response) {
        try {
            const userId   = req.user?.id;
            if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

            const isManager = !!req.user?.permissions?.manager;
            if (!isManager) {
                return res.handler.forbidden(res, "Only managers or admins can update order status");
            }

            const { status } = updateOrderSchema.parse(req.body);

            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );
            if (!order) return res.handler.notFound(res, "Order not found");

            return res.handler.success(res, "Order updated", order);
        } catch (err) {
            throw err;
        }
    }


    /**
     * @route  DELETE /orders/:id
     * @access Admin only
     */
    static async deleteOrder(req: Request, res: Response) {
        const userId  = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const isAdmin = !!req.user?.permissions?.admin;
        if (!isAdmin) {
            return res.handler.forbidden(res, "Only admins can delete orders");
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.handler.notFound(res, "Order not found");

        await Promise.all([
            OrderItem.deleteMany({ order: order._id }),
            order.deleteOne(),
        ]);

        return res.handler.success(res, "Order deleted");
    }
}