import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './configuration/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Устанавливает глобальный префикс для API запросов
   * http:localhost:5000/api/
   */
  app.setGlobalPrefix('api');

  Swagger.init(app);

  await app.listen(5000);
}
bootstrap();
