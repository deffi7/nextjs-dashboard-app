import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // Resolver params com await
  try {
    const result = await sql`SELECT * FROM usuarios WHERE id = ${params.id}`;
    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // Resolver params com await
  try {
    const body = await request.json();
    const { name, email, age } = body;
    const result = await sql`
      UPDATE usuarios
      SET name = ${name}, email = ${email}, age = ${age}
      WHERE id = ${params.id}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params; // Resolver params com await
  try {
    const result = await sql`DELETE FROM usuarios WHERE id = ${params.id} RETURNING *`;
    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}