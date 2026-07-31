import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Filter, LayoutGrid, List, Search, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, initials, meetings } from "@/lib/mock-data";

export const Route = createFileRoute("/app/meetings/")({
  head: () => ({
    meta: [
      { title: "Meetings — MeetMind AI" },
      { name: "description", content: "Browse, filter and search every analyzed meeting." },
      { property: "og:title", content: "Meetings — MeetMind AI" },
      { property: "og:description", content: "All your transcribed and summarized meetings." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      meetings.filter(
        (m) =>
          (status === "all" || m.status === status) &&
          (platform === "all" || m.platform === platform) &&
          (m.title.toLowerCase().includes(q.toLowerCase()) ||
            m.keywords.some((k) => k.includes(q.toLowerCase()))),
      ),
    [q, status, platform],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">Meetings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} of {meetings.length} meetings
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-xl border border-border p-1">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      <div className="surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles and keywords…"
            className="h-10 rounded-xl pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-[150px] rounded-xl">
              <Filter className="size-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Processed">Processed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Queued">Queued</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="h-10 w-[160px] rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="Zoom">Zoom</SelectItem>
              <SelectItem value="Google Meet">Google Meet</SelectItem>
              <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface grid place-items-center gap-3 p-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
            <Video className="size-6" />
          </span>
          <p className="text-sm font-medium text-foreground">No meetings match your filters</p>
          <Button variant="outline" size="sm" onClick={() => { setQ(""); setStatus("all"); setPlatform("all"); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className={view === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/app/meetings/$id"
                params={{ id: m.id }}
                className="surface lift block h-full p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline">{m.platform}</Badge>
                  <Badge
                    className={
                      m.status === "Processed"
                        ? "bg-emerald/12 text-emerald"
                        : m.status === "Processing"
                          ? "bg-amber/12 text-amber"
                          : "bg-muted text-muted-foreground"
                    }
                  >
                    {m.status}
                  </Badge>
                </div>
                <h3 className="mt-3 line-clamp-1 text-base font-semibold text-foreground">
                  {m.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{m.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.keywords.slice(0, 3).map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex -space-x-2">
                    {m.participants.slice(0, 4).map((p) => (
                      <Avatar key={p} className="size-7 ring-2 ring-card">
                        <AvatarFallback className="bg-muted text-[10px] font-semibold">
                          {initials(p)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" /> {m.participants.length}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" /> {m.duration}
                    </span>
                    <span>{formatDate(m.date)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
