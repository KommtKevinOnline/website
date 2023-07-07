import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  try {
    await sql`DELETE FROM upcoming_streams WHERE id = ${event.context.params?.id};`;
  } catch (error) {
    console.error(error)
  }

  return []
})