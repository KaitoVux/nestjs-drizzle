import { Inject, Injectable } from '@nestjs/common';
import { Client, Pool } from 'pg';
import { MODULE_OPTIONS_TOKEN } from './drizzle.module-definition';
import { DrizzleModuleOptions } from './drizzle.module-options';

import {
  NodePgClient,
  drizzle,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: DrizzleModuleOptions,
  ) {}

  public async getDrizzle(): Promise<NodePgDatabase> {
    const { config, type, drizzleConfig } = this.options;
    try {
      let client: NodePgClient;
      if (type === 'client') {
        client = new Client(config);
      } else if (type === 'pool') {
        client = new Pool(config);
      }
      await client.connect();
      const db = drizzle(client, drizzleConfig);
      console.info('Connected to database');
      return db;
    } catch (e) {
      console.error(e);
    }
  }
}
