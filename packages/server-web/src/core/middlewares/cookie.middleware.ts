import { Request, Response, NextFunction } from 'express';
const cookie = require('cookie');

export function cookieParser(options = {}) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request... 22222`, req.headers);
        if (!req.cookies) {
            req.cookies = Object.create(null);
        }

        const cookies = req.headers.cookie;
        // if (!cookies) {
        //     return next();
        // }
        if (cookies) {
            req.cookies = Object.assign(
                req.cookies,
                cookie.parse(cookies, options),
            );
        }

        console.log('req.cookies middleware 33333', req.cookies);

        next();
    };
}
