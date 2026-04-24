import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import grafLogo from "/graf.svg?url";

const navLinks = [
  { to: "/jak-korzystac", label: "Jak korzystać?" },
  { to: "/rzeczy-grafa", label: "Rzeczy Grafa" },
] as const;

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={grafLogo}
            alt="Logo Grafa"
            className="pixelated h-10 w-10 transition-transform group-hover:scale-110"
            width={40}
            height={40}
          />
          <span className="font-display text-2xl text-foreground transition-colors group-hover:text-primary">
            Paczka Grafa
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-4 py-2 font-display text-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeButton theme={theme} onToggle={toggle} />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeButton theme={theme} onToggle={toggle} />
          <button
            type="button"
            aria-label="Otwórz menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-card hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t-2 border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 font-display text-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-primary bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function ThemeButton({
  theme,
  onToggle,
}: {
  theme: "dark" | "light";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Włącz motyw jasny" : "Włącz motyw ciemny"}
      title={theme === "dark" ? "Motyw jasny" : "Motyw ciemny"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-card text-foreground transition-colors hover:bg-secondary hover:text-primary"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
