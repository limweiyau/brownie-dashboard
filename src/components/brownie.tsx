import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { PWID_PROFILES } from "../data";

/**
 * Each resident's Brownie can be switched on or off. State lives here so the
 * navbar control panel and the resident profile card's own switch agree.
 */
type BrownieContextValue = {
  isOn: (slug: string) => boolean;
  setOn: (slug: string, value: boolean) => void;
  setAll: (value: boolean) => void;
};

const BrownieContext = createContext<BrownieContextValue>({
  isOn: () => true,
  setOn: () => {},
  setAll: () => {},
});

export function BrownieProvider({ children }: { children: ReactNode }): ReactElement {
  const [map, setMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PWID_PROFILES.map((p) => [p.slug, true])),
  );

  const isOn = useCallback((slug: string) => map[slug] ?? true, [map]);
  const setOn = useCallback(
    (slug: string, value: boolean) => setMap((m) => ({ ...m, [slug]: value })),
    [],
  );
  const setAll = useCallback(
    (value: boolean) =>
      setMap(Object.fromEntries(PWID_PROFILES.map((p) => [p.slug, value]))),
    [],
  );

  const value = useMemo(() => ({ isOn, setOn, setAll }), [isOn, setOn, setAll]);

  return <BrownieContext.Provider value={value}>{children}</BrownieContext.Provider>;
}

export function useBrownies(): BrownieContextValue {
  return useContext(BrownieContext);
}
