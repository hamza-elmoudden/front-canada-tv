import { DEFAULT_LOCALE, getDict, localePath, t, type Locale } from "./i18n";
import type { ContactInfo, LocaleValue, Navbar } from "./sanity/types";

export const SITE_NAME = "IPTV Pro";

export type NavItem = { label: string; href: string };

const ROUTES = [
  { href: "/", keys: ["home", "accueil", "start"], fallback: "home" },
  { href: "/about", keys: ["about", "propos"], fallback: "about" },
  { href: "/#plans", keys: ["plan", "paln", "pricing", "price", "forfait", "tarif", "prix"], fallback: "plans" },
  { href: "/faq", keys: ["faq", "question"], fallback: "faq" },
  { href: "/blog", keys: ["blog", "news", "nouvelles", "article"], fallback: "blog" },
  { href: "/contact", keys: ["contact", "joindre"], fallback: "contact" },
] as const;

/**
 * The navbar document only stores labels (`names[]`), so each label is
 * matched to a route by keyword in its English or French text. A label that
 * matches no keyword takes the route at the same position.
 */
export function buildNav(navbar: Navbar, locale: Locale): NavItem[] {
  const ui = getDict(locale);
  const names = (navbar?.names ?? []).filter(Boolean) as LocaleValue[];
  if (names.length === 0) {
    return ROUTES.map((r) => ({ label: ui.nav[r.fallback], href: localePath(locale, r.href) }));
  }
  return names.map((name, i) => {
    const haystack = `${name?.en ?? ""} ${name?.fr ?? ""}`.toLowerCase();
    const route =
      ROUTES.find((r) => r.keys.some((k) => haystack.includes(k))) ??
      ROUTES[i % ROUTES.length];
    return { label: t(name, locale) || ui.nav[route.fallback], href: localePath(locale, route.href) };
  });
}

export function whatsappLink(contact: ContactInfo, text?: string) {
  const digits = contact?.whatsapp?.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** The site sells in Canadian dollars only. */
export const CURRENCY = "CAD";

/** ISO 4217 code for JSON-LD. Always CAD, whatever the plan's Sanity `currency` says. */
export function currencyCode() {
  return CURRENCY;
}

/** Price in Canadian dollars, e.g. "58 CAD" (French uses a decimal comma: "58,99 CAD"). */
export function formatPrice(price?: number, _currency?: string, locale: Locale = DEFAULT_LOCALE) {
  if (price == null) return "—";
  const amount = Number.isInteger(price) ? String(price) : price.toFixed(2).replace(".", locale === "fr" ? "," : ".");
  return `${amount} CAD`;
}
