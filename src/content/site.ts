import type { Locale } from "@/lib/config";
export type Bilingual = { en: string; ar: string };
export const t = (en: string, ar: string): Bilingual => ({ en, ar });
export const ui = {
  brand: t("Treehouse Consultancy", "تري هاوس للاستشارات"),
  nav: [
    t("Mutabiq", "مطابق"),
    t("Services", "الخدمات"),
    t("Markets", "الأسواق"),
    t("Sectors", "القطاعات"),
    t("Insights", "الرؤى"),
    t("About", "من نحن"),
    t("Contact", "تواصل معنا"),
  ],
  navPaths: [
    "mutabiq",
    "services",
    "markets",
    "sectors",
    "insights",
    "about",
    "contact",
  ],
  demo: t("Request a demonstration", "اطلب عرضاً توضيحياً"),
  talk: t("Speak to our team", "تحدث إلى فريقنا"),
  explore: t("Explore Mutabiq", "اكتشف مطابق"),
  coverage: t("See regulatory coverage", "اطّلع على التغطية الرقابية"),
  login: t("Client login", "دخول العملاء"),
  home: t("Home", "الرئيسية"),
  menu: t("Open menu", "افتح القائمة"),
  close: t("Close menu", "أغلق القائمة"),
  skip: t("Skip to content", "انتقل إلى المحتوى"),
  eyebrow: t(
    "REGULATORY INTELLIGENCE. HUMAN EXPERTISE.",
    "خبرة بشرية. تقنية رقابية.",
  ),
  heroA: t("See your compliance position", "انظر إلى وضع التزامك"),
  heroB: t("the way your regulator will.", "كما ستراه الجهة الرقابية."),
  homeIntro: t(
    "Treehouse is a UK regulatory advisory and technology firm, led by former regulators. We help financial institutions in the United Kingdom, the United Arab Emirates and Saudi Arabia to understand every requirement that applies to them, and to evidence how they meet it.",
    "تري هاوس شركة بريطانية متخصصة في الاستشارات التنظيمية والتقنية الرقابية، يقودها مسؤولون رقابيون سابقون. نساعد المؤسسات المالية في المملكة المتحدة والإمارات العربية المتحدة والمملكة العربية السعودية على معرفة كل متطلب ينطبق عليها، وعلى إثبات استيفائه.",
  ),
  heroShort: t(
    "Regulatory advisory and technology, led by former regulators. Clarity for financial institutions across the UK, UAE and Saudi Arabia.",
    "استشارات تنظيمية وتقنية رقابية يقودها مسؤولون رقابيون سابقون. رؤية واضحة للمؤسسات المالية في المملكة المتحدة والإمارات والسعودية.",
  ),
  scroll: t("A clearer perspective", "رؤية أكثر وضوحاً"),
  structure: t("THE STRUCTURE OF COMPLIANCE", "هيكل الالتزام"),
  structureNote: t(
    "An illustration of connected requirements",
    "رسم توضيحي للمتطلبات المترابطة",
  ),
  layer: [
    t("01 / REGULATION", "٠١ / الأنظمة"),
    t("02 / EVIDENCE", "٠٢ / الأدلة"),
    t("03 / CLARITY", "٠٣ / الوضوح"),
  ],
  pause: t("Pause motion", "إيقاف الحركة"),
  play: t("Resume motion", "تشغيل الحركة"),
  product: t("Mutabiq", "مطابق"),
  endorsement: t("by Treehouse", "من تري هاوس"),
  tagline: t("Every requirement, evidenced.", "كل متطلب، بالدليل."),
  productHeading: t(
    "Every requirement. Every policy. One clear answer.",
    "كل متطلب. كل سياسة. إجابة واحدة واضحة.",
  ),
  productIntro: t(
    "Mutabiq is our regulatory compliance assessment tool. It holds regulatory requirements taken directly from the source instruments, and assesses your policies and procedures against each one. The result is a requirement by requirement view of where you stand, with the evidence behind every finding.",
    "مطابق هي أداتنا لتقييم الالتزام التنظيمي. تحتوي الأداة على المتطلبات التنظيمية مأخوذة مباشرة من نصوص الأنظمة واللوائح، وتقيّم سياساتكم وإجراءاتكم مقابل كل متطلب. والنتيجة صورة واضحة لوضعكم، متطلباً بمتطلب، مع الدليل الداعم لكل نتيجة.",
  ),
  why: t("A different perspective.", "منظور مختلف."),
  whyEyebrow: t("THE TREEHOUSE APPROACH", "منهج تري هاوس"),
  serviceHeading: t(
    "Advisory services, powered by Mutabiq.",
    "خدمات استشارية تدعمها تقنية مطابق.",
  ),
  allServices: t("View all services", "جميع الخدمات"),
  marketHeading: t("One firm. Three markets.", "شركة واحدة. ثلاثة أسواق."),
  marketIntro: t(
    "Local regulatory understanding. A consistent, evidence-led approach.",
    "فهم محلي للمتطلبات الرقابية. ومنهج متسق يستند إلى الأدلة.",
  ),
  insightsHeading: t("Perspective that matters.", "رؤى ذات قيمة."),
  allInsights: t("All insights", "جميع الرؤى"),
  insightsEmpty: t(
    "Our next perspective is taking shape.",
    "رؤيتنا القادمة قيد الإعداد.",
  ),
  insightsEmptyBody: t(
    "Regulatory briefings and practical analysis from Treehouse will appear here. Speak to us about the issues on your agenda.",
    "ستُنشر هنا الإحاطات التنظيمية والتحليلات العملية من تري هاوس. تحدث إلينا حول أولوياتك.",
  ),
  closingTitle: t("Know where you stand.", "اعرف أين تقف."),
  closingText: t(
    "Ask us for a demonstration of Mutabiq, or talk to our team about your regulatory priorities.",
    "اطلب عرضاً توضيحياً لمطابق، أو تحدث إلى فريقنا حول أولوياتك التنظيمية.",
  ),
  disclaimer: t(
    "Treehouse Consultancy provides regulatory advisory and technology services. It is not a law firm and does not provide legal advice. Nothing on this website implies approval or endorsement by any regulator.",
    "تقدم تري هاوس خدمات استشارية وتقنية في المجال التنظيمي، وليست مكتب محاماة ولا تقدم مشورة قانونية. لا يتضمن هذا الموقع ما يفيد اعتماد أي جهة رقابية أو تأييدها.",
  ),
  footerLine: t(
    "Regulatory clarity. Built on evidence.",
    "وضوح رقابي. يستند إلى الأدلة.",
  ),
  information: t("Information", "معلومات"),
  tableHint: t(
    "Scroll horizontally to see all columns.",
    "مرّر أفقياً لعرض جميع الأعمدة.",
  ),
  privacy: t("Privacy", "الخصوصية"),
  cookies: t("Cookies", "ملفات الارتباط"),
  terms: t("Terms", "الشروط"),
  copyright: t(
    "Treehouse Consultancy. All rights reserved.",
    "تري هاوس للاستشارات. جميع الحقوق محفوظة.",
  ),
  market: t("Market", "السوق"),
  regulator: t("Regulator", "الجهة الرقابية"),
  status: t("Library status", "حالة المكتبة"),
  allMarkets: t("All markets", "جميع الأسواق"),
  allTopics: t("All topics", "جميع المواضيع"),
  topic: t("Topic", "الموضوع"),
  complete: t("Complete", "مكتملة"),
  coverageNote: t(
    "Coverage is shown as supplied by Treehouse. Confirm the instruments and versions relevant to your firm during scoping.",
    "تُعرض التغطية وفقاً للمعلومات المقدمة من تري هاوس. تُؤكَّد الأنظمة والإصدارات ذات الصلة بمؤسستكم عند تحديد النطاق.",
  ),
  requestRegulator: t(
    "Do not see your regulator?",
    "لا تجد الجهة الرقابية التي تهمك؟",
  ),
  requestRegulatorText: t(
    "Tell us which regulator and sector you need. We add new regulators in response to demand from firms.",
    "أخبرنا بالجهة الرقابية والقطاع الذي تحتاجه. نضيف جهات رقابية جديدة استجابة لاحتياجات المؤسسات.",
  ),
  how: t("How Mutabiq works", "كيف يعمل مطابق"),
  outputs: t("What you receive", "ما تحصل عليه"),
  principles: t("Our principles", "مبادئنا"),
  users: t("Who uses it", "لمن صُمّم"),
  verdicts: t("Four verdicts. No ambiguity.", "أربع نتائج واضحة."),
  judgement: t(
    "Mutabiq supports professional judgement and does not replace it. Every assessment is reviewed by an experienced regulatory specialist.",
    "يدعم مطابق الحكم المهني ولا يحلّ محله. يراجع كل تقييم متخصص ذو خبرة في الشؤون التنظيمية.",
  ),
  illustration: t(
    "ILLUSTRATIVE METHOD · NOT LIVE CLIENT DATA",
    "توضيح للمنهج · ليست بيانات عملاء فعلية",
  ),
  assessment: t("Requirement assessment", "تقييم المتطلبات"),
  requirement: t("Requirement", "المتطلب"),
  evidence: t("Document evidence", "الأدلة الوثائقية"),
  finding: t("Finding", "النتيجة"),
  graphHint: t(
    "Select a verdict to explore the method.",
    "اختر نتيجة لاستكشاف المنهج.",
  ),
  aboutApproach: t("How we work", "كيف نعمل"),
  loginTitle: t(
    "Your next chapter in regulatory clarity.",
    "خطوتك التالية نحو الوضوح الرقابي.",
  ),
  reserved: t(
    "CLIENT ACCESS · NOT YET CONNECTED",
    "دخول العملاء · غير متصل حالياً",
  ),
  loginNotice: t(
    "Client access is not yet available on this website. The existing Mutabiq application will be connected by Treehouse after its security and subscription checks are verified.",
    "دخول العملاء غير متاح حالياً عبر هذا الموقع. ستربط تري هاوس تطبيق مطابق القائم بعد التحقق من ضوابط الأمان والاشتراكات.",
  ),
  signIn: t("Secure sign-in unavailable", "تسجيل الدخول الآمن غير متاح"),
  portalPreview: t("View reserved portal", "عرض مساحة البوابة المحجوزة"),
  portalNotice: t(
    "Design preview only. No account, assessment or client document is available here.",
    "معاينة تصميم فقط. لا تتوفر هنا حسابات أو تقييمات أو مستندات عملاء.",
  ),
  portalAreas: [
    t("Assessments", "التقييمات"),
    t("Regulatory library", "المكتبة التنظيمية"),
    t("Documents", "المستندات"),
    t("Subscription", "الاشتراك"),
  ],
  connectionPending: t("Connection pending", "بانتظار الربط"),
  legalPending: t(
    "Publication pending client approval",
    "بانتظار اعتماد العميل للنشر",
  ),
  legalPendingText: t(
    "This page is reserved for the final notice approved by Treehouse. Online enquiries are disabled until the privacy notice, data handling arrangements and monitored inbox are ready.",
    "هذه الصفحة مخصصة للإشعار النهائي الذي تعتمده تري هاوس. تبقى الاستفسارات الإلكترونية معطلة حتى اعتماد إشعار الخصوصية وترتيبات معالجة البيانات والبريد المراقب.",
  ),
  noTracking: t(
    "No advertising or analytics trackers are active. Fonts are served from this website. A security challenge will be loaded only when online forms are enabled.",
    "لا تعمل أدوات تتبع إعلانية أو تحليلية. تُقدَّم الخطوط من هذا الموقع. ولا يُحمّل التحقق الأمني إلا عند تفعيل النماذج الإلكترونية.",
  ),
  back: t("Back to insights", "العودة إلى الرؤى"),
  minuteRead: t("min read", "دقائق للقراءة"),
};
export const why = [
  {
    title: t("The supervisor’s view.", "نظرة المشرف."),
    text: t(
      "Our work is led by people who have supervised regulated firms. We know what a regulator looks for and how findings are formed.",
      "يقود أعمالنا أشخاص سبق لهم الإشراف على مؤسسات مرخصة، ونعرف ما تبحث عنه الجهة الرقابية وكيف تتشكل النتائج.",
    ),
  },
  {
    title: t("Sourced, not summarised.", "من المصدر مباشرة."),
    text: t(
      "Our assessments rest on the exact wording of the regulation, not on a secondary summary of it.",
      "تستند تقييماتنا إلى النص الحرفي للأنظمة واللوائح، لا إلى ملخصات عنها.",
    ),
  },
  {
    title: t("Advice you can evidence.", "مشورة قابلة للإثبات."),
    text: t(
      "Every conclusion links a requirement to your own documents, so it stands up to board, audit and regulatory scrutiny.",
      "كل نتيجة تربط المتطلب بوثائقكم، فتصمد أمام مجلس الإدارة والمراجعة والجهة الرقابية.",
    ),
  },
];
export const serviceLabels = {
  who: t("Who it is for", "لمن هذه الخدمة"),
  when: t("When firms call us", "متى تحتاج المؤسسات إلينا"),
  what: t("What we do", "ما نقدمه"),
  receive: ui.outputs,
  mutabiq: t("Supported by Mutabiq by Treehouse", "بدعم من مطابق من تري هاوس"),
};
export const services = [
  {
    slug: "compliance-assessment",
    title: t("Compliance assessment", "تقييم الالتزام"),
    summary: t(
      "A complete, requirement by requirement assessment of your policies and procedures against the regulations that apply to you.",
      "تقييم شامل لسياساتكم وإجراءاتكم مقابل الأنظمة المنطبقة عليكم، متطلباً بمتطلب.",
    ),
    who: t(
      "Compliance and risk teams, boards and internal audit functions that need an evidenced view of regulatory obligations.",
      "فرق الالتزام والمخاطر ومجالس الإدارة والمراجعة الداخلية التي تحتاج إلى رؤية موثقة لالتزاماتها التنظيمية.",
    ),
    when: t(
      "Before a supervisory visit; after new regulations are issued; on appointment of a new Chief Compliance Officer; ahead of a board attestation.",
      "قبل زيارة رقابية، أو بعد صدور أنظمة جديدة، أو عند تعيين مسؤول التزام جديد، أو قبل إقرار مجلس الإدارة.",
    ),
    what: t(
      "Confirm the regulatory scope, map applicable requirements, assess your documents and review findings with your team.",
      "تحديد النطاق التنظيمي، وحصر المتطلبات المنطبقة، وتقييم الوثائق، ومراجعة النتائج مع فريقكم.",
    ),
    receive: t(
      "A requirements register, a verdict for every requirement, a prioritised gap report and a remediation plan.",
      "سجل للمتطلبات، ونتيجة لكل متطلب، وتقرير للفجوات حسب الأولوية، وخطة معالجة.",
    ),
    support: t(
      "Mutabiq links each requirement to document evidence and a clear verdict, creating a traceable assessment.",
      "يربط مطابق كل متطلب بالأدلة الوثائقية ونتيجة واضحة، لإنشاء تقييم قابل للتتبع.",
    ),
  },
  {
    slug: "licensing-and-authorisation",
    title: t("Licensing and authorisation", "الترخيص والتصريح"),
    summary: t(
      "Support for new applicants and existing firms extending their permissions, from the business case to the regulator’s final decision.",
      "دعم مقدمي الطلبات الجدد والمؤسسات التي توسّع نطاق تراخيصها، من دراسة الأعمال حتى القرار النهائي للجهة الرقابية.",
    ),
    who: t(
      "New entrants and established financial institutions seeking new or extended regulatory permissions.",
      "الجهات الجديدة والمؤسسات المالية القائمة التي تسعى إلى تراخيص جديدة أو توسعة نطاق تصاريحها.",
    ),
    when: t(
      "At market entry, when launching a new regulated activity or when extending existing permissions.",
      "عند دخول سوق جديد، أو إطلاق نشاط خاضع للتنظيم، أو توسعة نطاق التراخيص الحالية.",
    ),
    what: t(
      "Regulatory perimeter and licence type analysis; application planning; regulatory business plan; governance and control framework design; policy suite; readiness review before submission; support with regulator questions.",
      "تحليل النطاق التنظيمي ونوع الترخيص، وتخطيط الطلب، وخطة الأعمال التنظيمية، وتصميم إطار الحوكمة والضوابط، وحزمة السياسات، ومراجعة الجاهزية، ودعم الردود على استفسارات الجهة الرقابية.",
    ),
    receive: t(
      "A structured application plan, supporting policies and a documented readiness review aligned to the relevant licence.",
      "خطة منظمة للطلب، وسياسات داعمة، ومراجعة جاهزية موثقة ومتوافقة مع الترخيص المطلوب.",
    ),
    support: t(
      "Licensing requirements are tracked line by line, so nothing is missed in the application.",
      "تُتابع متطلبات الترخيص بنداً ببند لضمان اكتمال الطلب.",
    ),
  },
  {
    slug: "governance-risk-compliance",
    title: t("Governance, risk and compliance", "الحوكمة والمخاطر والالتزام"),
    summary: t(
      "Design and review of the frameworks that boards and regulators rely on.",
      "تصميم ومراجعة الأطر التي تعتمد عليها مجالس الإدارة والجهات الرقابية.",
    ),
    who: t(
      "Boards, senior management, risk and compliance functions strengthening their governance arrangements.",
      "مجالس الإدارة والإدارة العليا ووظائف المخاطر والالتزام التي تعمل على تعزيز ترتيبات الحوكمة.",
    ),
    when: t(
      "During organisational change, growth, framework reviews or a response to supervisory expectations.",
      "خلال التغيير المؤسسي أو النمو أو مراجعة الأطر أو الاستجابة للتوقعات الرقابية.",
    ),
    what: t(
      "Board and committee structures; terms of reference; delegated authorities; risk appetite; enterprise risk management; compliance framework and monitoring plan; policy architecture; board reporting.",
      "هياكل المجلس واللجان، والاختصاصات، والصلاحيات المفوضة، وشهية المخاطر، وإدارة المخاطر المؤسسية، وإطار الالتزام وخطة المراقبة، وهيكل السياسات، وتقارير المجلس.",
    ),
    receive: t(
      "A proportionate framework, clear responsibilities and practical reporting and monitoring arrangements.",
      "إطار متناسب، ومسؤوليات واضحة، وترتيبات عملية لإعداد التقارير والمراقبة.",
    ),
    support: t(
      "Mutabiq maps framework documents to applicable requirements and highlights areas that need stronger evidence.",
      "يربط مطابق وثائق الإطار بالمتطلبات المنطبقة ويحدد المجالات التي تحتاج إلى أدلة أقوى.",
    ),
  },
  {
    slug: "regulatory-change",
    title: t("Regulatory change and remediation", "التغيير التنظيمي والمعالجة"),
    summary: t(
      "Turning new requirements and supervisory findings into completed, evidenced change.",
      "تحويل المتطلبات الجديدة والملاحظات الرقابية إلى تغييرات منجزة وموثقة.",
    ),
    who: t(
      "Firms implementing new regulations or addressing supervisory, audit and compliance findings.",
      "المؤسسات التي تطبق أنظمة جديدة أو تعالج ملاحظات الجهات الرقابية والمراجعة والالتزام.",
    ),
    when: t(
      "When new instruments are issued, a regulatory deadline approaches or a remediation programme needs direction.",
      "عند إصدار أنظمة جديدة، أو اقتراب موعد تنظيمي، أو الحاجة إلى توجيه برنامج معالجة.",
    ),
    what: t(
      "Impact assessment of new regulation; gap analysis; remediation planning; programme management; closure evidence; reporting to the board and the regulator.",
      "تقييم أثر الأنظمة الجديدة، وتحليل الفجوات، وتخطيط المعالجة، وإدارة البرامج، وأدلة الإغلاق، والتقارير للمجلس والجهة الرقابية.",
    ),
    receive: t(
      "A prioritised change plan with accountable owners, milestones and evidence of closure.",
      "خطة تغيير مرتبة حسب الأولوية، بمسؤوليات ومراحل واضحة وأدلة إغلاق.",
    ),
    support: t(
      "Mutabiq connects changed requirements to findings and actions, preserving the evidence behind remediation.",
      "يربط مطابق المتطلبات المعدلة بالنتائج والإجراءات، ويحفظ الأدلة الداعمة للمعالجة.",
    ),
  },
  {
    slug: "independent-assurance",
    title: t("Independent assurance", "التأكيد المستقل"),
    summary: t(
      "An objective view of whether your controls work as intended.",
      "رؤية موضوعية لمدى عمل ضوابطكم على النحو المقصود.",
    ),
    who: t(
      "Boards, audit committees and senior managers seeking an independent assessment of regulatory controls.",
      "مجالس الإدارة ولجان المراجعة والإدارة العليا التي تسعى إلى تقييم مستقل للضوابط التنظيمية.",
    ),
    when: t(
      "Before a board attestation, during thematic reviews or when independent challenge is required.",
      "قبل إقرار مجلس الإدارة، أو خلال المراجعات الموضوعية، أو عند الحاجة إلى تقييم مستقل.",
    ),
    what: t(
      "Thematic reviews; compliance monitoring reviews; control testing; regulatory health checks; support to internal audit on regulatory topics.",
      "المراجعات الموضوعية، ومراجعات مراقبة الالتزام، واختبار الضوابط، وفحوص السلامة التنظيمية، ودعم المراجعة الداخلية في المواضيع التنظيمية.",
    ),
    receive: t(
      "Independent findings, a clear evidence trail and proportionate recommendations for action.",
      "نتائج مستقلة، ومسار واضح للأدلة، وتوصيات متناسبة للإجراء.",
    ),
    support: t(
      "Mutabiq provides the requirement register and document evidence that underpin the specialist’s independent review.",
      "يوفر مطابق سجل المتطلبات والأدلة الوثائقية التي تستند إليها المراجعة المستقلة للمتخصص.",
    ),
  },
];
export const markets = [
  {
    slug: "uk",
    code: "UK",
    name: t("United Kingdom", "المملكة المتحدة"),
    short: t(
      "Our home market. Support for firms regulated by the FCA and the PRA.",
      "سوقنا المحلي. دعم المؤسسات الخاضعة لرقابة هيئتي FCA وPRA.",
    ),
    title: t(
      "Regulatory advisory in the United Kingdom",
      "الاستشارات التنظيمية في المملكة المتحدة",
    ),
    intro: t(
      "The United Kingdom is our home. Treehouse is a company registered in England and Wales, and our approach is shaped by the standards of UK regulation. We support firms regulated by the Financial Conduct Authority and the Prudential Regulation Authority, and we help international firms, including firms from the Gulf, to establish and operate in the UK.",
      "المملكة المتحدة هي موطننا. تري هاوس شركة مسجلة في إنجلترا وويلز، ويستند نهجنا إلى معايير التنظيم البريطاني. ندعم المؤسسات الخاضعة لهيئة السلوك المالي وهيئة التنظيم الاحترازي، ونساعد المؤسسات الدولية، بما فيها مؤسسات الخليج، على التأسيس والعمل في المملكة المتحدة.",
    ),
    help: t(
      "Authorisation and variation of permission; governance and senior management accountability; conduct and consumer outcomes; operational resilience; regulatory change; independent reviews.",
      "الترخيص وتعديل التصاريح، والحوكمة ومساءلة الإدارة العليا، والسلوك ونتائج المستهلك، والمرونة التشغيلية، والتغيير التنظيمي، والمراجعات المستقلة.",
    ),
    regulators: ["FCA", "PRA"],
  },
  {
    slug: "uae",
    code: "UAE",
    name: t("United Arab Emirates", "الإمارات العربية المتحدة"),
    short: t(
      "Support across mainland and financial free zone regulatory frameworks.",
      "دعم عبر الأطر التنظيمية في البر الرئيسي والمناطق المالية الحرة.",
    ),
    title: t(
      "Regulatory advisory in the United Arab Emirates",
      "الاستشارات التنظيمية في الإمارات العربية المتحدة",
    ),
    intro: t(
      "The UAE has several regulators, each with its own rulebook. Firms operating onshore and in the financial free zones must manage more than one regime at once. We help firms to understand which requirements apply, where they overlap and how to meet them through one coherent framework.",
      "تتعدد الجهات الرقابية في الإمارات، ولكل منها قواعدها الخاصة. وتتعامل المؤسسات العاملة في البر الرئيسي والمناطق المالية الحرة مع أكثر من نظام في آن واحد. نساعدها على فهم المتطلبات المنطبقة ومواضع التداخل وكيفية استيفائها من خلال إطار متماسك.",
    ),
    help: t(
      "Regulatory scoping across jurisdictions; licensing; governance and controls; compliance assessment; regulatory change and independent assurance.",
      "تحديد النطاق التنظيمي عبر الاختصاصات، والترخيص، والحوكمة والضوابط، وتقييم الالتزام، والتغيير التنظيمي، والتأكيد المستقل.",
    ),
    regulators: ["CBUAE", "CMA-UAE", "DFSA", "FSRA", "VARA"],
  },
  {
    slug: "saudi-arabia",
    code: "KSA",
    name: t("Saudi Arabia", "المملكة العربية السعودية"),
    short: t(
      "Support for firms supervised by SAMA, the Capital Market Authority and the Insurance Authority.",
      "دعم المؤسسات الخاضعة للبنك المركزي السعودي وهيئة السوق المالية وهيئة التأمين.",
    ),
    title: t(
      "Regulatory advisory in the Kingdom of Saudi Arabia",
      "الاستشارات التنظيمية في المملكة العربية السعودية",
    ),
    intro: t(
      "Financial regulation in the Kingdom is developing quickly, with new and revised requirements across banking, capital markets and insurance. Firms need to keep pace and to show their regulator that they have done so. We support institutions supervised by the Saudi Central Bank, the Capital Market Authority and the Insurance Authority.",
      "يشهد التنظيم المالي في المملكة تطوراً سريعاً، مع متطلبات جديدة ومحدثة في قطاعات المصارف والأسواق المالية والتأمين. ندعم المؤسسات الخاضعة لإشراف البنك المركزي السعودي وهيئة السوق المالية وهيئة التأمين.",
    ),
    help: t(
      "Compliance assessment; licensing readiness; governance and risk frameworks; regulatory change and remediation; independent assurance.",
      "تقييم الالتزام، والجاهزية للترخيص، وأطر الحوكمة والمخاطر، والتغيير التنظيمي والمعالجة، والتأكيد المستقل.",
    ),
    regulators: ["SAMA", "CMA-SA", "IA"],
  },
];
export const marketLabels = {
  regulators: t("Regulators covered", "الجهات الرقابية المشمولة"),
  help: t("How we help", "كيف نساعدكم"),
  status: t("Mutabiq in this market", "مطابق في هذا السوق"),
  saudiTitle: t("Mutabiq for the Insurance Authority.", "مطابق لهيئة التأمين."),
  saudiText: t(
    "The complete Insurance Authority library is available in Mutabiq today. Insurers, reinsurers and insurance service providers can assess their full policy suite against every requirement issued by the Authority.",
    "مكتبة هيئة التأمين متاحة اليوم كاملة في مطابق. يمكن لشركات التأمين وإعادة التأمين ومقدمي خدمات التأمين تقييم سياساتهم مقابل كل متطلب صادر عن الهيئة.",
  ),
};
export const coverage = [
  {
    id: "IA",
    market: "saudi-arabia",
    name: t("Insurance Authority", "هيئة التأمين"),
    status: "complete",
  },
  {
    id: "SAMA",
    market: "saudi-arabia",
    name: t("Saudi Central Bank (SAMA)", "البنك المركزي السعودي (ساما)"),
    status: "complete",
  },
  {
    id: "CMA-SA",
    market: "saudi-arabia",
    name: t("Capital Market Authority", "هيئة السوق المالية"),
    status: "complete",
  },
  {
    id: "CBUAE",
    market: "uae",
    name: t("Central Bank of the UAE", "مصرف الإمارات العربية المتحدة المركزي"),
    status: "complete",
  },
  {
    id: "CMA-UAE",
    market: "uae",
    name: t("Capital Market Authority", "هيئة سوق المال"),
    status: "complete",
  },
  {
    id: "DFSA",
    market: "uae",
    name: t(
      "Dubai Financial Services Authority (DFSA)",
      "سلطة دبي للخدمات المالية",
    ),
    status: "complete",
  },
  {
    id: "FSRA",
    market: "uae",
    name: t(
      "Financial Services Regulatory Authority (ADGM)",
      "سلطة تنظيم الخدمات المالية (سوق أبوظبي العالمي)",
    ),
    status: "complete",
  },
  {
    id: "VARA",
    market: "uae",
    name: t(
      "Virtual Assets Regulatory Authority (VARA)",
      "سلطة تنظيم الأصول الافتراضية",
    ),
    status: "complete",
  },
  {
    id: "FCA",
    market: "uk",
    name: t("Financial Conduct Authority (FCA)", "هيئة السلوك المالي"),
    status: "complete",
  },
  {
    id: "PRA",
    market: "uk",
    name: t("Prudential Regulation Authority (PRA)", "هيئة التنظيم الاحترازي"),
    status: "complete",
  },
] as const;
export const sectors = [
  {
    title: t("Banking and finance companies", "المصارف وشركات التمويل"),
    text: t(
      "Prudential, conduct and governance requirements for banks and lenders.",
      "المتطلبات الاحترازية والسلوكية ومتطلبات الحوكمة للمصارف وجهات التمويل.",
    ),
  },
  {
    title: t("Insurance", "التأمين"),
    text: t(
      "Insurers, reinsurers, brokers and service providers.",
      "شركات التأمين وإعادة التأمين والوسطاء ومقدمو الخدمات.",
    ),
  },
  {
    title: t("Payments and electronic money", "المدفوعات والنقود الإلكترونية"),
    text: t(
      "Licensing, safeguarding and ongoing compliance for payment firms.",
      "الترخيص وحماية الأموال والالتزام المستمر لشركات المدفوعات.",
    ),
  },
  {
    title: t(
      "Capital markets and asset management",
      "الأسواق المالية وإدارة الأصول",
    ),
    text: t(
      "Investment firms, fund managers and capital market institutions.",
      "شركات الاستثمار ومديرو الصناديق ومؤسسات السوق المالية.",
    ),
  },
  {
    title: t("Digital assets", "الأصول الرقمية"),
    text: t(
      "Firms entering or operating under virtual asset regimes.",
      "المؤسسات التي تدخل أو تعمل ضمن أنظمة الأصول الافتراضية.",
    ),
  },
];
export const steps = [
  {
    title: t("Scope", "تحديد النطاق"),
    text: t(
      "Select jurisdiction, industry, regulator, licence type and policy area.",
      "اختيار الاختصاص والقطاع والجهة الرقابية ونوع الترخيص ومجال السياسة.",
    ),
    output: t(
      "A confirmed list of applicable instruments",
      "قائمة مؤكدة بالأنظمة المنطبقة",
    ),
  },
  {
    title: t("Map", "الربط"),
    text: t(
      "Mutabiq assembles every requirement in scope from the library.",
      "يجمع مطابق كل متطلب ضمن النطاق من المكتبة.",
    ),
    output: t("A complete requirements register", "سجل كامل للمتطلبات"),
  },
  {
    title: t("Assess", "التقييم"),
    text: t(
      "Your policies and procedures are compared with each requirement.",
      "تُقارن سياساتكم وإجراءاتكم بكل متطلب.",
    ),
    output: t("A verdict for every requirement", "نتيجة لكل متطلب"),
  },
  {
    title: t("Review", "المراجعة"),
    text: t(
      "Our specialists review and challenge the results with your team.",
      "يراجع متخصصونا النتائج ويناقشونها مع فريقكم.",
    ),
    output: t("Agreed findings", "نتائج متفق عليها"),
  },
  {
    title: t("Report", "التقرير"),
    text: t(
      "Findings are prioritised and turned into actions.",
      "تُرتب النتائج حسب الأولوية وتُحوّل إلى إجراءات.",
    ),
    output: t(
      "Board ready report and remediation plan",
      "تقرير جاهز للمجلس وخطة معالجة",
    ),
  },
];
export const verdicts = [
  {
    id: "addressed",
    title: t("Addressed", "مستوفى"),
    text: t(
      "The document meets the requirement in full.",
      "تستوفي الوثيقة المتطلب بالكامل.",
    ),
    evidence: t(
      "A policy statement, assigned owner and documented review process.",
      "نص في السياسة ومسؤول محدد وعملية مراجعة موثقة.",
    ),
  },
  {
    id: "partial",
    title: t("Partially Addressed", "مستوفى جزئياً"),
    text: t(
      "The document covers the requirement in part; specific elements are missing.",
      "تغطي الوثيقة المتطلب جزئياً؛ وتغيب عناصر محددة.",
    ),
    evidence: t(
      "A policy statement is present; review responsibilities need further evidence.",
      "يوجد نص في السياسة؛ وتحتاج مسؤوليات المراجعة إلى أدلة إضافية.",
    ),
  },
  {
    id: "gap",
    title: t("Gap", "فجوة"),
    text: t(
      "The requirement is in scope and the document does not address it.",
      "المتطلب ضمن النطاق ولا تتناوله الوثيقة.",
    ),
    evidence: t(
      "No relevant provision was identified in the assessed document.",
      "لم يُحدد نص ذو صلة في الوثيقة محل التقييم.",
    ),
  },
  {
    id: "out",
    title: t("Out of Document Scope", "خارج نطاق الوثيقة"),
    text: t(
      "The requirement applies to the firm but belongs in a different document.",
      "ينطبق المتطلب على المؤسسة، لكن موضعه في وثيقة أخرى.",
    ),
    evidence: t(
      "The requirement should be assessed against another policy or procedure.",
      "ينبغي تقييم المتطلب مقابل سياسة أو إجراء آخر.",
    ),
  },
];
export const productFeatures = [
  {
    title: t("Holds the regulatory library", "يحتوي على المكتبة التنظيمية"),
    text: t(
      "Laws, regulations, rules and guidance are broken down to individual requirements, each traceable to its source article.",
      "تُقسَّم الأنظمة واللوائح والقواعد والإرشادات إلى متطلبات منفردة، يرتبط كل منها بمادته المصدرية.",
    ),
  },
  {
    title: t("Identifies what applies to you", "يحدد ما ينطبق عليكم"),
    text: t(
      "The assessment is configured by jurisdiction, industry, regulator, licence type and policy area.",
      "يُعدّ التقييم حسب الاختصاص والقطاع والجهة الرقابية ونوع الترخيص ومجال السياسة.",
    ),
  },
  {
    title: t("Assesses your documents", "يقيّم وثائقكم"),
    text: t(
      "Your policies and procedures are compared with each applicable requirement.",
      "تُقارن سياساتكم وإجراءاتكم بكل متطلب منطبق.",
    ),
  },
  {
    title: t("Reports a verdict", "يصدر نتيجة"),
    text: t(
      "Each requirement is marked Addressed, Partially Addressed, Gap or Out of Document Scope.",
      "يُصنف كل متطلب: مستوفى، أو مستوفى جزئياً، أو فجوة، أو خارج نطاق الوثيقة.",
    ),
  },
  {
    title: t("Supports remediation", "يدعم المعالجة"),
    text: t(
      "Findings become a prioritised action list with a clear line back to the regulation.",
      "تتحول النتائج إلى قائمة إجراءات مرتبة حسب الأولوية ومرتبطة بوضوح بالأنظمة.",
    ),
  },
];
export const productUsers = [
  t(
    "Compliance and risk functions that need a defensible view of their obligations.",
    "وظائف الالتزام والمخاطر التي تحتاج إلى رؤية قابلة للإثبات لالتزاماتها.",
  ),
  t(
    "Boards and senior managers who must attest to compliance.",
    "مجالس الإدارة وكبار المديرين المطالبون بالإقرار بالالتزام.",
  ),
  t(
    "Internal audit teams planning and evidencing regulatory reviews.",
    "فرق المراجعة الداخلية التي تخطط للمراجعات التنظيمية وتوثقها.",
  ),
  t(
    "New entrants preparing a licence application.",
    "الجهات الجديدة التي تعد طلب ترخيص.",
  ),
  t(
    "Firms responding to supervisory findings.",
    "المؤسسات التي تستجيب للملاحظات الرقابية.",
  ),
];
export const principles = [
  {
    title: t("Source verified", "موثّق من المصدر"),
    text: t(
      "Requirements are taken from the regulatory text as published. Nothing is inferred or added.",
      "تُؤخذ المتطلبات من النص التنظيمي المنشور. ولا يُستنتج أو يُضاف أي متطلب.",
    ),
  },
  {
    title: t("Transparent", "شفاف"),
    text: t(
      "Where regulatory instruments differ, the difference is shown rather than resolved silently.",
      "عندما تختلف النصوص التنظيمية، يُعرض الاختلاف بوضوح.",
    ),
  },
  {
    title: t("Jurisdiction neutral", "متسق عبر الاختصاصات"),
    text: t(
      "One method and one engine, with a library for each regulator.",
      "منهج واحد ومحرك واحد، مع مكتبة لكل جهة رقابية.",
    ),
  },
  {
    title: t("Confidential", "سري"),
    text: t(
      "Client documents are handled under strict access controls.",
      "تُعالج وثائق العملاء وفق ضوابط وصول صارمة.",
    ),
  },
];
export const approach = [
  {
    title: t("Senior led", "بقيادة خبراء"),
    text: t(
      "Experienced specialists do the work.",
      "يتولى العمل متخصصون ذوو خبرة.",
    ),
  },
  {
    title: t("Evidence based", "قائم على الأدلة"),
    text: t(
      "Every conclusion is traceable to the regulation.",
      "يمكن تتبع كل نتيجة إلى النص التنظيمي.",
    ),
  },
  {
    title: t("Independent", "مستقل"),
    text: t(
      "We have no products to sell beyond our own advice and technology.",
      "لا نبيع منتجات خارج نطاق مشورتنا وتقنيتنا الخاصة.",
    ),
  },
  {
    title: t("Practical", "عملي"),
    text: t(
      "Recommendations are proportionate to the size and nature of the firm.",
      "تتناسب التوصيات مع حجم المؤسسة وطبيعتها.",
    ),
  },
];
export type PageContent = {
  title: Bilingual;
  intro: Bilingual;
  meta?: Bilingual;
  eyebrow?: Bilingual;
};
export const pages: Record<string, PageContent> = {
  "": {
    title: t(
      "Treehouse Consultancy | Regulatory Advisory and Regulatory Technology",
      "تري هاوس للاستشارات | الاستشارات التنظيمية والتقنية الرقابية",
    ),
    intro: ui.homeIntro,
    meta: t(
      "UK regulatory advisory and technology firm serving financial institutions in the UK, UAE and Saudi Arabia. Home of Mutabiq, the regulatory compliance assessment tool.",
      "شركة بريطانية للاستشارات التنظيمية والتقنية الرقابية تخدم المؤسسات المالية في المملكة المتحدة والإمارات والسعودية. مطوّر أداة مطابق لتقييم الالتزام.",
    ),
  },
  mutabiq: {
    title: t(
      "Mutabiq: the regulatory compliance assessment tool",
      "مطابق: أداة تقييم الالتزام التنظيمي",
    ),
    intro: t(
      "Regulated firms are expected to know every requirement that applies to them and to show how each is met. In practice this knowledge sits in spreadsheets, in people’s heads and in documents that fall out of date. Mutabiq replaces that with a single, structured and evidenced view.",
      "يُتوقع من المؤسسات الخاضعة للتنظيم معرفة كل متطلب ينطبق عليها وإثبات استيفائه. عملياً، تتوزع هذه المعرفة بين جداول البيانات وخبرات الأفراد والوثائق التي تصبح قديمة. يجمع مطابق ذلك في رؤية واحدة منظمة وموثقة.",
    ),
    eyebrow: t("Mutabiq by Treehouse", "مطابق من تري هاوس"),
  },
  "mutabiq/how-it-works": {
    title: t(
      "From regulation to evidenced findings in five steps",
      "من الأنظمة إلى النتائج الموثقة في خمس خطوات",
    ),
    intro: ui.judgement,
    eyebrow: ui.how,
  },
  "mutabiq/coverage": {
    title: t("Regulatory coverage", "التغطية الرقابية"),
    intro: t(
      "Mutabiq is built to work with any regulator. One method and one engine serve every market, with a dedicated library for each regulator. The table below shows current coverage.",
      "صُمّم مطابق للعمل مع أي جهة رقابية. يخدم منهج واحد ومحرك واحد جميع الأسواق، مع مكتبة مخصصة لكل جهة رقابية. يوضح الجدول أدناه التغطية الحالية.",
    ),
  },
  "mutabiq/demo": {
    title: t("Request a demonstration of Mutabiq", "اطلب عرضاً توضيحياً لمطابق"),
    intro: t(
      "See Mutabiq working on a live regulatory library. Demonstrations take around 30 minutes and are led by a regulatory specialist. We will reply within two working days.",
      "شاهد مطابق يعمل على مكتبة تنظيمية فعلية. تستغرق العروض نحو ٣٠ دقيقة ويقدمها متخصص في الشؤون التنظيمية. سنرد خلال يومي عمل.",
    ),
  },
  services: {
    title: t(
      "Regulatory advisory, delivered with evidence",
      "استشارات تنظيمية تستند إلى الأدلة",
    ),
    intro: t(
      "Our services cover the full regulatory life cycle, from first licence to ongoing assurance. Each is led by senior specialists and supported by Mutabiq, so our advice is faster to deliver and easier to evidence.",
      "تغطي خدماتنا دورة العمل التنظيمي كاملة، من الترخيص الأول حتى التأكيد المستمر. يقودها متخصصون ذوو خبرة ويدعمها مطابق، لتقديم المشورة بكفاءة وبأدلة واضحة.",
    ),
  },
  markets: { title: ui.marketHeading, intro: ui.marketIntro },
  sectors: {
    title: t("Sectors we serve", "القطاعات التي نخدمها"),
    intro: t(
      "Regulatory understanding shaped around your business, your permissions and the expectations of your supervisor.",
      "فهم تنظيمي يراعي نشاطكم وتراخيصكم وتوقعات الجهة الرقابية.",
    ),
  },
  about: {
    title: t(
      "Built by people who have sat on the regulator’s side of the table",
      "بخبرة من عملوا في الجانب الرقابي",
    ),
    intro: t(
      "Treehouse was founded on a simple observation. Most regulatory problems begin with a firm that does not have a complete and current view of what is required of it. Our leadership has spent many years in senior supervisory roles, and in advising regulators and regulated firms in the United Kingdom and the Gulf. We built Mutabiq to give firms the same clarity a supervisor expects to find.",
      "تأسست تري هاوس انطلاقاً من ملاحظة بسيطة: تبدأ معظم المشكلات التنظيمية عندما تفتقر المؤسسة إلى رؤية كاملة ومحدثة لما هو مطلوب منها. أمضت قيادتنا سنوات طويلة في مناصب رقابية عليا وفي تقديم المشورة للجهات الرقابية والمؤسسات في المملكة المتحدة والخليج. بنينا مطابق لمنح المؤسسات الوضوح الذي يتوقعه المشرف.",
    ),
  },
  insights: {
    title: t("Insights and regulatory briefings", "رؤى وإحاطات تنظيمية"),
    intro: t(
      "Practical perspectives on regulation, governance and evidenced compliance across our three markets.",
      "رؤى عملية حول التنظيم والحوكمة والالتزام الموثق عبر أسواقنا الثلاثة.",
    ),
  },
  contact: {
    title: ui.talk,
    intro: t(
      "Tell us about your regulatory priorities. All enquiries are treated in confidence and we reply within two working days.",
      "أخبرنا بأولوياتك التنظيمية. تُعامل جميع الاستفسارات بسرية ونرد خلال يومي عمل.",
    ),
  },
  privacy: {
    title: t("Privacy notice", "إشعار الخصوصية"),
    intro: ui.legalPendingText,
  },
  cookies: {
    title: t("Cookie policy", "سياسة ملفات الارتباط"),
    intro: ui.noTracking,
  },
  terms: {
    title: t("Website terms", "شروط الموقع"),
    intro: ui.legalPendingText,
  },
  "client/login": { title: ui.loginTitle, intro: ui.loginNotice },
  "client/portal": {
    title: t("Your client workspace", "مساحة عمل العملاء"),
    intro: ui.portalNotice,
  },
};
for (const s of services)
  pages[`services/${s.slug}`] = {
    title: s.title,
    intro: s.summary,
    eyebrow: ui.nav[1],
  };
