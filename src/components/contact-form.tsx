"use client";

import { useState, type FormEvent } from "react";
import { business, type Locale } from "@/content/site";
import { contactFormEndpoint, contactFormKey, formCopy } from "@/content/contact-form";

type Status = "idle" | "sending" | "success" | "error" | "mailto";

export function ContactForm({ locale }: { locale: Locale }) {
  const f = formCopy[locale];
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // Honeypot: real visitors never fill it.
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subject = `${f.subject}: ${value("product")} · ${value("company") || value("name")}`;

    if (!contactFormKey) {
      const body = [
        `${f.name}: ${value("name")}`,
        `${f.company}: ${value("company")}`,
        `${f.email}: ${value("email")}`,
        `${f.phone}: ${value("phone")}`,
        `${f.product}: ${value("product")}`,
        "",
        value("message"),
      ].join("\n");
      window.location.href = `mailto:${business.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contactFormKey,
          subject,
          from_name: "BAOORE AgriTrade website",
          name: value("name"),
          company: value("company"),
          email: value("email"),
          phone: value("phone"),
          product: value("product"),
          message: value("message"),
          language: locale.toUpperCase(),
          botcheck: false,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Not sent");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "success" ? f.success :
    status === "error" ? f.error :
    status === "mailto" ? f.mailtoNote : "";

  return (
    <form className="contact-form" onSubmit={submit}>
      <label><span>{f.name}</span><input name="name" autoComplete="name" required maxLength={120} /></label>
      <label><span>{f.company}</span><input name="company" autoComplete="organization" required maxLength={160} /></label>
      <label><span>{f.email}</span><input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
      <label><span>{f.phone} <em>({f.optional})</em></span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      <label className="form-wide"><span>{f.product}</span>
        <select name="product" required defaultValue={f.products[0]}>
          {f.products.map((product) => <option key={product}>{product}</option>)}
        </select>
      </label>
      <label className="form-wide"><span>{f.message}</span><textarea name="message" required rows={6} maxLength={4000} /></label>
      <input className="form-trap" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-wide form-actions">
        <button type="submit" className="button button-forest" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.send}
          <svg className="icon-arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
        </button>
        <p className={`form-status form-status-${status}`} role="status" aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
