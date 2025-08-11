import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS usuarios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        age INTEGER NOT NULL
      );
    `;
    return { message: "Usuarios table created successfully" };
  } catch (error) {
    console.error("Error seeding usuarios table:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [seedUsers()]);
    return NextResponse.json({ message: "Database seeded successfully", result });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}