import type { Request, Response } from "express";


export default class OrdersController {

    static async getOrders(req: Request, res: Response) {}
    static async getOrderById(req: Request, res: Response) {}
    static async createOrder(req: Request, res: Response) {}
    static async updateOrder(req: Request, res: Response) {}
    static async deleteOrder(req: Request, res: Response) {}
}