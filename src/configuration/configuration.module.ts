import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './configuration.service';

@Module({
  
  providers: [ConfigurationService]
})
export class ConfigurationModule { }
