"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDownToLine, FileCheck2, ShieldCheck } from "lucide-react";
import { config, href, type Locale } from "@/lib/config";
import { formCopy, privacyVersion } from "@/content/forms";
import { markets } from "@/content/site";
import { sampleReportSchema } from "@/lib/sample-report-schema";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};
const copy = {
  title: { en: "See a sample assessment report", ar: "اطّلع على نموذج تقرير تقييم" },
  body: { en: "A four page example of what a MUTABIQ assessment delivers: the summary, results by policy area, priority findings and the method.", ar: "نموذج من أربع صفحات يوضح ما يقدمه تقييم مطابق: الملخص والنتائج حسب مجال السياسة والنتائج ذات الأولوية والمنهجية." },
  button: { en: "Get the sample report", ar: "احصل على نموذج التقرير" },
  ready: { en: "Thank you. Your sample report is ready.", ar: "شكراً لك. نموذج التقرير جاهز للتنزيل." },
  download: { en: "Download the report", ar: "تنزيل التقرير" },
  mailed: { en: "We have also sent a time-limited download link to your work email.", ar: "أرسلنا أيضاً رابط تنزيل صالحاً لمدة محدودة إلى بريدك الإلكتروني للعمل." },
  delayed: { en: "The report is ready below, but the email notification could not be confirmed.", ar: "التقرير جاهز أدناه، لكن تعذّر تأكيد إشعار البريد الإلكتروني." },
  error: { en: "Your request could not be completed. Please try again.", ar: "تعذّر إكمال طلبك. يرجى المحاولة مجدداً." },
  note: { en: "The sample is illustrative and contains no real client information.", ar: "هذا النموذج توضيحي ولا يتضمن معلومات تخص عميلاً حقيقياً." },
};
export function SampleReportSection({ locale }: { locale: Locale }) {
  // Do not advertise a download until real secure R2 delivery, a monitored
  // inbox, approved legal notices and server verification are configured.
  const enabled = config.sampleReportEnabled && !!config.turnstileSiteKey && !privacyVersion.startsWith("pending");
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"error"|"ready">("idle");
  const [url, setUrl] = useState("");
  const [emailed, setEmailed] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const api = () => (window as typeof window & { turnstile?: TurnstileApi }).turnstile;
    const mount = () => {
      if (cancelled || !box.current || widget.current !== null || !api()) return;
      widget.current = api()!.render(box.current, {
        sitekey: config.turnstileSiteKey, action: "sample-report", language: locale,
        theme: "light", callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""), "error-callback": () => setToken(""),
      });
    };
    let script = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.turnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", mount);
    mount();
    return () => {
      cancelled = true;
      script?.removeEventListener("load", mount);
      if (widget.current) api()?.remove(widget.current);
      widget.current = null;
    };
  }, [enabled, locale]);
  if (!enabled) return null;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const input = { ...raw, locale, consent: raw.consent === "on", token, consentVersion: privacyVersion };
    const validated = sampleReportSchema.safeParse(input);
    if (!validated.success) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/sample-report", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      });
      const result = await response.json() as { accepted?: boolean; downloadUrl?: string; emailNotified?: boolean };
      if (!response.ok || !result.accepted || !result.downloadUrl?.startsWith("/api/sample-report?token=")) throw Error("not ready");
      setUrl(result.downloadUrl);
      setEmailed(!!result.emailNotified);
      setStatus("ready");
    } catch {
      setStatus("error");
      setToken("");
      if (widget.current) (window as typeof window & { turnstile?: TurnstileApi }).turnstile?.reset(widget.current);
    }
  }
  return (
    <section className="section sample-report-section">
      <div className="container sample-report-layout">
        <div>
          <span className="overline">MUTABIQ · {locale === "ar" ? "نموذج تقرير" : "Sample report"}</span>
          <h2>{copy.title[locale]}</h2>
          <p className="lead">{copy.body[locale]}</p>
          <p>{copy.note[locale]}</p>
        </div>
        <div className="sample-report-card">
          {status === "ready" ? (
            <div className="sample-report-success" role="status">
              <FileCheck2 size={34} strokeWidth={1.4} />
              <h3>{copy.ready[locale]}</h3>
              <p>{emailed ? copy.mailed[locale] : copy.delayed[locale]}</p>
              <a className="button button-primary" href={url} rel="nofollow">
                {copy.download[locale]}<ArrowDownToLine size={17} />
              </a>
            </div>
          ) : (
            <form className="sample-report-form" onSubmit={submit}>
              <fieldset disabled={status === "sending"}>
                <label>{formCopy.name[locale]} <span className="required-mark">*</span><input name="name" autoComplete="name" required maxLength={150} /></label>
                <label>{formCopy.organisation[locale]} <span className="required-mark">*</span><input name="organisation" autoComplete="organization" required maxLength={150} /></label>
                <label>{formCopy.email[locale]} <span className="required-mark">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
                <label>{formCopy.country[locale]} <span className="required-mark">*</span>
                  <select name="country" defaultValue="" required>
                    <option value="" disabled>{formCopy.choose[locale]}</option>
                    {markets.map((m) => <option value={m.name.en} key={m.slug}>{m.name[locale]}</option>)}
                    <option value="Other">{formCopy.other[locale]}</option>
                  </select>
                </label>
                <label className="consent">
                  <input type="checkbox" name="consent" required />
                  <span>{formCopy.consent[locale]} <Link href={href(locale,"privacy")}>{locale === "ar" ? "إشعار الخصوصية" : "Privacy notice"}</Link></span>
                </label>
                <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="turnstile-box" ref={box} aria-label={formCopy.challenge[locale]} />
                <button type="submit" className="button button-primary" disabled={!token || status === "sending"}>
                  {status === "sending" ? formCopy.sending[locale] : copy.button[locale]}
                  <ArrowDownToLine size={17} />
                </button>
              </fieldset>
              {status === "error" && <p role="alert" className="sample-report-error">{copy.error[locale]}</p>}
              <p className="form-security"><ShieldCheck size={15} />{formCopy.confidential[locale]}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
