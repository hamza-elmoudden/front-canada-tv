"use client";

import { useActionState } from "react";
import { createOrder, type FormState } from "@/app/actions";
import type { Dict, Locale } from "@/lib/i18n";
import { btnOutline, btnPrimary, fieldInput, fieldLabel, formCard, formGrid, formMsgErr, formMsgOk, honeypot } from "@/lib/ui";

const initial: FormState = { status: "idle", message: "" };

type Props = { planId: string; whatsappHref?: string | null; locale: Locale; labels: Dict["order"] };

export function OrderForm({ planId, whatsappHref, locale, labels }: Props) {
  const ui = { order: labels };
  const [state, action, pending] = useActionState(createOrder, initial);

  return (
    <div className={formCard}>
      <h2 className="mb-2 text-[1.4rem] font-extrabold text-white">{ui.order.title}</h2>
      <p className="mb-6 text-[0.92rem] leading-[1.7] text-muted">{ui.order.sub}</p>

      {state.status === "success" ? (
        <div className={formMsgOk} role="status">
          {state.message}
          {whatsappHref && (
            <>
              {" "}
              <a href={whatsappHref} className="font-bold text-white" target="_blank" rel="noopener noreferrer">
                {ui.order.whatsapp} →
              </a>
            </>
          )}
        </div>
      ) : (
        <form action={action} className={formGrid}>
          <input type="hidden" name="planId" value={planId} />
          <input type="hidden" name="locale" value={locale} />
          <div className={honeypot} aria-hidden>
            <label>
              Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div>
            <label className={fieldLabel} htmlFor="order-fullname">{ui.order.fullname} *</label>
            <input className={fieldInput} id="order-fullname" name="fullname" required autoComplete="name" maxLength={200} />
          </div>
          <div>
            <label className={fieldLabel} htmlFor="order-phone">{ui.order.phone} *</label>
            <input className={fieldInput} id="order-phone" name="phone" type="tel" required autoComplete="tel" maxLength={40} />
          </div>
          <div>
            <label className={fieldLabel} htmlFor="order-email">{ui.order.email} *</label>
            <input className={fieldInput} id="order-email" name="email" type="email" required autoComplete="email" maxLength={200} />
          </div>

          {state.status === "error" && (
            <p className={formMsgErr} role="alert">
              {state.message}
            </p>
          )}

          <button type="submit" className={btnPrimary} disabled={pending}>
            {pending ? ui.order.sending : ui.order.submit}
          </button>
          {whatsappHref && (
            <a href={whatsappHref} className={btnOutline} target="_blank" rel="noopener noreferrer">
              💬 {ui.order.whatsapp}
            </a>
          )}
        </form>
      )}
    </div>
  );
}
