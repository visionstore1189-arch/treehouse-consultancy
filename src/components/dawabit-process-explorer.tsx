"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { steps } from "@/content/site";
import { href, type Locale } from "@/lib/config";

/**
 * This is an explanatory, public-only interaction using the firm's approved
 * five-step method. It does not load customer assessments or confidential app
 * screens and must never be mistaken for the protected Dawabit application.
 */
export function DawabitProcessExplorer({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const rtl = locale === "ar";
  const current = steps[active];

  return (
    <section className="section premium-process" aria-labelledby="premium-process-heading">
      <div className="container">
        <div className="premium-process-intro">
          <div>
            <p className="premium-process-eyebrow">
              <span aria-hidden="true" className="premium-process-eyebrow-symbol" />
              {rtl ? "رحلة التقييم" : "THE ASSESSMENT JOURNEY"}
            </p>
            <h2 id="premium-process-heading">
              {rtl ? "كل خطوة واضحة. وكل نتيجة قابلة للتتبّع." : "A connected process. A defensible outcome."}
            </h2>
          </div>
          <p>
            {rtl
              ? "استكشف كيف تنتقل عملية التقييم من تحديد النطاق إلى تقرير مدعوم بالأدلة، مع مراجعة مختص قبل إصدار النتائج."
              : "Explore the five stages from defining the scope to an evidence-led report, with specialist review before findings are issued."}
          </p>
        </div>
        <div className="premium-process-shell">
          <div className="premium-process-navigation" aria-label={rtl ? "خطوات التقييم" : "Assessment stages"}>
            <div className="premium-process-track" aria-hidden="true"><span style={{ width: `${(active / (steps.length - 1)) * 100}%` }} /></div>
            {steps.map((step, index) => (
              <button
                type="button"
                key={index}
                className={`premium-process-tab ${active === index ? "is-active" : ""}`}
                aria-pressed={active === index}
                aria-controls="premium-process-detail"
                onClick={() => setActive(index)}
              >
                <span className="premium-process-tab-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="premium-process-tab-label">{step.title[locale]}</span>
                <span className="premium-process-tab-indicator" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="premium-process-detail" className="premium-process-detail" aria-live="polite" aria-atomic="true">
            <div className="premium-process-detail-top">
              <span className="premium-process-active-index">
                {String(active + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(steps.length).padStart(2, "0")}
              </span>
              <span className="premium-process-reassurance"><ShieldCheck size={15} aria-hidden="true" />
                {rtl ? "عملية موثّقة" : "EVIDENCE-LED METHOD"}
              </span>
            </div>
            <div className="premium-process-detail-main" key={active}>
              <p className="premium-process-stage-caption">{rtl ? "المرحلة الحالية" : "CURRENT STAGE"}</p>
              <h3>{current.title[locale]}</h3>
              <p className="premium-process-description">{current.text[locale]}</p>
              <div className="premium-process-output">
                <div className="premium-process-output-icon"><FileText size={23} strokeWidth={1.4} aria-hidden="true" /></div>
                <div>
                  <strong>{rtl ? "المخرج المتوقع" : "WHAT THIS STAGE DELIVERS"}</strong>
                  <p>{current.output[locale]}</p>
                </div>
                <CheckCircle2 className="premium-process-output-check" size={20} aria-hidden="true" />
              </div>
            </div>
            <div className="premium-process-footer">
              <span>{rtl ? "رسم توضيحي للمنهج، وليس تقييمًا فعليًا." : "Illustrative workflow, not a live client assessment."}</span>
              <div className="premium-process-actions">
                <button type="button" aria-label={rtl ? "المرحلة السابقة" : "Previous stage"} disabled={active === 0} onClick={() => setActive(v => Math.max(0, v - 1))}>
                  {rtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
                <button type="button" aria-label={rtl ? "المرحلة التالية" : "Next stage"} disabled={active === steps.length - 1} onClick={() => setActive(v => Math.min(steps.length - 1, v + 1))}>
                  {rtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="premium-process-below">
          <p>{rtl ? "تريد استعراض نطاق قطاعك؟" : "Need to see how this applies to your sector?"}</p>
          <Link href={href(locale, "dawabit/demo")}>{rtl ? "اطلب عرضًا توضيحيًا" : "Request a guided demonstration"} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
