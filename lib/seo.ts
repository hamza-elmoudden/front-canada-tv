import type { Metadata } from "next";
import { LOCALES, localePath, t, type Locale } from "./i18n";
import { siteUrl } from "./sanity/env";
import { hasImage, urlFor } from "./sanity/image";
import type { Seo } from "./sanity/types";
import { SITE_NAME } from "./site";

/** `path` is the locale-less app path, e.g. "/plans". */
type Fallback = { title?: string; description?: string; path: string };

/** Maps a Sanity `seo` object onto Next metadata, with page-level fallbacks. */
export function buildMetadata(seo: Seo | undefined, fallback: Fallback, locale: Locale): Metadata {
  const tr = (f: Parameters<typeof t>[0]) => t(f, locale);
  const title = tr(seo?.metaTitle) || fallback.title || SITE_NAME;
  const description = tr(seo?.metaDescription) || fallback.description || undefined;
  const canonical = seo?.canonicalUrl || `${siteUrl}${localePath(locale, fallback.path)}`;
  const languages: Record<string, string> = Object.fromEntries(
    LOCALES.map((l) => [l, `${siteUrl}${localePath(l, fallback.path)}`]),
  );
  languages["x-default"] = languages.en;
  const ogImage = hasImage(seo?.ogImage)
    ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    // An editor-written metaTitle is used verbatim; fallbacks get the "| IPTV Pro" template.
    title: tr(seo?.metaTitle) ? { absolute: title } : title,
    description,
    keywords: seo?.keywords?.length ? seo.keywords : undefined,
    alternates: { canonical, languages },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: tr(seo?.ogTitle) || title,
      description: tr(seo?.ogDescription) || description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? "en_US" : "pl_PL",
      // Next's openGraph types have no "product"; product pages fall back to "website".
      type: seo?.ogType === "article" ? "article" : "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}
