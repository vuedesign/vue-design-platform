import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { INestMicroservice } from '@nestjs/common';
import { SWAGGER } from '../configs/global.config';

export default (app) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER.title)
    .setTitle(SWAGGER.description)
    .setTitle(SWAGGER.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
};
