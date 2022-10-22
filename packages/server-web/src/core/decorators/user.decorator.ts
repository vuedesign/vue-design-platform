import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        // if (!request.cookies || !request.cookies.token) {
        //     return null;
        // }
        if (data && request.user) {
            return request.user[data];
        }
        return request.user;
    },
);
