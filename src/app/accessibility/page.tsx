import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { accessibility } from "@/content/legal";

export const metadata: Metadata = { title: accessibility.title };

export default function Page() {
  return <LegalPage page={accessibility} />;
}
