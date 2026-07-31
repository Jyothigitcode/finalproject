import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { initials } from "@/lib/mock-data";

const testimonials = [
  {
    quote:
      "We cut our meeting follow-up work by 80%. The action items land in Jira before people leave the call.",
    name: "Priya Nair",
    role: "VP Customer Success, Northwind",
  },
  {
    quote:
      "The multilingual summaries are unreal. Our Tokyo and Hyderabad teams finally read the same document.",
    name: "Yuki Tanaka",
    role: "Head of APAC, Vertexa",
  },
  {
    quote:
      "It replaced three tools. Transcription, notes and reporting are one clean workflow now.",
    name: "Chris Okafor",
    role: "Director of Engineering, Lumen Labs",
  },
  {
    quote:
      "The reports go straight to our board deck. No editing, no reformatting, just download.",
    name: "Lena Fischer",
    role: "Chief of Staff, Orbital",
  },
  {
    quote: "Search across a year of calls answers questions faster than asking a person.",
    name: "Marco Bianchi",
    role: "Product Lead, Helios",
  },
  {
    quote: "Onboarding took ten minutes. Adoption across 400 people took a week.",
    name: "Sofia Alvarez",
    role: "COO, Fernway",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Customers
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by teams that live in meetings
          </h2>
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="surface lift mb-4 break-inside-avoid p-6"
            >
              <Quote className="size-5 text-primary/40" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-xs font-bold text-primary-foreground">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
                <span className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3 fill-amber text-amber" />
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
