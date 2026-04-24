import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink, MousePointerClick, Package } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

export const Route = createFileRoute("/jak-korzystac")({
  component: HowToPage,
});

const steps = [
  {
    icon: Package,
    title: "1. Wybierz kategorię",
    body: "Na stronie głównej kliknij jedną z trzech kart: Overlay, Ramki Rud lub Pozostałe. To zdecyduje jaki rodzaj paczki pobierasz.",
  },
  {
    icon: MousePointerClick,
    title: "2. Wybierz wersję",
    body: "Druga lista pokazuje pliki z wybranej kategorii — najnowsze na górze. Nazwy zawierają wersję Minecrafta i datę wydania.",
  },
  {
    icon: Download,
    title: "3. Pobierz",
    body: "Kliknij duży zielony przycisk. Plik .zip zapisze się na Twój dysk. Niektóre zasoby otwierają się w nowej karcie — informacja pojawi się pod przyciskiem.",
  },
  {
    icon: ExternalLink,
    title: "4. Wgraj do Minecrafta",
    body: 'W Minecraft otwórz Opcje → Pakiety zasobów → "Otwórz folder paczek". Przeciągnij pobrany .zip do tego folderu, wróć do gry i aktywuj paczkę.',
  },
];

function HowToPage() {
  useSeo({
    title: "Jak korzystać? — Paczka Grafa",
    description:
      "Krótka instrukcja jak pobrać i zainstalować overlay lub ramki do rud Grafa w Minecraft. Cztery proste kroki.",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-5xl text-foreground sm:text-6xl">
          Jak <span className="text-primary">korzystać?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Cztery proste kroki — od pobrania do gry z overlayem Grafa.
        </p>
      </header>

      <ol className="space-y-4">
        {steps.map((s) => (
          <li
            key={s.title}
            className="flex gap-4 rounded-lg border-2 border-border bg-card p-5 shadow-pixel"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-border bg-secondary text-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">{s.title}</h2>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="mt-10 rounded-lg border-2 border-primary/40 bg-primary/5 p-5">
        <h3 className="font-display text-2xl text-primary">Wskazówka</h3>
        <p className="mt-1 text-muted-foreground">
          Jeśli używasz Optifine lub innego moda, niektóre overlaye działają
          tylko przy wyłączonych shaderach. Przed użyciem sprawdź zgodność
          wersji Minecrafta z nazwą paczki.
        </p>
      </aside>
    </div>
  );
}
