import { createFileRoute } from "@tanstack/react-router";
import {
  Wallpaper,
  Monitor,
  Shirt,
  Cpu,
  Gamepad2,
  Wrench,
  ExternalLink,
  Download as DownloadIcon,
  type LucideIcon,
} from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

export const Route = createFileRoute("/rzeczy-grafa")({
  component: ThingsPage,
});

type LinkItem = { text: string; url: string; external: boolean };

interface MiscItem {
  title: string;
  icon: LucideIcon;
  content: string;
  links: LinkItem[];
}

const miscItems: MiscItem[] = [
  {
    title: "Tapeta",
    icon: Wallpaper,
    content: "Tapety Grafa na pulpit.",
    links: [
      {
        text: "Pepe (żaba)",
        url: "https://steamcommunity.com/sharedfiles/filedetails/?id=1406608111",
        external: true,
      },
      {
        text: "Honda (samochód)",
        url: "https://x.com/smietankowedni/status/1733824774709686505",
        external: true,
      },
    ],
  },
  {
    title: "Lunar Client",
    icon: Monitor,
    content: "Gotowa konfiguracja dla Lunar Client.",
    links: [
      { text: "Pobierz config", url: "/pliki/Profile 599065437.zip", external: false },
    ],
  },
  {
    title: "Peleryna Optifine",
    icon: Shirt,
    content: "Pelerynka Grafa dla Optifine.",
    links: [
      {
        text: "Zobacz pelerynę",
        url: "https://coolshoes.moxvallix.com/banner?=aaozaeooooaFbK",
        external: true,
      },
    ],
  },
  {
    title: "Sprzęt",
    icon: Cpu,
    content: "Lista sprzętu używanego przez Grafa.",
    links: [
      { text: "Zobacz sprzęt", url: "http://bit.ly/SprzetGrafa", external: true },
    ],
  },
  {
    title: "Kwadratowa Masakra",
    icon: Gamepad2,
    content: "Wymagane: Fabric. Paczka modów dla serii.",
    links: [
      { text: "Fabric", url: "https://fabricmc.net/", external: true },
      {
        text: "Paczka modów",
        url: "/pliki/kwadratowa-masakra-mody-FABRIC-1.17.zip",
        external: false,
      },
    ],
  },
  {
    title: "Strumyk Modowo",
    icon: Wrench,
    content: "Wymagane: Forge. Paczka modów dla serii.",
    links: [
      {
        text: "Forge",
        url: "https://files.minecraftforge.net/",
        external: true,
      },
      {
        text: "Paczka modów",
        url: "/pliki/strumyk-modowo1.16.3.zip",
        external: false,
      },
    ],
  },
];

function ThingsPage() {
  useSeo({
    title: "Rzeczy Grafa — tapety, configi, sprzęt i mody",
    description:
      "Dodatkowe materiały Grafa: tapety, konfiguracja Lunar Client, peleryna Optifine, sprzęt oraz paczki modów do serii Kwadratowa Masakra i Strumyk Modowo.",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-5xl text-foreground sm:text-6xl">
          Rzeczy <span className="text-primary">Grafa</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Wszystko poza paczkami — tapety, configi, sprzęt i mody.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {miscItems.map((item) => (
          <li
            key={item.title}
            className="flex flex-col rounded-lg border-2 border-border bg-card p-5 shadow-pixel transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-border bg-secondary text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl text-foreground">{item.title}</h2>
            </div>
            <p className="mt-3 flex-1 text-muted-foreground">{item.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.links.map((l) => (
                <a
                  key={l.text}
                  href={l.url}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-primary/10 px-3 py-2 font-display text-base text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {l.external ? (
                    <ExternalLink className="h-4 w-4" />
                  ) : (
                    <DownloadIcon className="h-4 w-4" />
                  )}
                  {l.text}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
