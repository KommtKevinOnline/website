import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../db/schema'

const runtimeConfig = useRuntimeConfig();

export const queryClient = postgres(runtimeConfig.app.postgresUrl);
export const db = drizzle(queryClient, { schema });