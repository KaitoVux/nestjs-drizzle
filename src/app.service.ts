import { Inject, Injectable } from '@nestjs/common';
import { DATASOURCE } from './drizzle/token.constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AppService {
  constructor(@Inject(DATASOURCE) private readonly db: NodePgDatabase) {}
  getHello(): string {
    return 'Hello World!';
  }
}
