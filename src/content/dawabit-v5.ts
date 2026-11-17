import { t } from "./site";

// Approved buyer-facing content and language pairs from the client v5 change list.
export const targetRoles = [
  { title: t("Compliance and risk", "الالتزام والمخاطر"), text: t("A defensible, requirement-by-requirement view of obligations and where the gaps are.", "رؤية موثقة لكل متطلب ومواضع الفجوات.") },
  { title: t("Board and senior management", "مجلس الإدارة والإدارة العليا"), text: t("A clear position to rely on when attesting to compliance.", "موقف واضح يُعتمد عليه عند الإقرار بالالتزام.") },
  { title: t("Internal audit", "المراجعة الداخلية"), text: t("A complete requirements register to plan and evidence regulatory reviews.", "سجل كامل بالمتطلبات لتخطيط المراجعات التنظيمية وتوثيقها.") },
  { title: t("Licence applicants", "طالبو الترخيص"), text: t("A readiness check of the policy suite before submission.", "فحص جاهزية السياسات قبل تقديم الطلب.") },
  { title: t("Firms under supervisory attention", "الجهات محل ملاحظات رقابية"), text: t("A tracked route from finding to evidenced closure.", "مسار متابع من الملاحظة إلى الإغلاق الموثق.") },
];
export const engagementOptions = [
  { tag: "01", title: t("Assessment", "التقييم"), text: t("We run a full assessment of your policy suite with Dawabit and deliver the report and remediation plan.", "نجري تقييمًا كاملًا لسياساتكم باستخدام «ضوابط» ونسلّم التقرير وخطة المعالجة.") },
  { tag: "02", title: t("Subscription", "الاشتراك"), text: t("Your team uses Dawabit through the year, with library updates and specialist review.", "يستخدم فريقكم «ضوابط» على مدار العام مع تحديثات المكتبة ومراجعة المختصين.") },
  { tag: "03", title: t("Advisory with Dawabit", "الخدمات الاستشارية مع ضوابط"), text: t("Our advisory services, with Dawabit providing the evidence base.", "خدماتنا الاستشارية مستندة إلى قاعدة الأدلة التي توفرها الأداة.") },
];
export const frequentlyAsked = [
  { question: t("What does Dawabit assess?", "ما الذي تقيّمه «ضوابط»؟"), answer: t("Your written policies and procedures, against each regulatory requirement that applies to you.", "سياساتكم وإجراءاتكم المكتوبة مقابل كل متطلب تنظيمي ينطبق عليكم.") },
  { question: t("Which sectors and regulators are covered?", "ما القطاعات والجهات المشمولة؟"), answer: t("Dawabit is designed to work with requirements from any regulator. Availability of specific libraries varies by engagement; see our coverage page or tell us your sector.", "صُممت «ضوابط» للتعامل مع متطلبات الجهات التنظيمية المختلفة، وتُحدَّد إتاحة كل مكتبة وفق نطاق التكليف. راجعوا صفحة التغطية أو أخبرونا بقطاعكم.") },
  { question: t("Does Dawabit replace our compliance team or advisers?", "هل تغني «ضوابط» عن فريق الالتزام أو المستشارين؟"), answer: t("No. It gives them a complete, evidenced starting point. Every assessment is reviewed by a specialist.", "لا، بل تمنحهم نقطة انطلاق كاملة وموثقة، ويراجع كل تقييم مختص.") },
  { question: t("Is it legal advice?", "هل هي استشارة قانونية؟"), answer: t("No. Treehouse Consulting is not a law firm.", "لا. تري هاوس للاستشارات ليست مكتب محاماة.") },
  { question: t("What do we receive?", "ما الذي نحصل عليه؟"), answer: t("A verdict for every requirement, the evidence behind it, a prioritised action list and a board-ready report.", "حكم لكل متطلب، والدليل الذي يستند إليه، وقائمة إجراءات مرتبة بالأولوية وتقرير جاهز للعرض على مجلس الإدارة.") },
  { question: t("How are our documents protected?", "كيف تُحمى مستنداتنا؟"), answer: t("Request our security and data-handling information. Detailed deployment and retention arrangements will be published after confirmation.", "اطلبوا معلومات الأمن ومعالجة البيانات. ستُنشر تفاصيل الاستضافة والاحتفاظ بالمستندات بعد اعتمادها.") },
  { question: t("Does it work in Arabic?", "هل تعمل بالعربية؟"), answer: t("Yes. Dawabit works with regulatory text and documents in Arabic and English.", "نعم. تعمل «ضوابط» مع النصوص التنظيمية والمستندات بالعربية والإنجليزية.") },
  { question: t("How do we see it?", "كيف نطّلع عليها؟"), answer: t("Request a demonstration. We tailor each one to your sector and regulator.", "اطلبوا عرضًا توضيحيًا، ونعدّه بما يناسب قطاعكم وجهتكم التنظيمية.") },
];
export const artificialIntelligenceText = t(
  "Dawabit uses artificial intelligence to read regulatory text and your documents, and to propose a verdict for each requirement with the wording it relies on. It does not decide alone. Every verdict shows its source article and the passage in your document, and every assessment is reviewed by an experienced regulatory specialist before it is reported. It is not legal advice.",
  "تستخدم «ضوابط» الذكاء الاصطناعي لقراءة النصوص التنظيمية ومستنداتكم واقتراح حكم لكل متطلب مع بيان النص الذي يستند إليه. ولا تنفرد الأداة بالقرار؛ يُظهر كل حكم المادة المصدر والفقرة المقابلة في مستندكم، ويراجع كل تقييم مختص تنظيمي متمرس قبل إصدار التقرير. وليست الأداة استشارة قانونية.",
);
export const sectorClassificationNote = t(
  "Sector list follows the National Classification of Economic Activities (ISIC4).",
  "تستند قائمة القطاعات إلى التصنيف الوطني للأنشطة الاقتصادية (ISIC4).",
);
export const otherSectorsCoverage = t(
  "Dawabit is built to work with any regulator. Libraries for sectors outside financial services are prepared for each engagement. Tell us your sector and regulator.",
  "صُممت «ضوابط» للعمل مع أي جهة تنظيمية. وتُعدّ مكتبات القطاعات خارج الخدمات المالية لكل تكليف. أخبرونا بقطاعكم وجهتكم التنظيمية.",
);
export const libraryMaintenanceText = t(
  "Regulatory libraries are maintained by our specialists. New and amended instruments are added as they are published.",
  "يتولى مختصونا تحديث المكتبات التنظيمية. وتُضاف الأنظمة واللوائح الجديدة والمعدلة عند صدورها.",
);
// The client's current review dates are awaiting confirmation (E4/E5);
// do not invent dates or render bracketed placeholders in public HTML.

