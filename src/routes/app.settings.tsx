import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — MeetMind AI" },
      { name: "description", content: "Workspace, notification and AI processing preferences." },
      { property: "og:title", content: "Settings — MeetMind AI" },
      { property: "og:description", content: "Configure your MeetMind AI workspace." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  ["Email digests", "A weekly recap every Monday at 8am", true],
  ["Processing alerts", "Notify me when a meeting is ready", true],
  ["Action item reminders", "Ping owners 24h before due dates", true],
  ["Auto-translate", "Translate non-English meetings to English", false],
] as const;

function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>

      <div className="surface space-y-5 p-6">
        <h2 className="text-sm font-semibold text-foreground">Preferences</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Default language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Retention</Label>
            <Select defaultValue="12">
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="forever">Keep forever</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="surface divide-y divide-border p-2">
        {toggles.map(([title, desc, on]) => (
          <label key={title} className="flex items-center gap-4 p-4">
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">{title}</span>
              <span className="block text-xs text-muted-foreground">{desc}</span>
            </span>
            <Switch defaultChecked={on} />
          </label>
        ))}
      </div>

      <Button variant="hero" onClick={() => toast.success("Settings saved")}>
        Save settings
      </Button>
    </div>
  );
}
