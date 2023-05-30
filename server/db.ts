import postgres from "postgres";
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

const runtimeConfig = useRuntimeConfig();

export const queryClient = postgres(runtimeConfig.app.postgresUrl);
export const db: PostgresJsDatabase = drizzle(queryClient);