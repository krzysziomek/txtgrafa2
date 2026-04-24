# Paczka Grafa

Statyczna strona SPA (TanStack Router + Vite + Tailwind v4) z paczkami
Minecraft Grafa. Hostowana na GitHub Pages.

## Lokalnie

```bash
bun install
bun dev          # http://localhost:8080
bun run build    # produkcyjny build → dist/
```

## Dodawanie nowych plików

1. Wrzuć plik `.zip` do odpowiedniego folderu w `public/`:
   - `public/overlay/` — overlaye
   - `public/ramki/` — ramki do rud
   - `public/pozostale/` — pozostałe paczki
2. Commit + push do `main`.
3. GitHub Actions zbuduje i wdroży stronę. `manifest.json` zostanie
   wygenerowany automatycznie (`scripts/generate-manifest.ts`).

Nazwa wyświetlana = nazwa pliku bez rozszerzenia, ze strippowanymi kodami
kolorów Minecrafta (`§b`, `§a`, `§f` itp.). Najnowsze pliki (po dacie
modyfikacji) są zawsze na górze listy.

## Zasoby specjalne (przekierowania)

Aby dany plik nie pobierał się bezpośrednio, tylko otwierał link na zewnętrznej
platformie — dodaj wpis w `src/lib/manifest.ts` w `EXTERNAL_RESOURCES`:

```ts
{ category: "ramki", match: "1.21", url: "https://...", reason: "Najnowsza wersja" }
```

`match` to fragment nazwy (case-insensitive). Pasujący plik dostanie przycisk
"Przejdź" zamiast "Pobierz" oraz komunikat o opuszczeniu strony.

## Deployment

Workflow `.github/workflows/deploy.yml` buduje stronę na każdym pushu do
`main` i publikuje na GitHub Pages. Włącz Pages w ustawieniach repo:
**Settings → Pages → Source: GitHub Actions**.

Dla custom domeny `paczkagrafa.pl` plik `public/CNAME` jest już ustawiony.
W ustawieniach domeny u rejestratora wskaż:

- `A` rekordy: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- lub `CNAME` z subdomeny na `<username>.github.io`

## Routing SPA

`build:gh` kopiuje `dist/index.html` do `dist/404.html` — GitHub Pages serwuje
go jako fallback dla wszystkich nieznanych ścieżek, dzięki czemu deep-linki
(`/jak-korzystac`, `/rzeczy-grafa`) działają po odświeżeniu.
