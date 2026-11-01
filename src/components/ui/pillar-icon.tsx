import { CalendarDays, Clock3, GraduationCap, ScanEye, ShoppingBasket, Thermometer, type LucideIcon } from "lucide-react";

export type PillarIconName = "thermometer" | "calendar" | "graduation" | "clock" | "eye" | "basket";

const icons: Record<PillarIconName, LucideIcon> = {
  thermometer: Thermometer,
  calendar: CalendarDays,
  graduation: GraduationCap,
  clock: Clock3,
  eye: ScanEye,
  basket: ShoppingBasket,
};

export function PillarIcon({ name, className }: { name: PillarIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
