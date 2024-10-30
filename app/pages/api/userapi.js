import { neon } from "@neondatabase/serverless";

export async function POST(request) {
  // Set up CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // For all origins, but ideally restrict to your app's URL in production
    "Access-Control-Allow-Methods": "POST,GET,DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  try {
    const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`);
    const { name, profileurl, email, clerkId } = await request.json();

    if (!name || !profileurl || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (
        name,
        profileimg,
        email,
        clerkId
    )
    VALUES (
        ${name},
        ${profileurl},
        ${email},
        ${clerkId}
    )
    `;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
      headers,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers,
    });
  }
}
