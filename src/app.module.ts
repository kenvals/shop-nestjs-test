import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from 'configuration';
import { ConfigurationService } from 'configuration/configuration.service';
import { ProductsModule } from 'products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useExisting: ConfigurationService,
    }),
    ProductsModule, ConfigurationModule]
})
export class AppModule {}
