import { Router } from "express";
import OrdersController from "@controllers/orders";
import auth from "@/middleware/auth";

export const orderRouter = Router();

orderRouter.get("/", auth, OrdersController.getOrders);
orderRouter.get("/:id", auth, OrdersController.getOrderById);
orderRouter.post("/", auth, OrdersController.createOrder);
orderRouter.put("/:id", auth, OrdersController.updateOrder);
orderRouter.delete("/:id", auth, OrdersController.deleteOrder);

export default orderRouter;