import { db } from "../../../db";
import { alerts } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    await db.update(alerts).set({ text: body.text, title: body.title, active: body.active }).where(eq(alerts.id, body.id))
  } catch (error) {
    console.error(error)
  }

  return []
})