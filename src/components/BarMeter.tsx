import type { ReactElement } from "react";

export function BarMeter({
  label,
  value,
  total,
  note,
}: {
  label: string;
  value: number;
  total: number;
  note: string;
}): ReactElement {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-[0.8rem] font-semibold text-ink">{label}</h3>
        <span className="flex items-baseline gap-1 whitespace-nowrap">
          <span className="text-[0.8rem] font-bold text-ink">
            {value}/{total}
          </span>
          <span className="text-[0.72rem] font-medium text-blue-600">{note}</span>
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-chip" role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
