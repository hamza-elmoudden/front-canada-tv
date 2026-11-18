import Link from "next/link";

const styles = {
  nav: { link: "", icon: "size-10 rounded-[10px] text-[1.1rem]", text: "text-[1.3rem]" },
  footer: { link: "mb-4", icon: "size-9 rounded-[9px] text-base", text: "text-[1.15rem]" },
};

export function Logo({ variant = "nav", href }: { variant?: "nav" | "footer"; href: string }) {
  const s = styles[variant];
  return (
    <Link href={href} className={`flex shrink-0 items-center gap-[0.6rem] ${s.link}`} aria-label="IPTV Pro">
      <span
        className={`flex flex-col overflow-hidden ring-1 ring-white/20 ${s.icon}`}
        aria-hidden
      >
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#dc143c]" />
      </span>
      <span className={`font-extrabold tracking-[-0.5px] text-white ${s.text}`}>
        IPTV<span className="text-teal">Pro</span>
      </span>
    </Link>
  );
}
