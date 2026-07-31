import { createFileRoute } from "@tanstack/react-router";
import { Mail, MoreHorizontal, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials, teamMembers } from "@/lib/mock-data";

export const Route = createFileRoute("/app/team")({
  head: () => ({
    meta: [
      { title: "Team — MeetMind AI" },
      { name: "description", content: "Manage teammates, roles and workspace access." },
      { property: "og:title", content: "Team — MeetMind AI" },
      { property: "og:description", content: "Invite teammates and manage permissions." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">Team</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {teamMembers.length} members in the MeetMind workspace.
          </p>
        </div>
        <Button variant="hero" className="shrink-0" onClick={() => toast.success("Invite sent")}>
          <UserPlus className="size-4" /> Invite member
        </Button>
      </div>

      <div className="surface divide-y divide-border">
        {teamMembers.map((m) => (
          <div key={m.email} className="flex items-center gap-3 p-4">
            <Avatar className="size-10 shrink-0">
              <AvatarFallback className="bg-muted text-xs font-semibold">
                {initials(m.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
              <p className="truncate text-xs text-muted-foreground">{m.email}</p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              {m.meetings} meetings
            </span>
            <Badge variant="outline" className="shrink-0">
              {m.role}
            </Badge>
            <Badge
              className={
                m.status === "Active"
                  ? "hidden shrink-0 bg-emerald/12 text-emerald sm:inline-flex"
                  : m.status === "Away"
                    ? "hidden shrink-0 bg-amber/12 text-amber sm:inline-flex"
                    : "hidden shrink-0 bg-muted text-muted-foreground sm:inline-flex"
              }
            >
              {m.status}
            </Badge>
            <Button variant="ghost" size="icon-sm" aria-label="Email member">
              <Mail className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
