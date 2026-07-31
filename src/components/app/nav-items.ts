import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Sparkles,
  Upload,
  User,
  Users,
  Video,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  exact?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Dashboard", to: "/app", icon: LayoutDashboard, exact: true },
  { label: "Meetings", to: "/app/meetings", icon: Video, badge: "5" },
  { label: "Upload", to: "/app/upload", icon: Upload },
  { label: "AI Chat", to: "/app/chat", icon: MessageSquareText },
  { label: "Reports", to: "/app/reports", icon: FileText },
  { label: "Analytics", to: "/app/analytics", icon: BarChart3 },
  { label: "Team", to: "/app/team", icon: Users },
];

export const secondaryNav: NavItem[] = [
  { label: "Notifications", to: "/app/notifications", icon: Bell, badge: "4" },
  { label: "Profile", to: "/app/profile", icon: User },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

export const processingNav: NavItem = {
  label: "Processing",
  to: "/app/processing",
  icon: Sparkles,
};
