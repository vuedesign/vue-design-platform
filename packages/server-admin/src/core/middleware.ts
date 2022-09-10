import { INestApplication } from '@nestjs/common';
import { SESSION } from '@/configs/global.config';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

export default (app: INestApplication) => {
    app.use(session(SESSION));

    app.use(cookieParser());

    app.use(compression());
};
