import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default (app: INestApplication) => {
    const config = app.get(ConfigService);
    const options = new DocumentBuilder()
        .setTitle(config.get('swagger.title'))
        .setTitle(config.get('swagger.description'))
        .setTitle(config.get('swagger.version'))
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.get('swagger.prefix'), app, document);
};
