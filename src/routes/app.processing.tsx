import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, FileVideo, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PIPELINE_STAGES, useJob } from "@/lib/store";
import { DEMO_MEETING_ID } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/processing")({
  head: () => ({
    meta: [
      { title: "Processing your meeting — MeetMind AI" },
      {
        name: "description",
        content:
          "Watch transcription, speaker detection, translation and AI summarization run in real time.",
      },
      { property: "og:title", content: "Processing your meeting — MeetMind AI" },
      { property: "og:description", content: "Live AI pipeline for your uploaded recording." },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  const navigate = useNavigate();
  const { job, update } = useJob();
  const [stage, setStage] = useState(0);
  const last = PIPELINE_STAGES.length - 1;

  useEffect(() => {
    if (stage >= last) return;
    const t = setTimeout(() => setStage((s) => Math.min(s + 1, last)), 1600);
    return () => clearTimeout(t);
  }, [stage, last]);

  useEffect(() => {
    if (job) update({ ...job, stage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const meetingId = job?.meetingId ?? DEMO_MEETING_ID;
  const complete = stage >= last;
  const pct = Math.round((stage / last) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {complete ? "Analysis complete" : "Analyzing your meeting"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {complete
            ? "Summary, decisions, action items and the Telugu translation are ready."
            : "Our multilingual pipeline is transcribing, translating and summarizing your recording."}
        </p>
      </div>

      <div className="surface space-y-5 p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <FileVideo className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {job?.fileName ?? "product-development-weekly.mp4"}
            </p>
            <p className="text-xs text-muted-foreground">{job?.size ?? "412 MB"} · English + Telugu</p>
          </div>
          <span className="text-sm font-semibold tabular-nums text-foreground">{pct}%</span>
        </div>
        <Progress value={pct} className="h-2" />

        <div className="space-y-3">
          {PIPELINE_STAGES.map((s, i) => {
            const isDone = i < stage || complete;
            const active = i === stage && !complete;
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3",
                  active ? "border-primary/40 bg-primary/5" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-xs",
                    isDone
                      ? "bg-emerald/15 text-emerald"
                      : active
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {isDone ? (
                    <Check className="size-4" />
                  ) : active ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    isDone || active ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s}
                </span>
                {isDone && <span className="ml-auto text-xs text-emerald">done</span>}
                {active && <span className="ml-auto text-xs text-primary">in progress…</span>}
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="hero" disabled={!complete} asChild={complete}>
            {complete ? (
              <Link to="/app/meetings/$id" params={{ id: meetingId }}>
                <Sparkles className="size-4" /> View meeting insights
              </Link>
            ) : (
              <span>
                <Loader2 className="size-4 animate-spin" /> Processing…
              </span>
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: "/app/upload" })}>
            Upload another
          </Button>
        </div>
      </div>
    </div>
  );
}
