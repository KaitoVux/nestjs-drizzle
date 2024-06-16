import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule.forRootAsync({
      isGlobal: true,
      imports: [SharedModule],
      useFactory: (config: AppConfigService) => {
        return {
          type: 'pool',
          config: config.databaseConfig,
        };
      },
      inject: [AppConfigService],
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
