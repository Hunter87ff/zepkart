import path from "path";
import e from "express";
import security from "./security";
import router from "@routes";
import { logger } from "@/ext/logger";
import cookieParser from "cookie-parser";
import Helper from "@/utils/helper";
import type { Token } from "@utils/token";
import { ResponseHandler } from "@/ext/response";



declare module 'express-serve-static-core' {
    interface Application {
        logger: typeof logger;
        helper: typeof Helper;
        handler: ResponseHandler;

    }
    interface Request {
        fullUrl?: string;
        helper: typeof Helper;
        user?: Token;
    }
    interface Response {
        logger: typeof logger;
        handler: ResponseHandler;

    }
}


function requests(req: e.Request, res: e.Response, next: e.NextFunction) {
    req.helper = req.app.helper;
    res.handler = req.app.handler;
    res.logger = req.app.logger;
    req.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();
}


function init(app: e.Application) {
    app.use(e.json());
    app.use(cookieParser());
    app.use(e.static('public'));
    app.use(e.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'assets'));

    app.logger = logger;
    app.helper = Helper;
    app.handler = new ResponseHandler();


}



export default function middlewares(app: e.Application) {
    init(app);
    security(app);
    app.use(requests);
    app.use("/", router);
}