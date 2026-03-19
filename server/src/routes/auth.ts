import { Router } from "express";
import AuthController from "@controllers/auth";
import auth, { initUser } from "@/middleware/auth";

export const authRoute = Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);
authRoute.post("/refresh", auth, AuthController.refreshToken);
authRoute.post("/logout", auth, AuthController.logout);
authRoute.post("/update-password", auth, AuthController.prototype.updatePassword);

export default authRoute;
