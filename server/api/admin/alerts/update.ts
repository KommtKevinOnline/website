import { db } from "../../../db";
import { alertsTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    await db.update(alertsTable).set({ text: body.text, title: body.title, active: body.active }).where(eq(alertsTable.id, body.id))
  } catch (error) {
    console.error(error)
  }

  return []
})