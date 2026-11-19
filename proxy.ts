import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, isLocale, type Locale } from "@/lib/i18n";

/** Last language viewed (cookie) → Accept-Language → default. */
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => isLocale(entry.lang));
  return (preferred?.lang as Locale | undefined) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = LOCALES.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (current) {
    // Remember the language (e.g. after using the EN/PL switch) for future locale-less visits.
    if (request.cookies.get(LOCALE_COOKIE)?.value === current) return;
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, current, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, metadata files and anything with a file extension (public/ assets).
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|favicon.ico|.*\\..*).*)"],
};
