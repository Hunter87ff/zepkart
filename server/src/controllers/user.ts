import type { Request, Response } from "express";


export default class UserController {
    static async me(req: Request, res: Response) {}
    static async updateMe(req: Request, res: Response) {}
    static async updateAvatar(req: Request, res: Response) {}
    static async deleteAccount(req: Request, res: Response) {}
}