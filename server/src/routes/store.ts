import { Router } from "express";
import StoreController from "@controllers/store";

export const storeRouter = Router();

storeRouter.get("/", StoreController.getStores);
storeRouter.get("/:id", StoreController.getStoreById);
storeRouter.post("/:id", StoreController.updateStore);
storeRouter.delete("/:id", StoreController.deleteStore);

export default storeRouter;