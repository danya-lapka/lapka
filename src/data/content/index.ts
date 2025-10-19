import { neon } from "@neondatabase/serverless";

const allowedTables = ["games"];
const sql = neon(process.env.DATABASE_URL!);

type Status = "playing" | "planned" | "dropped" | "completed";

export interface ContentTable {
  id: number;
  name: string;
  status: Status;
  playlist: string | undefined;
}

function check(table : string) {
  if (!allowedTables.includes(table)) {
    throw new Error("Invalid table name");
  }
}

async function getAll(table: string): Promise<ContentTable[]> {
  check(table);
  const data = await sql`SELECT * FROM ${sql.unsafe(table)};`;
  return data as ContentTable[];
}

async function contain(table: string, query: string): Promise<boolean> {
  check(table);
  const result = await sql`SELECT EXISTS (SELECT 1 FROM ${sql.unsafe(table)} WHERE name = ${query});`;
  return (result as {exists : boolean}[])[0].exists;
}

async function add(table: string, name: string, status: Status, playlist?: string) {
  check(table);
  const exists = await contain(table, name);
  if (exists) {
    throw new Error(`${name} already exists in ${table}`);
  }
  await sql`INSERT INTO ${sql.unsafe(table)} (name, status, playlist) VALUES (${name}, ${status}, ${playlist ?? null});`;
}

async function deleteName(table: string, name: string) {
  check(table);
  const exists = await contain(table, name);
  if (!exists) throw new Error("Запись не найдена");
  await sql`
    DELETE FROM ${sql.unsafe(table)} WHERE name = ${name};
  `;
}

async function updateName(
  table: string,
  name: string,
  newStatus: Status,
  newPlaylist?: string
) {
  check(table);
  const exists = await contain(table, name);
  if (!exists) throw new Error("Запись не найдена");

  await sql`
    UPDATE ${sql.unsafe(table)}
    SET status = ${newStatus}, playlist = ${newPlaylist ?? null}
    WHERE name = ${name};
  `;
}

export const DataBase = { getAll, contain, add, deleteName, updateName };
export type {Status}