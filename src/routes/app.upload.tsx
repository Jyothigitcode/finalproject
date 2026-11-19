import { useRef, useState } from "react";
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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const Route = createFileRoute("/app/upload")({
  head: () => ({
    meta: [
      { title: "Upload a recording — MeetMind AI" },
      {
        name: "description",
        content:
          "Upload audio or video, or paste a meeting link, and let AI do the rest.",
      },
      {
        property: "og:title",
        content: "Upload a recording — MeetMind AI",
      },
      {
        property: "og:description",
        content: "Drag, drop and analyze any meeting recording.",
      },
    ],
  }),
  component: UploadPage,
});

type Job = {
  name: string;
  size: string;
  progress: number;
  kind: "audio" | "video";
  status: "uploading" | "processing" | "completed" | "failed";
};

const stages = [
  "Uploading",
  "Transcribing",
  "Translating",
  "Summarizing",
  "Ready",
];

const API_URL = "http://localhost:8080/api/meetings/upload";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileKind(file: File): "audio" | "video" {
  if (file.type.startsWith("video/")) {
    return "video";
  }

  return "audio";
}

function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);

  const [stage, setStage] = useState(0);

  const [processing, setProcessing] = useState(false);

  const [meetingTitle, setMeetingTitle] = useState("");

  const [result, setResult] = useState<any>(null);

  const [sourceLanguage, setSourceLanguage] = useState("auto");

  const [speakerDiarization, setSpeakerDiarization] = useState(true);

  const [translateToEnglish, setTranslateToEnglish] = useState(true);

  const [generateActions, setGenerateActions] = useState(true);

  const uploadFile = (file: File) => {
    const validTypes = [
      "audio/",
      "video/",
    ];

    const validExtensions =
      /\.(mp3|wav|m4a|aac|ogg|flac|mp4|mpeg|mpg|mov|avi|mkv|webm)$/i;

    const isValid =
      validTypes.some((type) => file.type.startsWith(type)) ||
      validExtensions.test(file.name);

    if (!isValid) {
      toast.error("Please select a valid audio or video file.");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("File is too large. Current backend limit is 100 MB.");
      return;
    }

    const title =
      meetingTitle.trim() ||
      file.name.replace(/\.[^/.]+$/, "");

    setMeetingTitle(title);

    const newJob: Job = {
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      kind: getFileKind(file),
      status: "uploading",
    };

    setJobs([newJob]);
    setStage(0);
    setProcessing(true);
    setResult(null);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", API_URL);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round(
          (event.loaded / event.total) * 100
        );

        setJobs((current) =>
          current.map((job) =>
            job.name === file.name
              ? {
                  ...job,
                  progress: percent,
                  status:
                    percent >= 100
                      ? "processing"
                      : "uploading",
                }
              : job
          )
        );

        if (percent >= 100) {
          setStage(1);
        }
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          setResult(data);

          setStage(4);

          setJobs((current) =>
            current.map((job) =>
              job.name === file.name
                ? {
                    ...job,
                    progress: 100,
                    status: "completed",
                  }
                : job
            )
          );

          toast.success("Meeting analyzed successfully!");
        } catch {
          toast.error("Invalid response received from backend.");
        }
      } else {
        let message = "Meeting processing failed.";

        try {
          const error = JSON.parse(xhr.responseText);
          message = error.message || error.error || message;
        } catch {
          // Ignore invalid error response
        }

        setJobs((current) =>
          current.map((job) =>
            job.name === file.name
              ? {
                  ...job,
                  status: "failed",
                }
              : job
          )
        );

        toast.error(message);
      }

      setProcessing(false);
    };

    xhr.onerror = () => {
      setProcessing(false);

      setJobs((current) =>
        current.map((job) =>
          job.name === file.name
            ? {
                ...job,
                status: "failed",
              }
            : job
        )
      );

      toast.error(
        "Cannot connect to MeetMind backend. Make sure Spring Boot is running on port 8080."
      );
    };

    xhr.send(formData);
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      uploadFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      uploadFile(file);
    }
  };

  const removeJob = () => {
    if (processing) return;

    setJobs([]);
    setResult(null);
    setStage(0);
  };

  const simulateStage = () => {
    if (!processing) return;

    setStage((current) =>
      Math.min(current + 1, stages.length - 1)
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          New analysis
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload a recording or connect a live meeting link.
          Processing usually takes 2–4 minutes.
        </p>
      </div>

      {/* UPLOAD TABS */}

      <Tabs defaultValue="upload">

        <TabsList>

          <TabsTrigger value="upload">
            <UploadCloud className="size-4" />
            Upload file
          </TabsTrigger>

          <TabsTrigger value="link">
            <Link2 className="size-4" />
            From link
          </TabsTrigger>

        </TabsList>

        <TabsContent
          value="upload"
          className="pt-4"
        >

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`surface grid place-items-center gap-4 border-2 border-dashed p-14 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >

            <motion.span
              animate={{
                y: dragging ? -6 : 0,
              }}
              className="grid size-16 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
            >
              <UploadCloud className="size-7" />
            </motion.span>

            <div>

              <p className="text-base font-semibold text-foreground">
                Drop your recording here
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                MP4, MOV, MP3, WAV or M4A · up to 100 MB
              </p>

            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*,video/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.mp4,.mpeg,.mpg,.mov,.avi,.mkv,.webm"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              variant="hero"
              disabled={processing}
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <UploadCloud className="size-4" />
              Browse files
            </Button>

          </div>

        </TabsContent>

        {/* LINK */}

        <TabsContent
          value="link"
          className="pt-4"
        >

          <div className="surface space-y-4 p-6">

            <div className="space-y-2">

              <Label htmlFor="url">
                Meeting or recording URL
              </Label>

              <Input
                id="url"
                placeholder="https://zoom.us/rec/share/..."
                className="h-11 rounded-xl"
              />

            </div>

            <Button
              variant="hero"
              onClick={() =>
                toast.info(
                  "URL analysis will be connected next."
                )
              }
            >
              <Sparkles className="size-4" />
              Analyze link
            </Button>

          </div>

        </TabsContent>

      </Tabs>

      {/* OPTIONS + QUEUE */}

      <div className="grid gap-4 md:grid-cols-2">

        {/* OPTIONS */}

        <div className="surface space-y-5 p-5">

          <h3 className="text-sm font-semibold text-foreground">
            Analysis options
          </h3>

          <div className="space-y-2">

            <Label>
              Meeting title
            </Label>

            <Input
              value={meetingTitle}
              onChange={(event) =>
                setMeetingTitle(event.target.value)
              }
              placeholder="Product Development Weekly Meeting"
              className="h-10 rounded-xl"
            />

          </div>

          <div className="space-y-2">

            <Label>
              Source language
            </Label>

            <Select
              value={sourceLanguage}
              onValueChange={setSourceLanguage}
            >

              <SelectTrigger className="h-10 rounded-xl">

                <Languages className="size-4" />

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="auto">
                  Auto-detect
                </SelectItem>

                <SelectItem value="en">
                  English
                </SelectItem>

                <SelectItem value="te">
                  Telugu
                </SelectItem>

                <SelectItem value="hi">
                  Hindi
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <label className="flex items-center gap-3">

            <div className="min-w-0 flex-1">

              <p className="text-sm font-medium text-foreground">
                Speaker diarization
              </p>

              <p className="text-xs text-muted-foreground">
                Identify who said what
              </p>

            </div>

            <Switch
              checked={speakerDiarization}
              onCheckedChange={setSpeakerDiarization}
            />

          </label>

          <label className="flex items-center gap-3">

            <div className="min-w-0 flex-1">

              <p className="text-sm font-medium text-foreground">
                Translate to English
              </p>

              <p className="text-xs text-muted-foreground">
                Add a parallel translation
              </p>

            </div>

            <Switch
              checked={translateToEnglish}
              onCheckedChange={setTranslateToEnglish}
            />

          </label>

          <label className="flex items-center gap-3">

            <div className="min-w-0 flex-1">

              <p className="text-sm font-medium text-foreground">
                Generate action items
              </p>

              <p className="text-xs text-muted-foreground">
                Extract owners and due dates
              </p>

            </div>

            <Switch
              checked={generateActions}
              onCheckedChange={setGenerateActions}
            />

          </label>

        </div>

        {/* QUEUE */}

        <div className="surface space-y-4 p-5">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold text-foreground">
              Queue
            </h3>

            <span className="text-xs text-muted-foreground">
              {jobs.length} items
            </span>

          </div>

          {/* PIPELINE */}

          <div className="flex items-center gap-1.5">

            {stages.map((s, i) => (

              <div
                key={s}
                className="flex-1"
              >

                <div
                  className={`h-1.5 rounded-full ${
                    i <= stage
                      ? "bg-[image:var(--gradient-brand)]"
                      : "bg-muted"
                  }`}
                />

                <p
                  className={`mt-1.5 text-[10px] ${
                    i <= stage
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {s}
                </p>

              </div>

            ))}

          </div>

          {processing && (

            <Button
              variant="soft"
              size="sm"
              onClick={simulateStage}
            >
              <Loader2 className="size-3.5 animate-spin" />
              Processing with AI...
            </Button>

          )}

          {/* JOBS */}

          <AnimatePresence initial={false}>

            {jobs.map((job) => (

              <motion.div
                key={job.name}
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
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

                    <p className="truncate text-sm font-medium text-foreground">
                      {job.name}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">

                      <Progress
                        value={job.progress}
                        className="h-1.5"
                      />

                      <span className="w-10 shrink-0 text-right text-[11px] text-muted-foreground">
                        {job.progress}%
                      </span>

                    </div>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {job.size}
                    </p>

                  </div>

                  {job.status === "completed" ? (

                    <CheckCircle2 className="size-4 shrink-0 text-emerald" />

                  ) : job.status === "processing" ? (

                    <Loader2 className="size-4 shrink-0 animate-spin text-primary" />

                  ) : (

                    <button
                      onClick={removeJob}
                      disabled={processing}
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

      {/* REAL RESULT */}

      {result && (

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="surface space-y-5 p-6"
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-foreground">
                AI Meeting Analysis
              </h2>

              <p className="text-sm text-muted-foreground">
                {result.title || meetingTitle}
              </p>

            </div>

            <CheckCircle2 className="size-6 text-emerald" />

          </div>

          {/* SUMMARY */}

          {result.summary && (

            <div className="space-y-2">

              <h3 className="text-sm font-semibold">
                Summary
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                {result.summary}
              </p>

            </div>

          )}

          {/* TRANSCRIPT */}

          {result.transcript && (

            <div className="space-y-2">

              <h3 className="text-sm font-semibold">
                Transcript
              </h3>

              <div className="max-h-60 overflow-y-auto rounded-xl bg-muted/40 p-4 text-sm leading-6">
                {result.transcript}
              </div>

            </div>

          )}

          {/* DECISIONS */}

          {result.keyDecisions && (

            <div className="space-y-2">

              <h3 className="text-sm font-semibold">
                Key Decisions
              </h3>

              <ul className="space-y-2">

                {(() => {

                  try {

                    const decisions =
                      typeof result.keyDecisions === "string"
                        ? JSON.parse(result.keyDecisions)
                        : result.keyDecisions;

                    return decisions.map(
                      (decision: string, index: number) => (

                        <li
                          key={index}
                          className="rounded-lg border border-border p-3 text-sm"
                        >
                          {decision}
                        </li>

                      )
                    );

                  } catch {

                    return (
                      <li className="text-sm text-muted-foreground">
                        {result.keyDecisions}
                      </li>
                    );

                  }

                })()}

              </ul>

            </div>

          )}

          {/* ACTION ITEMS */}

          {result.actionItems && (

            <div className="space-y-2">

              <h3 className="text-sm font-semibold">
                Action Items
              </h3>

              <div className="space-y-2">

                {(() => {

                  try {

                    const actions =
                      typeof result.actionItems === "string"
                        ? JSON.parse(result.actionItems)
                        : result.actionItems;

                    return actions.map(
                      (
                        action: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="rounded-xl border border-border p-3"
                        >

                          <p className="text-sm font-medium">
                            {action.task}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">

                            <span>
                              Owner: {action.owner || "Unassigned"}
                            </span>

                            <span>
                              Due: {action.dueDate || "Not specified"}
                            </span>

                            <span>
                              Priority: {action.priority || "MEDIUM"}
                            </span>

                          </div>

                        </div>

                      )
                    );

                  } catch {

                    return (
                      <p className="text-sm text-muted-foreground">
                        {result.actionItems}
                      </p>
                    );

                  }

                })()}

              </div>

            </div>

          )}

        </motion.div>

      )}

    </div>
  );
}