export type ConnectionType = 'client' | 'pool';

import { ConnectionConfig, PoolConfig } from 'pg';

import { DrizzleConfig } from 'drizzle-orm';

export interface DrizzleModuleOptions {
  type: ConnectionType;
  config: ConnectionConfig | PoolConfig;
  drizzleConfig?: DrizzleConfig;
}
