import Link from "next/link";
import { getI18n } from "@/lib/locale";
import type { ContactInfo, Footer as FooterDoc } from "@/lib/sanity/types";
import { SITE_NAME, whatsappLink, type NavItem } from "@/lib/site";
import { Logo } from "./Logo";

const contactItem = "mb-[0.9rem] flex items-center gap-3 text-[0.87rem] break-words text-muted transition-colors duration-200";

type Props = { footer: FooterDoc; contact: ContactInfo; nav: NavItem[]; year: number };

export async function Footer({ footer, contact, nav, year }: Props) {
  const { ui, tr, href } = await getI18n();
  const wa = whatsappLink(contact);
  const email = contact?.email;
  const facebook = contact?.facebook;
  const address = tr(contact?.address);

  return (
    <footer className="border-t border-teal/20 bg-linear-to-b from-bg to-[#090510] px-8 pt-16 pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto mb-12 grid max-w-[1200px] grid-cols-[2fr_1fr_1fr] gap-16 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-10">
        <div>
          <Logo variant="footer" href={href("/")} />
          {tr(footer?.title) && <p className="mb-[0.6rem] text-base font-bold text-white">{tr(footer?.title)}</p>}
          <p className="mb-6 text-[0.88rem] leading-[1.8] whitespace-pre-line text-muted">{tr(footer?.text) || ui.footer.desc}</p>
          <div className="flex gap-3">
            {wa && (
              <a href={wa} className="flex size-[38px] items-center justify-center rounded-[10px] border border-teal/20 bg-violet/12 text-base transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/20" title="WhatsApp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                💬
              </a>
            )}
            {facebook && (
              <a href={facebook} className="flex size-[38px] items-center justify-center rounded-[10px] border border-teal/20 bg-violet/12 text-base transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/20" title="Facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                📘
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex size-[38px] items-center justify-center rounded-[10px] border border-teal/20 bg-violet/12 text-base transition duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/20" title="Email" aria-label="Email">
                ✉️
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-[1.2rem] text-[0.9rem] font-bold text-white">{ui.footer.quickLinks}</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href + item.label} className="mb-[0.6rem]">
                <Link href={item.href} className="text-[0.87rem] text-muted transition-colors duration-200 hover:text-teal">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-[1.2rem] text-[0.9rem] font-bold text-white">{ui.footer.contact}</h2>
          {email && (
            <a href={`mailto:${email}`} className={`${contactItem} hover:text-teal`}>
              <span className="flex size-8 min-w-8 items-center justify-center rounded-lg border border-teal/20 bg-violet/15 text-[0.9rem]" aria-hidden>✉️</span>
              {email}
            </a>
          )}
          {wa && (
            <a href={wa} className={`${contactItem} hover:text-teal`} target="_blank" rel="noopener noreferrer">
              <span className="flex size-8 min-w-8 items-center justify-center rounded-lg border border-teal/20 bg-violet/15 text-[0.9rem]" aria-hidden>💬</span>
              {contact?.whatsapp}
            </a>
          )}
          {facebook && (
            <a href={facebook} className={`${contactItem} hover:text-teal`} target="_blank" rel="noopener noreferrer">
              <span className="flex size-8 min-w-8 items-center justify-center rounded-lg border border-teal/20 bg-violet/15 text-[0.9rem]" aria-hidden>📘</span>
              Facebook
            </a>
          )}
          {address && (
            <p className={contactItem}>
              <span className="flex size-8 min-w-8 items-center justify-center rounded-lg border border-teal/20 bg-violet/15 text-[0.9rem]" aria-hidden>📍</span>
              {address}
            </p>
          )}
          {!email && !wa && !facebook && (
            <Link href={href("/contact")} className={`${contactItem} hover:text-teal`}>
              <span className="flex size-8 min-w-8 items-center justify-center rounded-lg border border-teal/20 bg-violet/15 text-[0.9rem]" aria-hidden>✉️</span>
              {ui.nav.contact}
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8 max-md:justify-center max-md:text-center">
        <span className="text-[0.82rem] text-muted">
          © {year} {SITE_NAME} — {ui.footer.rights}
        </span>
        <span className="flex flex-wrap items-center gap-4 max-md:justify-center">
          <Link href={href("/sitemap")} className="text-[0.82rem] text-muted transition-colors duration-200 hover:text-teal">
            {ui.footer.sitemap}
          </Link>
          <Link href={href("/policy")} className="text-[0.82rem] text-muted transition-colors duration-200 hover:text-teal">
            {ui.footer.policy}
          </Link>
          <span className="text-[0.78rem] text-teal">{ui.footer.tagline}</span>
        </span>
      </div>
    </footer>
  );
}
