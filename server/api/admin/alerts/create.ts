import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { title, text, active } = body

  try {
    await sql`INSERT INTO alerts (title, text, active) VALUES (${title}, ${text}, ${active});`;
  } catch (error) {
    console.error(error)
  }

  return []
})