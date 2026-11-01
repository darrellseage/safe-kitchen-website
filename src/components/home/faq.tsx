"use client";

import { Plus } from "lucide-react";
import { Accordion } from "radix-ui";
import { faq } from "@/content/home";

/** The remaining questions, at the end of the "Straight answers" section. */
export function Faq() {
  return (
    <div id="faq" className="mt-20 grid scroll-mt-24 gap-10 border-t border-line pt-16 lg:grid-cols-[0.8fr_1.2fr]">
      <h3 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.035em]">{faq.title}</h3>
      <Accordion.Root type="single" collapsible className="border-t border-line">
        {faq.items.map((item, i) => (
          <Accordion.Item key={item.q} value={`q${i}`} className="border-b border-line">
            <Accordion.Header asChild>
              <h4>
                <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start text-lg font-bold hover:text-accent-600">
                  {item.q}
                  <Plus className="size-5 flex-none text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-45" aria-hidden="true" />
                </Accordion.Trigger>
              </h4>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-ink-muted">
              <p className="max-w-[64ch] pb-6">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
