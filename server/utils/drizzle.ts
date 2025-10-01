import { drizzle } from 'drizzle-orm/node-postgres';

export {
  sql,
  eq,
  and,
  or,
  asc,
  desc,
  gt,
  gte,
  lt,
  lte,
  not,
  is,
  isNull,
  isNotNull,
  inArray,
} from 'drizzle-orm';

import * as schema from '~~/server/database/schema';

export const tables = schema;

export function useDrizzle() {
  const runtimeConfig = useRuntimeConfig();

  return drizzle(runtimeConfig.database.url, {
    schema: schema,
  });
}
