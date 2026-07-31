import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MeetMind AI" },
      { name: "description", content: "Manage your MeetMind AI profile and preferences." },
      { property: "og:title", content: "Profile — MeetMind AI" },
      { property: "og:description", content: "Your account details and activity." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>

      <div className="surface flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-center">
        <Avatar className="size-20">
          <AvatarFallback className="bg-[image:var(--gradient-brand)] text-xl font-bold text-primary-foreground">
            AM
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-foreground">Aarav Mehta</h2>
          <p className="text-sm text-muted-foreground">aarav@meetmind.ai</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="secondary">Owner</Badge>
            <Badge className="bg-emerald/12 text-emerald">Pro trial</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Change photo
        </Button>
      </div>

      <div className="surface space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fn">Full name</Label>
            <Input id="fn" defaultValue="Aarav Mehta" className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Job title</Label>
            <Input id="role" defaultValue="Head of Product" className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={3}
            defaultValue="Building meeting intelligence for distributed teams."
            className="rounded-xl"
          />
        </div>
        <Button variant="hero" onClick={() => toast.success("Profile updated")}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
