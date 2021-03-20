import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class Swagger {
  static init(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Products shop API')
      .setDescription(
        'Тестовое задание на создание документированного API для интернет-магазина'
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
