import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  try {
    await sql`DELETE FROM alerts WHERE id = ${event.context.params?.id};`;
  } catch (error) {
    console.error(error)
  }

  return []
})