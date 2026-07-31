import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify your account — MeetMind AI" },
      { name: "description", content: "Enter the 6-digit verification code sent to your email." },
      { property: "og:title", content: "Verify your account — MeetMind AI" },
      { property: "og:description", content: "Two-factor verification for your workspace." },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(38);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      toast.error("Enter all 6 digits");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Verified — welcome to MeetMind AI");
      navigate({ to: "/app" });
    }, 900);
  };

  return (
    <AuthLayout
      title="Verify it's you"
      subtitle="We sent a 6-digit code to aarav@meetmind.ai. It expires in 10 minutes."
      backTo={{ label: "Back to sign in", to: "/login" }}
      footer={
        <>
          Wrong email?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Start over
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="size-12 rounded-xl border text-lg font-semibold"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Verifying…" : "Verify and continue"}
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          {seconds > 0 ? (
            <>Resend code in 0:{String(seconds).padStart(2, "0")}</>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSeconds(38);
                toast.success("New code sent");
              }}
              className="font-medium text-primary hover:underline"
            >
              Resend code
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-emerald" /> Protected by two-factor authentication
        </div>
      </form>
    </AuthLayout>
  );
}
