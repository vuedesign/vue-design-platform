import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/core/const';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    // canActivate(context: ExecutionContext) {
    //     const isPublic = this.reflector.getAllAndOverride<boolean>(
    //         IS_PUBLIC_KEY,
    //         [context.getHandler(), context.getClass()],
    //     );
    //     if (isPublic) {
    //         return true;
    //     }
    //     return super.canActivate(context);
    // }

    getToken(context): string {
        const req = context.getRequest();
        console.log('# 1 req.cookies', req.cookies);
        if (!req.cookies || !req.cookies.token) {
            return null;
        }
        return req.cookies.token;
    }

    handleRequest(err, user, info, context) {
        console.log('===xxxxxx handleRequest ===', err, user);
        // const token = this.getToken(context);
        // console.log('== handleRequest token === ', token);
        if (err || !user) {
            return null;
            // throw err || new UnauthorizedException('用户没授权');
        }
        return user;
    }
}
