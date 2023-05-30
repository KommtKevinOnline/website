import { db } from "../../../../db";
import { alertsTable } from "../../../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    if (!event.context.params?.id) throw new Error('Missing id')

    await db.delete(alertsTable).where(eq(alertsTable.id, parseInt(event.context.params.id)))
  } catch (error) {
    console.error(error)
  }

  return []
})