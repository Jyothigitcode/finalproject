export type Meeting = {
  id: string;
  title: string;
  platform: "Zoom" | "Google Meet" | "Microsoft Teams" | "Webinar";
  date: string;
  duration: string;
  durationMinutes: number;
  language: string;
  participants: string[];
  status: "Processed" | "Processing" | "Queued";
  sentiment: "Positive" | "Neutral" | "Mixed";
  summary: string;
  keywords: string[];
  actionItems: { task: string; owner: string; due: string; done: boolean }[];
  decisions: string[];
  points: string[];
  transcript: { time: string; speaker: string; text: string }[];
};

export const meetings: Meeting[] = [
  {
    id: "mm-1042",
    title: "Q3 Product Roadmap Review",
    platform: "Zoom",
    date: "2026-07-29T10:00:00Z",
    duration: "58m",
    durationMinutes: 58,
    language: "English",
    participants: ["Aarav Mehta", "Lena Fischer", "Chris Okafor", "Yuki Tanaka"],
    status: "Processed",
    sentiment: "Positive",
    summary:
      "The team aligned on the Q3 roadmap, prioritising multilingual transcription quality and the new insights API. Engineering committed to a beta on August 18, while design will deliver the reporting refresh by August 5. Budget for GPU capacity was approved with a 12% increase.",
    keywords: ["roadmap", "multilingual", "insights API", "beta", "GPU budget"],
    actionItems: [
      { task: "Ship multilingual ASR beta", owner: "Chris Okafor", due: "Aug 18", done: false },
      { task: "Deliver reporting UI refresh", owner: "Lena Fischer", due: "Aug 5", done: true },
      { task: "Finalise GPU capacity contract", owner: "Aarav Mehta", due: "Aug 2", done: false },
    ],
    decisions: [
      "Multilingual ASR becomes the top Q3 priority.",
      "Insights API moves to private beta with 20 design partners.",
      "GPU budget increased by 12% for the quarter.",
    ],
    points: [
      "Transcription accuracy for Hindi and Telugu improved to 94.2%.",
      "Enterprise customers want speaker-level analytics in reports.",
      "Support load dropped 18% after the summary redesign.",
    ],
    transcript: [
      {
        time: "00:00:12",
        speaker: "Aarav Mehta",
        text: "Thanks everyone for joining. Let's start with where we landed on the roadmap themes.",
      },
      {
        time: "00:01:04",
        speaker: "Lena Fischer",
        text: "Design has the reporting refresh at 80%. I can have the final screens by August 5.",
      },
      {
        time: "00:02:38",
        speaker: "Chris Okafor",
        text: "Multilingual accuracy is now at 94.2% for Hindi and Telugu. Beta on the 18th is realistic.",
      },
      {
        time: "00:04:21",
        speaker: "Yuki Tanaka",
        text: "Enterprise accounts keep asking for speaker-level analytics inside the exported PDF.",
      },
      {
        time: "00:06:02",
        speaker: "Aarav Mehta",
        text: "Agreed. Let's approve the 12% GPU budget bump so we don't bottleneck the beta.",
      },
    ],
  },
  {
    id: "mm-1041",
    title: "Customer Success Weekly Sync",
    platform: "Microsoft Teams",
    date: "2026-07-28T14:30:00Z",
    duration: "42m",
    durationMinutes: 42,
    language: "English",
    participants: ["Priya Nair", "Tom Weller", "Sofia Alvarez"],
    status: "Processed",
    sentiment: "Neutral",
    summary:
      "Churn risk accounts were reviewed. Two enterprise renewals need executive sponsorship this week, and onboarding time dropped from 12 to 7 days after the guided setup launch.",
    keywords: ["churn", "renewals", "onboarding", "NPS"],
    actionItems: [
      { task: "Schedule exec sponsor call with Northwind", owner: "Priya Nair", due: "Jul 31", done: false },
      { task: "Publish onboarding playbook v2", owner: "Tom Weller", due: "Aug 4", done: false },
    ],
    decisions: ["Guided setup becomes the default for all new workspaces."],
    points: [
      "NPS rose from 41 to 52 quarter over quarter.",
      "Two enterprise renewals flagged as at-risk.",
    ],
    transcript: [
      { time: "00:00:20", speaker: "Priya Nair", text: "Let's begin with the at-risk renewal list." },
      { time: "00:03:11", speaker: "Tom Weller", text: "Onboarding time is down to seven days on average." },
      { time: "00:05:45", speaker: "Sofia Alvarez", text: "NPS moved from 41 to 52 this quarter." },
    ],
  },
  {
    id: "mm-1040",
    title: "Design Critique — Reports 2.0",
    platform: "Google Meet",
    date: "2026-07-27T09:00:00Z",
    duration: "35m",
    durationMinutes: 35,
    language: "English",
    participants: ["Lena Fischer", "Marco Bianchi", "Ana Duarte"],
    status: "Processed",
    sentiment: "Positive",
    summary:
      "Reports 2.0 direction approved with a cleaner executive summary and inline charts. Print styles need work before launch.",
    keywords: ["reports", "critique", "print", "charts"],
    actionItems: [
      { task: "Fix print stylesheet spacing", owner: "Marco Bianchi", due: "Aug 1", done: true },
    ],
    decisions: ["Executive summary moves to the top of every report."],
    points: ["Inline charts tested well with 8 of 9 users."],
    transcript: [
      { time: "00:00:15", speaker: "Lena Fischer", text: "Walking through the new report layout." },
      { time: "00:02:50", speaker: "Ana Duarte", text: "Eight of nine users found the inline charts clearer." },
    ],
  },
  {
    id: "mm-1039",
    title: "Multilingual Webinar — APAC Launch",
    platform: "Webinar",
    date: "2026-07-25T06:00:00Z",
    duration: "1h 12m",
    durationMinutes: 72,
    language: "Japanese",
    participants: ["Yuki Tanaka", "Hiro Sato", "Mei Lin", "Guests (214)"],
    status: "Processing",
    sentiment: "Positive",
    summary:
      "APAC launch webinar with 214 attendees. Live translation ran in Japanese, Telugu and Mandarin with a 1.4 second delay.",
    keywords: ["APAC", "launch", "translation", "webinar"],
    actionItems: [
      { task: "Send localized recap email to attendees", owner: "Mei Lin", due: "Jul 30", done: false },
    ],
    decisions: ["Launch APAC pricing tier in September."],
    points: ["214 live attendees, 63% stayed for the full session."],
    transcript: [
      { time: "00:00:30", speaker: "Yuki Tanaka", text: "Welcome to the APAC launch of MeetMind AI." },
    ],
  },
  {
    id: "mm-1038",
    title: "Engineering Standup",
    platform: "Zoom",
    date: "2026-07-24T08:15:00Z",
    duration: "18m",
    durationMinutes: 18,
    language: "English",
    participants: ["Chris Okafor", "Ravi Kumar", "Elena Petrova"],
    status: "Queued",
    sentiment: "Mixed",
    summary: "Standup covering the streaming pipeline regression and diarization improvements.",
    keywords: ["standup", "pipeline", "diarization"],
    actionItems: [
      { task: "Patch streaming pipeline regression", owner: "Ravi Kumar", due: "Jul 25", done: true },
    ],
    decisions: ["Roll back the v3 diarization model until latency is fixed."],
    points: ["Latency spiked to 4.2s on long recordings."],
    transcript: [
      { time: "00:00:10", speaker: "Chris Okafor", text: "Quick standup, let's keep it to fifteen." },
    ],
  },
];

