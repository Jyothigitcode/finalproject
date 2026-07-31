import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const groups = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  },
  { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "API reference", "Guides", "Community", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA", "Compliance"] },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/70 bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 size-56 rounded-full bg-cyan/25 blur-3xl" />
          <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stop taking notes. Start shipping decisions.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
            Join 1,200+ teams turning every meeting into a searchable, multilingual source of truth.
          </p>
          <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">
                Start Free <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/app">Explore the dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Intelligent multilingual meeting summarization &amp; insights platform.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <span
                  key={i}
                  className="grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <span className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 MeetMind AI. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
