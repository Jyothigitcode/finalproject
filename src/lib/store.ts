import { useCallback, useEffect, useState } from "react";
import { DEMO_MEETING_ID } from "./mock-data";

export const PIPELINE_STAGES = [
  "Uploading media",
  "Transcribing speech",
  "Detecting speakers",
  "Translating (Telugu)",
  "Summarizing with AI",
  "Extracting action items",
  "Ready",
] as const;

export type Job = {
  id: string;
  fileName: string;
  size: string;
  meetingId: string;
  stage: number;
  startedAt: number;
};

const JOB_KEY = "meetmind.job";
const DONE_KEY = "meetmind.actionItems";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function startJob(fileName: string, size = "184 MB"): Job {
  const job: Job = {
    id: crypto.randomUUID(),
    fileName,
    size,
    meetingId: DEMO_MEETING_ID,
    stage: 0,
    startedAt: Date.now(),
  };
  write(JOB_KEY, job);
  return job;
}

export function useJob() {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    setJob(read<Job | null>(JOB_KEY, null));
  }, []);

  const update = useCallback((next: Job | null) => {
    setJob(next);
    if (next) write(JOB_KEY, next);
    else if (typeof window !== "undefined") window.localStorage.removeItem(JOB_KEY);
  }, []);

  return { job, update };
}

/** Persisted completion state for action items, keyed by action item id. */
export function useActionItemState(initial: Record<string, boolean>) {
  const [done, setDone] = useState<Record<string, boolean>>(initial);

  useEffect(() => {
    const stored = read<Record<string, boolean>>(DONE_KEY, {});
    setDone({ ...initial, ...stored });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const stored = read<Record<string, boolean>>(DONE_KEY, {});
      write(DONE_KEY, { ...stored, [id]: next[id] });
      return next;
    });
  }, []);

  return { done, toggle };
}
