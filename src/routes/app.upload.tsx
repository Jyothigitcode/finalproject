import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileAudio,
  FileVideo,
  Languages,
  Link2,
  Loader2,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/upload")({
  head: () => ({
    meta: [
      { title: "Upload a recording — MeetMind AI" },
      {
        name: "description",
        content: "Upload audio or video, or paste a meeting link, and let AI do the rest.",
      },
      { property: "og:title", content: "Upload a recording — MeetMind AI" },
      { property: "og:description", content: "Drag, drop and analyze any meeting recording." },
    ],
  }),
  component: UploadPage,
});

type Job = { name: string; size: string; progress: number; kind: "audio" | "video" };

const stages = ["Uploading", "Transcribing", "Translating", "Summarizing", "Ready"];

function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    { name: "q3-roadmap-review.mp4", size: "412 MB", progress: 100, kind: "video" },
    { name: "customer-sync.m4a", size: "68 MB", progress: 62, kind: "audio" },
  ]);
  const [stage, setStage] = useState(2);

  const addDemo = () => {
    setJobs((j) => [
      { name: `recording-${j.length + 1}.mp4`, size: "184 MB", progress: 8, kind: "video" },
      ...j,
    ]);
    toast.success("Upload started");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">New analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a recording or connect a live meeting link. Processing usually takes 2–4 minutes.
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">
            <UploadCloud className="size-4" /> Upload file
          </TabsTrigger>
          <TabsTrigger value="link">
            <Link2 className="size-4" /> From link
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="pt-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addDemo();
            }}
            className={`surface grid place-items-center gap-4 border-2 border-dashed p-14 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <motion.span
              animate={{ y: dragging ? -6 : 0 }}
              className="grid size-16 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              <UploadCloud className="size-7" />
            </motion.span>
            <div>
              <p className="text-base font-semibold text-foreground">
                Drop your recording here
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                MP4, MOV, MP3, WAV or M4A · up to 5 GB
              </p>
            </div>
            <Button variant="hero" onClick={addDemo}>
              Browse files
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="link" className="pt-4">
          <div className="surface space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="url">Meeting or recording URL</Label>
              <Input
                id="url"
                placeholder="https://zoom.us/rec/share/…"
                className="h-11 rounded-xl"
              />
            </div>
            <Button variant="hero" onClick={() => toast.success("Fetching recording…")}>
              <Sparkles className="size-4" /> Analyze link
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface space-y-5 p-5">
          <h3 className="text-sm font-semibold text-foreground">Analysis options</h3>
          <div className="space-y-2">
            <Label>Source language</Label>
            <Select defaultValue="auto">
              <SelectTrigger className="h-10 rounded-xl">
                <Languages className="size-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {[
            ["Speaker diarization", "Identify who said what", true],
            ["Translate to English", "Add a parallel translation", true],
            ["Generate action items", "Extract owners and due dates", true],
            ["Sentiment analysis", "Track tone across the call", false],
          ].map(([title, desc, on]) => (
            <label key={title as string} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{title as string}</p>
                <p className="text-xs text-muted-foreground">{desc as string}</p>
              </div>
              <Switch defaultChecked={on as boolean} />
            </label>
          ))}
        </div>

        <div className="surface space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Queue</h3>
            <span className="text-xs text-muted-foreground">{jobs.length} items</span>
          </div>

          <div className="flex items-center gap-1.5">
            {stages.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-1.5 rounded-full ${i <= stage ? "bg-[image:var(--gradient-brand)]" : "bg-muted"}`}
                />
                <p
                  className={`mt-1.5 text-[10px] ${i <= stage ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>
          <Button variant="soft" size="sm" onClick={() => setStage((s) => (s + 1) % stages.length)}>
            <Loader2 className="size-3.5 animate-spin" /> Simulate next stage
          </Button>

          <AnimatePresence initial={false}>
            {jobs.map((job) => (
              <motion.div
                key={job.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    {job.kind === "video" ? (
                      <FileVideo className="size-4" />
                    ) : (
                      <FileAudio className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{job.name}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Progress value={job.progress} className="h-1.5" />
                      <span className="w-10 shrink-0 text-right text-[11px] text-muted-foreground">
                        {job.progress}%
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{job.size}</p>
                  </div>
                  {job.progress === 100 ? (
                    <CheckCircle2 className="size-4 shrink-0 text-emerald" />
                  ) : (
                    <button
                      onClick={() => setJobs((j) => j.filter((x) => x.name !== job.name))}
                      aria-label="Cancel upload"
                      className="text-muted-foreground hover:text-rose"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
