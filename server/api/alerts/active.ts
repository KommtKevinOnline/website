import { db } from "../../db";
import { alertsTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    return await db.select().from(alertsTable).where(eq(alertsTable.active, true))

  } catch (error) {
    console.error(error)
  }

  return []
})