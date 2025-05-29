import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const { name, email, clerkId } = await request.json();

        if(!name || !email || !clerkId) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const response = await sql`
            INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerkId})
            RETURNING *`;

        return Response.json({ data: response[0] }, { status: 201 });
    
    } catch (error) {
        console.error(error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 