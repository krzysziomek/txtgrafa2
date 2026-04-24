import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");
const FOLDERS = ["overlay", "ramki", "pozostale"] as const;

export type ManifestEntry = {
  /** Display name (filename without extension, with §-codes stripped). */
  name: string;
  /** Original filename as it lives on disk. */
  file: string;
  /** Public URL (encoded). */
  url: string;
  /** File size in bytes. */
  size: number;
  /** ISO mtime — used to sort newest first. */
  mtime: string;
};

export type Manifest = Record<(typeof FOLDERS)[number], ManifestEntry[]>;

/** Strip Minecraft §x color codes for display name. */
function stripColorCodes(s: string): string {
  return s.replace(/§./g, "").trim();
}

function scanFolder(folder: string): ManifestEntry[] {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith(".zip"));

  const list: ManifestEntry[] = entries.map((d) => {
    const full = path.join(dir, d.name);
    const stat = fs.statSync(full);
    const cleanName = stripColorCodes(d.name.replace(/\.zip$/i, ""));
    return {
      name: cleanName,
      file: d.name,
      url: `/${folder}/${encodeURIComponent(d.name)}`,
      size: stat.size,
      mtime: stat.mtime.toISOString(),
    };
  });
  // Newest first.
  list.sort((a, b) => (a.mtime < b.mtime ? 1 : -1));
  return list;
}

export function generateManifest(): Manifest {
  const manifest = Object.fromEntries(
    FOLDERS.map((f) => [f, scanFolder(f)]),
  ) as Manifest;
  const out = path.join(ROOT, "manifest.json");
  fs.mkdirSync(ROOT, { recursive: true });
  fs.writeFileSync(out, JSON.stringify(manifest, null, 2));
  return manifest;
}

// Allow running directly: `bun scripts/generate-manifest.ts`
const isDirect =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].includes("generate-manifest");
if (isDirect) {
  const m = generateManifest();
  const counts = Object.entries(m).map(([k, v]) => `${k}: ${v.length}`).join(", ");
  // eslint-disable-next-line no-console
  console.log(`✓ manifest.json written (${counts})`);
}
