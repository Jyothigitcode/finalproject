import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Languages,
  Lightbulb,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, initials, meetings, type Meeting } from "@/lib/mock-data";

export const Route = createFileRoute("/app/meetings/$id")({
  head: ({ params }) => {
    const m = meetings.find((x) => x.id === params.id);
    if (!m) {
      return {
        meta: [
          { title: "Meeting unavailable — MeetMind AI" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const t = `${m.title} — MeetMind AI`;
    return {
      meta: [
        { title: t },
        { name: "description", content: m.summary.slice(0, 155) },
        { property: "og:title", content: t },
        { property: "og:description", content: m.summary.slice(0, 155) },
      ],
    };
  },
  component: MeetingDetail,
});

function MeetingDetail() {
  const { id } = Route.useParams();
  const meeting = meetings.find((m) => m.id === id) as Meeting;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState([28]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link
        to="/app/meetings"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All meetings
      </Link>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{meeting.platform}</Badge>
            <Badge className="bg-emerald/12 text-emerald">{meeting.status}</Badge>
            <Badge variant="secondary">
              <Languages className="size-3" /> {meeting.language}
            </Badge>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {meeting.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(meeting.date)} · {meeting.duration} · {meeting.participants.length}{" "}
            participants
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Share link copied")}>
            <Share2 className="size-4" /> Share
          </Button>
          <Button variant="hero" size="sm" onClick={() => toast.success("Exporting PDF…")}>
            <Download className="size-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface overflow-hidden"
          >
            <div className="hero-glow relative grid aspect-video place-items-center bg-muted/40">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <button
                onClick={() => setPlaying((p) => !p)}
                className="relative grid size-20 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="size-8" />
                ) : (
                  <Play className="size-8 translate-x-0.5" />
                )}
              </button>
            </div>
            <div className="space-y-3 p-4">
              <Slider value={progress} onValueChange={setProgress} max={100} step={1} />
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" aria-label="Back 15 seconds">
                  <SkipBack className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label="Play or pause"
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Forward 15 seconds">
                  <SkipForward className="size-4" />
                </Button>
                <span className="text-xs tabular-nums text-muted-foreground">
                  00:16:24 / {meeting.duration}
                </span>
                <Volume2 className="ml-auto size-4 text-muted-foreground" />
              </div>
            </div>
          </motion.div>

          <div className="surface p-5">
            <Tabs defaultValue="summary">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="points" className="flex-1">
                  Key points
                </TabsTrigger>
                <TabsTrigger value="decisions" className="flex-1">
                  Decisions
                </TabsTrigger>
                <TabsTrigger value="actions" className="flex-1">
                  Actions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{meeting.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {meeting.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="points" className="space-y-3 pt-4">
                {meeting.points.map((p) => (
                  <div key={p} className="flex gap-2.5">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber" />
                    <p className="text-sm text-muted-foreground">{p}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="decisions" className="space-y-3 pt-4">
                {meeting.decisions.map((d) => (
                  <div key={d} className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-sm text-foreground">{d}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="actions" className="space-y-3 pt-4">
                {meeting.actionItems.map((a) => (
                  <div key={a.task} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`mt-0.5 size-4 shrink-0 ${a.done ? "text-emerald" : "text-muted-foreground/40"}`}
                    />
                    <div>
                      <p
                        className={`text-sm ${a.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {a.task}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.owner} · due {a.due}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface flex max-h-[560px] flex-col p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Transcript</h3>
              <Badge variant="secondary">{meeting.language}</Badge>
            </div>
            <div className="mt-4 space-y-4 overflow-y-auto pr-1">
              {meeting.transcript.map((t, i) => (
                <motion.div
                  key={t.time}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3"
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="bg-muted text-[10px] font-semibold">
                      {initials(t.speaker)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-foreground">{t.speaker}</span>
                      <span className="tabular-nums text-muted-foreground">{t.time}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="surface p-5">
            <h3 className="text-sm font-semibold text-foreground">Participants</h3>
            <div className="mt-3 space-y-3">
              {meeting.participants.map((p, i) => (
                <div key={p} className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-muted text-[10px] font-semibold">
                      {initials(p)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{p}</span>
                  <div className="w-24">
                    <Progress value={[86, 64, 48, 32][i] ?? 30} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Relative speaking time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
