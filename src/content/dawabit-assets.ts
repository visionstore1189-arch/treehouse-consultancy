import { t } from "./site";
/** Exact v5 original public images verified by docs/APPROVED_PUBLIC_ASSETS_MANIFEST.json. */
export const dawabitAssets = {
  visualsEnabled: true as boolean,
  sampleReportEnabled: false as boolean,
  sampleReportFilename: "Dawabit_Sample_Assessment_Report_v5.pdf",
  imageBase: "/brand/dawabit-screens/",
  images: {
    overview: {
      file: "Dawabit_Screen_1_Overview_v5.jpg",
      arFile: "Dawabit_Screen_1_Overview_v5_AR.jpg",
      alt: t(
        "Dawabit by Treehouse illustrative assessment overview, showing regulatory requirements and results. Illustrative example.",
        "صورة توضيحية من نظرة عامة على تقييم «ضوابط من تري هاوس» تعرض المتطلبات والنتائج. مثال توضيحي.",
      ),
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
