import { FileCheck2, ScrollText, ShieldCheck, ArrowRight } from "lucide-react";
import { dawabitAssets } from "@/content/dawabit-assets";
import { approvedVisualsInstalled, officialGraphicManifest } from "@/content/dawabit-v5";
import type { Locale } from "@/lib/config";

export function DawabitVisual({ locale, id = "overview", priority = false }: { locale: Locale; id?: "overview"; priority?: boolean }) {
  const asset = dawabitAssets.images[id];
  if (dawabitAssets.visualsEnabled) return (
    <figure className="dawabit-visual" aria-label={asset.alt[locale]}>
      <div className="dawabit-browser-frame">
        <div className="dawabit-browser-dots" aria-hidden="true"><i /><i /><i /></div>
        <img
          src={dawabitAssets.imageBase + (locale === "ar" ? asset.arFile : asset.file)}
          alt={asset.alt[locale]} width={1600} height={1000} loading={priority ? "eager" : "lazy"} decoding="async"
        />
      </div>
      <figcaption>{locale === "ar" ? "مثال توضيحي" : "ILLUSTRATIVE EXAMPLE"}</figcaption>
    </figure>
  );
  // The v5 pack requires an official product screenshot, not recreated sample data.
  // This is a non-product-specific, accessible illustration until the files arrive.
  return (
    <figure className="dawabit-visual dawabit-process-art">
      <div className="dawabit-process-label"><ShieldCheck size={16} aria-hidden="true" />{locale === "ar" ? "من المتطلب إلى الدليل" : "FROM REQUIREMENT TO EVIDENCE"}</div>
      <div className="dawabit-process-steps">
        <div><ScrollText size={28} strokeWidth={1.25} aria-hidden="true" /><span>01</span><strong>{locale === "ar" ? "النص التنظيمي" : "Regulation"}</strong><p>{locale === "ar" ? "متطلب قابل للتتبع" : "Traceable requirement"}</p></div>
        <ArrowRight size={22} aria-hidden="true" />
        <div><FileCheck2 size={28} strokeWidth={1.25} aria-hidden="true" /><span>02</span><strong>{locale === "ar" ? "دليل السياسة" : "Evidence"}</strong><p>{locale === "ar" ? "مستند قابل للمراجعة" : "Verifiable document"}</p></div>
        <ArrowRight size={22} aria-hidden="true" />
        <div><ShieldCheck size={28} strokeWidth={1.25} aria-hidden="true" /><span>03</span><strong>{locale === "ar" ? "نتيجة موثقة" : "Verdict"}</strong><p>{locale === "ar" ? "حكم يراجعه مختص" : "Specialist reviewed"}</p></div>
      </div>
      <figcaption>{locale === "ar" ? "رسم توضيحي للمنهج — ليس بيانات عميل" : "METHOD ILLUSTRATION — NOT CLIENT DATA"}</figcaption>
    </figure>
  );
}

type GraphicId = keyof typeof officialGraphicManifest;
export function DawabitGraphic({ locale, id, dark = false }: { locale: Locale; id: GraphicId; dark?: boolean }) {
  if (!approvedVisualsInstalled) return null;
  const path = officialGraphicManifest[id][locale];
  return (
    <figure className={`dawabit-graphic ${dark ? "dawabit-graphic-dark" : ""}`}>
      <img src={path} width={1600} height={900}
        alt={`${id.replace(/([A-Z])/g, " $1").toLowerCase()} — ${locale === "ar" ? "مثال توضيحي" : "Illustrative example."}`}
        loading="lazy" decoding="async" />
      <figcaption>{locale === "ar" ? "مثال توضيحي" : "ILLUSTRATIVE EXAMPLE"}</figcaption>
    </figure>
  );
}
export function DawabitProof({ locale }: { locale: Locale }) {
  const { proof } = dawabitAssets;
  if (!proof.enabled || proof.figures.some(figure => figure.value === null)) return null;
  return <div className="dawabit-proof">{proof.figures.map((f,i)=><div key={i}><strong>{f.value?.toLocaleString(locale)}</strong><span>{f.label[locale]}</span></div>)}</div>;
}
