import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2.6c-3.9 0-7 2.9-7 6.6 0 1.9.9 3.6 2.3 4.8v2.3c0 .6.7 1 1.2.6l1.4-1c.7.2 1.4.3 2.1.3 3.9 0 7-2.9 7-6.6s-3.1-7-7-7Z"
          opacity=".92"
        />
        <path
          fill="currentColor"
          d="M8.6 8.4h1.5l1.3 3 1.3-3h1.5l-2.1 4.7h-1.4L8.6 8.4Z"
          opacity=".55"
        />
        <circle cx="18.2" cy="17.8" r="3.4" fill="currentColor" opacity=".6" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  collapsed = false,
}: {
  className?: string;
  collapsed?: boolean;
}) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!collapsed && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-tight text-foreground">
            MeetMind <span className="text-gradient">AI</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Meeting Intelligence
          </span>
        </span>
      )}
    </Link>
  );
}
