import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cookie-consent";
const VALIDITY_MS = 182 * 24 * 60 * 60 * 1000;

type Stored = { analytics: boolean; date: string };
type State = { choice: Stored | null; panelOpen: boolean };

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    const age = Date.now() - new Date(parsed.date).getTime();
    if (typeof parsed.analytics !== "boolean" || !(age >= 0 && age < VALIDITY_MS)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

let state: State = { choice: typeof window === "undefined" ? null : read(), panelOpen: false };
const listeners = new Set<() => void>();

function update(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function setAnalyticsConsent(analytics: boolean) {
  const choice: Stored = { analytics, date: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // stockage indisponible : le choix vaut pour la session seulement
  }
  update({ choice, panelOpen: false });
}

export function openConsentPanel() {
  update({ panelOpen: true });
}

export function closeConsentPanel() {
  update({ panelOpen: false });
}

export function useConsent() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

export function deleteAnalyticsCookies() {
  const host = window.location.hostname.split(".");
  const domains = [undefined, ...host.map((_, i) => `.${host.slice(i).join(".")}`)];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat)/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}
