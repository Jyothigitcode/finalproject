import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileText, Filter, Mail, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, meetings } from "@/lib/mock-data";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — MeetMind AI" },
      {
        name: "description",
        content: "Generate and export branded meeting reports as PDF, DOCX or email digests.",
      },
      { property: "og:title", content: "Reports — MeetMind AI" },
      { property: "og:description", content: "Executive-ready meeting reports in one click." },
    ],
  }),
  component: ReportsPage,
});

const templates = [
  { name: "Executive summary", desc: "One page, decisions and risks only.", tone: "primary" },
  { name: "Full meeting report", desc: "Transcript, summary, actions, sentiment.", tone: "cyan" },
  { name: "Weekly digest", desc: "Everything from the last 7 days.", tone: "emerald" },
  { name: "Client-ready recap", desc: "Branded, no internal notes.", tone: "amber" },
];

function ReportsPage() {
  const featured = meetings[0]!;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate polished recaps and share them with your stakeholders.
          </p>
        </div>
        <Button variant="hero" className="shrink-0" onClick={() => toast.success("Report queued")}>
          <Sparkles className="size-4" /> Generate report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((t, i) => (
          <motion.button
            key={t.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => toast.success(`${t.name} template selected`)}
            className="surface lift p-5 text-left"
          >
            <span
              className={`grid size-10 place-items-center rounded-xl bg-${t.tone}/10 text-${t.tone}`}
            >
              <FileText className="size-[18px]" />
            </span>
            <h3 className="mt-3 text-sm font-semibold text-foreground">{t.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="surface p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant="secondary">Preview</Badge>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                {featured.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatDate(featured.date)} · {featured.duration} · {featured.platform}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon-sm" aria-label="Share">
                <Share2 className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Email">
                <Mail className="size-4" />
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={() => toast.success("Downloading PDF…")}
              >
                <Download className="size-4" /> PDF
              </Button>
            </div>
          </div>

          <Tabs defaultValue="summary" className="mt-6">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="decisions">Decisions</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Sentiment", featured.sentiment],
                  ["Language", featured.language],
                  ["Participants", String(featured.participants.length)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{v}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="decisions" className="space-y-2 pt-4">
              {featured.decisions.map((d) => (
                <div key={d} className="rounded-xl border border-border bg-muted/30 p-3 text-sm">
                  {d}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="actions" className="space-y-2 pt-4">
              {featured.actionItems.map((a) => (
                <div
                  key={a.task}
                  className="flex items-center justify-between rounded-xl border border-border p-3 text-sm"
                >
                  <span className="text-foreground">{a.task}</span>
                  <span className="text-xs text-muted-foreground">
                    {a.owner} · {a.due}
                  </span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="surface p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Recent exports</h3>
            <Button variant="ghost" size="icon-sm" aria-label="Filter">
              <Filter className="size-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {meetings.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-muted/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{m.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    PDF · {formatDate(m.date)}
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm" aria-label="Download">
                  <Download className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
