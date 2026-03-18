import { Router } from "express";
import authRoute from "./auth";
import userRouter from "./users";
import storeRouter from "./store";
import wishlistRouter from "./wishlist";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRouter);
router.use("/stores", storeRouter);
router.use("/wishlist", wishlistRouter);

export default router;