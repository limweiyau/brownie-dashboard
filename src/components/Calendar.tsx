import type { ReactElement } from "react";
import { SCHEDULES, type FakeJob } from "../data";
import { DAY_NAMES, GRID_END, GRID_START, HOURS, fmtHour, hhmm, jobDays, monthCells, parseClock, toMin } from "../utils";

export type CalView = "day" | "week" | "month";

const pos = (t: string): number => Math.max(0, Math.min(100, ((toMin(t) - GRID_START) / (GRID_END - GRID_START)) * 100));
const jobTop = (schedule: string): number =>
  ((parseClock(schedule.split(",")[1] ?? "9:00 AM") - GRID_START) / (GRID_END - GRID_START)) * 100;

export function Calendar({
  person,
  jobs,
  view,
  day,
  onView,
  onDay,
}: {
  person: string;
  jobs: FakeJob[];
  view: CalView;
  day: number;
  onView: (v: CalView) => void;
  onDay: (d: number) => void;
}): ReactElement {
  const week = SCHEDULES.find((s) => s.name === person)?.blocks ?? [];
  const forDay = (d: number) => week.filter((b) => b.day === d).sort((a, b) => toMin(a.start) - toMin(b.start));
  const jobsForDay = (d: number) =>
    jobs.filter((j) => j.enabled && jobDays(j.schedule).includes(d) && jobDays(j.schedule)[0] === d);

  const timeGrid = (days: number[]) => (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 pb-2.5">
      <div className="grid border-b border-slate-200 bg-slate-50" style={{ gridTemplateColumns: `52px repeat(${days.length}, minmax(0,1fr))` }}>
        <div />
        {days.map((d) => (
          <div key={d} className="border-l border-slate-200 py-2 text-center">
            <span className="text-[0.7rem] font-semibold tracking-wider text-blue-700 uppercase">{DAY_NAMES[d]}</span>
          </div>
        ))}
      </div>
      <div className="relative flex min-h-[520px] flex-1">
        <div className="relative w-[52px] shrink-0">
          {HOURS.map((hh) => (
            <span key={hh} className="absolute right-2 text-[0.68rem] font-medium text-blue-600" style={{ top: hh === GRID_START ? "0px" : `calc(${pos(hhmm(hh))}% - 7px)` }}>
              {fmtHour(hh)}
            </span>
          ))}
        </div>
        <div className="relative grid flex-1" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0,1fr))` }}>
          <div className="pointer-events-none absolute inset-0">
            {HOURS.map((hh) => (
              <div key={hh} className="absolute right-0 left-0 border-t border-slate-100" style={{ top: `${pos(hhmm(hh))}%` }} />
            ))}
          </div>
          {days.map((d) => (
            <div key={d} className="relative border-l border-slate-200">
              {forDay(d).map((b, k) => (
                <div
                  key={k}
                  className="absolute right-1 left-1 overflow-hidden rounded-md border border-brand-deep border-l-[3px] bg-chip px-1.5 py-1"
                  // floor fits both text lines: py-1 (8px) + 2 × leading-tight (~28px) + borders (2px)
                  style={{ top: `${pos(b.start)}%`, height: `max(38px, ${pos(b.end) - pos(b.start)}%)` }}
                  title={`${b.title}, ${b.start} to ${b.end}, ${b.staff}, ${b.place}`}
                >
                  <div className="truncate text-[0.72rem] leading-tight font-semibold text-ink">{b.title}</div>
                  <div className="text-[0.66rem] leading-tight tabular-nums text-brand-deep">
                    {b.start} to {b.end}
                  </div>
                </div>
              ))}
              {jobsForDay(d).map((j) => {
                const top = jobTop(j.schedule);
                if (top < 0 || top > 100) return null;
                return (
                  <div
                    key={j.id}
                    className="absolute right-1 left-1 overflow-visible rounded-md border-[1.5px] border-dashed border-brand-deep bg-white px-1.5 py-1"
                    style={{ top: `${top}%` }}
                    title={`${j.name}, reminder, ${j.schedule}`}
                  >
                    <div className="truncate text-[0.72rem] leading-tight font-semibold text-ink">{j.name}</div>
                    <div className="text-[0.66rem] leading-tight tabular-nums text-brand-deep">
                      {(j.schedule.split(",")[1] ?? "").trim()}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-3.5 xl:col-span-7">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">Calendar</h2>
        <div className="flex rounded-lg bg-slate-100 p-0.5" role="tablist" aria-label="Calendar view">
          {(["day", "week", "month"] as CalView[]).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => onView(v)}
              className={`rounded-md px-3 py-1 text-xs font-bold capitalize transition ${
                view === v ? "bg-white text-brand shadow-sm" : "text-blue-700"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {view === "week" && timeGrid([0, 1, 2, 3, 4])}
      {view === "day" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1" role="tablist" aria-label="Day">
            {DAY_NAMES.map((d, i) => (
              <button
                key={d}
                role="tab"
                aria-selected={day === i}
                onClick={() => onDay(i)}
                className={`flex-1 rounded-md py-1 text-xs font-bold transition ${
                  day === i ? "bg-brand text-white" : "bg-slate-100 text-blue-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          {timeGrid([day])}
        </div>
      )}
      {view === "month" && (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <div className="border-b border-slate-200 px-3 py-2 text-sm font-semibold">September 2026</div>
          <div className="grid grid-cols-7">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d} className="border-b border-slate-200 py-1.5 text-center text-[0.65rem] font-bold tracking-wider text-blue-600 uppercase">
                {d}
              </span>
            ))}
            {monthCells().map((date, i) => {
              const wd = new Date(2026, 8, date ?? 1).getDay() - 1;
              const list = date === null || wd < 0 || wd > 4 ? [] : forDay(wd);
              return (
                <div key={i} className={`min-h-[4.5rem] border-t border-l border-slate-100 p-1 ${date === null ? "bg-slate-50" : ""}`}>
                  <span className={`text-xs font-semibold ${list.length ? "text-brand-deep" : "text-blue-600"}`}>{date ?? ""}</span>
                  {list.slice(0, 2).map((b, k) => (
                    <div key={k} className="mt-0.5 truncate rounded border border-brand-deep bg-chip px-1 text-[0.62rem] font-semibold text-brand-deep">
                      {b.title}
                    </div>
                  ))}
                  {list.length > 2 && <div className="px-1 text-[0.62rem] text-blue-600">{list.length - 2} more</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
