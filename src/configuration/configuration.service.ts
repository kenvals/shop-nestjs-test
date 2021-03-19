import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'node:path';

@Injectable()
export class ConfigurationService implements TypeOrmOptionsFactory {
    constructor() {}
  
    createTypeOrmOptions(): TypeOrmModuleOptions {
      return {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: DB_USER,
        password: DB_PASSWORD,
        database: 'test_db',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
  
        logging: ['error'],

      };
    }
  } {}
