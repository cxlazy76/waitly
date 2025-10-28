import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

// ---- Brand tokens (match your waitlist page) ----
const ACCENT = "#E5FF00";      // neon yellow
const FG = "#111111";          // primary text
const MUTED = "#6B7280";       // gray text
const BG = "#FFFFFF";          // background
const CARD_BG = "#FFFFFF";
const BORDER = "#E5E7EB";

// Use an ABSOLUTE URL for email images:
const HERO_URL = "http://localhost:3000/email/hero.jpg"; // <-- your image URL

const WaitlistEmail = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Welcome to Roast Your Friend</title>
          <Preview>
            You’re on the waitlist! We’ll let you know as soon as it’s ready 🎉
          </Preview>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap');`}
          </style>
        </Head>

        <Body
          className="py-[40px]"
          style={{ backgroundColor: BG, fontFamily: "'Inter Tight', sans-serif" }}
        >
          <Container
            className="mx-auto rounded-[14px] p-0 max-w-[640px] shadow-sm text-center"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            {/* Hero image */}
            {HERO_URL && (
              <Section className="w-full">
                <Img
                  src={HERO_URL}
                  alt="RoastYourFriend"
                  width={640}
                  className="block w-full"
                />
              </Section>
            )}

            {/* === Header === */}
            <Section className="px-[28px] pt-[28px] pb-[8px] text-center">
              <Text
                className="m-0 text-[28px] font-bold leading-tight text-center"
                style={{ color: FG }}
              >
                Welcome to <span style={{ color: FG }}>Roast-Your-Friend</span>
              </Text>

              <Text
                className="mt-[8px] mb-[16px] text-[16px] text-center"
                style={{ color: MUTED }}
              >
                We will notify you when our product is ready
              </Text>

              <Hr className="my-[16px]" style={{ borderColor: BORDER }} />
            </Section>

            {/* === Main Content === */}
            <Section className="px-[28px] pb-[8px] text-center">
              <Text className="m-0 mb-[12px] text-[16px] text-center" style={{ color: FG }}>
                Thanks for joining our early community!
              </Text>
              <Text className="m-0 mb-[20px] text-[16px] text-center" style={{ color: FG }}>
                Have ideas or questions? Just reply to this email — we read every message.
              </Text>
            </Section>

            <Hr className="my-[16px]" style={{ borderColor: BORDER }} />

            {/* === Footer === */}
            <Section className="px-[28px] pb-[24px] text-center">
              <Text className="m-0 text-[12px] text-center" style={{ color: MUTED }}>
                © {currentYear} RoastYourFriend. All rights reserved.
              </Text>
              <Text className="mt-[6px] mb-[10px] text-[12px] text-center" style={{ color: MUTED }}>
                Visit us at{" "}
                <Link
                  href="https://www.roastyourfriend.com"
                  className="underline"
                  style={{ color: FG }}
                >
                  roastyourfriend.com
                </Link>
              </Text>
              <Text className="text-[12px] text-center" style={{ color: MUTED }}>
                <Link
                  href="https://www.roastyourfriend.com/unsubscribe"
                  className="underline"
                  style={{ color: FG }}
                >
                  Unsubscribe
                </Link>{" "}
                ·{" "}
                <Link
                  href="https://www.roastyourfriend.com/privacy"
                  className="underline"
                  style={{ color: FG }}
                >
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistEmail;
