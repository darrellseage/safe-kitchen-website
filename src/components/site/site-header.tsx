"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useEffect, useId, useRef, useState } from "react";
import { PillarIcon } from "@/components/ui/pillar-icon";
import { buttonClasses } from "@/components/ui/button-link";
import { cta } from "@/content/cta";
import { homeHref, isCurrent } from "@/content/navigation";
import { featureHref, featurePages, primaryNav, routes } from "@/content/site-map";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";
import { SiteLink } from "./site-link";

const groups = ["Food safety", "Running the kitchen"] as const;
const linkClass = "inline-flex min-h-11 items-center rounded-lg px-1 transition-colors hover:text-ink aria-[current=page]:text-brand-900 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

/** Sticky header that steps out of the way while reading and returns on scroll up. */
export function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(true);
  const lastY = useRef(0);
  const dropdown = useRef<HTMLLIElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const mobilePanelId = useId();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 200 || y < lastY.current - 4) setHidden(false);
      else if (y > lastY.current + 4) setHidden(true);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The Features panel closes on Escape (focus returns to its button) and on a click or focus outside it.
  useEffect(() => {
    if (!featuresOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFeaturesOpen(false);
        trigger.current?.focus();
      }
    };
    const onOutside = (e: Event) => {
      if (!dropdown.current?.contains(e.target as Node)) setFeaturesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
    };
  }, [featuresOpen]);

  const closeAll = () => {
    setFeaturesOpen(false);
    setMenuOpen(false);
  };
  const featuresCurrent = isCurrent(routes.features, pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-surface-raised/90 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-card" : "border-transparent",
        hidden && !menuOpen && !featuresOpen && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-18 w-[min(1200px,100%-32px)] items-center justify-between gap-3 sm:gap-6">
        <SiteLink href={homeHref} className="flex min-h-12 items-center rounded-lg" aria-label="Safe Kitchen home">
          <Logo />
        </SiteLink>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px] font-semibold text-ink-muted">
            <li ref={dropdown} className="relative">
              <button
                ref={trigger}
                type="button"
                aria-expanded={featuresOpen}
                aria-controls={panelId}
                onClick={() => setFeaturesOpen((v) => !v)}
                className={cn(linkClass, "gap-1", featuresCurrent && "text-brand-900")}
              >
                Features
                <ChevronDown className={cn("size-4 transition-transform", featuresOpen && "rotate-180")} aria-hidden="true" />
              </button>
              <div
                id={panelId}
                hidden={!featuresOpen}
                className="absolute top-full left-1/2 z-50 mt-2 w-[min(720px,calc(100vw-48px))] -translate-x-1/3 rounded-3xl border border-line bg-surface-raised p-5 shadow-overlay"
              >
                <div className="grid grid-cols-2 gap-x-6">
                  {groups.map((group) => (
                    <div key={group}>
                      <p className="px-3 pb-2 text-[13px] font-bold tracking-[0.08em] text-brand-700 uppercase">{group}</p>
                      <ul className="grid gap-1">
                        {featurePages
                          .filter((f) => f.group === group)
                          .map((f) => (
                            <li key={f.slug}>
                              <SiteLink
                                href={featureHref(f.slug)}
                                onClick={closeAll}
                                aria-current={isCurrent(featureHref(f.slug), pathname) ? "page" : undefined}
                                className="flex gap-3 rounded-2xl p-3 text-ink transition-colors hover:bg-surface aria-[current=page]:bg-brand-50"
                              >
                                <span className="grid size-10 flex-none place-items-center rounded-xl bg-brand-50 text-brand-700">
                                  <PillarIcon name={f.icon} className="size-5" />
                                </span>
                                <span>
                                  <span className="block font-bold">{f.name}</span>
                                  <span className="block text-[13.5px] font-medium text-ink-muted">{f.summary}</span>
                                </span>
                              </SiteLink>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <SiteLink href={routes.features} onClick={closeAll} className="mt-3 flex min-h-11 items-center border-t border-line px-3 pt-3 font-bold text-accent-600 hover:text-accent-700">
                  See all features →
                </SiteLink>
              </div>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SiteLink href={item.href} aria-current={isCurrent(item.href, pathname) ? "page" : undefined} className={linkClass}>
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Always visible, including on phones; the header hides while scrolling down, so it never covers content. */}
          <SiteLink href={cta.href} className={buttonClasses("primary", "min-h-12 px-3.5 text-[15px] whitespace-nowrap max-[359px]:hidden sm:px-5")}>
            <span className="sm:hidden">{cta.shortLabel}</span>
            <span className="hidden sm:inline">{cta.label}</span>
          </SiteLink>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger className="inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-line px-3 text-[15px] font-bold text-ink lg:hidden" aria-label="Open menu">
              <Menu className="size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Menu</span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(380px,90vw)] flex-col gap-6 overflow-y-auto bg-surface-raised p-6 shadow-overlay">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <span>
                      <Logo />
                    </span>
                  </Dialog.Title>
                  <Dialog.Close className="inline-flex size-12 items-center justify-center rounded-full border-[1.5px] border-line" aria-label="Close menu">
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Mobile">
                  <ul className="grid gap-1">
                    <li>
                      <button
                        type="button"
                        aria-expanded={mobileFeatures}
                        aria-controls={mobilePanelId}
                        onClick={() => setMobileFeatures((v) => !v)}
                        className="flex min-h-13 w-full items-center justify-between rounded-xl px-3 text-xl font-bold text-ink hover:bg-surface"
                      >
                        Features
                        <ChevronDown className={cn("size-5 transition-transform", mobileFeatures && "rotate-180")} aria-hidden="true" />
                      </button>
                      <ul id={mobilePanelId} hidden={!mobileFeatures} className="ms-3 grid gap-0.5 border-s-2 border-brand-100 ps-3 pb-2">
                        {featurePages.map((f) => (
                          <li key={f.slug}>
                            <SiteLink
                              href={featureHref(f.slug)}
                              onClick={closeAll}
                              aria-current={isCurrent(featureHref(f.slug), pathname) ? "page" : undefined}
                              className="flex min-h-12 items-center rounded-lg px-2 text-[17px] font-semibold text-ink hover:bg-surface aria-[current=page]:text-accent-700"
                            >
                              {f.name}
                            </SiteLink>
                          </li>
                        ))}
                        <li>
                          <SiteLink href={routes.features} onClick={closeAll} className="flex min-h-12 items-center rounded-lg px-2 text-[17px] font-bold text-accent-600">
                            All features
                          </SiteLink>
                        </li>
                      </ul>
                    </li>
                    {primaryNav.map((item) => (
                      <li key={item.href}>
                        <SiteLink
                          href={item.href}
                          onClick={closeAll}
                          aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
                          className="flex min-h-13 items-center rounded-xl px-3 text-xl font-bold text-ink hover:bg-surface aria-[current=page]:text-accent-700"
                        >
                          {item.label}
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <SiteLink href={cta.href} onClick={closeAll} className={buttonClasses("primary", "mt-auto")}>
                  {cta.label}
                </SiteLink>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Phones and tablets: the main pages, always in view under the header (it hides with the header on scroll down). */}
      <nav aria-label="Pages" className="border-t border-line lg:hidden">
        <ul className="mx-auto flex w-[min(1200px,100%-16px)] gap-1 overflow-x-auto py-1.5 text-[15px] font-bold whitespace-nowrap text-ink-muted [scrollbar-width:none]">
          <li>
            <button
              type="button"
              onClick={() => {
                setMobileFeatures(true);
                setMenuOpen(true);
              }}
              className={cn("inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 hover:bg-surface", featuresCurrent ? "bg-brand-50 text-brand-900" : "text-ink")}
            >
              Features
              <ChevronDown className="size-4" aria-hidden="true" />
            </button>
          </li>
          {primaryNav.map((item) => (
            <li key={item.href}>
              <SiteLink
                href={item.href}
                aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
                className="inline-flex min-h-11 items-center rounded-full px-3.5 hover:bg-surface aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-900"
              >
                {item.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
