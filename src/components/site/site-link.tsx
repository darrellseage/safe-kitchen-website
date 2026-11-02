"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { hrefFor, isPreviewExport } from "@/content/navigation";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * The site's internal link. Header and footer links work from every page. In
 * the static preview it is a plain link, because the preview is a folder of
 * files that Next.js's client-side navigation can't move between (it would
 * also try to preload pages that don't exist there). The real site uses <Link>.
 */
export function SiteLink({ href, ...props }: Props) {
  const target = hrefFor(href, usePathname());
  return isPreviewExport ? <a href={target} {...props} /> : <Link href={target} {...props} />;
}
