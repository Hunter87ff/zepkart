import { Token } from "@/utils/token";
import type { Request, Response, NextFunction } from "express";

/**
 * @property {tokens} tokens - A map to store active tokens with their id.
 */
export const tokens: Map<string, string> = new Map();



export function initUser(req: Request){
    let token = req.headers.authorization || req.cookies.token;

    // Support Bearer token scheme
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (token) {
        try {
            req.user = Token.fromToken(token);
        } catch (error) {
            // If token is invalid, just don't set user
            // The auth middleware will handle the unauthorized case
        }
    }
}

export default function auth(req: Request, res: Response, next: NextFunction) {
    initUser(req);
    
    if (!req.user || !req.user?.id){
        return res.handler.unAuthorized(
            res, 
            "Unauthorized", 
            "You are not authorized to access this resource"
        );
    }

    const _token = tokens.get(req.user.id);

    if(_token !== req.user.jwt){
        return res.handler.unAuthorized(
            res, 
            "Unauthorized", 
            "You are not authorized to access this resource"
        );
    }
    
    next();
}
