import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { Features } from "@/components/landing/features";
import { Showcase } from "@/components/landing/showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { SiteFooter } from "@/components/landing/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeetMind AI — Turn Meetings into Actionable Insights" },
      {
        name: "description",
        content:
          "MeetMind AI transcribes, summarizes, translates and reports on meetings from Zoom, Google Meet and Teams in 32 languages.",
      },
      { property: "og:title", content: "MeetMind AI — Multilingual Meeting Intelligence" },
      {
        property: "og:description",
        content:
          "Automatic transcription, summaries, action items, translation and reports for every meeting.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Showcase />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
