"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Countdown from "./countdown";
import People from "./people";
import Form from "./form";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [isSuccess, setIsSuccess] = useState(false);

  // Shared card content for both mobile + desktop
  const cards = ["one", "two", "three", "four", "five"].map((img, i) => (
    <div
      key={i}
      className="
        rounded-2xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition
        w-[180px] sm:w-[200px] md:w-40 lg:w-44
        aspect-[3/4]
      "
    >
      <Image
        src={`/gallery/${img}.jpg`}
        alt={`Example ${i + 1}`}
        width={300}
        height={400}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-start px-4">
      {/* ===== Availability Badge ===== */}
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-3 rounded-full border border-border px-4 py-1 relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
          </span>
          <p className="uppercase text-sm font-medium text-center">
            available in - November - {year}
          </p>
        </div>
      </div>

      {/* ===== Title & Subtitle ===== */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl relative z-10">
        <h2 className="text-4xl font-bold text-foreground leading-tight max-w-[90%] sm:max-w-none mb-2">
          Create funny AI videos in seconds
        </h2>
        <p className="text-base text-muted-foreground max-w-[85%] sm:max-w-md mt-0">
          {isSuccess
            ? "You've successfully secured your spot. We’ll hit you up the moment it’s your turn to dive in."
            : "You pick a character → type a message → we generate a video."}
        </p>
      </div>

      {/* ===== Image Cards Section ===== */}

      {/* Mobile: horizontal scroll (no snap), wrapper doesn't enlarge page */}
      <div className="md:hidden w-full mt-8 overflow-x-hidden">
        <div
          className="
          slider slider--fade
          flex gap-3
          overflow-x-auto overflow-y-hidden
          overscroll-x-contain
          py-1 px-4
        "
          aria-label="Characters"
          role="region"
        >
          {cards.map((card, i) => (
            <div key={i} className="shrink-0 min-w-[180px] sm:min-w-[200px]">
              {card}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: normal layout */}
      <div className="hidden md:flex flex-wrap justify-center items-start gap-4 sm:gap-5 md:gap-6 w-full max-w-6xl px-2 relative z-0 mt-8">
        {cards}
      </div>

      {/* ===== Waitlist Form ===== */}
<div className="flex flex-col items-center justify-center gap-3 w-full mt-10 max-w-[90%] sm:max-w-2xl text-center">
  <Form onSuccessChange={setIsSuccess} />
  <p className="text-sm text-muted-foreground opacity-80 mt-1">
    Get notified when this is available
  </p>
</div>


      <div className="flex items-center justify-center gap-2 max-w-[90%] sm:max-w-2xl mt-6">
        <People count={waitlistPeople} />
      </div>

      {/* ===== Countdown Section ===== */}
      <div className="max-w-[90%] sm:max-w-2xl text-center">
        <Countdown period={new Date("2025-11-15")} />
      </div>
    </div>
  );
}
