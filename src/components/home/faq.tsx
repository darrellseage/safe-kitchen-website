"use client";

import { Plus } from "lucide-react";
import { Accordion } from "radix-ui";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/content/home";

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" title={faq.title} />
        <Accordion.Root type="single" collapsible className="border-t border-line">
          {faq.items.map((item, i) => (
            <Accordion.Item key={item.q} value={`q${i}`} className="border-b border-line">
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start text-lg font-bold hover:text-accent-600">
                    {item.q}
                    <Plus className="size-5 flex-none text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-45" aria-hidden="true" />
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-ink-muted">
                <p className="max-w-[64ch] pb-6">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </Section>
  );
}
