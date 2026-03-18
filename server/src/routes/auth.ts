import { Router } from "express";
import AuthController from "@controllers/auth";

export const authRoute = Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);
authRoute.post("/refresh", AuthController.refreshToken);
authRoute.post("/logout", AuthController.logout);
authRoute.post("/update-password", AuthController.prototype.updatePassword);

export default authRoute;
