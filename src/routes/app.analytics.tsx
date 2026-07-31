import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Clock, MessagesSquare, Target, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activityData, completionData, productivityData, speakerData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — MeetMind AI" },
      {
        name: "description",
        content: "Meeting trends, speaking balance, productivity and action-item completion.",
      },
      { property: "og:title", content: "Analytics — MeetMind AI" },
      { property: "og:description", content: "Deep insight into how your team meets." },
    ],
  }),
  component: AnalyticsPage,
});

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  fontSize: 12,
};

const axis = { fontSize: 12, fill: "var(--muted-foreground)" };

function Card({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface p-5 ${className ?? ""}`}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 h-[260px]">{children}</div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How your organisation meets, decides and follows through.
          </p>
        </div>
        <Select defaultValue="6m">
          <SelectTrigger className="h-10 w-[160px] shrink-0 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Avg. meeting length" value={42} suffix="m" delta={-8} icon={Clock} index={0} />
        <StatCard
          label="Talk-time balance"
          value={78}
          suffix="%"
          delta={5}
          icon={MessagesSquare}
          tone="cyan"
          index={1}
        />
        <StatCard
          label="Follow-through rate"
          value={91}
          suffix="%"
          delta={9}
          icon={Target}
          tone="emerald"
          index={2}
        />
        <StatCard
          label="Meeting load index"
          value={3.4}
          decimals={1}
          delta={-12}
          icon={TrendingUp}
          tone="violet"
          index={3}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Volume trend" subtitle="Meetings and hours captured monthly">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ left: -22, right: 6, top: 6 }}>
              <defs>
                <linearGradient id="aTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axis} />
              <YAxis tickLine={false} axisLine={false} tick={axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="var(--primary)"
                strokeWidth={2.5}
                fill="url(#aTrend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Speaking time" subtitle="Minutes per person across all meetings">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={speakerData} layout="vertical" margin={{ left: 26, right: 12 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={axis} />
              <YAxis
                type="category"
                dataKey="name"
                width={96}
                tickLine={false}
                axisLine={false}
                tick={axis}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar dataKey="minutes" radius={[0, 8, 8, 0]} fill="var(--cyan)" barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Action item completion" subtitle="Created vs. completed per week">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionData} margin={{ left: -22, right: 6, top: 6 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tick={axis} />
              <YAxis tickLine={false} axisLine={false} tick={axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="created"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--emerald)"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Weekly focus profile" subtitle="Focus score by day of week">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={productivityData} outerRadius="72%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="day" tick={axis} />
              <Radar
                dataKey="focus"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.25}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="surface p-5">
        <h3 className="text-sm font-semibold text-foreground">AI observations</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["Meetings are getting shorter", "Average length dropped 8% while decisions per meeting rose.", "emerald"],
            ["Thursday is your heaviest day", "81 focus score but 22 new action items — consider spreading load.", "amber"],
            ["Two voices dominate", "Aarav and Lena account for 46% of speaking time.", "cyan"],
          ].map(([title, body, tone]) => (
            <div key={title} className="rounded-2xl border border-border p-4">
              <Badge
                className={
                  tone === "emerald"
                    ? "bg-emerald/12 text-emerald"
                    : tone === "amber"
                      ? "bg-amber/12 text-amber"
                      : "bg-cyan/12 text-cyan"
                }
              >
                Insight
              </Badge>
              <p className="mt-2 text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
