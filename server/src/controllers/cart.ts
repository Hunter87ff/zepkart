import type { Request, Response } from "express";


export default class CartController {

    static async getCart(req: Request, res: Response) { }
    static async addToCart(req: Request, res: Response) { }
    static async removeFromCart(req: Request, res: Response) { }
    static async updateCart(req: Request, res: Response) { }
    static async clearCart(req: Request, res: Response) { }

} 