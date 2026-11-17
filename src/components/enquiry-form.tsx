"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";
import { config, href, type Locale } from "@/lib/config";
import { formCopy as c, privacyVersion } from "@/content/forms";
import { ui, markets, sectors } from "@/content/site";
import { enquirySchema } from "@/lib/form-schema";
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (id: string) => void;
      reset: (id: string) => void;
    };
  }
}
export function EnquiryForm({
  locale,
  kind = "contact",
}: {
  locale: Locale;
  kind?: "contact" | "demo" | "coverage";
}) {
  const enabled = config.formsEnabled && !!config.turnstileSiteKey;
  const box = useRef<HTMLDivElement>(null),
    widget = useRef<string | null>(null);
  const [token, setToken] = useState(""),
    [status, setStatus] = useState<
      "idle" | "sending" | "success" | "saved" | "error" | "validation"
    >("idle"),
    [reference, setReference] = useState("");
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const mount = () => {
      if (
        !cancelled &&
        box.current &&
        window.turnstile &&
        widget.current === null
      )
        widget.current = window.turnstile.render(box.current, {
          sitekey: config.turnstileSiteKey,
          action: kind,
          language: locale,
          theme: "light",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
    };
    let script = document.querySelector<HTMLScriptElement>(
      "script[data-turnstile]",
    );
    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.turnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", mount);
    mount();
    return () => {
      cancelled = true;
      script?.removeEventListener("load", mount);
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [enabled, kind, locale]);
  const resetChallenge = () => {
    setToken("");
    if (widget.current) window.turnstile?.reset(widget.current);
  };
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled || status === "sending") return;
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      kind,
      locale,
      consent: form.get("consent") === "on",
      consentVersion: privacyVersion,
      token,
    };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("validation");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as {
        accepted?: boolean;
        emailNotified?: boolean;
        reference?: string;
      };
      if (response.ok && result.accepted === true) {
        setStatus(result.emailNotified ? "success" : "saved");
        setReference(result.reference || "");
      } else {
        setStatus("error");
        resetChallenge();
      }
    } catch {
      setStatus("error");
      resetChallenge();
    }
  }
  const field = (
    name: "name" | "organisation" | "role" | "email" | "phone" | "regulator",
    required = true,
  ) => (
    <label className="form-field" key={name}>
      {c[name][locale]}{required && <span className="required-mark" aria-hidden="true"> *</span>}
      <input
        name={name}
        type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
        required={required}
        maxLength={name === "email" ? 254 : name === "phone" ? 40 : 150}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "phone"
                ? "tel"
                : name === "organisation"
                  ? "organization"
                  : name === "role"
                    ? "organization-title"
                    : "off"
        }
      />
    </label>
  );
  // No enquiry fields or privacy consent links are displayed before the monitored
  // inbox, final privacy notice, and anti-spam backend are approved.
  if (!enabled) return (
    <div className="form-card form-closed-card" role="status">
      <span className="form-closed-icon" aria-hidden="true"><ShieldCheck size={30} strokeWidth={1.2}/></span>
      <h2>{locale === "ar" ? "تواصلوا مع فريق تري هاوس" : kind === "demo" ? "Request your tailored Dawabit demonstration" : "Speak to our team"}</h2>
      <p>{locale === "ar" ? "الاستفسارات متاحة حاليًا عبر البريد الإلكتروني مباشرة." : "Contact our team directly by email."}</p>
      <a className="form-closed-email" href={`mailto:enquiries@treehouseconsulting.co.uk?subject=${encodeURIComponent(kind === "demo" ? "Dawabit demonstration request" : kind === "coverage" ? "Regulator and sector request" : "Treehouse Consulting enquiry")}`}>
        enquiries@treehouseconsulting.co.uk <ArrowRight size={17} aria-hidden="true" />
      </a>
      <p className="form-closed-privacy">{c.confidential[locale]}</p>
    </div>
  );
  return (
    <div className="form-card">
      {!enabled && (
        <div className="notice" role="status">
          <CircleAlert size={20} />
          <div>
            <strong>{c.offline[locale]}</strong>
            <p>{c.offlineBody[locale]}</p>
          </div>
        </div>
      )}
      {status === "success" || status === "saved" ? (
        <div className="form-success" role="status">
          <CheckCircle2 size={36} />
          <h2>
            {status === "saved"
              ? c.saved[locale]
              : kind === "demo"
                ? c.successDemo[locale]
                : c.success[locale]}
          </h2>
          <p>
            {c.reference[locale]}: <bdi>{reference}</bdi>
          </p>
        </div>
      ) : (
        <form
          onSubmit={submit}
          aria-label={kind === "demo" ? ui.demo[locale] : ui.talk[locale]}
        >
          <p className="form-note">{c.required[locale]}</p>
          <fieldset disabled={!enabled || status === "sending"}>
            <legend className="sr-only">{ui.talk[locale]}</legend>
            <div className="form-grid">
              {field("name")}
              {field("organisation")}
              {kind !== "demo" && field("role")}
              {field("email")}

              <label className="form-field">
                {c.country[locale]}<span className="required-mark" aria-hidden="true"> *</span>
                <select required name="country" defaultValue="">
                  <option value="" disabled>
                    {c.choose[locale]}
                  </option>
                  {markets.map((m) => (
                    <option key={m.slug} value={m.name.en}>
                      {m.name[locale]}
                    </option>
                  ))}
                  <option value="Other">{c.other[locale]}</option>
                </select>
              </label>
              {kind === "contact" ? (
                <label className="form-field">
                  {c.subject[locale]}<span className="required-mark" aria-hidden="true"> *</span>
                  <select name="subject" required defaultValue="">
                    <option value="" disabled>
                      {c.choose[locale]}
                    </option>
                    {c.subjects.map((s) => (
                      <option key={s.en} value={s.en}>
                        {s[locale]}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <>
                  {kind === "coverage" && field("regulator")}
                  <label className="form-field">
                    {c.sector[locale]}<span className="required-mark" aria-hidden="true"> *</span>
                    <select name="sector" required defaultValue="">
                      <option value="" disabled>
                        {c.choose[locale]}
                      </option>
                      {sectors.map((s) => (
                        <option key={s.title.en} value={s.title.en}>
                          {s.title[locale]}
                        </option>
                      ))}
                      <option value="Other">{c.other[locale]}</option>
                    </select>
                  </label>
                </>
              )}
              <label className="form-field full-width">
                {kind === "demo" ? c.demoMessage[locale] : c.message[locale]}
                {kind !== "demo" && <span className="required-mark" aria-hidden="true"> *</span>}
                <textarea
                  name="message"
                  rows={4}
                  maxLength={5000}
                  required={kind !== "demo"}
                />
              </label>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <p className="form-note">{c.confidential[locale]}</p>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>
                {c.consent[locale]}<span className="required-mark" aria-hidden="true"> *</span>{" "}
                <Link href={href(locale, "privacy")}>
                  {ui.privacy[locale]}
                  <span className="sr-only"> →</span>
                </Link>
              </span>
            </label>
            <div
              className="turnstile-box"
              ref={box}
              aria-label={c.challenge[locale]}
            />
            <button
              className="button button-primary submit"
              type="submit"
              disabled={!enabled || status === "sending" || !token}
            >
              {status === "sending" ? c.sending[locale] : c.send[locale]}
              <ArrowRight size={16} className="directional" />
            </button>
          </fieldset>
          <div aria-live="polite">
            {(status === "error" || status === "validation") && (
              <p className="form-error" role="alert">
                {c[status][locale]}
              </p>
            )}
          </div>
          <div className="form-security">
            <ShieldCheck size={15} />
            {c.confidential[locale]}
          </div>
        </form>
      )}
      <p className="form-direct-contact">
        <a className="form-closed-email" href="mailto:enquiries@treehouseconsulting.co.uk">enquiries@treehouseconsulting.co.uk <ArrowRight size={17} aria-hidden="true" /></a>
      </p>
    </div>
  );
}
