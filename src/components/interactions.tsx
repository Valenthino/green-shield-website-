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
  email,
}: {
  locale: Locale;
  whatsapp: string | null;
  email: string | null;
}) {
  const w = trade[locale];
  const f = w.fields;
  const [error, setError] = useState("");
  const nameId = useId();
  function message(form: HTMLFormElement) {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || "").trim();
    const lines = [w.messageIntro, ""];
    for (const key of ["name", "company", "country", "product", "quantity", "destination", "incoterm"] as const) {
      if (value(key)) lines.push(`${f[key]}: ${value(key)}`);
    }
    if (value("message")) lines.push("", value("message"));
    return lines.join("\n");
  }
  function send(form: HTMLFormElement, channel: "whatsapp" | "email") {
    const name = form.elements.namedItem("name") as HTMLInputElement;
    if (!name.value.trim()) {
      setError(w.needName);
      name.focus();
      return;
    }
    setError("");
    const text = message(form);
    if (channel === "whatsapp" && whatsapp)
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    if (channel === "email" && email)
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(w.formTitle)}&body=${encodeURIComponent(text)}`;
  }
  return (
    <form
      className="enquiry-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        send(event.currentTarget, whatsapp ? "whatsapp" : "email");
      }}
    >
      <label className="form-field" htmlFor={nameId}>
        <span>{f.name} *</span>
        <input id={nameId} name="name" autoComplete="name" aria-invalid={error ? true : undefined} aria-describedby={error ? `${nameId}-error` : undefined} />
        {error && <small className="form-error" id={`${nameId}-error`} role="alert">{error}</small>}
      </label>
      <label className="form-field"><span>{f.company}</span><input name="company" autoComplete="organization" /></label>
      <label className="form-field"><span>{f.country}</span><input name="country" autoComplete="country-name" /></label>
      <label className="form-field">
        <span>{f.product}</span>
        <select name="product" defaultValue={w.productOptions[0]}>
          {w.productOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="form-field"><span>{f.quantity}</span><input name="quantity" placeholder={f.quantityHint} /></label>
      <label className="form-field"><span>{f.destination}</span><input name="destination" /></label>
      <label className="form-field">
        <span>{f.incoterm}</span>
        <select name="incoterm" defaultValue={w.incotermOptions[0]}>
          {w.incotermOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="form-field wide"><span>{f.message}</span><textarea name="message" rows={4} /></label>
      <div className="form-actions wide">
        {whatsapp && (
          <button type="submit" className="button button-whatsapp">
            {w.sendWhatsapp}
            <svg className="icon-arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </button>
        )}
        {email && (
          <button type="button" className="button button-dark" onClick={(event) => send(event.currentTarget.form!, "email")}>
            {w.sendEmail}
          </button>
        )}
      </div>
    </form>
  );
}
