import { useState, type ReactElement } from "react";
import { JOBS, PWID_PROFILES, type FakeJob } from "../data";
import { DAY_NAMES, jobDays } from "../utils";
import { Calendar, type CalView } from "./Calendar";
import { InfoSection } from "./InfoSection";
import { ProfileCard } from "./ProfileCard";
import { Reminders } from "./Reminders";

export function ResidentDashboard({ slug }: { slug: string }): ReactElement {
  const who = PWID_PROFILES.find((p) => p.slug === slug) ?? PWID_PROFILES[0];
  const [jobs, setJobs] = useState<FakeJob[]>(JOBS);
  const [calView, setCalView] = useState<CalView>("week");
  const [calDay, setCalDay] = useState(() => Math.min(Math.max(new Date().getDay() - 1, 0), 4));

  const flipJob = (id: string) => setJobs((js) => js.map((j) => (j.id === id ? { ...j, enabled: !j.enabled } : j)));
  const removeJob = (id: string) => setJobs((js) => js.filter((j) => j.id !== id));
  const addJob = () =>
    setJobs((js) => [...js, { id: `j${Date.now()}`, name: "New reminder", who: "Everyone", schedule: "Weekdays, 9:00 AM", enabled: true }]);

  const myJobs = jobs.filter((j) => j.who === who.name || j.who === "Everyone" || j.who === "Brownie");
  const visibleJobs = calView === "day" ? myJobs.filter((j) => jobDays(j.schedule).includes(calDay)) : myJobs;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6">
      <div className="grid items-stretch gap-3 xl:grid-cols-12">
        <Calendar
          person={who.name}
          jobs={myJobs}
          view={calView}
          day={calDay}
          onView={setCalView}
          onDay={setCalDay}
        />

        {/* Right rail: profile, care notes above reminders */}
        <div className="flex flex-col gap-3 xl:col-span-5">
          <ProfileCard who={who} />
          <InfoSection
            title="Care notes"
            rows={[
              ["Key note", who.watch],
              ["Allergies", who.allergies],
              ["Emergency", `${who.guardian}, ${who.phone}`],
            ]}
          />
          <Reminders
            title={`Reminders${calView === "day" ? ` · ${DAY_NAMES[calDay]}` : ""}`}
            jobs={visibleJobs}
            onAdd={addJob}
            onRemove={removeJob}
            onFlip={flipJob}
          />
        </div>
      </div>
    </div>
  );
}
