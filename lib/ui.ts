/**
 * Tailwind class strings shared by several components. Kept in one place so the
 * design stays consistent; Tailwind picks the classes up because it scans this file.
 */

// Layout
export const section = "px-8 py-24 max-[480px]:px-[1.2rem] max-[480px]:py-16";
export const sectionTop = `${section} pt-[calc(var(--nav-h)+3rem)] max-[480px]:pt-[calc(var(--nav-h)+3rem)]`;
export const sectionHeadCenter = "mb-14 text-center";
export const emptyNote = "py-8 text-center text-muted";

// Section typography
export const sectionLabel = "mb-4 inline-block text-xs font-bold tracking-[0.08em] text-teal uppercase";
export const sectionTitle = "mb-4 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.3] font-extrabold text-white";
export const sectionSub = "max-w-[560px] text-base leading-[1.8] whitespace-pre-line text-muted";
export const sectionSubCenter = `${sectionSub} mx-auto`;
export const proseText = "text-base leading-[1.85] whitespace-pre-line text-fg";
export const backLink = "mb-6 inline-block text-[0.9rem] font-semibold text-teal-light transition-colors hover:text-white";

// Buttons
export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-135 from-teal to-crimson px-8 py-[0.85rem] text-base font-bold text-white shadow-[0_4px_20px_rgb(220_20_60/0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(220_20_60/0.45)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0";
export const btnOutline =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-[0.85rem] text-base font-semibold text-white transition duration-200 hover:border-teal hover:bg-teal/10";

// Cards
export const infoCard =
  "flex items-center gap-4 rounded-xl border border-teal/20 bg-crimson/6 px-[1.2rem] py-4 transition duration-200";
export const infoCardHover = "hover:border-teal/40 hover:bg-teal/6";
export const featureIcon =
  "flex size-10 min-w-10 items-center justify-center rounded-[10px] bg-linear-135 from-crimson to-teal text-[1.1rem]";
export const cardPrice = "mb-[0.3rem] text-[2.4rem] leading-none font-black text-white";
export const cardOldPrice = "mb-[0.3rem] text-[0.95rem] text-muted";
export const cardSave =
  "ml-[0.4rem] inline-block rounded-full bg-teal/15 px-[0.55rem] py-[0.1rem] text-[0.72rem] font-bold text-teal-light";
export const chip =
  "inline-block rounded-full border border-current px-[0.6rem] py-[0.15rem] text-[0.7rem] font-bold text-teal-light";

// Forms
export const formCard = "rounded-[20px] border border-teal/20 bg-crimson/5 p-8 max-[480px]:px-[1.2rem] max-[480px]:py-6";
export const formGrid = "grid gap-4";
export const fieldLabel = "mb-[0.4rem] block text-[0.82rem] font-semibold text-muted";
export const fieldInput =
  "w-full rounded-xl border border-teal/20 bg-bg/60 px-4 py-[0.8rem] text-[0.95rem] text-fg transition duration-200 focus:border-teal focus:ring-3 focus:ring-teal/20 focus:outline-none";
export const honeypot = "absolute -left-[10000px] size-px overflow-hidden";
const formMsg = "rounded-xl border px-4 py-[0.8rem] text-[0.9rem] leading-[1.6]";
export const formMsgOk = `${formMsg} border-teal/40 bg-teal/12 text-teal-light`;
export const formMsgErr = `${formMsg} border-crimson/40 bg-crimson/12 text-[#ff9aae]`;
