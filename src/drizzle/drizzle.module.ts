import { DynamicModule, Module } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './drizzle.module-definition';
import { DrizzleService } from './drizzle.service';
import { DATASOURCE } from './token.constant';

@Module({})
export class DrizzleModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.forRoot(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleService,
        {
          provide: DATASOURCE,
          useFactory: async (drizzleService: DrizzleService) => {
            return await drizzleService.getDrizzle();
          },
          inject: [DrizzleService],
        },
      ],
      exports: [...exports, DATASOURCE],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
    } = super.forRootAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleService,
        {
          provide: DATASOURCE,
          useFactory: async (drizzleService: DrizzleService) => {
            return await drizzleService.getDrizzle();
          },
          inject: [DrizzleService],
        },
      ],
      exports: [...exports, DATASOURCE],
    };
  }
}
