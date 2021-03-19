import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DatabaseConfigService } from './database.providers';

@Module({
  providers: [
    ConfigService,
    DatabaseConfigService,
  ],
  exports: [
    DatabaseConfigService,
    ConfigService,
  ],
})
export class ConfigurationModule {}