for (const m of markets)
  pages[m.slug] = { title: m.title, intro: m.intro, eyebrow: m.name };
export const productNameMeaning = t(
  "Mutabiq means “conforming” in Arabic. It answers one question for every requirement: does your framework conform?",
  "يعني اسم مطابق الامتثال الدقيق. ويجيب عن سؤال واحد لكل متطلب: هل يتوافق إطاركم معه؟",
);
export const legalContent: Record<string, Bilingual[]> = {
  privacy: [
    t(
      "The final notice must identify the data controller, contact details, purposes and lawful bases, processors, international transfers, retention periods and individual rights.",
      "يجب أن يحدد الإشعار النهائي جهة التحكم وبيانات الاتصال والأغراض والأسس النظامية والمعالجين والتحويلات الدولية ومدد الاحتفاظ وحقوق الأفراد.",
    ),
  ],
  cookies: [
    ui.noTracking,
    t(
      "No optional cookies are set by this site. If analytics are introduced, consent controls and this policy must be approved before activation.",
      "لا يضع هذا الموقع ملفات ارتباط اختيارية. إذا أُضيفت أدوات تحليلية، يجب اعتماد ضوابط الموافقة وهذه السياسة قبل تفعيلها.",
    ),
  ],
  terms: [
    ui.disclaimer,
    t(
      "The final terms must confirm the contracting entity, company registration details, permitted use, intellectual property, liability provisions and applicable law.",
      "يجب أن تحدد الشروط النهائية الجهة المتعاقدة وبيانات تسجيل الشركة والاستخدام المسموح والملكية الفكرية وأحكام المسؤولية والقانون المنطبق.",
    ),
  ],
};
export function textFor(locale: Locale, key: keyof typeof ui) {
  return ui[key];
}
