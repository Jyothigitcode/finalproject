import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Mail, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — MeetMind AI" },
      { name: "description", content: "Request a secure reset link for your MeetMind AI account." },
      { property: "og:title", content: "Reset your password — MeetMind AI" },
      { property: "og:description", content: "We'll email you a secure reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Reset link sent");
    }, 900);
  };

  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Forgot your password?"}
      subtitle={
        sent
          ? "We sent a secure reset link to your email. It expires in 15 minutes."
          : "Enter the email tied to your workspace and we'll send a reset link."
      }
      backTo={{ label: "Back to sign in", to: "/login" }}
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-5 text-center"
        >
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald/12 text-emerald">
            <MailCheck className="size-7" />
          </span>
          <Button variant="hero" size="lg" className="w-full" onClick={() => navigate({ to: "/verify" })}>
            Enter verification code
          </Button>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Use a different email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
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
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
