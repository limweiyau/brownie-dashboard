import { CaretRight, Plus, Trash } from "@phosphor-icons/react";
import { Link, useParams } from "@tanstack/react-router";
import { useState, type ReactElement } from "react";
import { PROFILES, PWID_PROFILES, SERVERS, SKILLS, type FakeServer, type SkillDef } from "../data";
import { NavDrop } from "./NavDrop";
import { Switch } from "./Switch";

export function NavBar(): ReactElement {
  const params = useParams({ strict: false });
  const slug = typeof params.name === "string" ? params.name : undefined;
  const current = PWID_PROFILES.find((p) => p.slug === slug) ?? PWID_PROFILES[0];
  const onResident = PWID_PROFILES.some((p) => p.slug === slug);

  const profile = PROFILES[0];
  const [skillList, setSkillList] = useState<SkillDef[]>(SKILLS);
  const [enabledSkills, setEnabledSkills] = useState<Record<string, Set<string>>>(
    Object.fromEntries(PWID_PROFILES.map((p) => [p.name, p.enabledSkills])),
  );
  const [servers, setServers] = useState<FakeServer[]>(SERVERS);
  const residentSkills = enabledSkills[current.name] ?? new Set<string>();

  const toggleSkill = (name: string) =>
    setEnabledSkills((s) => {
      const next = new Set(s[current.name]);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return { ...s, [current.name]: next };
    });
  const addSkill = () => {
    const name = `new-skill-${skillList.length + 1}`;
    setSkillList((ls) => [...ls, { name, label: "New skill" }]);
    setEnabledSkills((s) => {
      const next = new Set(s[current.name]);
      next.add(name);
      return { ...s, [current.name]: next };
    });
  };
  const flipServer = (name: string) =>
    setServers((ss) => ss.map((m) => (m.name === name ? { ...m, enabled: !m.enabled } : m)));
  const removeServer = (name: string) => setServers((ss) => ss.filter((m) => m.name !== name));
  const addServer = () => setServers((ss) => [...ss, { name: `new-app-${ss.length + 1}`, tools: 1, enabled: false }]);

  return (
    <div className="px-4 pt-3 sm:px-6">
      <header className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <Link to="/" aria-label="Brownie home" className="flex items-center gap-2">
            <img src="/brownie.png" width={30} height={30} alt="Brownie" className="rounded-lg" />
            <span className="font-bold">Brownie</span>
          </Link>
          {onResident && (
            <span className="flex items-center gap-1.5">
              <CaretRight size={11} weight="bold" className="text-blue-500" aria-hidden />
              <span className="text-sm font-semibold text-ink">{current.name}</span>
            </span>
          )}
        </nav>
        <nav className="flex items-center gap-1" aria-label="Brownie tools">
          {onResident && (
          <NavDrop label="Skills">
            <ul>
              {skillList.map((s) => (
                <li key={s.name} className="flex items-center gap-3 border-t border-slate-100 py-2.5 first:border-t-0">
                  <span className="min-w-0 flex-1 truncate text-[0.83rem] font-medium">{s.label}</span>
                  <Switch small on={residentSkills.has(s.name)} label={s.label} onFlip={() => toggleSkill(s.name)} />
                </li>
              ))}
            </ul>
            <button onClick={addSkill} className="text-brand mt-2 flex items-center gap-1.5 text-xs font-semibold hover:underline">
              <Plus size={14} /> Add skill
            </button>
          </NavDrop>
          )}
          <NavDrop label="MCP">
            <ul>
              {servers.map((m) => (
                <li key={m.name} className="flex items-center gap-3 border-t border-slate-100 py-2.5 first:border-t-0">
                  <span className="min-w-0 flex-1 truncate text-[0.83rem] font-medium">{m.name}</span>
                  <button onClick={() => removeServer(m.name)} aria-label={`Delete ${m.name}`} className="p-0.5 text-blue-500 hover:text-[#ff3b30]">
                    <Trash size={14} />
                  </button>
                  <Switch small on={m.enabled} label={`${m.name} connection`} onFlip={() => flipServer(m.name)} />
                </li>
              ))}
            </ul>
            <button onClick={addServer} className="text-brand mt-2 flex items-center gap-1.5 text-xs font-semibold hover:underline">
              <Plus size={14} /> Add app
            </button>
          </NavDrop>
          <NavDrop label="About" wide>
            <p className="text-xs leading-relaxed text-blue-700">
              {profile.description} Runs on {profile.model}. Remembers {profile.memoryNotes} centre notes and{" "}
              {profile.personNotes} people notes.
            </p>
            <pre className="mt-2 max-h-64 overflow-y-auto rounded-lg bg-slate-50 p-2.5 text-[0.68rem] leading-relaxed whitespace-pre-wrap text-blue-800">
              {profile.soul}
            </pre>
          </NavDrop>
        </nav>
        </div>
      </header>
    </div>
  );
}