export const officialGraphicManifest = {
  // Exact original v5 exports; hashes are checked on every build.
  overview: { en: "/brand/dawabit-screens/Dawabit_Screen_1_Overview_v5.jpg", ar: "/brand/dawabit-screens/Dawabit_Screen_1_Overview_v5_AR.jpg" },
  verdictDefinitions: { en: "/brand/dawabit/graphics/Verdict_Panel_1_Definitions_EN_Dark_v2.png", ar: "/brand/dawabit/graphics/Verdict_Panel_1_Definitions_AR_Light_v2.png" },
  workedExamples: { en: "/brand/dawabit/graphics/Verdict_Panel_2_Worked_Examples_EN_Light_v2.png", ar: "/brand/dawabit/graphics/Verdict_Panel_2_Worked_Examples_AR_Light_v2.png" },
  evidenceChain: { en: "/brand/dawabit/graphics/Verdict_Panel_3_Evidence_Chain_EN_Light_v2.png", ar: "/brand/dawabit/graphics/Verdict_Panel_3_Evidence_Chain_AR_Light_v2.png" },
  resultsSummary: { en: "/brand/dawabit/graphics/Verdict_Panel_4_Results_Summary_EN_Light_v2.png", ar: "/brand/dawabit/graphics/Verdict_Panel_4_Results_Summary_AR_Light_v2.png" },
  badgeStrip: { en: "/brand/dawabit/graphics/Verdict_Panel_5_Badge_Strip_EN_Light_v2.png", ar: "/brand/dawabit/graphics/Verdict_Panel_5_Badge_Strip_AR_Light_v2.png" },
  methodStrip: { en: "/brand/dawabit/graphics/How_It_Works_Strip_EN_Light_v2.png", ar: "/brand/dawabit/graphics/How_It_Works_Strip_AR_Light_v2.png" },
  sectorGrid: { en: "/brand/dawabit/graphics/Sector_Grid_EN_Light_v2.png", ar: "/brand/dawabit/graphics/Sector_Grid_AR_Light_v2.png" },
} as const;
export const approvedVisualsInstalled = true; // Set true ONLY after official v5 images are supplied, copied and verified.
