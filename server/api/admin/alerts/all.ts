import { db } from "../../../db";
import { alertsTable } from "../../../../db/schema";

export default defineEventHandler(async (event) => {
  try {
    return await db.select().from(alertsTable)
  } catch (error) {
    console.error(error)
  }

  return []
})