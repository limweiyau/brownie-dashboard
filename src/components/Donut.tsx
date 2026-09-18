import type { ReactElement } from "react";

const R = 44;
const C = 2 * Math.PI * R;

export function Donut({ value, total, size = 80 }: { value: number; total: number; size?: number }): ReactElement {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <span className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="10" className="stroke-chip" />
        {pct > 0 && (
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-brand"
            strokeDasharray={`${(pct / 100) * C} ${C}`}
          />
        )}
      </svg>
      <span className="absolute font-bold text-ink" style={{ fontSize: Math.round(size * 0.19) }}>
        {pct}%
      </span>
    </span>
  );
}
