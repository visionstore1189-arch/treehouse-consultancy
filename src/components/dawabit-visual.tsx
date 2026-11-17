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
          alt={asset.alt[locale]} width={2048} height={1280} loading={priority ? "eager" : "lazy"} decoding="async"
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
/** Intrinsic dimensions of the exact original v5 exports; these prevent layout shift. */
const graphicSizes: Record<GraphicId, { width: number; height: number }> = {
  overview: { width: 2048, height: 1280 },
  verdictDefinitions: { width: 2048, height: 764 },
  workedExamples: { width: 2048, height: 1201 },
  evidenceChain: { width: 2048, height: 682 },
  resultsSummary: { width: 2048, height: 819 },
  badgeStrip: { width: 2048, height: 390 },
  methodStrip: { width: 2048, height: 550 },
  sectorGrid: { width: 2048, height: 716 },
};
const conceptStages = [
  { en: "Regulatory requirement", ar: "المتطلب التنظيمي" },
  { en: "Document evidence", ar: "دليل المستند" },
  { en: "Specialist review", ar: "مراجعة المختص" },
  { en: "Evidenced result", ar: "نتيجة موثقة" },
] as const;
const graphicAlt: Record<GraphicId, { en: string; ar: string }> = {
  overview: {
    en: "Dawabit regulatory assessment overview showing example requirements, evidence and reported findings. Illustrative example.",
    ar: "نظرة عامة توضيحية لتقييم «ضوابط» تعرض المتطلبات والأدلة والنتائج. مثال توضيحي.",
  },
  verdictDefinitions: {
    en: "Diagram explaining the four regulatory requirement verdicts: Addressed, Partially Addressed, Gap and Out of Document Scope. Illustrative example.",
    ar: "مخطط يشرح نتائج تقييم المتطلبات التنظيمية الأربع: مستوفى، ومستوفى جزئيًا، وفجوة، وخارج نطاق المستند. مثال توضيحي.",
  },
  workedExamples: {
    en: "Worked examples comparing regulatory requirements with policy evidence, assessments and explanations. Illustrative example.",
    ar: "أمثلة تطبيقية تقارن المتطلبات التنظيمية بأدلة السياسات ونتائج التقييم والتفسير. مثال توضيحي.",
  },
  evidenceChain: {
    en: "Evidence chain diagram connecting a source regulation to a policy excerpt and specialist-reviewed assessment. Illustrative example.",
    ar: "مخطط لسلسلة الأدلة يربط النص التنظيمي المصدر بفقرة من السياسة ونتيجة تقييم يراجعها مختص. مثال توضيحي.",
  },
  resultsSummary: {
    en: "Assessment results summary showing regulatory findings, evidence and proposed priority actions. Illustrative example.",
    ar: "ملخص نتائج التقييم يوضح الملاحظات التنظيمية والأدلة والإجراءات المقترحة حسب الأولوية. مثال توضيحي.",
  },
  badgeStrip: {
    en: "Illustrated assessment workflow badges identifying regulatory evidence and review stages. Illustrative example.",
    ar: "شريط توضيحي يعرّف مراحل الأدلة التنظيمية والتقييم والمراجعة. مثال توضيحي.",
  },
  methodStrip: {
    en: "Five-step method from scoping and regulatory mapping to document assessment, specialist review and report. Illustrative example.",
    ar: "مخطط لمنهج التقييم من خمس خطوات: تحديد النطاق، وربط المتطلبات التنظيمية، وتقييم المستندات، ومراجعة المختص، وإعداد التقرير. مثال توضيحي.",
  },
  sectorGrid: {
    en: "Sector grid illustrating the range of regulated industries served by Dawabit's assessment method. Illustrative example.",
    ar: "شبكة قطاعات توضح تنوع الأنشطة الخاضعة للتنظيم التي يخدمها منهج تقييم «ضوابط». مثال توضيحي.",
  },
};

export function DawabitGraphic({ locale, id, dark = false }: { locale: Locale; id: GraphicId; dark?: boolean }) {
  if (!approvedVisualsInstalled) {
    // Clearly identified editorial graphics only, NOT replacements for the client's
    // unreleased official panels or product screens. No sample compliance findings.
    if (id === "verdictDefinitions" || id === "methodStrip") return null;
    if (id === "badgeStrip") return (
      <div className="dawabit-method-badges" aria-label={locale === "ar" ? "مراحل التقييم" : "Assessment stages"}>
        {conceptStages.map((stage, i) => <span key={i}><b>{String(i + 1).padStart(2, "0")}</b>{stage[locale]}</span>)}
      </div>
    );
    if (id === "sectorGrid") return (
      <div className="dawabit-concept-sectors" aria-label={locale === "ar" ? "القطاعات" : "Regulated sectors"}>
        {(locale === "ar" ? ["التمويل والتأمين", "التقنية والاتصالات", "الرعاية الصحية", "النقل والطاقة"] : ["Financial services", "Technology", "Healthcare", "Transport & energy"]).map((sector, i) =>
          <div key={i}><span>{String(i + 1).padStart(2, "0")}</span><strong>{sector}</strong></div>
        )}
      </div>
    );
    return (
      <figure className="dawabit-concept-graphic" aria-label={locale === "ar" ? "رسم توضيحي لسلسلة التقييم" : "Conceptual regulatory assessment workflow"}>
        <div className="dawabit-concept-top"><ShieldCheck size={17} aria-hidden="true"/><span>{locale === "ar" ? "المتطلبات والأدلة والنتائج" : "REQUIREMENT / EVIDENCE / RESULT"}</span></div>
        <ol>
          {conceptStages.slice(0, id === "resultsSummary" ? 4 : 3).map((stage, i) =>
            <li key={i}>
              <span className="dawabit-concept-index">{String(i + 1).padStart(2, "0")}</span>
              <span>{stage[locale]}</span>
              <span aria-hidden="true" className="dawabit-concept-rule" />
            </li>
          )}
        </ol>
        <figcaption>{locale === "ar" ? "رسم توضيحي للمنهج — ليس شاشة من المنتج" : "METHOD ILLUSTRATION — NOT A PRODUCT SCREEN"}</figcaption>
      </figure>
    );
  }
  const path = officialGraphicManifest[id][locale];
  const dims = id === "badgeStrip" && locale === "ar" ? { width: 1960, height: 420 } : graphicSizes[id];
  return (
    <figure className={`dawabit-graphic ${dark ? "dawabit-graphic-dark" : ""}`}>
      <img src={path} width={dims.width} height={dims.height}
        alt={graphicAlt[id][locale]}
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
