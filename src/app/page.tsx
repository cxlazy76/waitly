export const dynamic = "force-dynamic";

import { LandingPage } from "./page.client";
import { connection } from "next/server";
import { getNotionDatabaseRowCount } from "~/lib/utils";

export default async function Home() {
  const [waitlistPeople] = await Promise.all([
    getNotionDatabaseRowCount(process.env.NOTION_DB!),
    connection(),
  ]);

  return <LandingPage waitlistPeople={waitlistPeople} />;
}
