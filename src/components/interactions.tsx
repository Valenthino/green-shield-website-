"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { copy, href, type Locale, type Page } from "@/content/site";
import { trade } from "@/content/trade";

import { languageDecision } from "@/lib/language";

const preferenceKey = "baoore-language";
function rememberLanguage(locale: Locale) {
  try {
    localStorage.setItem(preferenceKey, locale);
  } catch {
    /* Storage is optional. */
  }
}

export function LanguageSwitch({
  locale,
  page,
}: {
  locale: Locale;
  page: Page;
}) {
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={copy[locale].language}
    >
      {(["en", "fr"] as const).map((language) => (
        <a
          key={language}
          href={href(language, page)}
          lang={language}
          hrefLang={language}
          aria-current={language === locale ? "true" : undefined}
          title={copy[language].locale}
          onClick={() => rememberLanguage(language)}
        >
          {language.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

export function LanguageSuggestion({ enabled }: { enabled: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(preferenceKey);
    } catch {
      /* English remains the fallback. */
    }
    const decision = languageDecision(
      saved,
      navigator.languages?.length
        ? navigator.languages
        : [navigator.language || ""],
    );
    if (decision === "redirect-fr") {
      window.location.replace("/fr/");
      return;
    }
    if (decision === "suggest-fr") setVisible(true);
  }, [enabled]);
  if (!visible) return null;
  return (
    <aside className="language-suggestion" aria-label="Language suggestion">
      <span lang="fr">Vous préférez lire en français ?</span>
      <a href="/fr/" lang="fr" onClick={() => rememberLanguage("fr")}>
        Voir en français
      </a>
      <button
        type="button"
        onClick={() => {
          rememberLanguage("en");
          setVisible(false);
        }}
      >
        Stay in English
      </button>
    </aside>
  );
}

export function Modal({
  label,
  title,
  closeLabel,
  className = "",
  children,
}: {
  label: ReactNode;
  title: string;
  closeLabel: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => ref.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            ref.current?.close();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label={closeLabel}
          onClick={() => ref.current?.close()}
        >
          ×
        </button>
        <h2 id={titleId}>{title}</h2>
        {children}
      </dialog>
    </>
  );
}

export function EnquiryForm({
  locale,
  whatsapp,
  inbox,
}: {
  locale: Locale;
  whatsapp: string | null;
  inbox: string | null;
}) {
  const w = trade[locale];
  const f = w.fields;
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const formId = useId();
  const keys = ["name", "email", "phone", "company", "product"] as const;
  function read(form: HTMLFormElement) {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || "").trim();
    return { value, message: value("message") };
  }
  function check(form: HTMLFormElement, needEmail: boolean) {
    const { value } = read(form);
    const next: { name?: string; email?: string } = {};
    if (!value("name")) next.name = w.needName;
    if (needEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = w.needEmail;
    setErrors(next);
    const first = next.name ? "name" : next.email ? "email" : null;
    if (first) (form.elements.namedItem(first) as HTMLInputElement).focus();
    return !first;
  }
  function whatsappText(form: HTMLFormElement) {
    const { value, message } = read(form);
    const lines = [w.messageIntro, ""];
    for (const key of keys) if (value(key)) lines.push(`${f[key]}: ${value(key)}`);
    if (message) lines.push("", message);
    return lines.join("\n");
  }
  async function sendEmail(form: HTMLFormElement) {
    if (!inbox || !check(form, true)) return;
    const { value, message } = read(form);
    if (value("_honey")) return;
    setState("sending");
    const body: Record<string, string> = {
      _subject: `BAOORE AgriTrade enquiry: ${value("product")} · ${value("company") || value("name")}`,
      _template: "table",
      _captcha: "false",
      _replyto: value("email"),
      Language: locale.toUpperCase(),
    };
    for (const key of keys) if (value(key)) body[trade.en.fields[key]] = value(key);
    if (message) body["Message"] = message;
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // The site sends no referrer by default; FormSubmit needs the page's origin.
        referrerPolicy: "origin",
        body: JSON.stringify(body),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== "true") throw new Error("not sent");
      setState("sent");
      form.reset();
    } catch {
      setState("failed");
    }
  }
  function sendWhatsapp(form: HTMLFormElement) {
    if (!whatsapp || !check(form, false)) return;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappText(form))}`, "_blank", "noopener");
  }
  const field = (key: "name" | "email", type: string, autoComplete: string) => (
    <label className="form-field" htmlFor={`${formId}-${key}`}>
      <span>{f[key]} *</span>
      <input
        id={`${formId}-${key}`}
        name={key}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `${formId}-${key}-error` : undefined}
      />
      {errors[key] && <small className="form-error" id={`${formId}-${key}-error`} role="alert">{errors[key]}</small>}
    </label>
  );
  if (state === "sent")
    return (
      <div className="form-sent" role="status">
        <p>{w.sent}</p>
        <button type="button" className="text-button-plain" onClick={() => setState("idle")}>{w.formTitle}</button>
      </div>
    );
  return (
    <form
      className="enquiry-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void (inbox ? sendEmail(event.currentTarget) : sendWhatsapp(event.currentTarget));
      }}
    >
      {field("name", "text", "name")}
      {field("email", "email", "email")}
      <label className="form-field"><span>{f.phone}</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <label className="form-field"><span>{f.company}</span><input name="company" autoComplete="organization" /></label>
      <label className="form-field">
        <span>{f.product}</span>
        <select name="product" defaultValue={w.productOptions[0]}>
          {w.productOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="form-field wide"><span>{f.message}</span><textarea name="message" rows={4} /></label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="form-honey" aria-hidden="true" />
      {state === "failed" && <p className="form-error wide" role="alert">{w.sendFailed}</p>}
      <div className="form-actions wide">
        {inbox && (
          <button type="submit" className="button button-dark" disabled={state === "sending"}>
            {state === "sending" ? w.sending : w.sendEmail}
            <svg className="icon-arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </button>
        )}
        {whatsapp && (
          <button type="button" className="button button-whatsapp" onClick={(event) => sendWhatsapp(event.currentTarget.form!)}>
            {w.sendWhatsapp}
          </button>
        )}
      </div>
    </form>
  );
}
