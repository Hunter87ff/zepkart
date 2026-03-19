import { Router } from "express";
import CartController from "@controllers/cart";
import auth from "@/middleware/auth";

const cartRouter = Router();

cartRouter.get("/", auth, CartController.getCart);
cartRouter.post("/add", auth, CartController.addToCart);
cartRouter.post("/remove", auth, CartController.removeFromCart);
cartRouter.post("/update", auth, CartController.updateCart);
cartRouter.post("/clear", auth, CartController.clearCart);

export default cartRouter;