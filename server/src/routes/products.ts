import { Router } from "express";
import ProductsController from "@controllers/products";
import auth from "@/middleware/auth";

export const productRouter = Router();

productRouter.get("/", ProductsController.getProducts);
productRouter.get("/:id", ProductsController.getProductById);
productRouter.get("/:id/reviews", ProductsController.getProductReviews);
productRouter.post("/", auth, ProductsController.createProduct);
productRouter.put("/:id", auth, ProductsController.updateProduct);
productRouter.delete("/:id", auth, ProductsController.deleteProduct);

export default productRouter;