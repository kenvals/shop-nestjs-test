import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigurationModule } from "./configuration";
import { ProductsModule } from "./products/products.module";
import { UsersModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseConfigService } from "./configuration/database.providers";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useExisting: DatabaseConfigService,
    }),
    /**
     * Модуль конфигурирование back-end сервиса
     */
    ConfigurationModule,
    /**
     * Модуль микросервиса взаимодействия с продуктами
     */
    ProductsModule,
    /**
     * Модуль микросервиса взаимодействия с пользователями
     */
    UsersModule,
    /**
     * Модуль микросервиса авторизации и получения jwt токена
     */
    AuthModule,
  ],
})
export class AppModule {}
