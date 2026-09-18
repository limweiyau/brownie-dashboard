// ALL FAKE DEMO DATA, no backend, nothing leaves this laptop.

export type SkillDef = {
  name: string;
  label: string;
};

export const SKILLS: SkillDef[] = [
  { name: "visual-schedule", label: "Picture timetable" },
  { name: "pecs-talk", label: "Simple choices" },
  { name: "calm-down", label: "Breathing exercises" },
  { name: "count-money", label: "Counting money" },
];

export interface FakeServer {
  name: string;
  tools: number;
  enabled: boolean;
}

export interface FakeProfile {
  name: string;
  description: string;
  model: string;
  soul: string;
  memoryNotes: number;
  personNotes: number;
}

export interface FakeSession {
  id: string;
  title: string;
  who: string;
  messages: number;
  when: string;
}

export interface FakeJob {
  id: string;
  name: string;
  who: string;
  schedule: string;
  enabled: boolean;
}

export const PROFILES: FakeProfile[] = [
  {
    name: "Brownie",
    description: "The main Brownie for the Woodlands centre",
    model: "Hermes 4 70B",
    soul: `# Brownie's personality

You are Brownie, the helper for MINDS staff and residents at Woodlands Centre.

## How you talk
- One short sentence at a time. Simple words.
- Always wait for an answer before the next step.
- Praise effort, not results: "Good trying!"

## What you never do
- Never rush. Never raise your voice, even in text.
- Never share medical details with anyone except staff on duty.
- Never promise outings, food, or pickup times. Staff decide that.

## When someone is upset
1. Say: "I see you. We stop now."
2. Offer two choices, for example "Quiet room or garden?"
3. Tell staff on duty what happened, sticking to the facts.`,
    memoryNotes: 48,
    personNotes: 12,
  },
  {
    name: "Brownie-VT",
    description: "The workshop Brownie. Counts pieces and follows packing jobs",
    model: "Hermes 4 70B",
    soul: `# Brownie-VT's personality

You are the workshop Brownie. You help with work training jobs.

## How you talk
- Numbers first: "12 done. 8 more."
- One job at a time. Show the next step only when asked.
- Celebrate every finished tray.

## Rules
- If a count looks wrong, say so gently and count again together.
- Never mark a job complete yourself. Staff confirm.`,
    memoryNotes: 21,
    personNotes: 4,
  },
  {
    name: "Brownie-Night",
    description: "The quiet evening Brownie. Summaries and handover only",
    model: "Hermes 4 35B",
    soul: `# Brownie-Night's personality

You are the evening Brownie. The centre is closing. Be extra calm.

## How you talk
- Soft, short sentences.
- Only two jobs: sum up the day, and name tomorrow's first activity.

## Rules
- Never start new activities after 5pm.
- Anything urgent goes straight to staff on duty.`,
    memoryNotes: 9,
    personNotes: 2,
  },
];

export const SESSIONS: FakeSession[] = [
  {
    id: "s1",
    title: "Art choices",
    who: "Tiong",
    messages: 34,
    when: "just now",
  },
  {
    id: "s2",
    title: "Packing count",
    who: "Riley",
    messages: 52,
    when: "25m ago",
  },
  { id: "s3", title: "Walk plan", who: "Riley", messages: 18, when: "1h ago" },
  {
    id: "s4",
    title: "Pickup message draft",
    who: "Wei Yau",
    messages: 11,
    when: "2h ago",
  },
  {
    id: "s5",
    title: "Morning circle plan",
    who: "Everyone",
    messages: 27,
    when: "3h ago",
  },
];

