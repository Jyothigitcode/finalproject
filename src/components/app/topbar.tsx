import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, PanelsTopLeft, Plus, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AppSidebar } from "./app-sidebar";
import { mainNav, secondaryNav } from "./nav-items";
import { meetings, notifications } from "@/lib/mock-data";
import { useNavigate } from "@tanstack/react-router";

export function AppTopbar() {
  const [openCommand, setOpenCommand] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current =
    [...mainNav, ...secondaryNav].find((i) =>
      i.exact ? pathname === i.to : pathname.startsWith(i.to),
    )?.label ?? "Dashboard";

  const go = (to: string) => {
    setOpenCommand(false);
    navigate({ to: to as string as never });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[264px] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden items-center gap-2 text-sm text-muted-foreground lg:flex">
        <PanelsTopLeft className="size-4" />
        <span>MeetMind</span>
        <span className="text-border">/</span>
        <span className="font-medium text-foreground">{current}</span>
      </div>

      <button
        onClick={() => setOpenCommand(true)}
        className="ml-auto flex h-10 w-full max-w-xs items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:ml-6 sm:mr-auto"
      >
        <Search className="size-4" />
        <span className="truncate">Search meetings, actions…</span>
        <kbd className="ml-auto hidden rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:block">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5">
        <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild>
          <Link to="/app/upload">
            <Plus className="size-4" /> New meeting
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="size-[18px]" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-rose ring-2 ring-background" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 3).map((n) => (
              <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5 py-2.5">
                <span className="text-sm font-medium text-foreground">{n.title}</span>
                <span className="text-xs text-muted-foreground">{n.body}</span>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/notifications" className="justify-center text-sm font-medium">
                View all
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 rounded-full ring-offset-background transition-opacity hover:opacity-85">
              <Avatar className="size-9">
                <AvatarFallback className="bg-[image:var(--gradient-brand)] text-xs font-bold text-primary-foreground">
                  AM
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>Aarav Mehta</span>
              <span className="text-xs font-normal text-muted-foreground">aarav@meetmind.ai</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => undefined}>
              <Sparkles className="size-4" /> Upgrade
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Search meetings, pages and actions…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {[...mainNav, ...secondaryNav].map((i) => (
              <CommandItem key={i.to} value={i.label} onSelect={() => go(i.to)}>
                <i.icon className="size-4" /> {i.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recent meetings">
            {meetings.slice(0, 4).map((m) => (
              <CommandItem key={m.id} value={m.title} onSelect={() => go(`/app/meetings/${m.id}`)}>
                {m.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
