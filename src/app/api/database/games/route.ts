import { NextResponse } from "next/server";
import { DataBase } from "@/data/content";

export async function GET() {
  try {
    const result = await DataBase.getAll("games");
    const rows = (result as any).rows ?? result;

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
