import { CalendarDays, ClipboardCheck, Clock3, GraduationCap, ScanEye, ShieldCheck, ShoppingBasket, Thermometer, Wheat, type LucideIcon } from "lucide-react";

export type PillarIconName = "thermometer" | "calendar" | "graduation" | "clock" | "eye" | "basket" | "clipboard" | "shield" | "wheat";

const icons: Record<PillarIconName, LucideIcon> = {
  thermometer: Thermometer,
  calendar: CalendarDays,
  graduation: GraduationCap,
  clock: Clock3,
  eye: ScanEye,
  basket: ShoppingBasket,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  wheat: Wheat,
};

export function PillarIcon({ name, className }: { name: PillarIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
