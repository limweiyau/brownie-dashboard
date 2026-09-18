import { CaretDown } from "@phosphor-icons/react";
import { useState, type ReactElement, type ReactNode } from "react";

export function NavDrop({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
          open ? "bg-slate-200/70 text-ink" : "text-blue-800 hover:bg-slate-200/60"
        }`}
      >
        {label}
        <CaretDown size={14} weight="bold" className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <>
          <span className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden />
          <div
            className={`absolute right-0 z-30 mt-1 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl ${
              wide ? "w-80" : "w-72"
            }`}
          >
            {children}
          </div>
        </>
      )}
    </span>
  );
}
