"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { ctaHref, mainNav } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/button-link";
import { Logo } from "./logo";

/** Sticky header that steps out of the way while reading and returns on scroll up. */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 200 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 200) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[transform,background-color,border-color] duration-300",
        scrolled ? "border-b border-night-700/80 bg-night-950/80 backdrop-blur-xl" : "border-b border-transparent",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-18 w-[min(1200px,100%-40px)] items-center justify-between gap-6">
        <Link href="/" className="rounded-lg" aria-label="Safe Kitchen home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-8 text-[15px] text-fog-400">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded transition-colors hover:text-fog-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link href={ctaHref} className={buttonClasses("primary", "min-h-11 px-5 text-[15px]")}>
              Get early access
            </Link>
          </span>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-flex size-12 items-center justify-center rounded-full border border-night-600 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-night-950/70 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(360px,88vw)] flex-col gap-8 border-l border-night-700 bg-night-900 p-6">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <span><Logo /></span>
                  </Dialog.Title>
                  <Dialog.Close className="inline-flex size-12 items-center justify-center rounded-full border border-night-600" aria-label="Close menu">
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Mobile">
                  <ul className="grid gap-1">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-12 items-center rounded-xl px-3 font-display text-2xl font-semibold hover:bg-white/5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link href={ctaHref} onClick={() => setOpen(false)} className={buttonClasses("primary", "mt-auto")}>
                  Get early access
                </Link>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
