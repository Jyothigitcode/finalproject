import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — MeetMind AI" },
      { name: "description", content: "Processing updates, reminders and workspace activity." },
      { property: "og:title", content: "Notifications — MeetMind AI" },
      { property: "og:description", content: "Stay on top of meeting activity." },
    ],
  }),
  component: NotificationsPage,
});

const icons = { success: CheckCircle2, info: Info, warning: TriangleAlert };
const tones = { success: "text-emerald bg-emerald/10", info: "text-cyan bg-cyan/10", warning: "text-amber bg-amber/10" };

function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{notifications.length} recent updates</p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          <Bell className="size-4" /> Mark all read
        </Button>
      </div>

      <div className="surface divide-y divide-border">
        {notifications.map((n) => {
          const Icon = icons[n.kind];
          return (
            <div key={n.title} className="flex gap-3 p-4">
              <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${tones[n.kind]}`}>
                <Icon className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
