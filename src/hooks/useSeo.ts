import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

const SITE_URL = "https://paczkagrafa.pl";
const DEFAULT_IMAGE = `${SITE_URL}/graf.svg`;

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Updates document title and meta tags for SPA routes. Index.html ships full
 * defaults so social crawlers that don't run JS still get good metadata.
 */
export function useSeo({ title, description, canonical, image }: SeoOptions) {
  useEffect(() => {
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:image"]', "property", "og:image", image ?? DEFAULT_IMAGE);

    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image ?? DEFAULT_IMAGE);

    const url = canonical ?? `${SITE_URL}${window.location.pathname}`;
    setLink("canonical", url);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
  }, [title, description, canonical, image]);
}
