import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    const result = await sql`SELECT * FROM usuarios ORDER BY id ASC`;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, age } = body;
    const result = await sql`
      INSERT INTO usuarios (name, email, age)
      VALUES (${name}, ${email}, ${age})
      RETURNING *
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}