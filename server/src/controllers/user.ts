import type { Request, Response } from "express";


export default class UserController {
    public async me(req: Request, res: Response) {}
    public async updateMe(req: Request, res: Response) {}
    public async deleteMe(req: Request, res: Response) {}
    public async updateAvatar(req: Request, res: Response) {}
    public async deleteAccount(req: Request, res: Response) {}
}