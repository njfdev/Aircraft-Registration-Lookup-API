import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  // verify that the request is coming from the vercel cron job and not a random person
  const authHeader = request.headers.get("authorization");
  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    process.env.NODE_ENV !== "development"
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  return Response.json({ success: true });
}
