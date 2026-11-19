// JSON-LD builders following the shapes in schema_query/schema.js.txt.
import { localePath, t, type Locale } from "./i18n";
import { siteUrl } from "./sanity/env";
import { hasImage, urlFor } from "./sanity/image";
import type { ContactInfo, FaqPage, Plan } from "./sanity/types";
import { SITE_NAME, currencyCode, whatsappLink } from "./site";

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export function organizationNode(contact: ContactInfo, locale: Locale, description?: string) {
  const sameAs = [contact?.facebook, whatsappLink(contact)].filter(Boolean);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: siteUrl,
    description: description || undefined,
    email: contact?.email || undefined,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${siteUrl}${localePath(locale, "/contact")}`,
      telephone: contact?.whatsapp || undefined,
      email: contact?.email || undefined,
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function productNode(plan: Plan, locale: Locale) {
  const url = `${siteUrl}${localePath(locale, `/plans/${plan.slug}`)}`;
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: t(plan.title, locale),
    description: t(plan.Shortdescription, locale) || t(plan.description, locale),
    image: hasImage(plan.image) ? [urlFor(plan.image).width(1200).url()] : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "IPTV Subscription",
    sku: plan.slug,
    offers: {
      "@type": "Offer",
      url,
      price: plan.price != null ? plan.price.toFixed(2) : undefined,
      priceCurrency: currencyCode(plan.currency),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
    },
  };
}

export function faqNode(faq: FaqPage, path: string, name: string, locale: Locale) {
  const url = `${siteUrl}${localePath(locale, path)}`;
  return {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: (faq?.questions ?? []).map((item) => ({
      "@type": "Question",
      name: t(item.question, locale),
      acceptedAnswer: { "@type": "Answer", text: t(item.answer, locale) },
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
