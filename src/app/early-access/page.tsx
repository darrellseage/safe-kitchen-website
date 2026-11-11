import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { routes } from "@/content/site-map";

export const metadata: Metadata = {
  title: "Early access",
  description: "Join Safe Kitchen early access, request a demo or book a call. Free, with no payment card and no commitment.",
  alternates: { canonical: routes.earlyAccess },
};

export default function EarlyAccessPage() {
  return (
    <main id="main">
      <FinalCta asPage />
    </main>
  );
}