export const JOBS: FakeJob[] = [
  {
    id: "j1",
    name: "Morning meds",
    who: "Tiong",
    schedule: "Monday, 8:00 AM",
    enabled: true,
  },
  {
    id: "j2",
    name: "Lunch routine",
    who: "Tiong",
    schedule: "Wednesday, 12:00 PM",
    enabled: true,
  },
  {
    id: "j3",
    name: "Pack bag for home",
    who: "Tiong",
    schedule: "Friday, 4:30 PM",
    enabled: true,
  },
  {
    id: "j4",
    name: "Morning meds",
    who: "Wei Yau",
    schedule: "Tuesday, 8:30 AM",
    enabled: true,
  },
  {
    id: "j5",
    name: "Water rest break",
    who: "Wei Yau",
    schedule: "Thursday, 2:00 PM",
    enabled: true,
  },
  {
    id: "j6",
    name: "Take meds",
    who: "Riley",
    schedule: "Monday, 8:30 AM",
    enabled: true,
  },
  {
    id: "j7",
    name: "Do laundry",
    who: "Riley",
    schedule: "Wednesday, 10:00 AM",
    enabled: true,
  },
  {
    id: "j8",
    name: "Tidy bedroom",
    who: "Riley",
    schedule: "Thursday, 10:00 AM",
    enabled: true,
  },
  {
    id: "j9",
    name: "Water the plants",
    who: "Riley",
    schedule: "Friday, 2:00 PM",
    enabled: true,
  },
];

export const SERVERS: FakeServer[] = [
  { name: "Calendar", tools: 6, enabled: true },
  { name: "WhatsApp", tools: 9, enabled: true },
  { name: "Files", tools: 12, enabled: true },
  { name: "Printer", tools: 3, enabled: false },
];

export interface PwidProfile {
  name: string;
  slug: string;
  /** Fake per-resident Brownie serial, e.g. "#1351". Demo only. */
  brownieId: string;
  avatar: string;
  gender: "male" | "female";
  age: number;
  address: string;
  comm: string;
  likes: string;
  watch: string;
  notes: string[];
  memories: string[];
  enabledSkills: Set<string>;
  guardian: string;
  phone: string;
  allergies: string;
}

