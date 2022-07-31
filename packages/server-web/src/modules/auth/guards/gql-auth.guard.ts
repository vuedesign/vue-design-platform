import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '@/core/const';
import { Reflector } from '@nestjs/core';
// import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    console.log('ctx.getArgs()', ctx.getArgs());
    // req.body = ctx.getArgs().loginInput;
    return req;
  }

  // handleRequest(err: any, user: any, info: any) {
  //   if (err || !user) {
  //     throw err || new AuthenticationError('Could not authenticate with token');
  //   }
  //   return user;
  // }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
