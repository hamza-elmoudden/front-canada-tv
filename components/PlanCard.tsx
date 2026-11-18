"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cardOldPrice, cardPrice, cardSave } from "@/lib/ui";

export type PlanCardData = {
  id: string;
  href: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  oldPrice?: string;
  savePercent?: number;
  imageUrl?: string;
  salesCount?: number;
  featured: boolean;
};

type Labels = {
  bestSeller: string;
  sold: string;
  save: string;
  showDetails: string;
  hideDetails: string;
  oneTime: string;
  cta: string;
};

export function PlanCard({ plan, labels }: { plan: PlanCardData; labels: Labels }) {
  const router = useRouter();

  // Clicking the card body opens the plan page; its own links/buttons keep their behavior.
  const onCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    router.push(plan.href);
  };

  return (
    <>
    <article
      className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] border px-8 py-10 text-center transition duration-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:bg-linear-to-b before:from-crimson/4 before:to-transparent before:to-60% ${
        plan.featured
          ? "border-teal bg-violet/14 shadow-[0_0_40px_rgb(0_147_213/0.15)] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgb(0_147_213/0.3)]"
          : "border-teal/15 bg-crimson/5 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-[0_20px_50px_rgb(220_20_60/0.2)]"
      }`}
      onClick={onCardClick}
    >
      {plan.featured && <div className="absolute top-4 left-1/2 z-2 -translate-x-1/2 rounded-full bg-linear-135 from-teal to-crimson px-4 py-1 text-[0.72rem] font-bold whitespace-nowrap text-white">{labels.bestSeller}</div>}

      {plan.imageUrl ? (
        <div className={`relative mx-auto mb-[1.2rem] aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-teal/20 bg-linear-135 from-crimson/20 to-teal/15 ${plan.featured ? "mt-[1.8rem]" : ""}`}>
          <Image src={plan.imageUrl} alt={plan.title} fill sizes="(max-width: 768px) 90vw, 360px" className="object-contain" />
        </div>
      ) : (
        <div
          className={`mx-auto mb-[1.2rem] flex size-14 items-center justify-center rounded-2xl border bg-linear-135 text-2xl ${
            plan.featured ? "mt-[1.8rem] border-transparent from-crimson to-teal" : "border-teal/20 from-crimson/20 to-teal/15"
          }`}
          aria-hidden
        >📺</div>
      )}

      <h3 className="mb-[0.4rem] text-[1.35rem] font-extrabold text-white">{plan.title}</h3>
      {plan.salesCount ? (
        <div className="mb-[1.2rem] text-[0.82rem] font-semibold text-teal">
          {plan.salesCount}+ {labels.sold}
        </div>
      ) : (
        <div className="mb-[1.2rem] text-[0.82rem] font-semibold text-teal">&nbsp;</div>
      )}

      <div className={cardPrice}>{plan.price}</div>
      {plan.oldPrice && (
        <div className={cardOldPrice}>
          <s className="opacity-80">{plan.oldPrice}</s>
          {plan.savePercent ? (
            <span className={cardSave}>
              {labels.save} {plan.savePercent}%
            </span>
          ) : null}
        </div>
      )}
      <div className="mb-[1.2rem] text-[0.78rem] text-muted">{labels.oneTime}</div>

      {/* Cards show only the short description; the full one lives on the plan page. */}
      <p className="mb-4 min-h-[72px] text-left text-[0.95rem] leading-[1.7] whitespace-pre-line text-muted">{plan.shortDescription}</p>

      <Link
        href={plan.href}
        className={`mt-auto block w-full cursor-pointer rounded-full border p-[0.8rem] text-[0.95rem] font-bold transition duration-200 hover:scale-[1.03] hover:shadow-[0_6px_20px_rgb(0_147_213/0.3)] ${
          plan.featured
            ? "border-transparent bg-linear-135 from-teal to-crimson text-white shadow-[0_4px_20px_rgb(0_147_213/0.3)]"
            : "border-teal/40 bg-transparent text-teal"
        }`}
      >
        {labels.cta}
      </Link>
    </article>

    </>
  );
}
