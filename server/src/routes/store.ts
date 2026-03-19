import { Router } from "express";
import StoreController from "@controllers/store";
import auth from "@/middleware/auth";

export const storeRouter = Router();

storeRouter.get("/", StoreController.getStores);
storeRouter.get("/:id", StoreController.getStoreById);
storeRouter.post("/", auth, StoreController.createStore);
storeRouter.post("/:id", auth, StoreController.updateStore);
storeRouter.delete("/:id", auth, StoreController.deleteStore);

export default storeRouter;