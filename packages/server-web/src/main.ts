import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import middleware from '@/core/middleware';
import swagger from '@/core/swagger';
import { TransformInterceptor } from '@/core/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@/core/filters/httpException.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    // 中间健
    middleware(app);
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.setGlobalPrefix(config.get('global.API_PREFIX'));
    app.useGlobalPipes(new ValidationPipe());
    // 接口文档
    swagger(app);

    await app.listen(config.get('global.PORT'));
    Logger.log(
        `${config.get('global.HOST')}:${config.get('global.PORT')}`,
        `项目启动成功`,
    );
}
bootstrap();
