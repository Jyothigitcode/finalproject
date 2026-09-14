export type Priority = "High" | "Medium" | "Low";
export type TaskStatus = "Open" | "In progress" | "Done";

export type ActionItem = {
  id: string;
  task: string;
  owner: string;
  due: string;
  priority: Priority;
  status: TaskStatus;
  done: boolean;
};

export type Speaker = {
  name: string;
  role: string;
  minutes: number;
  sentiment: "Positive" | "Neutral" | "Mixed";
};

export type TranscriptLine = {
  time: string;
  speaker: string;
  text: string;
};

export type MeetingTranslation = {
  summary: string;
  points: string[];
  decisions: string[];
  actionItems: string[];
  transcript: string[];
};

export type Meeting = {
  id: string;
  title: string;
  platform: "Zoom" | "Google Meet" | "Microsoft Teams" | "Webinar";
  date: string;
  duration: string;
  durationMinutes: number;
  language: string;
  languages: string[];
  participants: string[];
  speakers: Speaker[];
  status: "Processed" | "Processing" | "Queued";
  sentiment: "Positive" | "Neutral" | "Mixed";
  sentimentScore: number;
  summary: string;
  keywords: string[];
  actionItems: ActionItem[];
  decisions: string[];
  points: string[];
  nextSteps: string[];
  transcript: TranscriptLine[];
  translations?: Record<string, MeetingTranslation>;
};

export const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
] as const;

const ai = (
  task: string,
  owner: string,
  due: string,
  priority: Priority,
  status: TaskStatus,
  id: string,
): ActionItem => ({ id, task, owner, due, priority, status, done: status === "Done" });

