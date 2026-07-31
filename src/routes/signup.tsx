import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, Check, Loader2, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout, SocialRow } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — MeetMind AI" },
      {
        name: "description",
        content: "Start free with MeetMind AI and turn every meeting into actionable insights.",
      },
      { property: "og:title", content: "Create your account — MeetMind AI" },
      { property: "og:description", content: "Free forever plan, no credit card required." },
    ],
  }),
  component: SignupPage,
});

const perks = ["5 free meetings monthly", "32 languages", "No credit card"];

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const strength = Math.min(
    4,
    (password.length > 7 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/\d/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
  );
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created — verify your email");
      navigate({ to: "/verify" });
    }, 900);
  };

  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Free forever for small teams. Upgrade whenever you're ready."
      backTo={{ label: "Back to home", to: "/" }}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="name" required placeholder="Aarav Mehta" className="h-11 rounded-xl pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="company" placeholder="Northwind" className="h-11 rounded-xl pl-9" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="h-11 rounded-xl pl-9"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex flex-1 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < strength
                      ? strength <= 1
                        ? "bg-rose"
                        : strength === 2
                          ? "bg-amber"
                          : "bg-emerald"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="w-16 text-right text-[11px] text-muted-foreground">
              {labels[strength]}
            </span>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
          <Checkbox defaultChecked className="mt-0.5" />
          <span>
            I agree to the <span className="text-primary">Terms</span> and{" "}
            <span className="text-primary">Privacy Policy</span>.
          </span>
        </label>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </Button>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-1">
          {perks.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <Check className="size-3 text-emerald" /> {p}
            </span>
          ))}
        </div>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or sign up with</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <SocialRow />
    </AuthLayout>
  );
}
