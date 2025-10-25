"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 text-foreground">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: October 2025
      </p>

      <div className="space-y-4 leading-relaxed">
        <p>
          We value your privacy. This website only collects your email address
          when you join the waitlist. The information is used solely to send
          updates about upcoming features or product releases.
        </p>

        <p>
          We also use simple analytics (such as Vercel Analytics) to understand
          site traffic and performance. These analytics are anonymous and do not
          store personally identifiable information.
        </p>

        <p>
          You may request deletion of your data or unsubscribe from the waitlist
          at any time by contacting us. Your information will never be sold,
          rented, or shared with third parties.
        </p>

        <p>
          For any questions about this Privacy Policy, please contact us at:
          <br />
          <span className="font-medium">contact@roastyourfriend.com</span>
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-block bg-[#e5ff00] text-black font-semibold px-6 py-2 rounded-[12] hover:bg-opacity-90 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
