"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { copy, href, type Locale, type Page } from "@/content/site";

import { languageDecision } from "@/lib/language";

const preferenceKey = "green-shield-language";
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

export function EnquiryTemplate({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<string>(t.copyIdle);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const templateRef = useRef<HTMLPreElement>(null);
  async function copyText() {
    try {
      if (!navigator.clipboard || !window.isSecureContext)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(t.enquiry);
      setStatus(t.copySuccess);
    } catch {
      setStatus(t.copyFailure);
      if (detailsRef.current) detailsRef.current.open = true;
      if (templateRef.current) {
        const range = document.createRange();
        range.selectNodeContents(templateRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }
  return (
    <>
      <button type="button" className="button button-dark" onClick={copyText}>
        {t.copyTemplate}
        <svg className="icon-arrow" aria-hidden="true" viewBox="0 0 16 16">
          <path d="M3 13 13 3M3 3h10v10" />
        </svg>
      </button>
      <p className="copy-status" role="status">
        {status}
      </p>
      <details className="enquiry-details" ref={detailsRef}>
        <summary>{t.viewTemplate}</summary>
        <pre ref={templateRef}>{t.enquiry}</pre>
      </details>
    </>
  );
}
