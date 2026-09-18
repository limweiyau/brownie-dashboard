import { CaretUp } from "@phosphor-icons/react";
import type { ReactElement } from "react";
import {
  EVENTS,
  PWID_PROFILES,
  REMINDER_WEEK,
  SCHEDULES,
  SOS_WEEK,
} from "../data";
import { DAY_NAMES, GRID_START, fmtHour, pctChange, toMin } from "../utils";
import { TodayCard } from "./TodayCard";

// Demo filler so the coverage chart reads like a real week, 8 AM – 10 PM.
// Tuple: [day, start, end, title, staff, place]. Times use the same
// "H:MM" shape as the real schedule data.
type Fill = [number, string, string, string, string, string];

const FILL: Record<string, Fill[]> = {
  Tiong: [
    [0, "8:05", "8:50", "Breakfast + routine", "Mei", "Pantry"],
    [0, "9:10", "2:45", "Art workshop morning", "Mei", "Art room"],
    [0, "3:30", "4:45", "Afternoon studio", "Raj", "Art room"],
    [0, "6:00", "8:45", "Dinner + evening circle", "Mei", "Hall"],
    [1, "8:40", "9:20", "Late breakfast", "Mei", "Pantry"],
    [1, "10:00", "12:50", "Morning art", "Mei", "Art room"],
    [1, "2:15", "5:30", "Afternoon art", "Raj", "Art room"],
    [1, "6:50", "8:20", "Dinner + TV", "Mei", "Hall"],
    [2, "8:00", "8:35", "Breakfast + routine", "Mei", "Pantry"],
    [2, "8:50", "11:30", "Morning draw", "Mei", "Art room"],
    [2, "1:00", "6:30", "Long studio day", "Mei, Raj", "Art room"],
    [2, "7:30", "8:30", "Evening circle", "Mei", "Hall"],
    [3, "8:25", "9:10", "Breakfast + routine", "Mei", "Pantry"],
    [3, "9:50", "11:20", "Reading group", "Ana", "Hall"],
    [3, "12:40", "4:40", "Studio shift", "Raj", "Art room"],
    [3, "6:40", "8:15", "Dinner + TV", "Mei", "Hall"],
    [4, "8:00", "9:45", "Breakfast + goodbye circle", "Mei", "Hall"],
    [4, "10:20", "1:10", "Friday art", "Mei, Raj", "Art room"],
    [4, "2:30", "4:00", "Free draw + pack bag", "Raj", "Art room"],
    [4, "5:15", "8:40", "Early dinner + movie night", "Mei, Raj", "Hall"],
  ],
  Riley: [
    [0, "8:10", "8:55", "Walk + breakfast", "Raj", "Garden"],
    [0, "9:30", "1:00", "Morning packing", "Ana", "Workshop"],
    [0, "2:30", "4:30", "Afternoon workshop", "Ana", "Workshop"],
    [0, "6:30", "8:00", "Dinner + stroll", "Raj", "Garden"],
    [1, "8:00", "9:00", "Walk + breakfast", "Raj", "Garden"],
    [1, "11:30", "4:15", "Packing late start", "Ana", "Workshop"],
    [1, "5:00", "6:00", "Dinner", "Ana", "Pantry"],
    [1, "7:30", "9:00", "Late movie", "Ana", "Hall"],
    [2, "8:25", "9:10", "Walk + breakfast", "Raj", "Garden"],
    [2, "9:35", "12:00", "Morning packing", "Ana", "Workshop"],
    [2, "12:45", "3:00", "Cooking class", "Ana", "Kitchen"],
    [2, "5:00", "8:00", "Garden crew evening", "Raj", "Garden"],
    [3, "9:00", "9:45", "Late breakfast", "Raj", "Garden"],
    [3, "10:30", "2:00", "Packing shift", "Ana", "Workshop"],
    [3, "3:30", "5:30", "Cooking class", "Ana", "Kitchen"],
    [3, "7:00", "8:30", "Dinner + stroll", "Raj", "Garden"],
    [4, "8:00", "8:40", "Walk + breakfast", "Raj", "Garden"],
    [4, "12:15", "6:15", "Workshop late shift", "Ana", "Workshop"],
    [4, "6:45", "8:10", "Dinner + movie night", "Mei, Raj", "Hall"],
  ],
  "Wei Yau": [
    [0, "8:25", "9:10", "Breakfast + routine", "Raj", "Pantry"],
    [0, "9:35", "2:00", "Morning kitchen", "Ana", "Kitchen"],
    [0, "3:00", "5:35", "Afternoon duty", "Ana", "Kitchen"],
    [0, "6:20", "8:20", "Dinner + photo journal", "Raj", "Hall"],
    [1, "8:30", "9:20", "Meds + breakfast", "Raj", "Pantry"],
    [1, "10:30", "1:00", "Baking morning", "Ana", "Kitchen"],
    [1, "2:30", "5:20", "Baking afternoon", "Ana", "Kitchen"],
    [1, "6:35", "8:35", "Dinner + photo journal", "Raj", "Hall"],
    [2, "8:15", "9:00", "Breakfast + routine", "Raj", "Pantry"],
    [2, "11:10", "3:00", "Kitchen late start", "Ana", "Kitchen"],
    [2, "4:00", "7:10", "Evening kitchen", "Ana", "Kitchen"],
    [2, "7:35", "8:35", "Dinner + wind-down", "Raj", "Hall"],
    [3, "8:10", "8:55", "Breakfast + routine", "Raj", "Pantry"],
    [3, "9:25", "11:05", "Community outing", "Raj, Ana", "Market"],
    [3, "12:05", "4:35", "Kitchen shift", "Ana", "Kitchen"],
    [3, "6:05", "8:35", "Dinner + movie night", "Mei, Raj", "Hall"],
    [4, "10:00", "11:00", "Late breakfast", "Raj", "Pantry"],
    [4, "12:00", "3:00", "Cooking class", "Ana", "Kitchen"],
    [4, "4:00", "6:30", "Packing shift", "Ana", "Workshop"],
    [4, "7:00", "8:30", "Dinner + photo journal", "Raj", "Hall"],
  ],
};

