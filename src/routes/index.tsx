import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSeo } from "@/hooks/useSeo";
import { DownloadForm } from "@/components/DownloadForm";
import type { Manifest } from "@/lib/manifest";
import grafLogo from "/graf.svg?url";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  useSeo({
    title: "Paczka Grafa — Overlay, Ramki Rud i pliki Minecraft",
    description:
      "Pobierz oficjalne overlaye, ramki do rud oraz dodatkowe pliki używane przez Grafa w Minecraft. Zawsze najnowsze wersje, prosto i bez reklam.",
  });

  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}manifest.json`, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Manifest) => {
        if (!cancelled) setManifest(data);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-dirt-pattern">
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 text-center sm:pt-20">
        <img
          src={grafLogo}
          alt="Logo Grafa — pixelowa twarz w stylu Minecraft"
          className="pixelated mx-auto mb-6 h-24 w-24 drop-shadow-[4px_4px_0_color-mix(in_oklab,var(--color-primary)_40%,transparent)] sm:h-32 sm:w-32"
          width={128}
          height={128}
        />
        <h1 className="font-display text-5xl text-foreground sm:text-7xl">
          Paczka <span className="text-primary">Grafa</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Wybierz kategorię, wersję i pobierz. Wszystkie overlaye, ramki do rud
          i dodatki Grafa w jednym miejscu.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:pb-24">
        {error && (
          <div className="rounded-md border-2 border-destructive bg-destructive/10 p-4 text-center text-destructive-foreground">
            Nie udało się załadować listy plików: {error}
          </div>
        )}
        {!manifest && !error && (
          <div className="rounded-md border-2 border-border bg-card p-6 text-center font-display text-xl text-muted-foreground">
            Ładowanie paczki...
          </div>
        )}
        {manifest && <DownloadForm manifest={manifest} />}
      </section>
    </div>
  );
}
