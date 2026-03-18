import cors from "cors";
import config from "@/config";
import rateLimit from "express-rate-limit";
import type { Application } from "express-serve-static-core";



export default async function security(app : Application) {
    app.use(cors({
        origin: config.allowed.origin,
        methods : config.allowed.methods,
        allowedHeaders: config.allowed.allowedHeaders,
        credentials: config.allowed.credentials
    }));
    app.use(rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minutes
        max: 150 // limit each IP to 150 requests per windowMs
    }));
}