import { Router } from "express";
import WishlistController from "@controllers/wishlist";
import auth from "@/middleware/auth";

export const wishlistRouter = Router();

wishlistRouter.get("/", auth, WishlistController.getWishlist);
wishlistRouter.post("/products/:productId", auth, WishlistController.addToWishlist);
wishlistRouter.delete("/products/:productId", auth, WishlistController.removeFromWishlist);
wishlistRouter.delete("/", auth, WishlistController.clearWishlist);

export default wishlistRouter;