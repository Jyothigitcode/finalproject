import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    tagline: "For individuals testing the waters",
    features: [
      "5 meetings / month",
      "Transcription + summary",
      "2 languages",
      "7-day history",
      "Email support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    monthly: 24,
    yearly: 19,
    tagline: "For teams that meet every day",
    features: [
      "Unlimited meetings",
      "Action items & decisions",
      "32 languages + translation",
      "AI chat over transcripts",
      "PDF & DOCX reports",
      "Analytics dashboard",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthly: 68,
    yearly: 54,
    tagline: "For organisations with compliance needs",
    features: [
      "Everything in Pro",
      "SSO & SCIM provisioning",
      "Custom retention & residency",
      "API + webhooks",
      "Dedicated success manager",
      "99.9% uptime SLA",
    ],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple pricing that scales with your calendar
          </h2>
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-4 py-2 backdrop-blur">
            <span
              className={cn(
                "text-sm font-medium",
                !yearly ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Monthly
            </span>
            <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle billing" />
            <span
              className={cn(
                "text-sm font-medium",
                yearly ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Yearly
            </span>
            <span className="rounded-full bg-emerald/12 px-2 py-0.5 text-[11px] font-semibold text-emerald">
              Save 20%
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "surface lift relative flex flex-col p-7",
                p.highlight &&
                  "border-primary/40 shadow-[var(--shadow-lift)] lg:-mt-4 lg:mb-[-1rem]",
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                {p.highlight && <Sparkles className="size-4 text-primary" />}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  ${yearly ? p.yearly : p.monthly}
                </span>
                <span className="pb-1.5 text-sm text-muted-foreground">/user/month</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-emerald/12 p-0.5 text-emerald">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlight ? "hero" : "outline"}
                size="lg"
                asChild
                className="mt-7 w-full"
              >
                <Link to="/signup">{p.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
