import { db } from "../../../db";

export default defineEventHandler(async (event) => {
  try {
    return await db.query.alerts.findMany()
  } catch (error) {
    console.error(error)
  }

  return []
})