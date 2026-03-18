import { Router } from "express";
import OrdersController from "@controllers/orders";



export const orderRouter = Router();

orderRouter.get("/", OrdersController.getOrders);
orderRouter.get("/:id", OrdersController.getOrderById);
orderRouter.post("/", OrdersController.createOrder);
orderRouter.put("/:id", OrdersController.updateOrder);
orderRouter.delete("/:id", OrdersController.deleteOrder); 

export default orderRouter;