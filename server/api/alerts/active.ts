import { db } from "../../db";
import { alerts } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    return await db.query.alerts.findMany({ where: eq(alerts.active, true) })

  } catch (error) {
    console.error(error)
  }

  return []
})