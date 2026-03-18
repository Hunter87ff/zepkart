import { Router } from "express";
import CartController from "@controllers/cart";

const cartRouter = Router();


cartRouter.get("/", CartController.getCart);
cartRouter.post("/add", CartController.addToCart);
cartRouter.post("/remove", CartController.removeFromCart);
cartRouter.post("/update", CartController.updateCart);
cartRouter.post("/clear", CartController.clearCart);

export default cartRouter;