const demoMeeting: Meeting = {
  id: "mm-1050",
  title: "Product Development Weekly Meeting",
  platform: "Google Meet",
  date: "2026-09-11T10:00:00Z",
  duration: "48m",
  durationMinutes: 48,
  language: "English",
  languages: ["English", "Telugu"],
  participants: [
    "Aarav Mehta",
    "Lena Fischer",
    "Chris Okafor",
    "Priya Nair",
    "Yuki Tanaka",
    "Ravi Kumar",
  ],
  speakers: [
    { name: "Aarav Mehta", role: "Product Lead", minutes: 13.5, sentiment: "Positive" },
    { name: "Chris Okafor", role: "Engineering Manager", minutes: 11.2, sentiment: "Neutral" },
    { name: "Lena Fischer", role: "Design Lead", minutes: 8.4, sentiment: "Positive" },
    { name: "Priya Nair", role: "Customer Success", minutes: 6.6, sentiment: "Mixed" },
    { name: "Ravi Kumar", role: "Senior Engineer", minutes: 5.1, sentiment: "Neutral" },
    { name: "Yuki Tanaka", role: "Regional Sales", minutes: 3.2, sentiment: "Positive" },
  ],
  status: "Processed",
  sentiment: "Positive",
  sentimentScore: 0.72,
  summary:
    "The team reviewed sprint 34 progress and locked the release plan for the multilingual transcription upgrade. Telugu and Hindi accuracy reached 94.2% on the internal benchmark, clearing the bar for a public beta on 25 September. Design signed off on the Reports 2.0 layout, while the streaming latency regression on long recordings was accepted as the single release blocker. Customer Success raised two enterprise escalations that need speaker-level analytics before renewal, and the team approved a 12% increase in GPU capacity so the beta is not throughput bound.",
  keywords: [
    "multilingual transcription",
    "Telugu accuracy",
    "public beta",
    "streaming latency",
    "Reports 2.0",
    "speaker analytics",
    "GPU capacity",
    "enterprise renewal",
  ],
  points: [
    "Telugu and Hindi word error rate improved to 5.8%, giving 94.2% accuracy on the internal benchmark set.",
    "Streaming latency spikes to 4.2s on recordings longer than 45 minutes and is the only open release blocker.",
    "Reports 2.0 moves the executive summary to the top of every export; print styles still need spacing fixes.",
    "Two enterprise accounts (Northwind and Lumen) require speaker-level analytics before renewal in October.",
    "Support volume dropped 18% after the summary redesign shipped in sprint 32.",
    "Telugu demo recording will be used for the launch webinar so regional prospects hear their own language.",
  ],
  decisions: [
    "Public beta of multilingual transcription ships on 25 September with Telugu, Hindi and English.",
    "Streaming latency regression is the only release blocker; the v3 diarization model rolls back until it is fixed.",
    "Reports 2.0 layout is approved with the executive summary placed at the top of every export.",
    "GPU capacity is increased by 12% for the quarter to protect beta throughput.",
    "Speaker-level analytics is pulled into sprint 35 to unblock the Northwind and Lumen renewals.",
  ],
  actionItems: [
    ai("Fix streaming latency regression on 45m+ recordings", "Ravi Kumar", "2026-09-16", "High", "In progress", "ai-1"),
    ai("Publish multilingual beta release notes (EN + TE)", "Aarav Mehta", "2026-09-24", "High", "Open", "ai-2"),
    ai("Ship speaker-level analytics behind a feature flag", "Chris Okafor", "2026-09-30", "High", "Open", "ai-3"),
    ai("Fix Reports 2.0 print stylesheet spacing", "Lena Fischer", "2026-09-18", "Medium", "In progress", "ai-4"),
    ai("Prepare Telugu demo recording for the launch webinar", "Priya Nair", "2026-09-22", "Medium", "Open", "ai-5"),
    ai("Sign the GPU capacity contract amendment", "Aarav Mehta", "2026-09-15", "High", "Done", "ai-6"),
    ai("Send renewal risk brief for Northwind and Lumen", "Priya Nair", "2026-09-15", "Medium", "Done", "ai-7"),
    ai("Localise pricing page for APAC launch", "Yuki Tanaka", "2026-10-02", "Low", "Open", "ai-8"),
  ],
  nextSteps: [
    "Ravi lands the latency fix and re-runs the 45m+ benchmark before Friday.",
    "Aarav confirms the 25 September beta date with marketing and publishes bilingual release notes.",
    "Chris scopes speaker analytics for sprint 35 and shares the flag rollout plan.",
    "Priya schedules the Northwind and Lumen executive calls with the new analytics preview.",
  ],
  transcript: [
    { time: "00:00:08", speaker: "Aarav Mehta", text: "Good morning everyone. Agenda today: sprint 34 status, the multilingual beta date, Reports 2.0 sign-off and the two enterprise escalations." },
    { time: "00:01:02", speaker: "Chris Okafor", text: "Sprint 34 is at 82%. The multilingual model finished evaluation last night — Telugu and Hindi are both at 94.2% accuracy on our benchmark set." },
    { time: "00:02:14", speaker: "Aarav Mehta", text: "That clears the bar we agreed on. Can we commit to a public beta on the twenty-fifth of September?" },
    { time: "00:02:48", speaker: "Chris Okafor", text: "Yes, with one caveat. We still see latency spikes up to 4.2 seconds on recordings longer than forty-five minutes." },
    { time: "00:03:31", speaker: "Ravi Kumar", text: "It is the v3 diarization model. It re-segments the whole audio window instead of streaming incrementally. I can fix it, but I would roll back to v2 until then." },
    { time: "00:04:20", speaker: "Aarav Mehta", text: "Then the latency regression is our only release blocker. Ravi owns the fix, target Wednesday the sixteenth, and we roll back v3 in the meantime." },
    { time: "00:05:40", speaker: "Lena Fischer", text: "Design side: Reports 2.0 is ready. We moved the executive summary to the top of every export and inline charts tested well with eight of nine users." },
    { time: "00:06:52", speaker: "Lena Fischer", text: "One gap — the print stylesheet still breaks spacing on page two. I will fix that by the eighteenth." },
    { time: "00:07:35", speaker: "Aarav Mehta", text: "Approved. Reports 2.0 layout is locked with the summary on top." },
    { time: "00:08:50", speaker: "Priya Nair", text: "I have two escalations. Northwind and Lumen both renew in October and both are asking for speaker-level analytics before they sign." },
    { time: "00:09:44", speaker: "Priya Nair", text: "Northwind specifically wants talk-time per participant inside the exported PDF report." },
    { time: "00:10:38", speaker: "Chris Okafor", text: "We already compute talk time internally for diarization. Exposing it behind a feature flag is maybe four days of work." },
    { time: "00:11:26", speaker: "Aarav Mehta", text: "Pull it into sprint 35. Chris owns delivery, target the thirtieth, and Priya sets up the executive calls once the preview is live." },
    { time: "00:13:05", speaker: "Yuki Tanaka", text: "For APAC, regional prospects respond much better when the demo is in their own language. Can we use a Telugu recording for the launch webinar?" },
    { time: "00:13:58", speaker: "Priya Nair", text: "I can prepare a Telugu demo recording by the twenty-second." },
    { time: "00:15:12", speaker: "Ravi Kumar", text: "One infrastructure note — if beta traffic triples we are throughput bound on GPUs by week two." },
    { time: "00:16:04", speaker: "Aarav Mehta", text: "We approved a twelve percent GPU capacity increase for the quarter. I signed the amendment yesterday, so that is closed." },
    { time: "00:18:30", speaker: "Lena Fischer", text: "Also worth noting: support volume dropped eighteen percent after the summary redesign shipped in sprint 32." },
    { time: "00:20:15", speaker: "Aarav Mehta", text: "Great signal. Let us put that in the beta release notes, in English and Telugu." },
    { time: "00:22:40", speaker: "Yuki Tanaka", text: "I will also localise the pricing page for APAC, though that can land after launch." },
    { time: "00:24:05", speaker: "Chris Okafor", text: "Unresolved for me: we still have not decided how many design partners get the insights API during beta." },
    { time: "00:25:18", speaker: "Aarav Mehta", text: "Let us carry that to next week. Everything else is decided. Thanks everyone." },
  ],
  translations: {
    te: {
      summary:
        "స్ప్రింట్ 34 పురోగతిని బృందం సమీక్షించి, బహుభాషా ట్రాన్స్‌క్రిప్షన్ అప్‌గ్రేడ్ విడుదల ప్రణాళికను ఖరారు చేసింది. తెలుగు మరియు హిందీ కచ్చితత్వం 94.2%కి చేరడంతో సెప్టెంబర్ 25న పబ్లిక్ బీటాకు అనుమతి లభించింది. రిపోర్ట్స్ 2.0 లేఅవుట్‌కు డిజైన్ ఆమోదం తెలిపింది; 45 నిమిషాలకు మించిన రికార్డింగ్‌లలో స్ట్రీమింగ్ లేటెన్సీ సమస్య ఒక్కటే విడుదలకు అడ్డంకి. రెండు ఎంటర్‌ప్రైజ్ ఖాతాలకు రెన్యూవల్‌కు ముందు స్పీకర్ స్థాయి విశ్లేషణలు అవసరం, అలాగే బీటా సామర్థ్యం కోసం GPU కెపాసిటీని 12% పెంచడానికి ఆమోదం లభించింది.",
      points: [
        "తెలుగు మరియు హిందీ కచ్చితత్వం 94.2%కి మెరుగుపడింది (వర్డ్ ఎర్రర్ రేటు 5.8%).",
        "45 నిమిషాలకు మించిన రికార్డింగ్‌లలో లేటెన్సీ 4.2 సెకన్లకు పెరుగుతోంది — ఇదే ఏకైక అడ్డంకి.",
        "రిపోర్ట్స్ 2.0లో ఎగ్జిక్యూటివ్ సారాంశం ప్రతి ఎక్స్‌పోర్ట్ పైభాగానికి మారింది.",
        "నార్త్‌విండ్ మరియు లూమెన్ ఖాతాలకు అక్టోబర్ రెన్యూవల్‌కు ముందు స్పీకర్ విశ్లేషణలు కావాలి.",
        "సారాంశ పునఃరూపకల్పన తర్వాత సపోర్ట్ వాల్యూమ్ 18% తగ్గింది.",
        "లాంచ్ వెబినార్‌లో తెలుగు డెమో రికార్డింగ్‌ను ఉపయోగించాలని నిర్ణయించారు.",
      ],
      decisions: [
        "బహుభాషా ట్రాన్స్‌క్రిప్షన్ పబ్లిక్ బీటా సెప్టెంబర్ 25న విడుదల అవుతుంది (తెలుగు, హిందీ, ఇంగ్లీష్).",
        "స్ట్రీమింగ్ లేటెన్సీ సమస్యే ఏకైక విడుదల అడ్డంకి; అది పరిష్కారమయ్యే వరకు v3 డయరైజేషన్ మోడల్ వెనక్కి తీసుకోబడుతుంది.",
        "ఎగ్జిక్యూటివ్ సారాంశం పైన ఉంచే రిపోర్ట్స్ 2.0 లేఅవుట్ ఆమోదించబడింది.",
        "ఈ క్వార్టర్‌కు GPU కెపాసిటీ 12% పెంచబడింది.",
        "స్పీకర్ స్థాయి విశ్లేషణలు స్ప్రింట్ 35లోకి చేర్చబడ్డాయి.",
      ],
      actionItems: [
        "45 నిమిషాలకు మించిన రికార్డింగ్‌ల లేటెన్సీ సమస్యను పరిష్కరించాలి — రవి కుమార్, సెప్టెంబర్ 16.",
        "బహుభాషా బీటా విడుదల నోట్స్ (ఇంగ్లీష్ + తెలుగు) ప్రచురించాలి — ఆరవ్ మెహతా, సెప్టెంబర్ 24.",
        "ఫీచర్ ఫ్లాగ్ కింద స్పీకర్ స్థాయి విశ్లేషణలు అందించాలి — క్రిస్ ఒకాఫోర్, సెప్టెంబర్ 30.",
        "రిపోర్ట్స్ 2.0 ప్రింట్ స్టైల్ స్పేసింగ్ సరిచేయాలి — లేనా ఫిషర్, సెప్టెంబర్ 18.",
        "లాంచ్ వెబినార్ కోసం తెలుగు డెమో రికార్డింగ్ సిద్ధం చేయాలి — ప్రియా నాయర్, సెప్టెంబర్ 22.",
        "GPU కెపాసిటీ ఒప్పంద సవరణపై సంతకం చేయాలి — ఆరవ్ మెహతా, పూర్తయింది.",
        "నార్త్‌విండ్, లూమెన్ రెన్యూవల్ రిస్క్ నివేదిక పంపాలి — ప్రియా నాయర్, పూర్తయింది.",
        "APAC లాంచ్ కోసం ధరల పేజీని అనువదించాలి — యుకి తనకా, అక్టోబర్ 2.",
      ],
      transcript: [
        "అందరికీ శుభోదయం. నేటి ఎజెండా: స్ప్రింట్ 34 స్థితి, బహుభాషా బీటా తేదీ, రిపోర్ట్స్ 2.0 ఆమోదం మరియు రెండు ఎంటర్‌ప్రైజ్ సమస్యలు.",
        "స్ప్రింట్ 34లో 82% పూర్తయింది. బహుభాషా మోడల్ మూల్యాంకనం నిన్న రాత్రి పూర్తయింది — తెలుగు, హిందీ రెండూ 94.2% కచ్చితత్వంలో ఉన్నాయి.",
        "అది మనం అంగీకరించిన ప్రమాణాన్ని అందుకుంటుంది. సెప్టెంబర్ 25న పబ్లిక్ బీటాకు కట్టుబడగలమా?",
        "అవును, ఒక షరతుతో. 45 నిమిషాలకు మించిన రికార్డింగ్‌లలో ఇంకా 4.2 సెకన్ల లేటెన్సీ కనిపిస్తోంది.",
        "అది v3 డయరైజేషన్ మోడల్ వల్లనే. నేను పరిష్కరిస్తాను, అప్పటివరకు v2కి వెనక్కి వెళ్తాను.",
        "అంటే లేటెన్సీ సమస్యే మన ఏకైక అడ్డంకి. రవి దానిని 16వ తేదీ లోపు పరిష్కరిస్తారు.",
        "డిజైన్ వైపు: రిపోర్ట్స్ 2.0 సిద్ధంగా ఉంది. ఎగ్జిక్యూటివ్ సారాంశం పైకి మార్చాము.",
        "ఒక లోపం — ప్రింట్ స్టైల్‌షీట్‌లో రెండో పేజీ స్పేసింగ్ సరిగా లేదు. 18వ తేదీలోపు సరిచేస్తాను.",
        "ఆమోదించబడింది. రిపోర్ట్స్ 2.0 లేఅవుట్ ఖరారు.",
        "నాకు రెండు సమస్యలు ఉన్నాయి. నార్త్‌విండ్, లూమెన్ అక్టోబర్‌లో రెన్యూ అవుతాయి, రెండూ స్పీకర్ విశ్లేషణలు కోరుతున్నాయి.",
        "నార్త్‌విండ్ ప్రత్యేకంగా PDF నివేదికలో పాల్గొనేవారి మాట్లాడిన సమయం కోరుతోంది.",
        "మేము ఆ డేటాను అంతర్గతంగా లెక్కిస్తున్నాము. ఫీచర్ ఫ్లాగ్ కింద ఇవ్వడానికి నాలుగు రోజులు సరిపోతాయి.",
        "దాన్ని స్ప్రింట్ 35లోకి తీసుకోండి. క్రిస్ 30వ తేదీ లక్ష్యంగా పూర్తి చేస్తారు.",
        "APAC ప్రాంతంలో డెమో వారి భాషలో ఉంటే మంచి స్పందన వస్తుంది. వెబినార్‌కు తెలుగు రికార్డింగ్ వాడవచ్చా?",
        "22వ తేదీ లోపు తెలుగు డెమో రికార్డింగ్ సిద్ధం చేస్తాను.",
        "ఒక మౌలిక సదుపాయ విషయం — బీటా ట్రాఫిక్ మూడు రెట్లు పెరిగితే రెండో వారంలో GPU సామర్థ్యం సరిపోదు.",
        "మేము 12% GPU కెపాసిటీ పెంపును ఆమోదించాము. నిన్ననే సంతకం చేశాను.",
        "సారాంశ పునఃరూపకల్పన తర్వాత సపోర్ట్ వాల్యూమ్ 18% తగ్గిందని కూడా గమనించాలి.",
        "మంచి సంకేతం. దాన్ని బీటా విడుదల నోట్స్‌లో ఇంగ్లీష్, తెలుగులో చేర్చుదాం.",
        "APAC కోసం ధరల పేజీని కూడా అనువదిస్తాను, అది లాంచ్ తర్వాత కూడా సరిపోతుంది.",
        "నాకు తేలని విషయం: బీటాలో ఇన్‌సైట్స్ API ఎంతమంది డిజైన్ భాగస్వాములకు ఇవ్వాలి?",
        "దాన్ని వచ్చే వారానికి తీసుకువెళ్దాం. మిగతావన్నీ నిర్ణయమయ్యాయి. అందరికీ ధన్యవాదాలు.",
      ],
    },
  },
};

