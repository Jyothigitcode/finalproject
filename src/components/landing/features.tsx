import { motion } from "framer-motion";
import {
  AudioLines,
  BarChart3,
  FileSearch,
  FileText,
  Languages,
  ListChecks,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: AudioLines,
    title: "AI Speech Recognition",
    body: "Studio-grade ASR with noise suppression and 98.6% accuracy across accents and platforms.",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Meeting Summaries",
    body: "Executive summaries written in seconds, tuned to your team's tone and terminology.",
    tone: "text-cyan bg-cyan/10",
  },
  {
    icon: ListChecks,
    title: "Action Items",
    body: "Tasks, owners and due dates extracted automatically and synced to your tracker.",
    tone: "text-emerald bg-emerald/10",
  },
  {
    icon: ScrollText,
    title: "Decision Extraction",
    body: "Every decision captured with the context and the moment it was made.",
    tone: "text-amber bg-amber/10",
  },
  {
    icon: Users,
    title: "Speaker Identification",
    body: "Diarization that names who said what, with talk-time balance per participant.",
    tone: "text-violet bg-violet/10",
  },
  {
    icon: Languages,
    title: "Multilingual Translation",
    body: "Transcripts and summaries in 32 languages including Hindi, Telugu and Japanese.",
    tone: "text-rose bg-rose/10",
  },
  {
    icon: FileSearch,
    title: "Transcript Search",
    body: "Semantic search across every meeting you've ever recorded — answers, not keywords.",
    tone: "text-primary bg-primary/10",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    body: "Board-ready reports with charts, timelines and branding, exported in one click.",
    tone: "text-cyan bg-cyan/10",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    body: "Meeting load, sentiment trends and action completion across the whole organisation.",
    tone: "text-emerald bg-emerald/10",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Platform
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything your meetings should have done for you
          </h2>
          <p className="mt-4 text-muted-foreground">
            One pipeline turns raw recordings into transcripts, decisions, tasks, translations and
            reports — automatically.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="surface lift group relative overflow-hidden p-6"
            >
              <span className={`grid size-11 place-items-center rounded-2xl ${f.tone}`}>
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[image:var(--gradient-brand)] opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
