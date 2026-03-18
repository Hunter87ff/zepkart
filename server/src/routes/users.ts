import { Router } from "express";
import UserController from "@controllers/user";

const userRouter = Router();

userRouter.get("/", UserController.me);
userRouter.put("/", UserController.updateMe);
userRouter.put("/avatar", UserController.updateAvatar);
userRouter.delete("/", UserController.deleteAccount);

export default userRouter;