import { Router } from "express";
import UserController from "@controllers/user";
import auth from "@/middleware/auth";

const userRouter = Router();

userRouter.get("/", auth, UserController.me);
userRouter.put("/", auth, UserController.updateMe);
userRouter.put("/avatar", auth, UserController.updateAvatar);
userRouter.delete("/", auth, UserController.deleteAccount);

export default userRouter;