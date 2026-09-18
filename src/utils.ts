export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const GRID_START = 8 * 60;
export const GRID_END = 18 * 60;
export const HOURS = Array.from({ length: (GRID_END - GRID_START) / 60 + 1 }, (_, i) => GRID_START + i * 60);

export function pctChange(curr: number, prev: number): number {
  return prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;
}

export function toMin(t: string): number {
  let [h, m] = t.split(":").map(Number);
  if (h < 8) h += 12;
  return h * 60 + m;
}

export function fmtHour(min: number): string {
  const h = Math.floor(min / 60);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12} ${h >= 12 ? "PM" : "AM"}`;
}

export function hhmm(min: number): string {
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}

export function jobDays(schedule: string): number[] {
  const day = schedule.split(",")[0].trim().toLowerCase();
  const map: Record<string, number[]> = {
    monday: [0],
    tuesday: [1],
    wednesday: [2],
    thursday: [3],
    friday: [4],
    fridays: [4],
    weekdays: [0, 1, 2, 3, 4],
    daily: [0, 1, 2, 3, 4],
  };
  return map[day] ?? [0, 1, 2, 3, 4];
}

export function parseClock(t: string): number {
  const m = t.trim().match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!m) return 9 * 60;
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + Number(m[2]);
}

export function monthCells(): (number | null)[] {
  const first = new Date(2026, 8, 1).getDay();
  const days = new Date(2026, 9, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
