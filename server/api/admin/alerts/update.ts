import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { id, title, text, active } = body

  try {
    await sql`UPDATE alerts SET title = ${title}, text = ${text}, active = ${active} WHERE id = ${id};`;
  } catch (error) {
    console.error(error)
  }

  return []
})