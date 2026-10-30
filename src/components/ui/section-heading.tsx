import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  title,
  intro,
  className,
  size = "lg",
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  size?: "lg" | "xl";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2
        id={id}
        className={cn(
          "font-display font-bold tracking-[-0.03em]",
          size === "xl" ? "text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] font-extrabold" : "text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02]",
        )}
      >
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-[58ch] text-lg text-fog-400">{intro}</p> : null}
    </div>
  );
}
