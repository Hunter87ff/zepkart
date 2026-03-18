import { Router } from "express";
import ProductsController from "@controllers/products";


export const productRouter = Router();

productRouter.get("/", ProductsController.getProducts);
productRouter.get("/:id", ProductsController.getProductById);
productRouter.post("/", ProductsController.createProduct);
productRouter.put("/:id", ProductsController.updateProduct);
productRouter.delete("/:id", ProductsController.deleteProduct);

export default productRouter;