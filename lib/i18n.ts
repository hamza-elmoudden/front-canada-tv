import type { LocaleValue } from "./sanity/types";

export const LOCALES = ["en", "pl"] as const;
export type Locale = (typeof LOCALES)[number];

/** Used when the visitor's language can't be detected (NEXT_PUBLIC_SITE_LOCALE, default "en"). */
export const DEFAULT_LOCALE: Locale = process.env.NEXT_PUBLIC_SITE_LOCALE === "pl" ? "pl" : "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Reads a Sanity localeString/localeText in `locale`, falling back to the other language. */
export function t(field: LocaleValue, locale: Locale): string {
  if (!field) return "";
  return field[locale] || field.en || field.pl || "";
}

/** Prefixes an app path with the locale: ("pl", "/plans") → "/pl/plans", ("en", "/#plans") → "/en#plans". */
export function localePath(locale: Locale, path: string) {
  if (path === "/" || path === "") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Swaps the locale segment of a pathname (used by the language switcher). */
export function switchLocalePath(pathname: string, to: Locale) {
  const rest = pathname.replace(/^\/(en|pl)(?=\/|$)/, "");
  return `/${to}${rest}`;
}

const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      plans: "Plans",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contact",
    },
    subscribeNow: "Subscribe Now",
    explorePlans: "Explore Plans",
    contactUs: "Contact Us",
    menu: "Menu",
    backToTop: "Back to top",
    hero: {
      badge: "Professional IPTV Service",
      title: "Experience a World of Entertainment Without Limits",
      desc: "Enjoy thousands of live channels, movies, and series in stunning quality, anytime and anywhere.",
      stats: [
        ["+10K", "Live Channels"],
        ["4K", "Picture Quality"],
        ["24/7", "Support"],
        ["99%", "Uptime"],
      ],
    },
    channelsLabel: "Channels included",
    movies: {
      label: "Movies & Series",
      title: "Blockbusters and Hit Series",
      sub: "The latest films and the most popular series, ready to stream whenever you want.",
    },
    language: "Language",
    about: {
      label: "About Us",
      title: "An Entertainment Experience Like No Other",
      imageAlt: "About our IPTV service",
    },
    plans: {
      label: "Plans",
      title: "Choose the Plan That Fits You",
      sub: "Enjoy the best streaming experience with flexible plans built around your needs.",
      bestSeller: "⭐ Best Seller",
      sold: "sold",
      save: "Save",
      showDetails: "Show details",
      hideDetails: "Hide details",
      prev: "Previous plans",
      next: "Next plans",
      empty: "Plans will be available soon.",
      oneTime: "One-time payment",
    },
    faq: {
      label: "FAQ",
      title: "Everything You Need to Know",
      empty: "No questions yet.",
    },
    blog: {
      label: "Blog",
      title: "News & Guides",
      readMore: "Read more →",
      empty: "No articles published yet.",
      back: "← Back to blog",
      prev: "← Newer",
      next: "Older →",
      by: "by",
    },
    order: {
      title: "Order this plan",
      sub: "Leave your details and we will contact you to activate your subscription.",
      fullname: "Full name",
      phone: "Phone",
      email: "Email",
      submit: "Place order",
      sending: "Sending…",
      success: "Thank you! Your order was received. We will contact you shortly.",
      whatsapp: "Message us on WhatsApp",
      back: "← All plans",
    },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      sub: "Questions about a plan or setup? Send us a message and we will reply quickly.",
      fullname: "Full name",
      phone: "Phone",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you! Your message was sent.",
      whatsapp: "WhatsApp",
      emailLabel: "Email",
      facebook: "Facebook",
      address: "Address",
    },
    form: {
      required: "Please fill in all required fields.",
      invalidEmail: "Please enter a valid email address.",
      failed: "Something went wrong. Please try again or contact us on WhatsApp.",
    },
    footer: {
      quickLinks: "Quick Links",
      contact: "Contact Us",
      rights: "All rights reserved",
      tagline: "Unlimited Entertainment 🎬",
      desc: "Premium IPTV with diverse content and effortless streaming on any screen.",
    },
    notFound: {
      title: "Page not found",
      text: "The page you are looking for does not exist or was moved.",
      back: "Back to home",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      about: "O nas",
      plans: "Pakiety",
      faq: "FAQ",
      blog: "Blog",
      contact: "Kontakt",
    },
    subscribeNow: "Kup teraz",
    explorePlans: "Zobacz pakiety",
    contactUs: "Kontakt",
    menu: "Menu",
    backToTop: "Do góry",
    hero: {
      badge: "Profesjonalna usługa IPTV",
      title: "Świat rozrywki bez ograniczeń",
      desc: "Tysiące kanałów na żywo, filmów i seriali w świetnej jakości — zawsze i wszędzie.",
      stats: [
        ["+10K", "Kanałów na żywo"],
        ["4K", "Jakość obrazu"],
        ["24/7", "Wsparcie"],
        ["99%", "Dostępność"],
      ],
    },
    channelsLabel: "Dostępne kanały",
    movies: {
      label: "Filmy i seriale",
      title: "Hity kinowe i najpopularniejsze seriale",
      sub: "Najnowsze filmy i najchętniej oglądane seriale — gotowe do oglądania, kiedy tylko chcesz.",
    },
    language: "Język",
    about: {
      label: "O nas",
      title: "Rozrywka, jakiej jeszcze nie znasz",
      imageAlt: "O naszej usłudze IPTV",
    },
    plans: {
      label: "Pakiety",
      title: "Wybierz pakiet dla siebie",
      sub: "Najlepsze doświadczenie streamingu w elastycznych pakietach dopasowanych do Ciebie.",
      bestSeller: "⭐ Najczęściej wybierany",
      sold: "sprzedanych",
      save: "Oszczędzasz",
      showDetails: "Pokaż szczegóły",
      hideDetails: "Ukryj szczegóły",
      prev: "Poprzednie plany",
      next: "Następne plany",
      empty: "Pakiety będą dostępne wkrótce.",
      oneTime: "Płatność jednorazowa",
    },
    faq: {
      label: "FAQ",
      title: "Wszystko, co musisz wiedzieć",
      empty: "Brak pytań.",
    },
    blog: {
      label: "Blog",
      title: "Aktualności i poradniki",
      readMore: "Czytaj dalej →",
      empty: "Brak opublikowanych artykułów.",
      back: "← Wróć do bloga",
      prev: "← Nowsze",
      next: "Starsze →",
      by: "autor:",
    },
    order: {
      title: "Zamów ten pakiet",
      sub: "Zostaw swoje dane, a skontaktujemy się z Tobą, aby aktywować subskrypcję.",
      fullname: "Imię i nazwisko",
      phone: "Telefon",
      email: "E-mail",
      submit: "Złóż zamówienie",
      sending: "Wysyłanie…",
      success: "Dziękujemy! Otrzymaliśmy Twoje zamówienie. Wkrótce się odezwiemy.",
      whatsapp: "Napisz do nas na WhatsApp",
      back: "← Wszystkie pakiety",
    },
    contact: {
      label: "Kontakt",
      title: "Skontaktuj się z nami",
      sub: "Pytania o pakiet lub instalację? Napisz do nas — odpowiemy szybko.",
      fullname: "Imię i nazwisko",
      phone: "Telefon",
      email: "E-mail",
      subject: "Temat",
      message: "Wiadomość",
      submit: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      success: "Dziękujemy! Wiadomość została wysłana.",
      whatsapp: "WhatsApp",
      emailLabel: "E-mail",
      facebook: "Facebook",
      address: "Adres",
    },
    form: {
      required: "Uzupełnij wszystkie wymagane pola.",
      invalidEmail: "Podaj poprawny adres e-mail.",
      failed: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas na WhatsApp.",
    },
    footer: {
      quickLinks: "Szybkie linki",
      contact: "Kontakt",
      rights: "Wszelkie prawa zastrzeżone",
      tagline: "Rozrywka bez limitu 🎬",
      desc: "Premium IPTV z bogatą ofertą i wygodnym oglądaniem na każdym ekranie.",
    },
    notFound: {
      title: "Nie znaleziono strony",
      text: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
      back: "Wróć na stronę główną",
    },
  },
} as const;

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Widen<U>[] : { [K in keyof T]: Widen<T[K]> };
export type Dict = Widen<(typeof dictionary)["en"]>;

export function getDict(locale: Locale): Dict {
  return dictionary[locale];
}