export const meetings: Meeting[] = [
  demoMeeting,
  {
    id: "mm-1042",
    title: "Q3 Product Roadmap Review",
    platform: "Zoom",
    date: "2026-09-08T10:00:00Z",
    duration: "58m",
    durationMinutes: 58,
    language: "English",
    languages: ["English"],
    participants: ["Aarav Mehta", "Lena Fischer", "Chris Okafor", "Yuki Tanaka"],
    speakers: [
      { name: "Aarav Mehta", role: "Product Lead", minutes: 18.2, sentiment: "Positive" },
      { name: "Chris Okafor", role: "Engineering Manager", minutes: 15.4, sentiment: "Neutral" },
      { name: "Lena Fischer", role: "Design Lead", minutes: 13.1, sentiment: "Positive" },
      { name: "Yuki Tanaka", role: "Regional Sales", minutes: 8.0, sentiment: "Positive" },
    ],
    status: "Processed",
    sentiment: "Positive",
    sentimentScore: 0.68,
    summary:
      "The team aligned on the Q3 roadmap, prioritising multilingual transcription quality and the new insights API. Engineering committed to a beta on 18 September, while design will deliver the reporting refresh by 5 September. Budget for GPU capacity was approved with a 12% increase.",
    keywords: ["roadmap", "multilingual", "insights API", "beta", "GPU budget"],
    points: [
      "Transcription accuracy for Hindi and Telugu improved to 94.2%.",
      "Enterprise customers want speaker-level analytics in reports.",
      "Support load dropped 18% after the summary redesign.",
    ],
    decisions: [
      "Multilingual ASR becomes the top Q3 priority.",
      "Insights API moves to private beta with 20 design partners.",
      "GPU budget increased by 12% for the quarter.",
    ],
    nextSteps: ["Confirm beta scope with design partners.", "Publish the Q3 roadmap internally."],
    actionItems: [
      ai("Ship multilingual ASR beta", "Chris Okafor", "2026-09-18", "High", "In progress", "q3-1"),
      ai("Deliver reporting UI refresh", "Lena Fischer", "2026-09-05", "Medium", "Done", "q3-2"),
      ai("Finalise GPU capacity contract", "Aarav Mehta", "2026-09-02", "High", "Done", "q3-3"),
    ],
    transcript: [
      { time: "00:00:12", speaker: "Aarav Mehta", text: "Thanks everyone for joining. Let's start with where we landed on the roadmap themes." },
      { time: "00:01:04", speaker: "Lena Fischer", text: "Design has the reporting refresh at 80%. I can have the final screens by the fifth." },
      { time: "00:02:38", speaker: "Chris Okafor", text: "Multilingual accuracy is now at 94.2% for Hindi and Telugu. Beta on the eighteenth is realistic." },
      { time: "00:04:21", speaker: "Yuki Tanaka", text: "Enterprise accounts keep asking for speaker-level analytics inside the exported PDF." },
      { time: "00:06:02", speaker: "Aarav Mehta", text: "Agreed. Let's approve the 12% GPU budget bump so we don't bottleneck the beta." },
    ],
  },
  {
    id: "mm-1041",
    title: "Customer Success Weekly Sync",
    platform: "Microsoft Teams",
    date: "2026-09-04T14:30:00Z",
    duration: "42m",
    durationMinutes: 42,
    language: "English",
    languages: ["English"],
    participants: ["Priya Nair", "Tom Weller", "Sofia Alvarez"],
    speakers: [
      { name: "Priya Nair", role: "Customer Success", minutes: 16.5, sentiment: "Mixed" },
      { name: "Tom Weller", role: "Onboarding", minutes: 14.0, sentiment: "Neutral" },
      { name: "Sofia Alvarez", role: "Support Lead", minutes: 9.2, sentiment: "Positive" },
    ],
    status: "Processed",
    sentiment: "Neutral",
    sentimentScore: 0.42,
    summary:
      "Churn risk accounts were reviewed. Two enterprise renewals need executive sponsorship this week, and onboarding time dropped from 12 to 7 days after the guided setup launch.",
    keywords: ["churn", "renewals", "onboarding", "NPS"],
    points: [
      "NPS rose from 41 to 52 quarter over quarter.",
      "Two enterprise renewals flagged as at-risk.",
    ],
    decisions: ["Guided setup becomes the default for all new workspaces."],
    nextSteps: ["Book executive sponsor calls for both at-risk accounts."],
    actionItems: [
      ai("Schedule exec sponsor call with Northwind", "Priya Nair", "2026-09-12", "High", "In progress", "cs-1"),
      ai("Publish onboarding playbook v2", "Tom Weller", "2026-09-16", "Medium", "Open", "cs-2"),
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
    date: "2026-08-31T09:00:00Z",
    duration: "35m",
    durationMinutes: 35,
    language: "English",
    languages: ["English"],
    participants: ["Lena Fischer", "Marco Bianchi", "Ana Duarte"],
    speakers: [
      { name: "Lena Fischer", role: "Design Lead", minutes: 15.1, sentiment: "Positive" },
      { name: "Marco Bianchi", role: "Product Designer", minutes: 11.4, sentiment: "Neutral" },
      { name: "Ana Duarte", role: "Researcher", minutes: 8.0, sentiment: "Positive" },
    ],
    status: "Processed",
    sentiment: "Positive",
    sentimentScore: 0.61,
    summary:
      "Reports 2.0 direction approved with a cleaner executive summary and inline charts. Print styles need work before launch.",
    keywords: ["reports", "critique", "print", "charts"],
    points: ["Inline charts tested well with 8 of 9 users."],
    decisions: ["Executive summary moves to the top of every report."],
    nextSteps: ["Fix print styles, then hand off to engineering."],
    actionItems: [
      ai("Fix print stylesheet spacing", "Marco Bianchi", "2026-09-05", "Medium", "Done", "dc-1"),
    ],
    transcript: [
      { time: "00:00:15", speaker: "Lena Fischer", text: "Walking through the new report layout." },
      { time: "00:02:50", speaker: "Ana Duarte", text: "Eight of nine users found the inline charts clearer." },
    ],
  },
  {
    id: "mm-1039",
    title: "Multilingual Webinar — APAC Launch",
    platform: "Webinar",
    date: "2026-08-26T06:00:00Z",
    duration: "1h 12m",
    durationMinutes: 72,
    language: "Japanese",
    languages: ["Japanese", "Telugu", "English"],
    participants: ["Yuki Tanaka", "Hiro Sato", "Mei Lin", "Guests (214)"],
    speakers: [
      { name: "Yuki Tanaka", role: "Regional Sales", minutes: 28.0, sentiment: "Positive" },
      { name: "Hiro Sato", role: "Solutions Engineer", minutes: 22.5, sentiment: "Positive" },
      { name: "Mei Lin", role: "Marketing", minutes: 14.0, sentiment: "Neutral" },
    ],
    status: "Processed",
    sentiment: "Positive",
    sentimentScore: 0.74,
    summary:
      "APAC launch webinar with 214 attendees. Live translation ran in Japanese, Telugu and Mandarin with a 1.4 second delay.",
    keywords: ["APAC", "launch", "translation", "webinar"],
    points: ["214 live attendees, 63% stayed for the full session."],
    decisions: ["Launch APAC pricing tier in October."],
    nextSteps: ["Send localized recap email to all attendees."],
    actionItems: [
      ai("Send localized recap email to attendees", "Mei Lin", "2026-09-01", "Medium", "Done", "wb-1"),
    ],
    transcript: [
      { time: "00:00:30", speaker: "Yuki Tanaka", text: "Welcome to the APAC launch of MeetMind AI." },
      { time: "00:04:10", speaker: "Hiro Sato", text: "Live translation is running with a 1.4 second delay across three languages." },
    ],
  },
  {
    id: "mm-1038",
    title: "Engineering Standup",
    platform: "Zoom",
    date: "2026-08-24T08:15:00Z",
    duration: "18m",
    durationMinutes: 18,
    language: "English",
    languages: ["English"],
    participants: ["Chris Okafor", "Ravi Kumar", "Elena Petrova"],
    speakers: [
      { name: "Chris Okafor", role: "Engineering Manager", minutes: 7.0, sentiment: "Neutral" },
      { name: "Ravi Kumar", role: "Senior Engineer", minutes: 6.2, sentiment: "Mixed" },
      { name: "Elena Petrova", role: "Engineer", minutes: 4.1, sentiment: "Neutral" },
    ],
    status: "Processed",
    sentiment: "Mixed",
    sentimentScore: 0.28,
    summary: "Standup covering the streaming pipeline regression and diarization improvements.",
    keywords: ["standup", "pipeline", "diarization"],
    points: ["Latency spiked to 4.2s on long recordings."],
    decisions: ["Roll back the v3 diarization model until latency is fixed."],
    nextSteps: ["Land the pipeline patch and re-run benchmarks."],
    actionItems: [
      ai("Patch streaming pipeline regression", "Ravi Kumar", "2026-08-26", "High", "Done", "st-1"),
    ],
    transcript: [
      { time: "00:00:10", speaker: "Chris Okafor", text: "Quick standup, let's keep it to fifteen." },
      { time: "00:02:05", speaker: "Ravi Kumar", text: "Latency spiked to 4.2 seconds on the long recordings." },
    ],
  },
];

export const DEMO_MEETING_ID = demoMeeting.id;

export const upcoming = [
  { title: "Investor Update Call", time: "Today · 4:00 PM", platform: "Zoom" },
  { title: "Localization Review", time: "Tomorrow · 11:30 AM", platform: "Google Meet" },
  { title: "Sprint Planning", time: "Mon · 9:00 AM", platform: "Microsoft Teams" },
];

export type TeamMember = {
  id: string;
  name: string;
  role: "Admin" | "Manager" | "Member";
  email: string;
  meetings: number;
  status: "Active" | "Away" | "Invited";
};

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Aarav Mehta", role: "Admin", email: "aarav@meetmind.ai", meetings: 128, status: "Active" },
  { id: "tm-2", name: "Lena Fischer", role: "Manager", email: "lena@meetmind.ai", meetings: 96, status: "Active" },
  { id: "tm-3", name: "Chris Okafor", role: "Manager", email: "chris@meetmind.ai", meetings: 84, status: "Active" },
  { id: "tm-4", name: "Priya Nair", role: "Member", email: "priya@meetmind.ai", meetings: 61, status: "Away" },
  { id: "tm-5", name: "Ravi Kumar", role: "Member", email: "ravi@meetmind.ai", meetings: 52, status: "Active" },
  { id: "tm-6", name: "Yuki Tanaka", role: "Member", email: "yuki@meetmind.ai", meetings: 34, status: "Invited" },
];

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "success" | "info" | "warning";
  read: boolean;
};

