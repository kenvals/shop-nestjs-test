import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(this.getConfigFileName()));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get_int(key: string): number {
    return parseInt(this.envConfig[key], 10);
  }

  get_boolean(key: string): boolean {
    return this.envConfig[key] === 'true';
  }

  /**
   * Возвращает путь до файла конфигурации
   */
  private getConfigFileName() {
    const fileName = process.env.NODE_ENV || '';
    const filePath = `./${fileName}.env`;

    console.log(filePath);

    return filePath;
  }
}
