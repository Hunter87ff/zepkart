import type { Request, Response } from "express";


export default class OrdersController {

    public async getOrders(req: Request, res: Response) {}
    public async getOrderById(req: Request, res: Response) {}
    public async createOrder(req: Request, res: Response) {}
    public async updateOrder(req: Request, res: Response) {}
    public async deleteOrder(req: Request, res: Response) {}
}