export const notifications: AppNotification[] = [
  {
    id: "nt-1",
    title: "Product Development Weekly Meeting is ready",
    body: "Summary, decisions, 8 action items and Telugu translation generated.",
    time: "2m ago",
    kind: "success",
    read: false,
  },
  {
    id: "nt-2",
    title: "Streaming latency fix is due Wednesday",
    body: "Assigned to Ravi Kumar — marked as the only release blocker.",
    time: "26m ago",
    kind: "warning",
    read: false,
  },
  {
    id: "nt-3",
    title: "3 action items due this week",
    body: "Across the Product workspace, 2 of them are high priority.",
    time: "1h ago",
    kind: "warning",
    read: false,
  },
  {
    id: "nt-4",
    title: "Lena Fischer shared a report",
    body: "Reports 2.0 critique — executive summary attached.",
    time: "Yesterday",
    kind: "info",
    read: true,
  },
];

export const activityData = [
  { month: "Apr", meetings: 41, hours: 55 },
  { month: "May", meetings: 63, hours: 88 },
  { month: "Jun", meetings: 72, hours: 101 },
  { month: "Jul", meetings: 86, hours: 124 },
  { month: "Aug", meetings: 78, hours: 112 },
  { month: "Sep", meetings: 92, hours: 133 },
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

export const completionData = [
  { week: "W32", completed: 18, created: 26 },
  { week: "W33", completed: 24, created: 30 },
  { week: "W34", completed: 31, created: 34 },
  { week: "W35", completed: 29, created: 31 },
  { week: "W36", completed: 38, created: 40 },
];

export const speakerData = [
  { name: "Aarav Mehta", minutes: 312 },
  { name: "Lena Fischer", minutes: 268 },
  { name: "Chris Okafor", minutes: 241 },
  { name: "Priya Nair", minutes: 190 },
  { name: "Yuki Tanaka", minutes: 152 },
];

export const languageData = [
  { name: "English", value: 52, key: "en" },
  { name: "Telugu", value: 18, key: "te" },
  { name: "Hindi", value: 12, key: "hi" },
  { name: "Japanese", value: 10, key: "ja" },
  { name: "Tamil", value: 8, key: "ta" },
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
