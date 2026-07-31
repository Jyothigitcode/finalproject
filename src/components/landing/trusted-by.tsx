export function TrustedBy() {
  const companies = [
    "Northwind",
    "Vertexa",
    "Lumen Labs",
    "Orbital",
    "Basecamp Nine",
    "Helios",
    "Kanso",
    "Fernway",
  ];
  const row = [...companies, ...companies];

  return (
    <section className="border-y border-border/70 bg-card/40 py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Trusted by product teams at
      </p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
