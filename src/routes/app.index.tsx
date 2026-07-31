import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Languages,
  Sparkles,
  Video,
} from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  activityData,
  formatDate,
  initials,
  languageData,
  meetings,
  upcoming,
} from "@/lib/mock-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MeetMind AI" },
      {
        name: "description",
        content: "Your meeting intelligence overview: activity, languages, actions and insights.",
      },
      { property: "og:title", content: "Dashboard — MeetMind AI" },
      { property: "og:description", content: "Meeting analytics and AI insights at a glance." },
    ],
  }),
  component: DashboardPage,
});

const pieColors = [
  "var(--primary)",
  "var(--cyan)",
  "var(--emerald)",
  "var(--amber)",
  "var(--rose)",
];

function ChartCard({
  title,
  subtitle,
  children,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface p-5 ${className ?? ""}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
  boxShadow: "var(--shadow-soft)",
};

function DashboardPage() {
  const actions = meetings.flatMap((m) =>
    m.actionItems.map((a) => ({ ...a, meeting: m.title, id: m.id })),
  );
  const done = actions.filter((a) => a.done).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between"
      >
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
            Good morning, Aarav
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have 3 meetings today and 5 action items due this week.
          </p>
        </div>
        <Button variant="hero" asChild className="shrink-0">
          <Link to="/app/upload">
            <Sparkles className="size-4" /> Analyze recording
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Meetings analyzed" value={342} delta={18} icon={Video} index={0} />
        <StatCard
          label="Hours saved"
          value={128.5}
          decimals={1}
          suffix="h"
          delta={12}
          icon={Clock}
          tone="cyan"
          index={1}
        />
        <StatCard
          label="Action items closed"
          value={91}
          suffix="%"
          delta={6}
          icon={CheckCircle2}
          tone="emerald"
          index={2}
        />
        <StatCard
          label="Languages detected"
          value={32}
          delta={-3}
          icon={Languages}
          tone="amber"
          index={3}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          title="Meeting activity"
          subtitle="Meetings processed and hours captured"
          className="lg:col-span-2"
          action={<Badge variant="secondary">Last 6 months</Badge>}
        >
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ left: -22, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="gMeetings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="meetings"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#gMeetings)"
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--cyan)"
                  strokeWidth={2.5}
                  fill="url(#gHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Languages" subtitle="Share of transcribed minutes">
          <div className="h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={54}
                  outerRadius={80}
                  paddingAngle={3}
                  stroke="none"
                >
                  {languageData.map((entry, i) => (
                    <Cell key={entry.key} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {languageData.map((l, i) => (
              <div key={l.key} className="flex items-center gap-2 text-xs">
                <span
                  className="size-2 rounded-full"
                  style={{ background: pieColors[i % pieColors.length] }}
                />
                <span className="text-muted-foreground">{l.name}</span>
                <span className="ml-auto font-semibold text-foreground">{l.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Recent meetings</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/meetings">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="space-y-2">
            {meetings.slice(0, 5).map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/app/meetings/$id"
                  params={{ id: m.id }}
                  className="flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Video className="size-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{m.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {formatDate(m.date)} · {m.duration} · {m.platform}
                    </p>
                  </div>
                  <div className="hidden -space-x-2 sm:flex">
                    {m.participants.slice(0, 3).map((p) => (
                      <Avatar key={p} className="size-7 ring-2 ring-card">
                        <AvatarFallback className="bg-muted text-[10px] font-semibold">
                          {initials(p)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Badge
                    variant={m.status === "Processed" ? "secondary" : "outline"}
                    className="shrink-0"
                  >
                    {m.status}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <CalendarClock className="size-4 text-primary" /> Upcoming
            </h3>
            <div className="space-y-3">
              {upcoming.map((u) => (
                <div key={u.title} className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[image:var(--gradient-brand)]" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{u.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.time} · {u.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Action items</h3>
              <span className="text-xs text-muted-foreground">
                {done}/{actions.length} done
              </span>
            </div>
            <Progress value={(done / actions.length) * 100} className="mt-3 h-1.5" />
            <div className="mt-4 space-y-3">
              {actions.slice(0, 4).map((a) => (
                <div key={a.task} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className={`mt-0.5 size-4 shrink-0 ${a.done ? "text-emerald" : "text-muted-foreground/40"}`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm ${a.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                    >
                      {a.task}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.owner} · due {a.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChartCard title="Weekly productivity" subtitle="Focus score and action items created">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...activityData]} margin={{ left: -22, right: 6, top: 6 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar dataKey="hours" radius={[8, 8, 0, 0]} fill="var(--primary)" />
              <Bar dataKey="meetings" radius={[8, 8, 0, 0]} fill="var(--cyan)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
