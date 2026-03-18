import type {Request, Response} from "express";

export default class StoreController {
    static async getStores(req: Request, res: Response) {}
    static async getStoreById(req: Request, res: Response) {}
    static async updateStore(req: Request, res: Response) {}
    static async deleteStore(req: Request, res: Response) {}
}