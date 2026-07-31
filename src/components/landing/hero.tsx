import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./dashboard-preview";

const words = ["Transform", "Meetings", "into", "Actionable", "Insights"];

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-[8%] top-24 size-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-[6%] top-40 size-80 rounded-full bg-cyan/20 blur-3xl animate-blob [animation-delay:3s]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <Sparkles className="size-3.5 text-primary" />
          Multilingual meeting intelligence
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
            v3.0
          </span>
        </motion.div>

        <h1 className="mx-auto mt-7 max-w-4xl text-center text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={i >= 3 ? "text-gradient inline-block" : "inline-block"}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Upload meetings from Zoom, Google Meet, Microsoft Teams, webinars, and online classes.
          MeetMind AI automatically transcribes, summarizes, extracts action items, translates
          content, and generates professional meeting reports.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button variant="hero" size="xl" asChild className="w-full sm:w-auto">
            <Link to="/signup">
              Start Free <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="glass" size="xl" asChild className="w-full sm:w-auto">
            <Link to="/app/processing">
              <PlayCircle className="size-4" /> Watch Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-amber text-amber" />
            ))}
          </span>
          4.9/5 from 1,200+ teams · No credit card required
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 [perspective:1200px]"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
