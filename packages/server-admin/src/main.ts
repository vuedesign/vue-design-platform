import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { PORT, HOST, API_PREFIX } from './configs/global.config';
import middleware from '@/core/middleware';
import swagger from '@/core/swagger';
import { TransformInterceptor } from '@/core/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@/core/filters/httpException.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 中间健
    middleware(app);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.setGlobalPrefix(API_PREFIX);
    app.useGlobalPipes(new ValidationPipe());
    // 接口文档
    swagger(app);

    Logger.log(`${HOST}:${PORT}`, `项目启动成功`);

    app.enableCors();

    await app.listen(PORT || 3000);
    Logger.log(`${HOST}:${PORT}`, `项目启动成功`);
}
bootstrap();
