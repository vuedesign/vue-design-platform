import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@/core/const';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('isPublic', isPublic);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('====handleRequest====', err, user);
    const id = this.cacheManager.get('id');
    console.log('dddd', id);
    // console.log('====handleRequest====', info);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.log('user===', user);
      // return { ddd: 'ssss' };
      throw err || new UnauthorizedException('用户没授权');
    }
    return user;
  }
}
