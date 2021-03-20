import { CacheModule, Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([ProductEntity]),
    /* модуль Passport для аутентификации */
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
