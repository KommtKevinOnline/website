import { db } from "../../../db";
import { alerts } from "../../../../db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { title, text, active } = body

  try {
    await db.insert(alerts).values({ title, text, active })
  } catch (error) {
    console.error(error)
  }

  return []
})