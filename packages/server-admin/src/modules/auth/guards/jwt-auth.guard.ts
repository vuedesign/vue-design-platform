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
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            console.log('isPublic');
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        console.log('user', err, user);
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw new UnauthorizedException('用户没授权');
        }
        return user;
    }
}
