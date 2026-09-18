import type { ReactElement } from "react";

export function InfoSection({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}): ReactElement {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="mb-0.5 text-[0.72rem] font-bold tracking-widest text-blue-600 uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex gap-3 border-t border-slate-100 py-1.5 first:border-t-0"
          >
            <dt className="w-16 shrink-0 pt-0.5 text-[0.64rem] font-bold tracking-wider text-blue-600 uppercase">
              {k}
            </dt>
            <dd className="text-[0.83rem] leading-snug font-medium">{v}</dd>
          </div>
        ))}
      </div>
    </section>
  );
}
