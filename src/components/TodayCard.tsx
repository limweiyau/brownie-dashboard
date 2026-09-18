import { CalendarDots } from "@phosphor-icons/react";
import type { ReactElement } from "react";
import type { FakeEvent } from "../data";

export function TodayCard({
  events,
}: {
  events: FakeEvent[];
}): ReactElement {
  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-3.5">
      <h2 className="flex items-center gap-1 text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">
        <CalendarDots size={12} />
        Today at the centre
      </h2>
      <ul className="mt-2">
        {events.map((e) => (
          <li
            key={e.title}
            className="flex items-baseline gap-2.5 border-t border-slate-100 py-1.5 first:border-t-0"
          >
            <span className="w-16 shrink-0 text-[0.72rem] font-semibold whitespace-nowrap text-blue-600">
              {e.time}
            </span>
            <span className="min-w-0 text-[0.82rem] font-semibold text-ink">
              {e.title}
              {e.note && (
                <span className="block text-[0.72rem] font-normal text-blue-600">
                  {e.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
