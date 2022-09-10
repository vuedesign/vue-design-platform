import { INestApplication } from '@nestjs/common';
// import { SESSION } from '@/configs/global.config';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

export default (app: INestApplication) => {
    const config = app.get(ConfigService);
    app.use(session(config.get('SESSION')));

    app.use(cookieParser());

    app.use(compression());
};
