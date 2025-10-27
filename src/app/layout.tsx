import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "~/components/header";
import { ThemeProvider } from "~/providers/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RoastYourFriend - AI Video Roasts in Seconds",
  description:
    "Create hilarious personalized AI video roasts in seconds. Choose a character, type your message, and watch AI do the rest. Fun, fast, and unforgettable — only on RoastYourFriend.",
  openGraph: {
    title: "RoastYourFriend - AI Video Roasts in Seconds",
    description:
      "Get early access to the world’s funniest AI platform. Generate personalized video roasts that make your friends laugh, blush, or both.",
    url: "https://www.roastyourfriend.com",
    siteName: "RoastYourFriend",
    images: [
      {
        url: "https://www.roastyourfriend.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RoastYourFriend - AI Video Roasts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastYourFriend - AI Video Roasts in Seconds",
    description:
      "Join the waitlist for AI-generated personalized video roasts that are funny, savage, and shareable.",
    images: ["https://www.roastyourfriend.com/og-image.jpg"],
    creator: "@RoastYourFriend",
  },
  metadataBase: new URL("https://www.roastyourfriend.com"),
  keywords: [
    "AI video roasts",
    "personalized AI videos",
    "AI Santa",
    "funny video generator",
    "AI roast generator",
    "Christmas AI videos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white" suppressHydrationWarning>
  <body
    className={`${interTight.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-black`}
  >

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
