import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

export type StatTone = "primary" | "cyan" | "emerald" | "amber" | "violet" | "rose";

const toneMap: Record<StatTone, string> = {
  primary: "text-primary bg-primary/10",
  cyan: "text-cyan bg-cyan/10",
  emerald: "text-emerald bg-emerald/10",
  amber: "text-amber bg-amber/10",
  violet: "text-violet bg-violet/10",
  rose: "text-rose bg-rose/10",
};

export function StatCard({
  label,
  value,
  suffix,
  decimals,
  delta,
  icon: Icon,
  tone = "primary",
  index = 0,
}: {
  label: string;
  value: number;
  suffix?: string | undefined;
  decimals?: number | undefined;
  delta?: number | undefined;
  icon: LucideIcon;
  tone?: StatTone | undefined;
  index?: number | undefined;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface lift group relative overflow-hidden p-5"
    >
      <div className="absolute -right-10 -top-10 size-28 rounded-full bg-[image:var(--gradient-brand)] opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-20" />
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("grid size-9 place-items-center rounded-xl", toneMap[tone])}>
          <Icon className="size-[18px]" />
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        <CountUp value={value} suffix={suffix} decimals={decimals} />
      </div>
      {delta !== undefined && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
              positive ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
