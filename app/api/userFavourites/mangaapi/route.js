import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const sql = neon(
      `postgresql://AnimeDiaryDB_owner:Aqs2i6zoSNwl@ep-proud-sea-a1ch95mu.ap-southeast-1.aws.neon.tech/AnimeDiaryDB?sslmode=require`
    );
    const { name, malId, coverurl, userId } = await request.json();

    if (!name || !malId || !coverurl || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const insertResult = await sql`
      INSERT INTO mangafavourite (name, malId, coverurl, userId)
      VALUES (${name}, ${malId}, ${coverurl}, ${userId})  
      RETURNING *;
    `;

    return NextResponse.json({ data: insertResult }, { status: 201 });
  } catch (error) {
    console.error("Error inserting to mangafavourite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
