import { Plus, Trash } from "@phosphor-icons/react";
import type { ReactElement } from "react";
import type { FakeJob } from "../data";
import { Switch } from "./Switch";

export function Reminders({
  title,
  jobs,
  onAdd,
  onRemove,
  onFlip,
}: {
  title: string;
  jobs: FakeJob[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onFlip: (id: string) => void;
}): ReactElement {
  return (
    <section className="flex-1 rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">{title}</h2>
        <button onClick={onAdd} aria-label="Add reminder" className="rounded-md p-1 text-blue-600 hover:bg-slate-100 hover:text-brand">
          <Plus size={16} />
        </button>
      </div>
      <ul>
        {jobs.map((j) => (
          <li key={j.id} className="group flex items-center gap-2 border-t border-slate-100 py-1.5 first:border-t-0">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.86rem] font-semibold">{j.name}</span>
              <span className="text-xs text-blue-600">{j.schedule}</span>
            </span>
            <button onClick={() => onRemove(j.id)} aria-label={`Delete ${j.name}`} className="p-0.5 text-blue-500 hover:text-[#ff3b30]">
              <Trash size={14} />
            </button>
            <Switch small on={j.enabled} label={`${j.name} reminder`} onFlip={() => onFlip(j.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
