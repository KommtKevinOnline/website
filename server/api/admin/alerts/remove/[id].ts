import { db } from "../../../../db";
import { alerts } from "../../../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    if (!event.context.params?.id) throw new Error('Missing id')

    await db.delete(alerts).where(eq(alerts.id, parseInt(event.context.params.id)))
  } catch (error) {
    console.error(error)
  }

  return []
})