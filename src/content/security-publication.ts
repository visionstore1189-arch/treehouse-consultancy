/**
 * Unpublished until the firm confirms every E4 fact and approves publication.
 * These values become PUBLIC HTML once enabled; never put secrets here.
 * The client's v5 source text is the only basis for these statements.
 */
export type Language = "en" | "ar";
export type Localized = { en: string; ar: string };
const bi = (en: string, ar: string): Localized => ({ en, ar });
const location = bi(
  process.env.NEXT_PUBLIC_DAWABIT_HOSTING_LOCATION_EN?.trim() || "",
  process.env.NEXT_PUBLIC_DAWABIT_HOSTING_LOCATION_AR?.trim() || "",
);
const retention = bi(
  process.env.NEXT_PUBLIC_DAWABIT_RETENTION_EN?.trim() || "",
  process.env.NEXT_PUBLIC_DAWABIT_RETENTION_AR?.trim() || "",
);
const properFact = (s: string) =>
  s.length >= 4 && s.length <= 200 &&
  !/[\[\]<>]/.test(s) && !/pending|tbd|unknown|placeholder|to be confirmed/i.test(s);
export const securityPublicationReady =
  process.env.NEXT_PUBLIC_DAWABIT_E4_SECURITY_APPROVED === "true" &&
  process.env.NEXT_PUBLIC_DAWABIT_SAUDI_HOSTING_CONFIRMED === "true" &&
  process.env.NEXT_PUBLIC_DAWABIT_DOCUMENTS_NOT_USED_FOR_TRAINING === "true" &&
  properFact(location.en) && properFact(location.ar) &&
  properFact(retention.en) && properFact(retention.ar);

export const securityPublication = {
  ready: securityPublicationReady,
  menu: bi("Security and data handling", "الأمن ومعالجة البيانات"),
  heading: bi("How we protect your documents", "كيف نحمي مستنداتكم"),
  intro: bi(
    "Your policies and procedures are confidential. Dawabit is designed so that they stay that way.",
    "سياساتكم وإجراءاتكم سرية، وقد صُممت «ضوابط» لتبقى كذلك.",
  ),
  items: [
    {
      title: bi("Where your data is held", "مكان حفظ البيانات"),
      text: bi(
        `Documents are stored in ${location.en}. For clients in Saudi Arabia, hosting within the Kingdom is available.`,
        `تُحفظ المستندات لدى ${location.ar}. وتتوفر الاستضافة داخل المملكة للعملاء في السعودية.`,
      ),
    },
    {
      title: bi("Who can see it", "من يطّلع عليها"),
      text: bi(
        "Access is limited to the named specialists working on your assessment and to the users you authorise.",
        "يقتصر الوصول على المختصين المكلفين بتقييمكم والمستخدمين الذين تصرّحون لهم.",
      ),
    },
    {
      title: bi("Use in artificial intelligence", "الاستخدام في الذكاء الاصطناعي"),
      text: bi(
        "Your documents are used only to carry out your assessment. They are not used to train any model.",
        "تُستخدم مستنداتكم لإجراء تقييمكم فقط، ولا تُستخدم لتدريب أي نموذج.",
      ),
    },
    {
      title: bi("Encryption", "التشفير"),
      text: bi(
        "Data is encrypted in transit and at rest.",
        "البيانات مشفرة أثناء النقل وأثناء الحفظ.",
      ),
    },
    {
      title: bi("Retention and deletion", "الاحتفاظ والحذف"),
      text: bi(
        `Documents are kept for ${retention.en} after the assessment and then deleted. You can ask for earlier deletion at any time.`,
        `تُحفظ المستندات مدة ${retention.ar} بعد انتهاء التقييم ثم تُحذف. ويمكنكم طلب الحذف مبكرًا في أي وقت.`,
      ),
    },
    {
      title: bi("Confidentiality", "السرية"),
      text: bi(
        "Every engagement is covered by a confidentiality agreement.",
        "يخضع كل تكليف لاتفاقية سرية.",
      ),
    },
  ],
} as const;
