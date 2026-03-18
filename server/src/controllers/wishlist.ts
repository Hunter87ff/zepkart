import type { Request, Response } from "express";


export default class WishlistController {
    static async getWishlist(req: Request, res: Response) {}
    static async addToWishlist(req: Request, res: Response) {}
    static async removeFromWishlist(req: Request, res: Response) {}
    static async clearWishlist(req: Request, res: Response) {}
}