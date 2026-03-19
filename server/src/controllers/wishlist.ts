import Wishlist from "@/models/wishlist";
import type { Request, Response } from "express";


export default class WishlistController {

    /**
     * @route  GET /wishlist
     * @access Auth
     */
    static async getWishlist(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const wishlist = await Wishlist.findOne({ user: userId })
            .populate("products", "name images price discount rating");

        if (!wishlist) {
            return res.handler.success(res, "Wishlist is empty", { products: [] });
        }

        return res.handler.success(res, "Wishlist retrieved", wishlist);
    }


    /**
     * @route  POST /wishlist/products/:productId
     * @access Auth
     */
    static async addToWishlist(req: Request, res: Response) {
        const userId    = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const { productId } = req.params;

        // Upsert: create if not exists; $addToSet prevents duplicates
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        ).populate("products", "name images price");

        return res.handler.success(res, "Added to wishlist", wishlist);
    }


    /**
     * @route  DELETE /wishlist/products/:productId
     * @access Auth
     */
    static async removeFromWishlist(req: Request, res: Response) {
        const userId    = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const { productId } = req.params;

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        ).populate("products", "name images price");

        if (!wishlist) {
            return res.handler.notFound(res, "Wishlist not found");
        }

        return res.handler.success(res, "Removed from wishlist", wishlist);
    }


    /**
     * @route  DELETE /wishlist
     * @access Auth
     */
    static async clearWishlist(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) return res.handler.unAuthorized(res, "Unauthorized");

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $set: { products: [] } },
            { new: true }
        );

        if (!wishlist) {
            return res.handler.success(res, "Wishlist is already empty");
        }

        return res.handler.success(res, "Wishlist cleared");
    }
}