import { Router } from "express";
import authRoute from "./auth";
import userRouter from "./users";
import storeRouter from "./store";
import wishlistRouter from "./wishlist";
import productRouter from "./products";
import cartRouter from "./cart";
import orderRouter from "./orders";


const router = Router();
router.use("/auth",     authRoute);
router.use("/users",    userRouter);
router.use("/stores",   storeRouter);
router.use("/wishlist", wishlistRouter);
router.use("/products", productRouter);
router.use("/cart",     cartRouter);
router.use("/orders",   orderRouter);

export default router;