import type {Request, Response} from "express";


export default class CartController {

    public static async getCart(req: Request, res: Response) {}
    public static async addToCart(req: Request, res: Response) {}
    public static async removeFromCart(req: Request, res: Response) {}
    public static async updateCart(req: Request, res: Response) {}
    public static async clearCart(req: Request, res: Response) {}

} 