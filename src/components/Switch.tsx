import type { ReactElement } from "react";

export function Switch({ on, label, onFlip, small }: { on: boolean; label: string; onFlip: () => void; small?: boolean }): ReactElement {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onFlip}
      className={`relative shrink-0 rounded-full transition-colors ${small ? "h-5 w-9" : "h-6 w-11"} ${on ? "bg-brand" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform ${small ? "size-4" : "size-5"} ${
          on ? (small ? "translate-x-4" : "translate-x-5") : ""
        }`}
      />
    </button>
  );
}
