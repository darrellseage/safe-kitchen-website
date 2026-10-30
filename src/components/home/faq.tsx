"use client";

import { Plus } from "lucide-react";
import { Accordion } from "radix-ui";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/content/home";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 border-t border-night-700 py-24 md:py-32">
      <div className="mx-auto grid w-[min(1200px,100%-40px)] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" title={faq.title} />
        <Accordion.Root type="single" collapsible className="border-t border-night-700">
          {faq.items.map((item, i) => (
            <Accordion.Item key={item.q} value={`q${i}`} className="border-b border-night-700">
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-start text-lg font-semibold hover:text-herb-300">
                    {item.q}
                    <Plus
                      className="size-5 flex-none text-fog-400 transition-transform duration-300 group-data-[state=open]:rotate-45"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-fog-200 data-[state=closed]:animate-none">
                <p className="max-w-[64ch] pb-6">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
