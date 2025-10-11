import { neon } from "@neondatabase/serverless";

const allowedTables = ["games"];

export interface ContentTable {
  id: number;
  name: string;
  status: "playing" | "planned" | "dropped" | "completed";
  playlist: string | undefined;
}

async function getAll(table: string): Promise<ContentTable[]> {
  if (!allowedTables.includes(table)) {
    throw new Error("Invalid table name");
  }
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`SELECT * FROM ${sql.unsafe(table)};`;

  return data as ContentTable[];
}

export const DataBase = { getAll };
