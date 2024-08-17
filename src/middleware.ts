import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { MAX_FREE_REQUESTS_PER_MINUTE } from "./lib/types";

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(MAX_FREE_REQUESTS_PER_MINUTE, "60 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api",
};

export default async function middleware(request: NextRequest) {
  // You could alternatively limit based on user ID or similar
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );
  return success
    ? NextResponse.next()
    : NextResponse.json(
        {
          error: "rate_limit",
          message: "Rate Limit Exceeded",
        },
        {
          status: 429,
        }
      );
}
