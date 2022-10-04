import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
// import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
// import { cookieParser } from './middlewares/cookie.middleware';

export default (app: INestApplication) => {
    const config = app.get(ConfigService);
    app.use(session(config.get('SESSION')));
    app.use(cookieParser());
    // app.use(csurf());
    app.use(compression());
};
