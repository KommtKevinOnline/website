import { sql } from "@vercel/postgres";

export default defineEventHandler(async (event) => {
  try {
    const { rows: alerts } = await sql`SELECT * FROM alerts WHERE active = true`;
  
    return alerts as { id: number; title: string; text: string; }[];
  } catch (error) {
    console.error(error)
  }

  return []
})