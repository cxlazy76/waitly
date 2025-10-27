"use client";

import { cn } from "~/lib/utils";
import { useScroll } from "~/hooks/use-scroll";
import { GithubLogo, NotionLogo } from "./svgs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* keep the rest of your existing header content exactly as is */}
    </header>
  );
}
