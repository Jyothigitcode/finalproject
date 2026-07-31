import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  Languages,
  Sparkles,
} from "lucide-react";

const bars = [38, 62, 48, 74, 56, 88, 70, 96, 64, 82, 58, 90];

export function DashboardPreview() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-3 sm:p-4">
      <div className="flex items-center gap-1.5 px-2 pb-3">
        <span className="size-2.5 rounded-full bg-rose/70" />
        <span className="size-2.5 rounded-full bg-amber/70" />
        <span className="size-2.5 rounded-full bg-emerald/70" />
        <span className="ml-3 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          app.meetmind.ai/dashboard
        </span>
      </div>

      <div className="grid gap-3 rounded-2xl bg-card/70 p-3 sm:p-4 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Meetings", value: "342", icon: Activity, tone: "text-primary" },
              { label: "Hours", value: "1,284", icon: Clock, tone: "text-cyan" },
              { label: "Summaries", value: "318", icon: FileText, tone: "text-emerald" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-border/70 bg-background/60 p-2.5"
              >
                <s.icon className={`size-3.5 ${s.tone}`} />
                <div className="mt-1.5 text-base font-bold leading-none text-foreground sm:text-lg">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">Meeting activity</span>
              <span className="rounded-full bg-emerald/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald">
                +24%
              </span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 rounded-t-sm bg-[image:var(--gradient-brand)] opacity-80"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              AI Summary
            </div>
            <div className="mt-2.5 space-y-1.5">
              {[100, 88, 94, 62].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: `${w}%` }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  className="h-2 rounded-full bg-muted"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="text-xs font-semibold text-foreground">Action items</div>
            <div className="mt-2 space-y-2">
              {["Ship ASR beta", "Send recap email", "Approve GPU budget"].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.14 }}
                  className="flex items-center gap-2 text-[11px] text-muted-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-emerald" />
                  {t}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/60 p-3">
            <Languages className="size-4 text-cyan" />
            <span className="text-[11px] text-muted-foreground">
              Translated into <span className="font-semibold text-foreground">32 languages</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
