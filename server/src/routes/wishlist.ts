import { Router } from "express";
import WishlistController from "@controllers/wishlist";

export const wishlistRouter = Router();

wishlistRouter.get("/", WishlistController.getWishlist);
wishlistRouter.post("/products/:productId", WishlistController.addToWishlist);
wishlistRouter.delete("/products/:productId", WishlistController.removeFromWishlist);
wishlistRouter.delete("/", WishlistController.clearWishlist);

export default wishlistRouter;