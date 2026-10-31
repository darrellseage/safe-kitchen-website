import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { cookies } from "@/content/legal";

export const metadata: Metadata = { title: cookies.title };

export default function Page() {
  return <LegalPage page={cookies} />;
}
