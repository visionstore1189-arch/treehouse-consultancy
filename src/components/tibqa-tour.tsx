"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { tibqaAssets } from "@/content/tibqa-assets";
import type { Locale } from "@/lib/config";

const slides = [
  {
    id: "scope",
    title: { en: "Scope", ar: "النطاق" },
    caption: {
      en: "Define the jurisdiction, regulator, licence type and policy area before the assessment begins.",
      ar: "حدّد الدولة والجهة الرقابية ونوع الترخيص ومجال السياسة قبل بدء التقييم.",
    },
  },
  {
    id: "requirements",
    title: { en: "Map", ar: "المتطلبات" },
    caption: {
      en: "Map each applicable requirement to its source and the documents being assessed.",
      ar: "اربط كل متطلب منطبق بمصدره والنصوص والوثائق التي يجري تقييمها.",
    },
  },
  {
    id: "finding",
    title: { en: "Assess", ar: "التقييم" },
    caption: {
      en: "Review evidence beside the exact requirement, with a reasoned verdict and recommended action.",
      ar: "راجع الدليل بجانب المتطلب الأصلي، مع نتيجة معلّلة وإجراء تصحيحي مقترح.",
    },
  },
  {
    id: "overview",
    title: { en: "Report", ar: "التقرير" },
    caption: {
      en: "Understand the compliance position across policy areas, prioritise gaps and prepare board reporting.",
      ar: "اطّلع على وضع الالتزام عبر مجالات السياسات وحدد أولويات الفجوات لإعداد التقارير.",
    },
  },
] as const;

export function TibqaTour({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const paused = hovered || focused || reducedMotion || !visible;
  const activate = useCallback((next: number) => {
    setActive((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = locale === "ar" ? -1 : 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index + direction;
    if (event.key === "ArrowLeft") next = index - direction;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = slides.length - 1;
    if (next === null) return;
    event.preventDefault();
    const selected = (next + slides.length) % slides.length;
    activate(selected);
    buttons.current[selected]?.focus();
  }
  const current = slides[active];
  const item = tibqaAssets.images[current.id];
  return (
    <section
      className="tibqa-tour"
      dir={locale === "ar" ? "rtl" : "ltr"}
      aria-label={locale === "ar" ? "جولة توضيحية في طبقًا" : "Explore TIBQA product tour"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="tibqa-tour-top">
        <div className="tibqa-tour-headline">
          <span className="tibqa-tour-dot" aria-hidden="true" />
          <span>{locale === "ar" ? "جولة على واجهة المنتج" : "THE TIBQA EXPERIENCE"}</span>
        </div>
        <span className="tibqa-tour-count" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / 04
        </span>
      </div>
      <div className="tibqa-tour-tabs" role="tablist" aria-label={locale === "ar" ? "مراحل التقييم" : "Assessment stages"}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            ref={(node) => { buttons.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="tibqa-tour-panel"
            id={`tibqa-tour-tab-${index}`}
            tabIndex={index === active ? 0 : -1}
            className={`tibqa-tour-tab ${index === active ? "is-active" : ""}`}
            onClick={() => activate(index)}
            onKeyDown={(event) => keyDown(event, index)}
          >
            <span className="tibqa-tour-tab-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="tibqa-tour-tab-title">{slide.title[locale]}</span>
            <span className="tibqa-tour-progress" aria-hidden="true">
              {index === active && <span key={active} className={paused ? "is-paused" : ""} />}
            </span>
          </button>
        ))}
      </div>
      <div className="tibqa-tour-stage" role="tabpanel" id="tibqa-tour-panel" aria-labelledby={`tibqa-tour-tab-${active}`} tabIndex={0}>
        <div className="tibqa-tour-glass" aria-hidden="true">
          <span /><span /><span />
          <span className="tibqa-tour-appname">TIBQA <small>BY TREEHOUSE</small></span>
          <ArrowUpRight size={15} />
        </div>
        <div className="tibqa-tour-image-shell">
          <img
            key={item.file}
            src={tibqaAssets.imageBase + item.file}
            alt={item.alt[locale]}
            width={1600}
            height={1000}
            loading={active === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        </div>
        <span className="tibqa-tour-illustrative">
          <CheckCircle2 size={13} aria-hidden="true" />
          {locale === "ar" ? "مثال توضيحي" : "Illustrative example"}
        </span>
      </div>
      <div className="tibqa-tour-caption">
        <div aria-live="off" className="tibqa-tour-caption-copy">
          <strong>{current.title[locale]}</strong>
          <p>{current.caption[locale]}</p>
        </div>
        <ShieldCheck size={22} strokeWidth={1.3} aria-hidden="true" />
      </div>
    </section>
  );
}
