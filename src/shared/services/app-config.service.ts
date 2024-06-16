import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DrizzleModuleOptions } from '../../drizzle/drizzle.module-options';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get databaseConfig(): DrizzleModuleOptions['config'] {
    return {
      user: this.config.get<string>('DB_USER'),
      host: this.config.get<string>('DB_HOST'),
      database: this.config.get<string>('DB_DATABASE'),
      password: this.config.get<string>('DB_PASSWORD'),
      port: this.config.get<number>('DB_PORT'),
    };
  }
}
