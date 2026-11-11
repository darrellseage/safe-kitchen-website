"use client";

import { Plus } from "lucide-react";
import { Accordion } from "radix-ui";
import type { FaqItem } from "@/content/faqs";

/** An accordion of questions. Used on feature pages (their own questions) and on /faqs (all of them). */
export function FaqList({ items, headingLevel = "h3" }: { items: FaqItem[]; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <Accordion.Root type="single" collapsible className="border-t border-line">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q} className="border-b border-line">
          <Accordion.Header asChild>
            <Heading>
              <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start text-lg font-bold hover:text-accent-600">
                {item.q}
                <Plus className="size-5 flex-none text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-45" aria-hidden="true" />
              </Accordion.Trigger>
            </Heading>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-ink-muted">
            <p className="max-w-[68ch] pb-6">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
