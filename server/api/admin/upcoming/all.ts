import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  try {
    const { rows: upcoming } = await sql`SELECT * FROM upcoming_streams`;
  
    return upcoming as { id: number; title: string; text: string; }[];
  } catch (error) {
    console.error(error)
  }

  return []
})