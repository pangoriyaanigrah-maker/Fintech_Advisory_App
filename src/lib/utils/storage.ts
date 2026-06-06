/**
 * SSR-safe localStorage JSON helpers for the mock data layer.
 *
 * On the server (`window` undefined) reads return the fallback and writes are
 * no-ops, so repositories can persist session state in the browser without
 * breaking server rendering. Because React Query only fetches on the client
 * here (the server render shows skeletons), persisted data flows in after
 * hydration and never causes a markup mismatch.
 */
export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota / serialization errors — persistence is best-effort */
  }
}
