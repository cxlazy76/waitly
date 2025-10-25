import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const WaitlistEmail = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Welcome to RoastYourFriend</title>
          <Preview>
            You're officially on the waitlist! Get ready to roast your friends 🔥
          </Preview>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap');
            `}
          </style>
        </Head>

        <Body
          className="bg-[#09090B] py-[40px]"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          <Container className="bg-[#18181B] rounded-[12px] mx-auto p-[36px] max-w-[600px] shadow-lg">
            {/* === Header === */}
            <Section className="text-center">
              <Text className="text-[30px] font-bold text-white m-0">
                Welcome to{" "}
                <span className="text-[#E5FF00]">RoastYourFriend</span>
              </Text>

              <Text className="text-[18px] text-[#A1A1AA] mt-[12px] mb-[12px]">
                You're officially on the waitlist! 🔥
              </Text>

              <Hr className="border-solid border-[#2D2D2F] my-[20px] w-[100px] mx-auto" />
            </Section>

            {/* === Main Content === */}
            <Section className="text-[#E4E4E7] leading-[26px] text-[16px]">
              <Text className="m-0 mb-[16px]">
                Thanks for signing up to get early access to{" "}
                <strong>RoastYourFriend</strong> - the world's first
                AI-powered platform for creating hilarious personalized video
                roasts.
              </Text>

              <Text className="m-0 mb-[16px]">
                We'll let you know as soon as we launch so you can start
                roasting your friends like a pro. In the meantime, feel free to
                explore what we're working on below.
              </Text>

              <Section className="my-[32px] text-center">
                <Button
                  className="bg-[#E5FF00] text-[#09090B] font-bold py-[14px] px-[28px] rounded-[10px] no-underline text-center hover:brightness-105 transition-all"
                  href="https://www.roastyourfriend.com"
                >
                  Visit our website
                </Button>
              </Section>

              <Text className="m-0 mb-[16px]">
                Got an idea or just want to say hi? You can reply directly to
                this email - we read every message.
              </Text>

              <Text className="m-0 mb-[24px]">
                Stay tuned, and thanks for being part of our early community.
              </Text>

              <Text className="font-bold text-white text-[16px] mt-[24px] mb-[32px]">
                - The RoastYourFriend Team
              </Text>
            </Section>

            {/* === Footer === */}
            <Hr className="border-solid border-[#27272A] my-[24px]" />

            <Section className="text-center">
              <Text className="text-[12px] text-[#71717A] m-0">
                © {currentYear} RoastYourFriend. All rights reserved.
              </Text>

              <Text className="text-[12px] text-[#71717A] mt-[4px] mb-[10px]">
                Visit us at{" "}
                <Link
                  href="https://www.roastyourfriend.com"
                  className="text-[#E5FF00] underline"
                >
                  roastyourfriend.com
                </Link>
              </Text>

              <Text className="text-[12px] text-[#71717A]">
                <Link
                  href="https://www.roastyourfriend.com/unsubscribe"
                  className="text-[#E5FF00] underline"
                >
                  Unsubscribe
                </Link>{" "}
                ·{" "}
                <Link
                  href="https://www.roastyourfriend.com/privacy"
                  className="text-[#E5FF00] underline"
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
