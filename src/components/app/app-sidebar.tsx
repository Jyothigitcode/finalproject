import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronsLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Logo, LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mainNav, secondaryNav, type NavItem } from "./nav-items";
import { cn } from "@/lib/utils";

function NavLink({
  item,
  collapsed,
  onNavigate,
  active,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: (() => void) | undefined;
  active: boolean;
}) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[image:var(--gradient-brand)]"
        />
      )}
      <item.icon
        className={cn("size-[18px] shrink-0 transition-colors", active && "text-primary")}
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="ml-auto rounded-full bg-primary/12 px-1.5 py-0.5 text-[10px] font-bold text-primary">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function AppSidebar({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle?: (() => void) | undefined;
  onNavigate?: (() => void) | undefined;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.to || pathname === `${item.to}/` : pathname.startsWith(item.to);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {collapsed ? (
          <Link to="/">
            <LogoMark />
          </Link>
        ) : (
          <Logo />
        )}
        {onToggle && !collapsed && (
          <Button variant="ghost" size="icon-sm" onClick={onToggle} aria-label="Collapse sidebar">
            <ChevronsLeft className="size-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workspace
          </p>
        )}
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
            active={isActive(item)}
          />
        ))}

        {!collapsed && (
          <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Account
          </p>
        )}
        <div className={cn(collapsed && "mt-4 border-t border-sidebar-border pt-4")}>
          {secondaryNav.map((item) => (
            <NavLink
              key={item.to}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
              active={isActive(item)}
            />
          ))}
        </div>
      </nav>

      {collapsed ? (
        <div className="p-3">
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              aria-label="Expand sidebar"
              className="w-full"
            >
              <ChevronsLeft className="size-4 rotate-180" />
            </Button>
          )}
        </div>
      ) : (
        <div className="m-3 rounded-2xl border border-sidebar-border bg-[image:var(--gradient-brand)] p-[1px]">
          <div className="rounded-[15px] bg-sidebar p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="size-4 text-primary" /> Pro trial
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              218 of 500 AI minutes used this month.
            </p>
            <Progress value={44} className="mt-3 h-1.5" />
            <Button variant="hero" size="sm" className="mt-3 w-full">
              Upgrade plan
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
