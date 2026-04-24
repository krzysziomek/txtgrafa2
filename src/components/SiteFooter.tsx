export function SiteFooter() {
  return (
    <footer className="border-t-2 border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
        <p>
          © {new Date().getFullYear()} Paczka Grafa — fanowska strona z plikami Grafa.
        </p>
        <p className="font-display text-base">
          Made with <span className="text-primary">█</span> for the community
        </p>
      </div>
    </footer>
  );
}
