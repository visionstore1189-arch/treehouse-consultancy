import { t } from "./site";

/** Draft assets are intentionally disabled until approved files are supplied. */
export const mutabiqAssets = {
  // Only enable after all eight WebP image assets are committed.
  visualsEnabled: process.env.NEXT_PUBLIC_MUTABIQ_VISUALS_ENABLED === "true",
  // Gated PDF route requires private R2, approved privacy and working email.
  sampleReportEnabled: process.env.NEXT_PUBLIC_SAMPLE_REPORT_ENABLED === "true",
  sampleReportFilename: "Mutabiq_Sample_Assessment_Report_v1.pdf",
  imageBase: "/brand/mutabiq-screens/",
  images: {
    overview: {
      file: "Mutabiq_Screen_1_Overview_v1",
      alt: t("Mutabiq assessment overview showing requirements in scope, verdict split and position by policy area. Illustrative example.", "نظرة عامة على تقييم مطابق تُظهر المتطلبات ضمن النطاق وتوزيع النتائج حسب مجال السياسة. مثال توضيحي."),
    },
    scope: {
      file: "Mutabiq_Screen_4_Scope_v1",
      alt: t("Mutabiq scoping screen with jurisdiction, industry, regulator, licence type and policy area selected. Illustrative example.", "شاشة تحديد نطاق مطابق مع الاختصاص والقطاع والجهة الرقابية ونوع الترخيص ومجال السياسة. مثال توضيحي."),
    },
    requirements: {
      file: "Mutabiq_Screen_2_Requirements_v1",
      alt: t("Mutabiq requirements register listing each requirement with its source, document and verdict. Illustrative example.", "سجل متطلبات مطابق يوضح المتطلب ومصدره ووثيقته والنتيجة. مثال توضيحي."),
    },
    finding: {
      file: "Mutabiq_Screen_3_Finding_v1",
      alt: t("Mutabiq finding showing a regulatory requirement beside the policy extract, with verdict, rationale and recommended action. Illustrative example.", "نتيجة مطابق تُظهر المتطلب التنظيمي مقابل مقتطف السياسة مع النتيجة والتعليل والإجراء المقترح. مثال توضيحي."),
    },
  },
  proof: {
    enabled: false as boolean,
    figures: [
      { value: null as number | null, label: t("Instruments in the library", "النصوص في المكتبة") },
      { value: null as number | null, label: t("Requirements in the library", "المتطلبات في المكتبة") },
      { value: null as number | null, label: t("Regulators covered", "الجهات الرقابية المشمولة") },
    ],
  },
};
