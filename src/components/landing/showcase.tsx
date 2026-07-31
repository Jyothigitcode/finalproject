import { motion } from "framer-motion";
import { Check, MessageSquareText, Mic, Waypoints } from "lucide-react";

const shots = [
  {
    tag: "Transcript",
    title: "Speaker-aware transcripts you can actually read",
    body: "Timestamped, diarized and searchable. Jump to any moment, translate a single line, or quote it into a report.",
    icon: Mic,
    bullets: ["98.6% accuracy", "Speaker timeline", "Semantic search"],
  },
  {
    tag: "AI Chat",
    title: "Ask anything about any meeting",
    body: "Generate MOM, draft the follow-up email, create Jira tasks, or translate the whole summary into Telugu — in one prompt.",
    icon: MessageSquareText,
    bullets: ["Grounded answers", "Markdown output", "One-click exports"],
  },
  {
    tag: "Reports",
    title: "Reports that look like a consultant made them",
    body: "Executive summary, decisions, action items, participant timeline and charts, ready to download or share.",
    icon: Waypoints,
    bullets: ["PDF & DOCX", "Shareable links", "Custom branding"],
  },
];

function ShotVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="glass rounded-3xl p-5">
        {[
          { s: "Aarav Mehta", t: "00:01:04", text: "Let's lock the roadmap themes for Q3." },
          { s: "Lena Fischer", t: "00:02:18", text: "Reporting refresh lands on August 5." },
          { s: "Chris Okafor", t: "00:03:42", text: "Multilingual accuracy is now 94.2%." },
        ].map((l, i) => (
          <div key={i} className="flex gap-3 border-b border-border/60 py-3 last:border-0">
            <span className="mt-0.5 rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {l.t}
            </span>
            <div>
              <div className="text-xs font-semibold text-foreground">{l.s}</div>
              <p className="mt-1 text-sm text-muted-foreground">{l.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="glass space-y-3 rounded-3xl p-5">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
          Generate MOM and translate it to Telugu
        </div>
        <div className="max-w-[85%] space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Minutes of Meeting — Q3 Roadmap</p>
          <p>1. Multilingual ASR prioritised for Q3.</p>
          <p>2. Insights API enters private beta.</p>
          <p className="text-foreground/80">తెలుగు అనువాదం సిద్ధంగా ఉంది.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="glass rounded-3xl p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Executive summary
      </div>
      <div className="mt-3 space-y-2">
        {[100, 92, 78].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-muted" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {["Decisions", "Actions", "Topics"].map((t, i) => (
          <div key={t} className="rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="text-lg font-bold text-foreground">{[3, 7, 9][i]}</div>
            <div className="text-[10px] text-muted-foreground">{t}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-20 items-end gap-1.5">
        {[40, 66, 52, 84, 62, 92, 74].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-sm bg-[image:var(--gradient-brand)] opacity-75"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="product" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl space-y-24 px-5">
        {shots.map((s, i) => (
          <motion.div
            key={s.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                <s.icon className="size-3.5" />
                {s.tag}
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-md text-muted-foreground">{s.body}</p>
              <ul className="mt-6 space-y-2.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="grid size-5 place-items-center rounded-full bg-emerald/12 text-emerald">
                      <Check className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-float [animation-delay:var(--d)]" style={{ ["--d" as string]: `${i}s` }}>
              <ShotVisual index={i} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
