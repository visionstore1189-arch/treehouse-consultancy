import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ScanLine,
  Layers3,
  Fingerprint,
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Landmark,
  Orbit,
  Check,
  CircleDot,
} from "lucide-react";
import {
  ui,
  pages,
  why,
  services,
  markets,
  sectors,
  steps,
  productFeatures,
  productUsers,
  verdicts,
  principles,
  approach,
  marketLabels,
  serviceLabels,
  productNameMeaning,
  legalContent,
} from "@/content/site";
import { publishedArticles, readingMinutes } from "@/content/articles";
import { formCopy } from "@/content/forms";
import { config, href, type Locale } from "@/lib/config";
import { Header } from "./header";
import { Footer } from "./footer";
import { Button, Eyebrow, Wordmark, Closing, Arrow } from "./ui";
import { HeroArt } from "./hero-art";
import { Reveal } from "./reveal";
import { AssessmentExplorer, CoverageTable, InsightsList } from "./explorers";
import { DawabitVisual, DawabitGraphic, DawabitProof } from "./dawabit-visual";
import { targetRoles, engagementOptions, frequentlyAsked, artificialIntelligenceText, sectorClassificationNote, otherSectorsCoverage, libraryMaintenanceText, approvedVisualsInstalled } from "@/content/dawabit-v5";
import { EnquiryForm } from "./enquiry-form";
const serviceIcons = [ScanLine, Landmark, Layers3, Orbit, Fingerprint];
const marketDisplayOrder = ["saudi-arabia", "uk", "uae"];
const orderedMarkets = [...markets].sort(
  (a, b) => marketDisplayOrder.indexOf(a.slug) - marketDisplayOrder.indexOf(b.slug)
);
export function MarketCards({ locale }: { locale: Locale }) {
  return (
    <div className="market-grid">
      {orderedMarkets.map((m, i) => (
        <Link className="market-card" href={href(locale, m.slug)} key={m.slug}>
          <div className="market-card-top">
            <span className="market-number">0{i + 1}</span>
            <Arrow diagonal />
          </div>
          <div className={`market-symbol symbol-${i}`} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="overline">{m.code}</span>
          <h3>{m.name[locale]}</h3>
          <p>{m.short[locale]}</p>
          <div className="market-regulators">
            {m.regulators.map((r) => (
              <span key={r}>{r.replace("-UAE", "").replace("-SA", "")}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
export function ServicesList({ locale }: { locale: Locale }) {
  return (
    <div className="service-list">
      {services.map((s, i) => {
        const Icon = serviceIcons[i];
        return (
          <Link
            href={href(locale, `services/${s.slug}`)}
            key={s.slug}
            className="service-row"
          >
            <span className="service-index">0{i + 1}</span>
            <Icon size={26} strokeWidth={1.25} />
            <h3>{s.title[locale]}</h3>
            <p>{s.summary[locale]}</p>
            <span className="round-arrow">
              <Arrow diagonal />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
function Home({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Eyebrow>{ui.eyebrow[locale]}</Eyebrow>
            <h1>
              {ui.heroA[locale]} <em>{ui.heroB[locale]}</em>
            </h1>
            <p>{ui.heroShort[locale]}</p>
            <div className="button-row">
              <Button to="dawabit/demo" locale={locale}>
                {ui.demo[locale]}
              </Button>
              <Button to="contact" locale={locale} secondary>
                {ui.talk[locale]}
              </Button>
            </div>
            <p className="hero-language-note">{locale === "ar" ? "نخدم القطاعات المالية وغير المالية. باللغتين العربية والإنجليزية." : "Used across financial and non-financial sectors. English and Arabic."}</p>
          </div>
          <HeroArt locale={locale} />
          <div className="hero-bottom">
            <a href="#perspective">
              <ArrowDown size={14} />
              {ui.scroll[locale]}
            </a>
            <div>
              {orderedMarkets.map((m) => (
                <Link href={href(locale, m.slug)} key={m.slug}>
                  {m.name[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="perspective" className="section introduction">
        <div className="container">
          <Reveal className="intro-grid">
            <Eyebrow>{ui.brand[locale]}</Eyebrow>
            <div>
              <h2>{ui.footerLine[locale]}</h2>
              <p className="lead">{ui.homeIntro[locale]}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section product-section">
        <div className="container product-grid">
          <Reveal className="product-copy">
            <Wordmark locale={locale} />
            <h2>{ui.productHeading[locale]}</h2>
            <p>{ui.productIntro[locale]}</p>
            <Link className="text-link" href={href(locale, "dawabit")}>
              {ui.explore[locale]}
              <Arrow diagonal />
            </Link>
          </Reveal>
          <Reveal delay={0.08} className="home-dawabit-diagram">
            <div className="home-dawabit-diagram-head">
              <ShieldCheck size={28} strokeWidth={1.25} aria-hidden="true" />
              <span>{locale === "ar" ? "من المتطلب إلى التقرير" : "FROM OBLIGATION TO EVIDENCE"}</span>
            </div>
            <div className="home-dawabit-proof-flow">
              {steps.map((step, i) => (
                <div key={i} className="home-dawabit-proof-step">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{step.title[locale]}</strong>
                </div>
              ))}
            </div>
            <p>{ui.tagline[locale]}</p>
          </Reveal>
        </div>
      </section>
      <section className="section dawabit-method-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.how[locale]}</Eyebrow>
              <h2>{locale === "ar" ? "من النص التنظيمي إلى نتيجة يمكن تتبعها." : "Five steps. A clear line from regulation to result."}</h2>
            </div>
            <Link className="text-link" href={href(locale, "dawabit/how-it-works")}>{ui.how[locale]} <Arrow diagonal /></Link>
          </div>
          <div className="dawabit-method-grid">
            {steps.map((step, i) => (
              <div className="dawabit-method-card" key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title[locale]}</h3>
                <p>{step.output[locale]}</p>
              </div>
            ))}
          </div>
          <DawabitGraphic locale={locale} id="methodStrip" />
        </div>
      </section>
      <section className="section dawabit-sector-teaser">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.nav[3][locale]}</Eyebrow>
              <h2>{locale === "ar" ? "الوضوح التنظيمي عبر القطاعات." : "Regulatory clarity across sectors."}</h2>
            </div>
            <Link className="text-link" href={href(locale, "sectors")}>{locale === "ar" ? "جميع القطاعات" : "Explore all sectors"} <Arrow diagonal /></Link>
          </div>
          <div className="home-sector-tags">
            {sectors.filter(s=>s.featured).slice(0,6).map(s=><span key={s.code}><b>{s.code}</b>{s.title[locale]}</span>)}
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.whyEyebrow[locale]}</Eyebrow>
              <h2>{ui.why[locale]}</h2>
            </div>
            <Link href={href(locale, "about")} className="text-link">
              {ui.nav[5][locale]}
              <Arrow diagonal />
            </Link>
          </div>
          <div className="why-grid">
            {why.map((x, i) => {
              const Icon = [ScanLine, Layers3, Fingerprint][i];
              return (
                <Reveal key={i} className="why-card" delay={i * 0.04}>
                  <Icon size={30} strokeWidth={1} />
                  <span className="index-label">0{i + 1}</span>
                  <h3>{x.title[locale]}</h3>
                  <p>{x.text[locale]}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.nav[1][locale]}</Eyebrow>
              <h2>{ui.serviceHeading[locale]}</h2>
            </div>
            <Link className="text-link" href={href(locale, "services")}>
              {ui.allServices[locale]}
              <Arrow diagonal />
            </Link>
          </div>
          <ServicesList locale={locale} />
        </div>
      </section>
      <section className="section markets-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.nav[2][locale]}</Eyebrow>
              <h2>{ui.marketHeading[locale]}</h2>
            </div>
            <p>{ui.marketIntro[locale]}</p>
          </div>
          <MarketCards locale={locale} />
        </div>
      </section>
      <section className="section dawabit-deliverables-section" aria-labelledby="home-dawabit-deliverables">
        <div className="container">
          <div className="section-heading">
            <div><Eyebrow>{locale === "ar" ? "مخرجات قابلة للاستخدام" : "PRACTICAL DELIVERABLES"}</Eyebrow><h2 id="home-dawabit-deliverables">{locale === "ar" ? "ليس مجرد تقييم. بل أساس واضح للقرار." : "Not just a score. A clear basis for action."}</h2></div>
            <p>{locale === "ar" ? "تربط المخرجات المتطلبات بالأدلة والإجراءات، من سجل المتطلبات إلى ملخص الإدارة." : "Each deliverable connects regulatory obligations with evidence and practical next steps."}</p>
          </div>
          <div className="dawabit-deliverables-grid">
            {[
              { icon: Layers3, title: locale === "ar" ? "سجل المتطلبات" : "Requirements register", text: locale === "ar" ? "كل متطلب ضمن النطاق، مع مرجعه التنظيمي والمستند المقابل." : "Every requirement in scope, its source and the document assessed against it." },
              { icon: ShieldCheck, title: locale === "ar" ? "نتائج موثقة" : "Evidenced findings", text: locale === "ar" ? "نتيجة مفسّرة لكل متطلب، مع أدلة المستند ومراجعة المختص." : "A reasoned verdict for each requirement, supporting evidence and specialist review." },
              { icon: FileText, title: locale === "ar" ? "خطة معالجة مرتبة" : "Prioritised action plan", text: locale === "ar" ? "توصيات ذات أولوية لتحديد المسؤوليات ومتابعة إغلاق الملاحظات." : "Recommendations in priority order for assigning owners and tracking closure." },
            ].map((item, i) => {
              const Icon = item.icon;
              return <Reveal key={item.title} delay={i * 0.04} className="dawabit-deliverable-card">
                <div className="dawabit-deliverable-top"><span>{String(i + 1).padStart(2, "0")}</span><Icon size={28} strokeWidth={1.3} aria-hidden="true" /></div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </Reveal>;
            })}
          </div>
          <Link href={href(locale, "dawabit")} className="text-link">{ui.explore[locale]} <Arrow diagonal /></Link>
        </div>
      </section>
      <section className="section dawabit-assurance-section" aria-labelledby="home-dawabit-assurance">
        <div className="container dawabit-assurance-grid">
          <div>
            <Eyebrow>{locale === "ar" ? "الحكم المهني أولًا" : "HUMAN JUDGEMENT FIRST"}</Eyebrow>
            <h2 id="home-dawabit-assurance">{locale === "ar" ? "تساند التقنية المختص. ولا تحل محله." : "Technology supports the specialist. It does not replace them."}</h2>
            <p>{locale === "ar" ? "تستخدم «ضوابط» الذكاء الاصطناعي لاقتراح نتيجة مدعومة بمصدر المتطلب ونص المستند، مع مراجعة المختص قبل إصدار التقرير." : "Dawabit uses AI to propose a reasoned assessment with its source and supporting passage visible. A specialist reviews each assessment before reporting."}</p>
            <p className="dawabit-assurance-legal">{locale === "ar" ? "تدعم الأداة الحكم المهني وليست استشارة قانونية." : "Dawabit supports professional judgement and does not provide legal advice."}</p>
            <Link href={href(locale, "dawabit/how-it-works")} className="text-link">{ui.how[locale]} <Arrow diagonal /></Link>
          </div>
          <div className="dawabit-assurance-steps">
            {[
              { en: "Source requirement", ar: "المتطلب من المصدر", enDetail: "Trace the obligation to its published source.", arDetail: "ربط الالتزام بمصدره المنشور." },
              { en: "Document passage", ar: "النص من المستند", enDetail: "See the passage behind the proposed finding.", arDetail: "عرض الفقرة الداعمة للحكم المقترح." },
              { en: "Specialist review", ar: "مراجعة المختص", enDetail: "Validate the judgement before reporting.", arDetail: "مراجعة الحكم قبل إصدار التقرير." },
            ].map((step, i) => <div key={step.en} className="dawabit-assurance-step"><span>{String(i+1).padStart(2, "0")}</span><div><strong>{step[locale]}</strong><p>{locale === "ar" ? step.arDetail : step.enDetail}</p></div><Check size={18} aria-hidden="true" /></div>)}
          </div>
        </div>
      </section>
      {publishedArticles.length >= 3 && <section className="section insights-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{ui.nav[4][locale]}</Eyebrow>
              <h2>{ui.insightsHeading[locale]}</h2>
            </div>
            <Link href={href(locale, "insights")} className="text-link">
              {ui.allInsights[locale]}
              <Arrow diagonal />
            </Link>
          </div>
          <InsightsList locale={locale} compact />
        </div>
      </section>}
      <Closing locale={locale} />
    </>
  );
}
function PageHero({ locale, path }: { locale: Locale; path: string }) {
  const p = pages[path];
  return (
    <section
      className={`page-hero ${path.startsWith("dawabit") ? "product-page-hero" : ""}`}
    >
      <div className={`container ${path === "dawabit" ? "dawabit-hero-grid" : ""}`}>
        <div className="page-hero-copy">
        <nav className="breadcrumb" aria-label={ui.home[locale]}>
          <Link href={href(locale)}>{ui.home[locale]}</Link>
          <span>/</span>
          <span>{p.eyebrow?.[locale] || p.title[locale]}</span>
        </nav>
        <Eyebrow>{p.eyebrow?.[locale] || ui.brand[locale]}</Eyebrow>
        {path === "dawabit" && <Wordmark locale={locale} />}
        <h1>{p.title[locale]}</h1>
        {path === "dawabit" && (
          <p className="product-descriptor">{ui.productDescriptor[locale]}</p>
        )}
        <p className="page-intro">{p.intro[locale]}</p>
        {path === "dawabit" && (
          <div className="button-row">
            <Button to="dawabit/demo" locale={locale}>
              {ui.demo[locale]}
            </Button>
            <Button secondary to="dawabit/coverage" locale={locale}>
              {ui.coverage[locale]}
            </Button>
          </div>
        )}
        {path !== "dawabit" && (
          <span className="page-hero-art" aria-hidden="true">
            <span /><span /><span />
          </span>
        )}
        </div>
        {path === "dawabit" && (
          <div className="dawabit-hero-image"><DawabitVisual locale={locale} id="overview" priority /></div>
        )}
      </div>
    </section>
  );
}
function InnerContent({ locale, path }: { locale: Locale; path: string }) {
  const service = services.find((s) => path === `services/${s.slug}`),
    market = markets.find((m) => path === m.slug);
  if (service)
    return (
      <>
        <section className="section">
          <div className="container service-detail">
            <aside>
              <p className="overline">{ui.nav[1][locale]}</p>
              {services.map((s) => (
                <Link
                  href={href(locale, `services/${s.slug}`)}
                  key={s.slug}
                  aria-current={s.slug === service.slug ? "page" : undefined}
                >
                  {s.title[locale]}
                  <Arrow />
                </Link>
              ))}
            </aside>
            <div className="service-body">
              {(["who", "when", "what", "receive", "support"] as const).map(
                (k, i) => (
                  <Reveal className="detail-section" key={k}>
                    <span className="overline">0{i + 1}</span>
                    <h2>
                      {serviceLabels[k === "support" ? "dawabit" : k][locale]}
                    </h2>
                    <p>{service[k][locale]}</p>
                    {k === "receive" && service.slug === "compliance-assessment" && <DawabitGraphic locale={locale} id="resultsSummary" />}
                  </Reveal>
                ),
              )}
              <Link href={href(locale, "dawabit")} className="text-link">
                {ui.explore[locale]}
                <Arrow diagonal />
              </Link>
              {service.slug === "independent-assurance" && <DawabitGraphic locale={locale} id="evidenceChain" />}
            </div>
          </div>
        </section>
        <Closing locale={locale} />
      </>
    );
  if (market)
    return (
      <>
        <section className="section">
          <div className="container">
            <div className="split-heading">
              <h2>{marketLabels.help[locale]}</h2>
              <p className="lead">{market.help[locale]}</p>
            </div>
            <h2 className="table-title">{marketLabels.regulators[locale]}</h2>
            <div className="dawabit-market-regulator-strip" aria-label={marketLabels.regulators[locale]}>
              <span className="dawabit-market-region">{market.code}</span>
              {market.regulators.map((name) => (
                <span className="dawabit-regulator-chip" key={name}>{name.replace("-UAE", "").replace("-SA", "")}</span>
              ))}
            </div>
            <CoverageTable locale={locale} market={market.slug} />
          </div>
        </section>
        <section className="section product-section">
          <div className="container product-grid">
            <div>
              <Wordmark locale={locale} />
              <h2>
                {market.slug === "saudi-arabia"
                  ? marketLabels.saudiTitle[locale]
                  : marketLabels.status[locale]}
              </h2>
              <p>
                {market.slug === "saudi-arabia"
                  ? marketLabels.saudiText[locale]
                  : ui.productIntro[locale]}
              </p>
              <Button locale={locale} to="dawabit/demo">
                {ui.demo[locale]}
              </Button>
            </div>
            {market.slug === "saudi-arabia" ? (
              <DawabitGraphic locale={locale} id="workedExamples" />
            ) : <DawabitGraphic locale={locale} id="badgeStrip" />}

          </div>
        </section>
        <Closing locale={locale} />
      </>
    );
  switch (path) {
    case "dawabit":
      return (
        <>
          <section className="section dawabit-introduction">
            <div className="container">
              <div className="split-heading">
                <div>
                  <Eyebrow>{ui.product[locale]} {ui.endorsement[locale]}</Eyebrow>
                  <h2>{ui.whatDawabitDoes[locale]}</h2>
                </div>
                <p className="lead">{productNameMeaning[locale]}</p>
              </div>
              <div className="feature-list">
                {productFeatures.map((feature,i)=>(
                  <Reveal key={i} className="feature-item">
                    <span>{String(i+1).padStart(2,"0")}</span>
                    <h3>{feature.title[locale]}</h3>
                    <p>{feature.text[locale]}</p>
                  </Reveal>
                ))}
              </div>
              <DawabitProof locale={locale} />
              <Link href={href(locale,"dawabit/how-it-works")} className="text-link">{ui.how[locale]} <Arrow diagonal /></Link>
            </div>
          </section>
          <section className="section dawabit-verdict-section" aria-labelledby="dawabit-verdict-heading">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.tagline[locale]}</Eyebrow><h2 id="dawabit-verdict-heading">{ui.verdicts[locale]}</h2></div>
                <p>{locale==="ar" ? "تُربط كل نتيجة بمتطلب تنظيمي ودليله وتفسيرها." : "Every result links the requirement, the supporting evidence and a reasoned explanation."}</p>
              </div>
              <DawabitGraphic locale={locale} id="verdictDefinitions" dark />
              {!approvedVisualsInstalled && (
                <div className="dawabit-verdict-grid">
                  {verdicts.map((v,i)=><article key={v.id} className={"dawabit-verdict-card verdict-"+v.id}>
                    <span>{String(i+1).padStart(2,"0")}</span>
                    <h3>{v.title[locale]}</h3>
                    <p>{v.text[locale]}</p>
                  </article>)}
                </div>
              )}
            </div>
          </section>
          <section className="section dawabit-example-section">
            <div className="container product-grid">
              <div>
                <Eyebrow>{locale==="ar" ? "تقييم مدعوم بالأدلة" : "EVIDENCE-LED ASSESSMENT"}</Eyebrow>
                <h2>{locale==="ar" ? "من المتطلب إلى الإغلاق الموثق." : "From obligation to an evidenced finding."}</h2>
                <p>{locale==="ar" ? "يُعرض المتطلب مع نصه التنظيمي ودليل السياسة ونتيجة التقييم، ليتمكن المختص من المراجعة واتخاذ الإجراء." : "Each finding puts the regulatory text alongside your policy evidence, the assessed verdict and the action required."}</p>
                <Link href={href(locale,"dawabit/how-it-works")} className="text-link">{ui.how[locale]} <Arrow diagonal /></Link>
              </div>
              <DawabitGraphic locale={locale} id="workedExamples" />
            </div>
          </section>
          <section className="section dawabit-roles-section">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.product[locale]} {ui.endorsement[locale]}</Eyebrow><h2>{locale==="ar"?"لمن صُمّمت ضوابط":"Who Dawabit is for"}</h2></div>
                <p>{locale==="ar" ? "أدوات للمختصين وصنّاع القرار على حد سواء." : "One evidence-led view for specialists, management and decision-makers."}</p>
              </div>
              <div className="dawabit-role-grid">{targetRoles.map((r,i)=><article key={i} className="dawabit-role-card">
                <span>{String(i+1).padStart(2,"0")}</span><h3>{r.title[locale]}</h3><p>{r.text[locale]}</p>
              </article>)}</div>
            </div>
          </section>
          <section className="section dawabit-sector-section">
            <div className="container product-grid">
              <div>
                <Eyebrow>{ui.nav[3][locale]}</Eyebrow>
                <h2>{locale==="ar"?"منهج واحد. قطاعات متعددة.":"One approach. Every regulated sector."}</h2>
                <p>{locale==="ar" ? "تشمل القطاعات المالية والتقنية والصحة والطاقة والنقل والصناعة وغيرها. تُعدّ المكتبات لكل تكليف." : "Dawabit is designed to assess obligations across financial services, technology, healthcare, energy, logistics, manufacturing and other regulated fields."}</p>
                <Link href={href(locale,"sectors")} className="text-link">{locale==="ar"?"استكشف القطاعات":"Explore all sectors"} <Arrow diagonal /></Link>
              </div>
              <DawabitGraphic locale={locale} id="sectorGrid" />
            </div>
          </section>
          <section className="section dawabit-engagement-section">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.brand[locale]}</Eyebrow><h2>{locale==="ar"?"طرق العمل معنا":"How to engage"}</h2></div>
                <p>{locale==="ar"?"اختر الطريقة المناسبة لقطاعك وجهتك التنظيمية.":"Choose the right engagement for your team and regulatory environment."}</p>
              </div>
              <div className="dawabit-engagement-grid">
                {engagementOptions.map(o=><article key={o.tag}>
                  <span>{o.tag}</span><h3>{o.title[locale]}</h3><p>{o.text[locale]}</p>
                </article>)}
              </div>
              <p className="dawabit-engagement-foot">{locale==="ar"?"أخبرونا بقطاعكم وجهتكم التنظيمية لنقترح الخيار الأنسب.":"Tell us your sector and regulator and we will propose the right option."}</p>
              <Button locale={locale} to="dawabit/demo">{ui.demo[locale]}</Button>
            </div>
          </section>
          <section className="section dawabit-principles-section">
            <div className="container">
              <Eyebrow>{ui.whyEyebrow[locale]}</Eyebrow>
              <h2>{ui.principles[locale]}</h2>
              <div className="principle-grid">
                {principles.map((p,i)=><div key={i}><span className="overline">{String(i+1).padStart(2,"0")}</span><h3>{p.title[locale]}</h3><p>{p.text[locale]}</p></div>)}
              </div>
            </div>
          </section>
          <section className="section dawabit-faq-preview">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.product[locale]}</Eyebrow><h2>{locale==="ar"?"أسئلة شائعة عن ضوابط":"Questions about Dawabit"}</h2></div>
                <Link href={href(locale,"dawabit/faq")} className="text-link">{locale==="ar"?"جميع الأسئلة":"All frequently asked questions"} <Arrow diagonal /></Link>
              </div>
              <div className="dawabit-faq-list">{frequentlyAsked.slice(0,4).map((f,i)=><details key={i}><summary>{f.question[locale]}</summary><p>{f.answer[locale]}</p></details>)}</div>
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "dawabit/how-it-works":
      return (
        <>
          <section className="section dawabit-step-section">
            <div className="container steps-list">
              {steps.map((step,i)=>(
                <Reveal className="step-row" key={i}>
                  <span className="step-number">{String(i+1).padStart(2,"0")}</span>
                  <div><h2>{step.title[locale]}</h2><p>{step.text[locale]}</p>
                    {i===3 && <p className="dawabit-review-note">{ui.judgement[locale]}</p>}
                  </div>
                  <div className="step-output-wrap">
                    <div className="step-output"><FileText size={22}/><span>{ui.outputs[locale]}</span><strong>{step.output[locale]}</strong></div>
                    {i===3 && <DawabitGraphic locale={locale} id="evidenceChain" />}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
          <section className="section dawabit-graphic-section">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.how[locale]}</Eyebrow><h2>{locale==="ar"?"سلسلة واحدة من الدليل إلى القرار":"A traceable assessment workflow"}</h2></div>
              </div>
              <DawabitGraphic locale={locale} id="methodStrip" />
              {!approvedVisualsInstalled && <div className="dawabit-method-grid">{steps.map((step,i)=><article key={i} className="dawabit-method-card"><span>{String(i+1).padStart(2,"0")}</span><h3>{step.title[locale]}</h3><p>{step.output[locale]}</p></article>)}</div>}
            </div>
          </section>
          <section className="section dawabit-ai-section">
            <div className="container dawabit-ai-grid">
              <div><Eyebrow>{ui.product[locale]} {ui.endorsement[locale]}</Eyebrow><h2>{ui.ai[locale]}</h2></div>
              <div><p className="lead">{artificialIntelligenceText[locale]}</p>
                <Link className="text-link" href={href(locale,"dawabit/faq")}>{locale==="ar"?"الأسئلة الشائعة":"Frequently asked questions"} <Arrow diagonal /></Link>
              </div>
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "dawabit/coverage":
      return (
        <>
          <section className="section">
            <div className="container">
              <CoverageTable locale={locale} />
              <div className="dawabit-coverage-other">
                <Eyebrow>{ui.nav[3][locale]}</Eyebrow>
                <h2>{locale==="ar"?"قطاعات أخرى":"Other sectors"}</h2>
                <p>{otherSectorsCoverage[locale]}</p>
                <DawabitGraphic locale={locale} id="badgeStrip" />
              </div>
              <section className="dawabit-coverage-maintenance" aria-labelledby="dawabit-library-current">
                <Eyebrow>{locale === "ar" ? "مكتبة المتطلبات التنظيمية" : "REGULATORY LIBRARY"}</Eyebrow>
                <h2 id="dawabit-library-current">{locale === "ar" ? "تحديث المكتبة التنظيمية" : "Keeping the library current"}</h2>
                <p>{libraryMaintenanceText[locale]}</p>
              </section>
            </div>
          </section>
          <section className="section form-section">
            <div className="container form-layout">
              <div>
                <Eyebrow>{ui.coverage[locale]}</Eyebrow>
                <h2>{ui.requestRegulator[locale]}</h2>
                <p>{ui.requestRegulatorText[locale]}</p>
              </div>
              <EnquiryForm locale={locale} kind="coverage" />
            </div>
          </section>
        </>
      );
    case "contact":
    case "dawabit/demo":
      return (
        <>
          <section className="section form-section dawabit-contact-section">
            <div className="container form-layout">
              <aside className="form-aside">
                <Wordmark locale={locale} />
                <h2>{formCopy.detailsTitle[locale]}</h2>
                <ul className="check-list">
                  {(path==="dawabit/demo"?formCopy.details:[ui.closingText,ui.judgement]).map((txt,i)=>(
                    <li key={i}><Check size={16}/>{txt[locale]}</li>
                  ))}
                </ul>
                <div className="aside-note"><ShieldCheck size={25} strokeWidth={1}/><p>{formCopy.confidential[locale]}</p></div>
              </aside>
              <EnquiryForm locale={locale} kind={path==="contact"?"contact":"demo"} />
            </div>
          </section>
          {path==="dawabit/demo" && (
            <section className="section dawabit-demo-access">
              <div className="container dawabit-demo-access-inner">
                <div>
                  <Eyebrow>{ui.product[locale]} {ui.endorsement[locale]}</Eyebrow>
                  <h2>{locale==="ar"?"فتح العرض التوضيحي":"Open the demonstration"}</h2>
                  <p>{locale==="ar"?"يتاح العرض التوضيحي للمستخدمين المعتمدين فقط بعد تفعيل حماية الوصول من جهة الخادم.":"Demonstration access is reserved for approved visitors. Access details will be supplied once server-side protection is enabled."}</p>
                </div>
                <div className="dawabit-demo-lock"><ShieldCheck size={36} strokeWidth={1.2} aria-hidden="true"/><span>{locale==="ar"?"الوصول بانتظار التفعيل":"PROTECTED ACCESS PENDING"}</span></div>
              </div>
            </section>
          )}
        </>
      );
    case "services":
      return (
        <>
          <section className="section">
            <div className="container">
              <ServicesList locale={locale} />
            </div>
          </section>
          <section className="section product-section">
            <div className="container product-grid">
              <div>
                <Wordmark locale={locale} />
                <h2>{ui.productHeading[locale]}</h2>
                <p>{ui.productIntro[locale]}</p>
                <Button to="dawabit" locale={locale}>
                  {ui.explore[locale]}
                </Button>
              </div>
              <DawabitGraphic locale={locale} id="evidenceChain" />
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "markets":
      return (
        <>
          <section className="section markets-section">
            <div className="container">
              <MarketCards locale={locale} />
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "sectors":
      return (
        <>
          <section className="section dawabit-sectors-section">
            <div className="container">
              <div className="section-heading">
                <div><Eyebrow>{ui.nav[3][locale]}</Eyebrow><h2>{locale==="ar"?"عشرة قطاعات رئيسية":"Regulated industries, covered by design."}</h2></div>
                <p>{locale==="ar"?"تُهيأ مكتبات المتطلبات التنظيمية بما يناسب كل جهة وقطاع.":"Dawabit’s assessment method adapts to the regulator, permissions and sector relevant to your organisation."}</p>
              </div>
              <DawabitGraphic locale={locale} id="sectorGrid" />
              <div className="dawabit-sector-card-grid">
                {sectors.filter(x=>x.featured).map(x=>(
                  <article className="dawabit-sector-card" key={x.code}>
                    <span className="dawabit-sector-code">{x.code}</span>
                    <h3>{x.title[locale]}</h3><p>{x.text[locale]}</p>
                    <Link href={href(locale,"contact")} className="text-link">{ui.talk[locale]}<Arrow diagonal /></Link>
                  </article>
                ))}
              </div>
              <DawabitGraphic locale={locale} id="badgeStrip" />
              <div className="dawabit-other-sectors">
                <h2>{ui.otherSectors[locale]}</h2>
                <ul>{sectors.filter(x=>!x.featured).map(x=><li key={x.code}><span>{x.code}</span>{x.title[locale]}</li>)}</ul>
                <p>{sectorClassificationNote[locale]}</p>
              </div>
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "dawabit/faq":
      return (
        <>
          <section className="section dawabit-faq-section">
            <div className="container">
              <div className="dawabit-faq-list">
                {frequentlyAsked.map((qa,i)=>(
                  <details key={i}>
                    <summary><span>{String(i+1).padStart(2,"0")}</span>{qa.question[locale]}</summary>
                    <p>{qa.answer[locale]}</p>
                  </details>
                ))}
              </div>
              <div className="dawabit-faq-contact">
                <h2>{locale==="ar"?"هل لديكم سؤال آخر؟":"Have a more specific question?"}</h2>
                <p>{locale==="ar"?"أخبرونا بقطاعكم وجهتكم التنظيمية وسنساعدكم في اختيار الخطوة التالية.":"Tell us your sector and regulator so we can discuss the right approach."}</p>
                <Button locale={locale} to="contact">{ui.talk[locale]}</Button>
              </div>
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "about":
      return (
        <>
          <section className="section">
            <div className="container">
              <Eyebrow>{ui.whyEyebrow[locale]}</Eyebrow>
              <h2>{ui.aboutApproach[locale]}</h2>
              <div className="principle-grid">
                {approach.map((s, i) => (
                  <div key={i}>
                    <span className="overline">0{i + 1}</span>
                    <h3>{s.title[locale]}</h3>
                    <p>{s.text[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section product-section">
            <div className="container product-grid">
              <div>
                <Wordmark locale={locale} />
                <h2>{ui.productHeading[locale]}</h2>
                <p>{ui.productIntro[locale]}</p>
                <Button to="dawabit" locale={locale}>
                  {ui.explore[locale]}
                </Button>
              </div>
              <DawabitGraphic locale={locale} id="evidenceChain" />
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "insights":
      return (
        <>
          <section className="section">
            <div className="container">
              <InsightsList locale={locale} />
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "privacy":
    case "terms":
    case "cookies":
      return (
        <section className="section">
          <div className="container legal-content">
            <div className="notice">
              <ShieldCheck />
              <strong>{ui.legalPending[locale]}</strong>
            </div>
            {legalContent[path].map((s, i) => (
              <p key={i}>{s[locale]}</p>
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
}
export function SitePage({ locale, path }: { locale: Locale; path: string }) {
  const article = publishedArticles.find((a) => path === `insights/${a.slug}`);
  if (!pages[path] && !article) notFound();
  const schema =
    path === ""
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Treehouse Consulting",
          url: config.siteUrl,
          logo: `${config.siteUrl}/brand/treehouse-logo-primary-v4.svg`,
        }
      : path === "dawabit"
        ? {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Dawabit by Treehouse",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: pages.dawabit.intro[locale],
            url: config.siteUrl + href(locale, path),
          }
        : article
          ? {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title[locale],
              datePublished: article.date,
              author: { "@type": "Organization", name: "Treehouse" },
              inLanguage: locale,
            }
          : null;
  return (
    <>
      <Header locale={locale} path={path} />
      <main id="main" tabIndex={-1}>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        )}
        {path === "" ? (
          <Home locale={locale} />
        ) : article ? (
          <>
            <section className="page-hero">
              <div className="container">
                <Eyebrow>{ui.nav[4][locale]}</Eyebrow>
                <h1>{article.title[locale]}</h1>
                <p className="page-intro">{article.description[locale]}</p>
                <p>
                  <time dateTime={article.date}>{article.date}</time> ·
                  Treehouse · {readingMinutes(article, locale)}{" "}
                  {ui.minuteRead[locale]}
                </p>
              </div>
            </section>
            <article className="section container article-body">
              {article.body.map((s, i) => (
                <section key={i}>
                  <h2>{s.heading[locale]}</h2>
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p[locale]}</p>
                  ))}
                </section>
              ))}
              <Link href={href(locale, "insights")} className="text-link">
                {ui.back[locale]}
                <Arrow />
              </Link>
            </article>
          </>
        ) : path.startsWith("client/") ? (
          <InnerContent locale={locale} path={path} />
        ) : (
          <>
            <PageHero locale={locale} path={path} />
            <InnerContent locale={locale} path={path} />
          </>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