export const PWID_PROFILES: PwidProfile[] = [
  {
    name: "Tiong",
    slug: "tiong",
    brownieId: "#1351",
    gender: "male",
    avatar: "/tiong.jpg",
    age: 24,
    address: "57 Lengkok Bahru, #05-78",
    comm: "Picture cards. One instruction, then wait 10 sec",
    likes: "Drawing, fixed routine",
    watch: "Tires after 2pm, offer a break first",
    notes: ["Eats slowly, calm pantry", "Don't rush his drawings."],
    memories: [
      "Likes to draw, has coffee in the morning",
      "Waits by the pantry door at 9am sharp",
      "Settles faster when the picture schedule comes out",
    ],
    enabledSkills: new Set(["visual-schedule", "pecs-talk"]),
    guardian: "Mother, Mdm Tan",
    phone: "+65 9123 4567",
    allergies: "None",
  },
  {
    name: "Riley",
    slug: "riley",
    brownieId: "#2516",
    avatar: "/riley.jpg",
    age: 31,
    gender: "female",
    address: "57 Lengkok Bahru, #08-02",
    comm: "Speak slowly, one thing at a time",
    likes: "Outdoors, garden walks",
    watch: "Seizure risk, rescue meds on outings",
    notes: ["Proper walking shoes", "Shade breaks when hot."],
    memories: [
      "Counts packing pieces out loud, proud of full trays",
      "Likes the garden path past the fountain",
      "Takes shade breaks without being asked when it's hot",
    ],
    enabledSkills: new Set([
      "visual-schedule",
      "pecs-talk",
      "calm-down",
      "count-money",
    ]),
    guardian: "Father, Mr Lee",
    phone: "+65 9345 6789",
    allergies: "None",
  },
  {
    name: "Wei Yau",
    slug: "wei-yau",
    brownieId: "#8723",
    avatar: "/weiyau.jpg",
    age: 27,
    gender: "male",
    address: "57 Lengkok Bahru, #04-33",
    comm: "Short sentences, point at picture schedule",
    likes: "Cooking and art",
    watch: "Peanut allergy, check every food label",
    notes: ["Washes hands alone", "Photo dishes he's proud of."],
    memories: [
      "Photographs every dish he finishes",
      "Picks the blue apron on cooking days",
      "Hums while arranging art materials, means he is happy",
    ],
    enabledSkills: new Set(["visual-schedule", "calm-down", "count-money"]),
    guardian: "Sister, Mrs Lim",
    phone: "+65 9456 7890",
    allergies: "Peanuts (severe), shellfish",
  },
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export interface PwidBlock {
  day: number;
  start: string;
  end: string;
  title: string;
  staff: string;
  place: string;
}

export interface PwidSchedule {
  name: string;
  color: string;
  blocks: PwidBlock[];
}

export const SCHEDULES: PwidSchedule[] = [
  {
    name: "Tiong",
    color: "#6F3E1F",
    blocks: [
      {
        day: 0,
        start: "9:00",
        end: "9:45",
        title: "Breakfast, morning routine",
        staff: "Mei",
        place: "Pantry",
      },
      {
        day: 0,
        start: "10:00",
        end: "11:30",
        title: "Art workshop",
        staff: "Mei, Raj",
        place: "Art room",
      },
      {
        day: 1,
        start: "9:00",
        end: "9:45",
        title: "Breakfast, morning routine",
        staff: "Mei",
        place: "Pantry",
      },
      {
        day: 2,
        start: "10:00",
        end: "11:30",
        title: "Art workshop",
        staff: "Mei, Raj",
        place: "Art room",
      },
      {
        day: 3,
        start: "2:00",
        end: "2:30",
        title: "Short walk",
        staff: "Raj",
        place: "Garden",
      },
      {
        day: 4,
        start: "9:00",
        end: "10:00",
        title: "Goodbye circle",
        staff: "Mei",
        place: "Hall",
      },
    ],
  },
  {
    name: "Riley",
    color: "#B3261E",
    blocks: [
      {
        day: 1,
        start: "3:00",
        end: "4:30",
        title: "Cooking class",
        staff: "Ana",
        place: "Kitchen",
      },
      {
        day: 3,
        start: "3:00",
        end: "4:30",
        title: "Cooking class",
        staff: "Ana",
        place: "Kitchen",
      },
      {
        day: 4,
        start: "10:00",
        end: "11:30",
        title: "Art workshop",
        staff: "Mei",
        place: "Art room",
      },
    ],
  },
  {
    name: "Wei Yau",
    color: "#2F7D4F",
    blocks: [
      {
        day: 0,
        start: "11:30",
        end: "12:00",
        title: "Physio walk",
        staff: "Raj",
        place: "Garden",
      },
      {
        day: 2,
        start: "11:30",
        end: "12:00",
        title: "Physio walk",
        staff: "Raj",
        place: "Garden",
      },
      {
        day: 3,
        start: "9:30",
        end: "11:00",
        title: "Community outing",
        staff: "Raj, Ana",
        place: "Market",
      },
      {
        day: 4,
        start: "11:30",
        end: "12:00",
        title: "Physio walk",
        staff: "Raj",
        place: "Garden",
      },
    ],
  },
];

export type FakeEvent = {
  time: string;
  title: string;
  note?: string;
};

export const TODAY_SUMMARY =
  "Calm morning. Everyone ate breakfast. Joey leads the garden outing, and the fire drill is after lunch.";

export const EVENTS: FakeEvent[] = [
  { time: "9:00 AM", title: "Morning circle", note: "Hall, everyone together" },
  {
    time: "10:30 AM",
    title: "Garden outing",
    note: "3 Signed up, meet Joey at void deck",
  },
  {
    time: "1:15 PM",
    title: "Fire drill",
    note: "Meet at the field assembly point",
  },
];

export const REMINDER_WEEK = {
  acknowledged: 26,
  sent: 30,
  prevAcknowledged: 23,
  prevSent: 30,
};
export const SOS_WEEK = { thisWeek: 3, lastWeek: 2 };
