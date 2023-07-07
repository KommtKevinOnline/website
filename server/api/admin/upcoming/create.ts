import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { date } = body

  try {
    await sql`INSERT INTO upcoming_streams (date) VALUES (${date});`;
  } catch (error) {
    console.error(error)
  }

  return []
})