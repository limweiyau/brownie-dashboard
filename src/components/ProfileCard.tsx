import { Brain, MapPin, Phone } from "@phosphor-icons/react";
import { type ReactElement } from "react";
import type { PwidProfile } from "../data";
import { useBrownies } from "./brownie";

export function ProfileCard({ who }: { who: PwidProfile }): ReactElement {
  const brownieOn = useBrownies().isOn(who.slug);

  return (
    <section
      className={`rounded-xl border bg-white p-3.5 transition ${
        brownieOn ? "border-slate-200" : "border-slate-200/70 opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-chip">
          <img src={who.avatar} alt={who.name} className="size-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg leading-tight font-bold text-ink">
            {who.name}{" "}
            <span className="text-base font-medium text-sub">({who.age})</span>
          </h2>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="flex items-center gap-1.5 text-[0.83rem] text-sub">
              <MapPin size={14} className="shrink-0 text-blue-600" />
              <span className="truncate">{who.address}</span>
            </p>
            <p className="flex items-center gap-1.5 text-[0.83rem] tabular-nums text-sub">
              <Phone size={14} className="shrink-0 text-blue-600" />
              {who.phone}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wider tabular-nums uppercase ${
            brownieOn ? "bg-chip text-brand" : "bg-slate-100 text-sub"
          }`}
        >
          Brownie {who.brownieId}
        </span>
      </div>

      {!brownieOn && (
        <p className="mt-3 rounded-lg bg-slate-50 px-2.5 py-2 text-[0.8rem] font-medium text-sub">
          {who.name}'s Brownie ({who.brownieId}) is switched off. Turn it back
          on from the home dashboard.
        </p>
      )}

      <div className="mt-3 border-t border-slate-100 pt-2.5">
        <p className="mb-1.5 flex items-center gap-1 text-[0.64rem] font-bold tracking-wider text-blue-600 uppercase">
          <Brain size={12} weight="fill" className="text-brand" />
          Brownie's memories
        </p>
        <ul className="flex flex-col gap-1">
          {who.memories.map((m) => (
            <li
              key={m}
              className="flex items-start gap-2 text-[0.8rem] leading-snug text-sub"
            >
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/50" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

