import { t } from "./site";
/** Client-provided TIBQA v3 visual examples; no customer data. */
export const tibqaAssets = {
  visualsEnabled: true as boolean,
  // The version 3 report is held back until approved notices and the enquiry backend exist.
  sampleReportEnabled: false as boolean,
  sampleReportFilename: "TIBQA_Sample_Assessment_Report_v3.pdf",
  imageBase: "/brand/tibqa-screens/",
  images: {
    overview: {
      file: "TIBQA_Screen_1_Overview_v3.jpg",
      alt: t("TIBQA sample assessment overview: 248 requirements, compliance position and prioritised gaps. Illustrative example.", "نظرة عامة توضيحية على تقييم طبقًا تعرض المتطلبات ونتائج الالتزام والفجوات ذات الأولوية."),
    },
    scope: {
      file: "TIBQA_Screen_4_Scope_v3.jpg",
      alt: t("TIBQA sample assessment scope: jurisdiction, industry, regulator, licence type and risk management policy area. Illustrative example.", "مثال توضيحي لتحديد نطاق تقييم طبقًا بحسب الدولة والقطاع والجهة الرقابية ونوع الترخيص ومجال السياسة."),
    },
    requirements: {
      file: "TIBQA_Screen_2_Requirements_v3.jpg",
      alt: t("TIBQA regulatory requirements register with source, assessed policy and verdict. Illustrative example.", "مثال توضيحي لسجل متطلبات طبقًا مع المصدر والسياسة التي تم تقييمها ونتيجة كل متطلب."),
    },
    finding: {
      file: "TIBQA_Screen_3_Finding_v3.jpg",
      alt: t("TIBQA sample assessment finding comparing regulatory requirements with policy evidence, rationale and remedial action. Illustrative example.", "مثال توضيحي لنتيجة تقييم طبقًا تقارن المتطلبات التنظيمية بأدلة السياسة والتعليل والإجراء التصحيحي."),
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
