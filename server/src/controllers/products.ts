import type {Request, Response} from "express";


export  default class ProductsController {
    public async getProducts(req: Request, res: Response) {}    
    public async getProductById(req: Request, res: Response) {}
    public async createProduct(req: Request, res: Response) {}
    public async updateProduct(req: Request, res: Response) {}
    public async deleteProduct(req: Request, res: Response) {}
}