const DAY_END = 22 * 60; // 10 PM
const TICKS = [8 * 60, 12 * 60, 16 * 60, 20 * 60, 22 * 60];
const TICK_LABELS = ["8AM", "12PM", "4PM", "8PM", "10PM"];

// "H:MM" is ambiguous past noon (8:45 could be AM or PM), so resolve each
// block against the running clock: anything earlier than the floor rolls +12h.
function fillMin(t: string, floor: number): number {
  let m = toMin(t);
  while (m < floor) m += 12 * 60;
  return m;
}

function dayBlocks(
  name: string,
  day: number,
): { s: number; e: number; b: Fill }[] {
  let floor = GRID_START;
  return (FILL[name] ?? [])
    .filter((b) => b[0] === day)
    .map((b) => {
      const s = fillMin(b[1], floor);
      const e = fillMin(b[2], s);
      floor = e;
      return { s, e, b };
    })
    .sort((x, y) => x.s - y.s);
}

function Delta({ pct, good }: { pct: number; good: boolean }): ReactElement {
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[0.68rem] font-semibold ${good ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
    >
      <CaretUp size={10} weight="fill" aria-hidden />+{pct}%
    </span>
  );
}

export function MetricsBand(): ReactElement {
  const adherenceDelta = pctChange(
    REMINDER_WEEK.acknowledged / REMINDER_WEEK.sent,
    REMINDER_WEEK.prevAcknowledged / REMINDER_WEEK.prevSent,
  );
  const sosDelta = pctChange(SOS_WEEK.thisWeek, SOS_WEEK.lastWeek);

  const today = Math.min(Math.max(new Date().getDay() - 1, 0), 4);
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const span = DAY_END - GRID_START;
  const pos = (m: number) => Math.max(0, Math.min(100, ((m - GRID_START) / span) * 100));
  const nowInGrid = nowMin >= GRID_START && nowMin <= DAY_END;
  const coverage = PWID_PROFILES.map((p) => ({
    name: p.name,
    color: SCHEDULES.find((s) => s.name === p.name)?.color ?? "#007aff",
    blocks: dayBlocks(p.name, today),
  }));
  const todayBlocks = coverage.reduce((n, r) => n + r.blocks.length, 0);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TodayCard events={EVENTS} />
      <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-3.5">
        <h2 className="text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">
          Centre health
        </h2>
        <div className="mt-3 flex flex-1 flex-col justify-center gap-4">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.8rem] font-semibold text-ink">
                Reminders acknowledged
              </span>
              <Delta pct={adherenceDelta} good />
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand"
                style={{
                  width: `${Math.round((REMINDER_WEEK.acknowledged / REMINDER_WEEK.sent) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-1 text-[0.72rem] text-sub">
              {REMINDER_WEEK.acknowledged} of {REMINDER_WEEK.sent} this week
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.8rem] font-semibold text-ink">
                SOS alerts
              </span>
              <Delta pct={sosDelta} good={false} />
            </div>
            <p className="mt-1 text-[0.72rem] text-sub">
              {SOS_WEEK.thisWeek} this week · {SOS_WEEK.lastWeek} last week
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-3.5 sm:col-span-2">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">
            Today's coverage
          </h2>
          <span className="text-[0.7rem] text-blue-600 tabular-nums">
            {DAY_NAMES[today]} · {todayBlocks} blocks
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {coverage.map((r) => (
            <div
              key={r.name}
              className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-2.5"
            >
              <span className="truncate text-[0.72rem] font-semibold text-ink">
                {r.name}
              </span>
              <div className="relative h-7 flex-1">
                <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-slate-200" />
                {r.blocks.map(({ s, e, b }: { s: number; e: number; b: Fill }, i: number) => (
                  <div
                    key={i}
                    title={`${b[3]}, ${fmtHour(s)} to ${fmtHour(e)}, ${b[4]}, ${b[5]}`}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: `${pos(s)}%`,
                      width: `${Math.max(4, pos(e) - pos(s))}%`,
                    }}
                  >
                    <div
                      className="h-[3px] w-full rounded-full"
                      style={{ backgroundColor: r.color }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full"
                      style={{ left: 0, backgroundColor: r.color }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full"
                      style={{ right: 0, backgroundColor: r.color }}
                    />
                  </div>
                ))}
                {nowInGrid && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-brand"
                    style={{ left: `${pos(nowMin)}%` }}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2.5">
            <div />
            <div className="relative h-4">
              {TICKS.map((t: number, i: number) => (
                <span
                  key={t}
                  className="absolute text-[0.6rem] tabular-nums text-sub"
                  style={{
                    left: `${pos(t)}%`,
                    transform:
                      i === 0
                        ? "translateX(0)"
                        : i === TICKS.length - 1
                          ? "translateX(-100%)"
                          : "translateX(-50%)",
                  }}
                >
                  {TICK_LABELS[i]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
