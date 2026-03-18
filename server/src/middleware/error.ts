
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function notFound(req: Request, res: Response, next: NextFunction) {
    // 404 Not Found handler
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
    });
}


export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ZodError) {
        return res.handler.badRequest(
            res,
            "Validation Error",
            err.issues.map((e: any) => ({ path: e.path, message: e.message }))
        );
    }

    res.handler.internalServerError(
        res,
        err.message || "Something went wrong",
        err
    );
}