import type {Request, Response} from "express";


export class AuthController {
    
    static async login(req: Request, res: Response){}
    static async register(req: Request, res: Response){}
    static async logout(req: Request, res: Response){}
    public async updatePassword(req: Request, res: Response) {}
} 