import type { ManifestEntry } from "../../scripts/generate-manifest";

export type Category = "overlay" | "ramki" | "pozostale";

export type Manifest = Record<Category, ManifestEntry[]>;

export const CATEGORY_META: Record<
  Category,
  { label: string; tagline: string; emoji: string }
> = {
  overlay: {
    label: "Overlay",
    tagline: "Texture packi z overlayem Grafa",
    emoji: "🎨",
  },
  ramki: {
    label: "Ramki Rud",
    tagline: "Wyróżnij rudy w jaskiniach",
    emoji: "💎",
  },
  pozostale: {
    label: "Pozostałe",
    tagline: "Dodatkowe paczki i drobiazgi",
    emoji: "📦",
  },
};

/**
 * Resources that live on an external platform — clicking them should redirect
 * instead of triggering a direct download. Match by category + filename
 * substring (case-insensitive). Empty by default; expand as needed.
 */
type ExternalRule = {
  category: Category;
  /** Substring to match against the (color-stripped) display name. */
  match: string;
  /** External URL to redirect to. */
  url: string;
  /** Optional human label. */
  reason?: string;
};

export const EXTERNAL_RESOURCES: ExternalRule[] = [
  // Example (disabled until the user provides a URL):
  // { category: "ramki", match: "1.21", url: "https://...", reason: "Najnowsza wersja na zewnętrznej platformie" },
];

export function findExternal(category: Category, name: string) {
  const lower = name.toLowerCase();
  return EXTERNAL_RESOURCES.find(
    (r) => r.category === category && lower.includes(r.match.toLowerCase()),
  );
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}
