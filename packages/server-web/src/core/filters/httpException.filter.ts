import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const errorInfo = { ...exception };
        console.log('errorInfo================', request.url, errorInfo);
        Logger.log(errorInfo.message, '错误提示');
        const status =
            exception instanceof HttpException
                ? 200
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            ...errorInfo,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