export const activityData = [
  { month: "Feb", meetings: 32, hours: 41 },
  { month: "Mar", meetings: 48, hours: 66 },
  { month: "Apr", meetings: 41, hours: 55 },
  { month: "May", meetings: 63, hours: 88 },
  { month: "Jun", meetings: 72, hours: 101 },
  { month: "Jul", meetings: 86, hours: 124 },
];

export const languageData = [
  { name: "English", value: 52, key: "en" },
  { name: "Hindi", value: 18, key: "hi" },
  { name: "Telugu", value: 12, key: "te" },
  { name: "Japanese", value: 10, key: "ja" },
  { name: "Spanish", value: 8, key: "es" },
];

export const productivityData = [
  { day: "Mon", focus: 62, actions: 12 },
  { day: "Tue", focus: 74, actions: 18 },
  { day: "Wed", focus: 58, actions: 9 },
  { day: "Thu", focus: 81, actions: 22 },
  { day: "Fri", focus: 69, actions: 15 },
  { day: "Sat", focus: 24, actions: 3 },
  { day: "Sun", focus: 18, actions: 2 },
];

export const speakerData = [
  { name: "Aarav Mehta", minutes: 312 },
  { name: "Lena Fischer", minutes: 268 },
  { name: "Chris Okafor", minutes: 241 },
  { name: "Priya Nair", minutes: 190 },
  { name: "Yuki Tanaka", minutes: 152 },
];

export const completionData = [
  { week: "W27", completed: 18, created: 26 },
  { week: "W28", completed: 24, created: 30 },
  { week: "W29", completed: 31, created: 34 },
  { week: "W30", completed: 29, created: 31 },
  { week: "W31", completed: 38, created: 40 },
];

export const upcoming = [
  { title: "Investor Update Call", time: "Today · 4:00 PM", platform: "Zoom" },
  { title: "Localization Review", time: "Tomorrow · 11:30 AM", platform: "Google Meet" },
  { title: "Sprint Planning", time: "Mon · 9:00 AM", platform: "Microsoft Teams" },
];

export const teamMembers = [
  { name: "Aarav Mehta", role: "Owner", email: "aarav@meetmind.ai", meetings: 128, status: "Active" },
  { name: "Lena Fischer", role: "Admin", email: "lena@meetmind.ai", meetings: 96, status: "Active" },
  { name: "Chris Okafor", role: "Member", email: "chris@meetmind.ai", meetings: 84, status: "Active" },
  { name: "Priya Nair", role: "Member", email: "priya@meetmind.ai", meetings: 61, status: "Away" },
  { name: "Yuki Tanaka", role: "Viewer", email: "yuki@meetmind.ai", meetings: 34, status: "Invited" },
];

export const notifications = [
  {
    title: "Q3 Product Roadmap Review is ready",
    body: "Summary, action items and translated transcript generated.",
    time: "2m ago",
    kind: "success" as const,
  },
  {
    title: "APAC Launch webinar is processing",
    body: "Translation stage 68% complete — about 4 minutes left.",
    time: "26m ago",
    kind: "info" as const,
  },
  {
    title: "3 action items due tomorrow",
    body: "Assigned across 2 meetings in the Product workspace.",
    time: "1h ago",
    kind: "warning" as const,
  },
  {
    title: "Lena Fischer shared a report",
    body: "Reports 2.0 critique — executive summary attached.",
    time: "Yesterday",
    kind: "info" as const,
  },
];

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
