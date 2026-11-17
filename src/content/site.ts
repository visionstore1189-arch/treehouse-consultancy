import type { Locale } from "@/lib/config";
import { securityPublication, securityPublicationReady } from "./security-publication";
export type Bilingual = { en: string; ar: string };
export const t = (en: string, ar: string): Bilingual => ({ en, ar });
export const ui = {
  brand: t("Treehouse Consulting", "تري هاوس للاستشارات"),
  nav: [
    t("Dawabit", "ضوابط"),
    t("Services", "الخدمات"),
    t("Markets", "الأسواق"),
    t("Sectors", "القطاعات"),
    t("Insights", "الرؤى"),
    t("About", "من نحن"),
    t("Contact", "تواصل معنا"),
  ],
  navPaths: [
    "dawabit",
    "services",
    "markets",
    "sectors",
    "insights",
    "about",
    "contact",
  ],
  demo: t("Request a demonstration", "اطلب عرضاً توضيحياً"),
  talk: t("Speak to our team", "تحدث إلى فريقنا"),
  explore: t("Explore Dawabit", "اكتشف ضوابط"),
  coverage: t("See regulatory coverage", "اطّلع على التغطية الرقابية"),
  login: t("Dawabit Login", "دخول عملاء ضوابط"),
  portalEyebrow: t("Dawabit · PRIVATE CLIENT ACCESS", "ضوابط · بوابة العملاء الخاصة"),
  subscriberTitle: t("Already subscribed to Dawabit?", "هل لديك اشتراك في ضوابط؟"),
  subscriberText: t(
    "Sign in to your Dawabit workspace.",
    "سجّل الدخول إلى مساحة العمل الخاصة بكم في ضوابط."
  ),
  subscriberAction: t("Access your Dawabit account", "الدخول إلى حساب ضوابط"),
  subscriberAvailability: t("Secure sign-in is being prepared.", "يجري إعداد تسجيل الدخول الآمن."),
  loginEmail: t("Work email", "البريد الإلكتروني للعمل"),
  loginPassword: t("Password", "كلمة المرور"),
  loginSecure: t("Access is restricted to authorised subscribers.", "الدخول مخصص للمشتركين المصرّح لهم."),
  loginIssue: t("Credentials are issued individually by Treehouse after subscription activation.", "تصدر تري هاوس بيانات الدخول لكل مستخدم بعد تفعيل الاشتراك."),
  loginActionReady: t("Continue to secure sign-in", "المتابعة إلى تسجيل الدخول الآمن"),
  loginActionPending: t("Sign-in not yet available", "تسجيل الدخول غير متاح بعد"),
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
    "We help regulated organisations in the United Kingdom, the United Arab Emirates and Saudi Arabia, in financial services and beyond, to understand every requirement that applies to them, and to evidence how they meet it.",
    "نساعد الجهات الخاضعة للتنظيم في المملكة المتحدة والإمارات العربية المتحدة والمملكة العربية السعودية، في الخدمات المالية وغيرها من القطاعات، على فهم كل متطلب ينطبق عليها وإثبات كيفية استيفائه.",
  ),
  heroShort: t(
    "Clarity for regulated organisations across the UK, UAE and Saudi Arabia.",
    "وضوح للجهات الخاضعة للتنظيم في المملكة المتحدة والإمارات والسعودية.",
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
  product: t("Dawabit", "ضوابط"),
  endorsement: t("by Treehouse", "من تري هاوس"),
  tagline: t("Every requirement, evidenced.", "كل متطلب، بالدليل."),
  productDescriptor: t(
    "Dawabit is the regulatory compliance assessment tool by Treehouse.",
    "«ضوابط» أداة تقييم الالتزام التنظيمي من تري هاوس.",
  ),
  whatDawabitDoes: t("What Dawabit does", "ماذا يقدّم ضوابط"),
  findingsHeading: t("From regulation to finding", "من النص الرقابي إلى النتيجة"),
  productHeading: t(
    "Every requirement. Every policy. One clear answer.",
    "كل متطلب. كل سياسة. إجابة واحدة واضحة.",
  ),
  productIntro: t(
    "Dawabit is our regulatory compliance assessment tool. It holds regulatory requirements taken directly from the source instruments, and assesses your policies and procedures against each one. The result is a requirement by requirement view of where you stand, with the evidence behind every finding.",
    "ضوابط هي أداتنا لتقييم الالتزام التنظيمي. تحتوي الأداة على المتطلبات التنظيمية مأخوذة مباشرة من نصوص الأنظمة واللوائح، وتقيّم سياساتكم وإجراءاتكم مقابل كل متطلب. والنتيجة صورة واضحة لوضعكم، متطلباً بمتطلب، مع الدليل الداعم لكل نتيجة.",
  ),
  why: t("A different perspective.", "منظور مختلف."),
  whyEyebrow: t("THE TREEHOUSE APPROACH", "منهج تري هاوس"),
  serviceHeading: t(
    "Advisory services, powered by Dawabit.",
    "خدمات استشارية تدعمها تقنية ضوابط.",
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
    "Ask us for a demonstration of Dawabit, or talk to our team about your regulatory priorities.",
    "اطلب عرضاً توضيحياً لضوابط، أو تحدث إلى فريقنا حول أولوياتك التنظيمية.",
  ),
  disclaimer: t(
    "Treehouse Consulting provides regulatory advisory and technology services. It is not a law firm and does not provide legal advice. Nothing on this website implies approval or endorsement by any regulator.",
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
    "Treehouse Consulting. All rights reserved.",
    "تري هاوس للاستشارات. جميع الحقوق محفوظة.",
  ),
  market: t("Market", "السوق"),
  regulator: t("Regulator", "الجهة الرقابية"),
  status: t("Library status", "حالة المكتبة"),
  allMarkets: t("All markets", "جميع الأسواق"),
  allTopics: t("All topics", "جميع المواضيع"),
  topic: t("Topic", "الموضوع"),
  complete: t("Complete", "مكتملة"),
  requestRegulator: t(
    "Do not see your regulator?",
    "لا تجد الجهة الرقابية التي تهمك؟",
  ),
  requestRegulatorText: t(
    "Tell us which regulator and sector you need. We add new regulators in response to demand from firms.",
    "أخبرنا بالجهة الرقابية والقطاع الذي تحتاجه. نضيف جهات رقابية جديدة استجابة لاحتياجات المؤسسات.",
  ),
  how: t("How Dawabit works", "كيف يعمل ضوابط"),
  ai: t("How Dawabit uses artificial intelligence", "كيف تستخدم ضوابط الذكاء الاصطناعي"),
  otherSectors: t("Also covered on request", "قطاعات أخرى عند الطلب"),
  outputs: t("What you receive", "ما تحصل عليه"),
  principles: t("Our principles", "مبادئنا"),
  users: t("Who uses it", "لمن صُمّم"),
  verdicts: t("Four verdicts. No ambiguity.", "أربع نتائج واضحة."),
  judgement: t(
    "Dawabit supports professional judgement and does not replace it. A regulatory specialist reviews findings before reporting.",
    "تدعم «ضوابط» الحكم المهني ولا تحلّ محله. ويراجع مختص في الشؤون التنظيمية النتائج قبل إصدار التقرير.",
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
    "SECURE CLIENT PORTAL",
    "بوابة العملاء الآمنة",
  ),
  loginNotice: t(
    "Dawabit account sign-in is available only to invited subscribers. Your organisation’s subscription and permissions are checked separately; the existing Dawabit software will be connected later.",
    "تسجيل الدخول إلى حساب ضوابط مخصص للمشتركين الذين تلقوا دعوة. يتم التحقق من اشتراك مؤسستك وصلاحياتك بشكل منفصل، وسيُربط تطبيق ضوابط الحالي لاحقاً.",
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
    "Legal notice being finalised",
    "يجري استكمال الإشعار القانوني",
  ),
  legalPendingText: t(
    "The final notice is not yet published. Please contact enquiries@treehouseconsulting.co.uk for information. Online forms remain unavailable until the privacy notice is in place.",
    "لم يُنشر الإشعار النهائي بعد. للاستفسار يرجى مراسلتنا عبر enquiries@treehouseconsulting.co.uk. تبقى النماذج الإلكترونية غير متاحة حتى نشر إشعار الخصوصية.",
  ),
  noTracking: t(
    "No advertising or analytics trackers are active. Fonts are served from this website. A security challenge will be loaded only when online forms are enabled.",
    "لا تعمل أدوات تتبع إعلانية أو تحليلية. تُقدَّم الخطوط من هذا الموقع. ولا يُحمّل التحقق الأمني إلا عند تفعيل النماذج الإلكترونية.",
  ),
  back: t("Back to insights", "العودة إلى الرؤى"),
  minuteRead: t("min read", "دقائق للقراءة"),
};
export const coverageStatusLabels = {
  complete: t("Complete", "مكتملة"),
  inProgress: t("In progress", "قيد التنفيذ"),
  planned: t("Planned", "مخططة"),
  underReview: t("Under review", "قيد المراجعة"),
};
export const why = [
  {
    title: t("The regulatory perspective.", "المنظور التنظيمي."),
    text: t(
      "We assess the requirements that apply to your organisation, showing where the supporting policy evidence is clear and where further work is needed.",
      "نقيّم المتطلبات المنطبقة على مؤسستكم، مع توضيح المواضع التي تتوافر فيها الأدلة الداعمة من السياسات والمواضع التي تحتاج إلى معالجة.",
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
  dawabit: t("Supported by Dawabit by Treehouse", "بدعم من ضوابط من تري هاوس"),
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
      "Dawabit links each requirement to document evidence and a clear verdict, creating a traceable assessment.",
      "يربط ضوابط كل متطلب بالأدلة الوثائقية ونتيجة واضحة، لإنشاء تقييم قابل للتتبع.",
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
      "New entrants and established regulated organisations seeking new or extended regulatory permissions.",
      "الجهات الجديدة والجهات الخاضعة للتنظيم القائمة التي تسعى إلى تراخيص جديدة أو توسعة نطاق تصاريحها.",
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
      "Dawabit maps framework documents to applicable requirements and highlights areas that need stronger evidence.",
      "يربط ضوابط وثائق الإطار بالمتطلبات المنطبقة ويحدد المجالات التي تحتاج إلى أدلة أقوى.",
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
      "Dawabit connects changed requirements to findings and actions, preserving the evidence behind remediation.",
      "يربط ضوابط المتطلبات المعدلة بالنتائج والإجراءات، ويحفظ الأدلة الداعمة للمعالجة.",
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
      "Dawabit provides the requirement register and document evidence that underpin the specialist’s independent review.",
      "يوفر ضوابط سجل المتطلبات والأدلة الوثائقية التي تستند إليها المراجعة المستقلة للمتخصص.",
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
  status: t("Dawabit in this market", "ضوابط في هذا السوق"),
  saudiTitle: t("Dawabit for the Insurance Authority.", "ضوابط لهيئة التأمين."),
  saudiText: t(
    "The complete Insurance Authority library is available in Dawabit today. Insurers, reinsurers and insurance service providers can assess their full policy suite against every requirement issued by the Authority.",
    "مكتبة هيئة التأمين متاحة اليوم كاملة في ضوابط. يمكن لشركات التأمين وإعادة التأمين ومقدمي خدمات التأمين تقييم سياساتهم مقابل كل متطلب صادر عن الهيئة.",
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
  { code: "K", featured: true, title: t("Financial and insurance activities","الأنشطة المالية وأنشطة التأمين"), text: t("Regulatory obligations across banking, finance and insurance.","الالتزامات التنظيمية في المصارف والتمويل والتأمين.") },
  { code: "J", featured: true, title: t("Information and communication","المعلومات والاتصالات"), text: t("Technology, communications and digital services.","التقنية والاتصالات والخدمات الرقمية.") },
  { code: "Q", featured: true, title: t("Human health and social work activities","أنشطة صحة الإنسان والعمل الاجتماعي"), text: t("Healthcare services and social care providers.","الخدمات الصحية ومقدمو الرعاية الاجتماعية.") },
  { code: "H", featured: true, title: t("Transportation and storage","النقل والتخزين"), text: t("Transport operators, logistics and supply chains.","مشغلو النقل والخدمات اللوجستية وسلاسل الإمداد.") },
  { code: "D", featured: true, title: t("Electricity, gas, steam and air conditioning supply","إمدادات الكهرباء والغاز والبخار وتكييف الهواء"), text: t("Energy and essential utility providers.","قطاع الطاقة ومقدمو خدمات المرافق الأساسية.") },
  { code: "B", featured: true, title: t("Mining and quarrying","التعدين واستغلال المحاجر"), text: t("Extractive industries and associated operations.","الصناعات الاستخراجية والعمليات المرتبطة بها.") },
  { code: "C", featured: true, title: t("Manufacturing","الصناعة التحويلية"), text: t("Production, industrial operations and quality controls.","الإنتاج والعمليات الصناعية وضوابط الجودة.") },
  { code: "F", featured: true, title: t("Construction","التشييد"), text: t("Built-environment projects and construction firms.","مشاريع البناء والمنشآت وشركات التشييد.") },
  { code: "L", featured: true, title: t("Real estate activities","الأنشطة العقارية"), text: t("Property operators and real estate services.","المشغّلون العقاريون والخدمات العقارية.") },
  { code: "P", featured: true, title: t("Education","التعليم"), text: t("Education providers and training organisations.","المؤسسات التعليمية وجهات التدريب.") },
  { code: "A", featured: false, title: t("Agriculture, forestry and fishing","الزراعة والحراجة وصيد الأسماك"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "E", featured: false, title: t("Water supply; sewerage, waste management and remediation activities","إمدادات المياه وأنشطة الصرف الصحي وإدارة النفايات ومعالجتها"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "G", featured: false, title: t("Wholesale and retail trade; repair of motor vehicles and motorcycles","تجارة الجملة والتجزئة وإصلاح المركبات ذات المحركات والدراجات النارية"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "I", featured: false, title: t("Accommodation and food service activities","أنشطة الإقامة والخدمات الغذائية"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "M", featured: false, title: t("Professional, scientific and technical activities","الأنشطة المهنية والعلمية والتقنية"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "N", featured: false, title: t("Administrative and support service activities","أنشطة الخدمات الإدارية وخدمات الدعم"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "O", featured: false, title: t("Public administration and defence; compulsory social security","الإدارة العامة والدفاع والضمان الاجتماعي الإلزامي"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "R", featured: false, title: t("Arts, entertainment and recreation","الفنون والترفيه والتسلية"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
  { code: "S", featured: false, title: t("Other service activities","أنشطة الخدمات الأخرى"), text: t("Sector-specific controls on request.","ضوابط خاصة بالقطاع عند الطلب.") },
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
      "Dawabit assembles every requirement in scope from the library.",
      "يجمع ضوابط كل متطلب ضمن النطاق من المكتبة.",
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
      "Treehouse Consulting | Regulatory Advisory and Regulatory Technology",
      "تري هاوس للاستشارات | الاستشارات التنظيمية والتقنية الرقابية",
    ),
    intro: ui.homeIntro,
    meta: t(
      "Treehouse Consulting is a UK regulatory advisory and technology firm serving regulated organisations in the UK, UAE and Saudi Arabia. Home of Dawabit, the regulatory compliance assessment tool.",
      "شركة بريطانية للاستشارات التنظيمية والتقنية الرقابية تخدم الجهات الخاضعة للتنظيم في المملكة المتحدة والإمارات والسعودية. مطوّر أداة ضوابط لتقييم الالتزام.",
    ),
  },
  dawabit: {
    title: t(
      "Every requirement, evidenced.",
      "كل متطلب، بالدليل.",
    ),
    intro: t(
      "Regulated firms are expected to know every requirement that applies to them and to show how each is met. In practice this knowledge sits in spreadsheets, in people’s heads and in documents that fall out of date. Dawabit replaces that with a single, structured and evidenced view.",
      "يُتوقع من المؤسسات الخاضعة للتنظيم معرفة كل متطلب ينطبق عليها وإثبات استيفائه. عملياً، تتوزع هذه المعرفة بين جداول البيانات وخبرات الأفراد والوثائق التي تصبح قديمة. يجمع ضوابط ذلك في رؤية واحدة منظمة وموثقة.",
    ),
    eyebrow: t("Dawabit by Treehouse", "ضوابط من تري هاوس"),
  },
  "dawabit/how-it-works": {
    title: t(
      "From regulation to evidenced findings in five steps",
      "من الأنظمة إلى النتائج الموثقة في خمس خطوات",
    ),
    intro: ui.judgement,
    eyebrow: ui.how,
  },
  "dawabit/coverage": {
    title: t("Regulatory coverage", "التغطية الرقابية"),
    intro: t(
      "Dawabit is built to work with any regulator. One method and one engine serve every market, with a dedicated library for each regulator. The table below shows current coverage.",
      "صُمّم ضوابط للعمل مع أي جهة رقابية. يخدم منهج واحد ومحرك واحد جميع الأسواق، مع مكتبة مخصصة لكل جهة رقابية. يوضح الجدول أدناه التغطية الحالية.",
    ),
  },
  "dawabit/demo": {
    title: t("Request a demonstration of Dawabit", "اطلب عرضاً توضيحياً لضوابط"),
    intro: t(
      "Request a demonstration of Dawabit, tailored to your sector and regulator. We will reply within two working days with access details.",
      "اطلب عرضًا توضيحيًا لضوابط مصممًا لقطاعكم وجهتكم التنظيمية. سنرد خلال يومي عمل بتفاصيل الوصول.",
    ),
  },
  "dawabit/faq": {
    title: t("Dawabit frequently asked questions", "الأسئلة الشائعة عن ضوابط"),
    intro: t(
      "Clear answers about the Dawabit assessment process, regulatory coverage, evidence and ways to engage.",
      "إجابات واضحة عن منهج تقييم ضوابط والتغطية التنظيمية والأدلة وطرق العمل معنا.",
    ),
    eyebrow: t("Dawabit by Treehouse", "ضوابط من تري هاوس"),
  },
  services: {
    title: t(
      "Regulatory advisory, delivered with evidence",
      "استشارات تنظيمية تستند إلى الأدلة",
    ),
    intro: t(
      "Our services cover the regulatory life cycle, from first licensing to ongoing assurance. Experienced specialists lead the work, with Dawabit providing a structured evidence base.",
      "تغطي خدماتنا دورة العمل التنظيمي كاملة، من الترخيص الأول حتى التأكيد المستمر. يقودها متخصصون ذوو خبرة ويدعمها ضوابط، لتقديم المشورة بكفاءة وبأدلة واضحة.",
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
      "Regulatory intelligence. Evidence you can follow.",
      "خبرة تنظيمية وأدلة يمكن تتبعها",
    ),
    intro: t(
      "Regulatory clarity begins with a complete view of what applies, what the evidence says and what remains to be addressed. Treehouse Consulting combines advisory expertise with Dawabit to help regulated organisations in the UK, UAE and Saudi Arabia work from a structured, evidence-led assessment.",
      "يبدأ الوضوح التنظيمي بفهم كامل للمتطلبات المنطبقة والأدلة المتاحة والفجوات المتبقية. تجمع تري هاوس للاستشارات بين الخبرة الاستشارية وأداة «ضوابط» لمساعدة الجهات الخاضعة للتنظيم في المملكة المتحدة والإمارات والسعودية على التقييم المنظم والقائم على الأدلة.",
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
    intro: t("Information about the collection and handling of personal information.", "معلومات عن جمع البيانات الشخصية ومعالجتها."),
  },
  terms: {
    title: t("Website terms", "شروط استخدام الموقع"),
    intro: t("Information about the terms of using the Treehouse Consulting website.", "معلومات عن شروط استخدام موقع تري هاوس للاستشارات."),
  },
  cookies: {
    title: t("Cookie policy", "سياسة ملفات تعريف الارتباط"),
    intro: t("Information about cookies and similar browser technologies on this website.", "معلومات عن ملفات تعريف الارتباط والتقنيات المشابهة على هذا الموقع."),
  },

};
// Build the full client's N1 security page only AFTER confirmed hosting,
// Saudi residency, training, retention and formal E4 publication approval.
// Without E4 the route, sitemap and menus remain absent.
if (securityPublicationReady) {
  pages["dawabit/security"] = {
    title: securityPublication.heading,
    intro: securityPublication.intro,
    eyebrow: securityPublication.menu,
  };
}
for (const s of services)
  pages[`services/${s.slug}`] = {
    title: s.title,
    intro: s.summary,
    eyebrow: ui.nav[1],
  };
for (const m of markets)
  pages[m.slug] = { title: m.title, intro: m.intro, eyebrow: m.name };
export const productNameMeaning = t(
  "Dawabit (ضوابط) is the Arabic word for the controls and rules that a regulator sets. The tool answers one question for every one of them: does your framework meet it?",
  "«ضوابط» هي القواعد والاشتراطات التي تضعها الجهة التنظيمية. تجيب الأداة عن سؤال واحد لكل ضابط منها: هل يستوفيه إطاركم؟",
);
// Draft legal notices are deliberately not published until client-approved text is supplied.
// Draft legal paths are published as neutral holding pages with no approved policy claims.
// Keep forms disabled and all pages noindex until the firm approves E3 and E10.
export const legalContent: Record<string, Bilingual[]> = {
  privacy: [],
  cookies: [],
  terms: [],
};
export function textFor(locale: Locale, key: keyof typeof ui) {
  return ui[key];
}
