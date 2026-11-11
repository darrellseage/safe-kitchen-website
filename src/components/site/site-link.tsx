import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** The site's internal link. Kept as one component so every menu and card links the same way. */
export function SiteLink({ href, ...props }: Props) {
  return <Link href={href} {...props} />;
}
