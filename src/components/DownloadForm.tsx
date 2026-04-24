import { useMemo, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Download, ExternalLink, ChevronDown } from "lucide-react";
import {
  type Category,
  type Manifest,
  CATEGORY_META,
  findExternal,
  formatBytes,
} from "@/lib/manifest";
import type { ManifestEntry } from "../../scripts/generate-manifest";

interface Props {
  manifest: Manifest;
}

const CATEGORIES: Category[] = ["overlay", "ramki", "pozostale"];

export function DownloadForm({ manifest }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [fileIdx, setFileIdx] = useState<number>(-1);

  const files = category ? manifest[category] : [];

  // Reset file selection when category changes.
  useEffect(() => {
    setFileIdx(category && manifest[category].length > 0 ? 0 : -1);
  }, [category, manifest]);

  const selected: ManifestEntry | null =
    category && fileIdx >= 0 ? files[fileIdx] ?? null : null;

  const external = useMemo(
    () => (category && selected ? findExternal(category, selected.name) : undefined),
    [category, selected],
  );

  function fireConfetti() {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.7 },
      colors: ["#7cba3d", "#f7caa6", "#b68c62", "#dfb696"],
      scalar: 0.9,
      ticks: 120,
    });
  }

  function handleAction() {
    if (!selected || !category) return;
    fireConfetti();
    if (external) {
      window.open(external.url, "_blank", "noopener,noreferrer");
    } else {
      // Same-origin direct download.
      const a = document.createElement("a");
      a.href = selected.url;
      a.download = selected.file;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  return (
    <div className="rounded-xl border-2 border-border bg-card p-5 shadow-pixel sm:p-8">
      {/* Step 1: category cards */}
      <Label step="1" text="Wybierz kategorię" />
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c];
          const isActive = category === c;
          const count = manifest[c].length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={isActive}
              className={`group flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all ${
                isActive
                  ? "border-primary bg-primary/10 shadow-pixel-primary"
                  : "border-border bg-secondary/40 hover:border-primary/60 hover:bg-secondary"
              }`}
            >
              <span className="text-3xl" aria-hidden>
                {meta.emoji}
              </span>
              <span
                className={`font-display text-2xl ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {meta.label}
              </span>
              <span className="text-sm text-muted-foreground">{meta.tagline}</span>
              <span className="mt-1 rounded-sm border border-border bg-background/60 px-2 py-0.5 font-display text-xs text-muted-foreground">
                {count} {count === 1 ? "plik" : "pliki"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step 2: file picker */}
      <div className="mt-8">
        <Label step="2" text="Wybierz wersję / plik" />
        <div className="relative mt-3">
          <select
            disabled={!category || files.length === 0}
            value={fileIdx}
            onChange={(e) => setFileIdx(Number(e.target.value))}
            className="w-full appearance-none rounded-md border-2 border-border bg-background px-4 py-3 pr-12 font-display text-xl text-foreground transition-colors focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!category && <option value={-1}>Najpierw wybierz kategorię…</option>}
            {category && files.length === 0 && (
              <option value={-1}>Brak plików w tej kategorii</option>
            )}
            {files.map((f, i) => (
              <option key={f.file} value={i}>
                {f.name} · {formatBytes(f.size)}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
        </div>
      </div>

      {/* Step 3: action button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleAction}
          disabled={!selected}
          className="group flex w-full items-center justify-center gap-3 rounded-lg border-2 border-primary bg-primary px-6 py-5 font-display text-3xl text-primary-foreground shadow-pixel-primary transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
        >
          {external ? (
            <>
              <ExternalLink className="h-7 w-7" />
              Przejdź
            </>
          ) : (
            <>
              <Download className="h-7 w-7" />
              {selected ? "Pobierz" : "Wybierz plik"}
            </>
          )}
        </button>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {external ? (
            <span className="inline-flex items-center gap-2 rounded-md border-2 border-primary/40 bg-primary/10 px-3 py-2 text-foreground">
              <ExternalLink className="h-4 w-4 text-primary" />
              Uwaga — zostaniesz przeniesiony na inną stronę
              {external.reason ? `: ${external.reason}` : "."}
            </span>
          ) : selected ? (
            <>
              Bezpośrednie pobieranie · {formatBytes(selected.size)} ·{" "}
              <code className="font-mono text-xs">{selected.file}</code>
            </>
          ) : (
            <>Wybierz kategorię i plik, aby aktywować przycisk.</>
          )}
        </p>
      </div>
    </div>
  );
}

function Label({ step, text }: { step: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-primary bg-primary/20 font-display text-xl text-primary">
        {step}
      </span>
      <span className="font-display text-2xl text-foreground">{text}</span>
    </div>
  );
}
