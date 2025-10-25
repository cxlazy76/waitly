import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import WaitlistEmail from "~/emails"; // renamed import for clarity

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"), // 2 requests per minute per IP
});

export async function POST(request: NextRequest) {
  try {
    // === Extract IP for rate limiting ===
    const xForwardedFor = request.headers.get("x-forwarded-for");
    const ip =
      xForwardedFor?.split(",")[0].trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "127.0.0.1";

    const result = await ratelimit.limit(ip);
    if (!result.success) {
      return NextResponse.json({ error: "Too many requests!" }, { status: 429 });
    }

    // === Extract Email ===
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // === Send Welcome Email ===
    const { data, error } = await resend.emails.send({
      from: "RoastYourFriend <contact@roastyourfriend.com>",
      to: [email],
      subject: "🔥 You're on the RoastYourFriend waitlist!",
      react: WaitlistEmail(),
      replyTo: "support@roastyourfriend.com",
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Mail route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
