import { Bell, CalendarDots, Clock } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useBrownies } from "../components/brownie";
import { MetricsBand } from "../components/MetricsBand";
import { Switch } from "../components/Switch";
import { JOBS, PWID_PROFILES, SCHEDULES, SESSIONS } from "../data";
import { fmtHour, toMin } from "../utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const today = Math.min(Math.max(new Date().getDay() - 1, 0), 4);
  const brownies = useBrownies();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6">
      <MetricsBand />
      <h2 className="mt-5 mb-2 text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">
        Residents
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PWID_PROFILES.map((p) => {
          const blocks = (
            SCHEDULES.find((s) => s.name === p.name)?.blocks ?? []
          )
            .filter((b) => b.day === today)
            .sort((a, b) => toMin(a.start) - toMin(b.start));
          const next = blocks[0];
          const reminderCount = JOBS.filter(
            (j) => j.who === p.name && j.enabled,
          ).length;
          const lastSeen = SESSIONS.find((s) => s.who === p.name)?.when;
          const brownieOn = brownies.isOn(p.slug);
          return (
            <div key={p.slug} className="group relative">
              <Link
                to="/residents/$name"
                params={{ name: p.slug }}
                className={`flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-brand/40 hover:shadow-md ${
                  brownieOn ? "" : "opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 pr-16">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-chip">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="size-full object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-ink">
                      {p.name}{" "}
                      <span className="font-medium text-sub">({p.age})</span>
                    </h3>
                    <p className="truncate text-[0.78rem] text-sub">{p.likes}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-t border-slate-100 pt-2.5 text-[0.78rem] text-sub">
                  <p className="flex items-center gap-1.5">
                    <CalendarDots size={13} className="shrink-0 text-blue-600" />
                    <span className="truncate">
                      {next
                        ? `${next.title} · ${fmtHour(toMin(next.start))}`
                        : "Nothing scheduled today"}
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Bell size={13} className="shrink-0 text-blue-600" />
                    {reminderCount} active reminder
                    {reminderCount === 1 ? "" : "s"}
                  </p>
                  {lastSeen && (
                    <p
                      className="flex items-center gap-1.5 font-medium text-blue-600"
                      title="Last seen"
                    >
                      <Clock size={13} className="shrink-0" />
                      Last seen {lastSeen}
                    </p>
                  )}
                </div>
              </Link>

              {/* Resident's Brownie on/off — sits above the card link so the
                  switch never triggers navigation. */}
              <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-end gap-1">
                <Switch
                  small
                  on={brownieOn}
                  label={`${p.name}'s Brownie ${p.brownieId}`}
                  onFlip={() => brownies.setOn(p.slug, !brownieOn)}
                />
                <span
                  className={`text-[0.58rem] font-bold tracking-wider tabular-nums uppercase ${
                    brownieOn ? "text-brand" : "text-sub"
                  }`}
                >
                  Brownie {p.brownieId}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
