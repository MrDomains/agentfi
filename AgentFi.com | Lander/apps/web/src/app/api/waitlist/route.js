import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Insert email into waitlist
    try {
      const result = await sql`
        INSERT INTO waitlist (email)
        VALUES (${email.toLowerCase().trim()})
        RETURNING id, email, created_at
      `;

      return Response.json(
        {
          success: true,
          data: result[0],
        },
        { status: 201 },
      );
    } catch (dbError) {
      // Handle duplicate email (unique constraint violation)
      if (dbError.code === "23505") {
        return Response.json(
          { error: "This email is already on the waitlist" },
          { status: 409 },
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return Response.json(
      { error: "Failed to add email to waitlist" },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to retrieve waitlist (for admin purposes)
export async function GET(request) {
  try {
    const waitlist = await sql`
      SELECT id, email, created_at
      FROM waitlist
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      count: waitlist.length,
      data: waitlist,
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return Response.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 },
    );
  }
}
