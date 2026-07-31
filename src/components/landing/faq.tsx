import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Which meeting platforms are supported?",
    a: "Zoom, Google Meet, Microsoft Teams, Webex, webinars and online classes. You can also upload MP4, MP3, WAV and M4A files directly, or connect your calendar so recordings import automatically.",
  },
  {
    q: "How accurate is the transcription?",
    a: "MeetMind AI averages 98.6% word accuracy on clean audio and 94%+ on noisy multi-speaker recordings, including Indian, European and East Asian accents.",
  },
  {
    q: "Which languages can it translate into?",
    a: "32 languages, including Hindi, Telugu, Tamil, Japanese, Mandarin, Spanish, French, German and Arabic. Summaries, action items and full transcripts can all be translated.",
  },
  {
    q: "Is my meeting data secure?",
    a: "All recordings are encrypted in transit and at rest with AES-256. Enterprise plans add SSO, custom retention windows, regional data residency and audit logs.",
  },
  {
    q: "Can I export reports?",
    a: "Yes. Every meeting can be exported as a branded PDF or DOCX, copied as markdown, or shared as a live link with granular permissions.",
  },
  {
    q: "Do you offer a free plan?",
    a: "Starter is free forever with 5 meetings per month. Pro includes a 14-day trial and no credit card is required to begin.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="surface overflow-hidden border-b px-5"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
