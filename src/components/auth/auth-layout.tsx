import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SocialRow() {
  const providers = [
    {
      name: "Google",
      path: "M21.35 11.1H12v2.98h5.35c-.23 1.4-1.62 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.94s2.63-5.94 5.85-5.94c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.7 3.72 14.6 2.8 12 2.8 6.98 2.8 2.9 6.88 2.9 11.9S6.98 21 12 21c5.77 0 9.6-4.05 9.6-9.76 0-.65-.07-1.15-.25-1.64Z",
    },
    {
      name: "GitHub",
      path: "M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.68-.21.68-.47v-1.8c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.1-.65.35-1.09.63-1.34-2.21-.25-4.53-1.1-4.53-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.67-4.55 4.91.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.8 9.8 0 0 0 12 2.2Z",
    },
    {
      name: "Microsoft",
      path: "M3 3h8.5v8.5H3V3Zm9.5 0H21v8.5h-8.5V3ZM3 12.5h8.5V21H3v-8.5Zm9.5 0H21V21h-8.5v-8.5Z",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {providers.map((p) => (
        <Button key={p.name} variant="outline" className="h-11 gap-2 px-0" type="button">
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path fill="currentColor" d={p.path} />
          </svg>
          <span className="hidden text-xs sm:inline">{p.name}</span>
        </Button>
      ))}
    </div>
  );
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  backTo,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  backTo?: { label: string; to: string } | undefined;
}) {
  return (
    <div className="hero-glow relative min-h-screen overflow-hidden bg-background">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-10 size-80 rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-16 bottom-0 size-96 rounded-full bg-cyan/20 blur-3xl animate-blob [animation-delay:4s]" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Logo />
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-md text-4xl font-extrabold leading-tight tracking-tight text-foreground"
          >
            Every meeting, <span className="text-gradient">understood</span> in every language.
          </motion.h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Transcripts, summaries, decisions and action items — generated the moment your call
            ends.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="glass mt-10 max-w-md rounded-3xl p-6"
          >
            <Quote className="size-5 text-primary/50" />
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              “MeetMind replaced three tools and gave our distributed teams one shared record of
              what was actually decided.”
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-xs font-bold text-primary-foreground">
                CO
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">Chris Okafor</span>
                <span className="block text-xs text-muted-foreground">
                  Director of Engineering, Lumen Labs
                </span>
              </span>
              <span className="ml-auto flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-amber text-amber" />
                ))}
              </span>
            </div>
          </motion.div>

          <div className="mt-8 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald" /> SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-4 text-primary" /> 32 languages
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto w-full max-w-md rounded-3xl p-7 sm:p-9"
        >
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Logo />
            <ThemeToggle />
          </div>
          {backTo && (
            <Link
              to={backTo.to}
              className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> {backTo.label}
            </Link>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </motion.div>
      </div>

      <div className="absolute right-5 top-5 hidden lg:block">
        <ThemeToggle />
      </div>
    </div>
  );
}
