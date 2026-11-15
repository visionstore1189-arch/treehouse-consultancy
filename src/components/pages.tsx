import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ScanLine,
  Layers3,
  Fingerprint,
  ArrowDown,
  ArrowUpRight,
  ShieldCheck,
  LockKeyhole,
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
import { EnquiryForm } from "./enquiry-form";
const serviceIcons = [ScanLine, Landmark, Layers3, Orbit, Fingerprint];
export function MarketCards({ locale }: { locale: Locale }) {
  return (
    <div className="market-grid">
      {markets.map((m, i) => (
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
              <Button to="mutabiq/demo" locale={locale}>
                {ui.demo[locale]}
              </Button>
              <Button to="contact" locale={locale} secondary>
                {ui.talk[locale]}
              </Button>
            </div>
          </div>
          <HeroArt locale={locale} />
          <div className="hero-bottom">
            <a href="#perspective">
              <ArrowDown size={14} />
              {ui.scroll[locale]}
            </a>
            <div>
              {markets.map((m) => (
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
            <Link className="text-link" href={href(locale, "mutabiq")}>
              {ui.explore[locale]}
              <Arrow diagonal />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <AssessmentExplorer locale={locale} />
          </Reveal>
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
      className={`page-hero ${path.startsWith("mutabiq") ? "product-page-hero" : ""}`}
    >
      <div className="container">
        <nav className="breadcrumb" aria-label={ui.home[locale]}>
          <Link href={href(locale)}>{ui.home[locale]}</Link>
          <span>/</span>
          <span>{p.eyebrow?.[locale] || p.title[locale]}</span>
        </nav>
        <Eyebrow>{p.eyebrow?.[locale] || ui.brand[locale]}</Eyebrow>
        {path === "mutabiq" && <Wordmark locale={locale} />}
        <h1>{p.title[locale]}</h1>
        {path === "mutabiq" && (
          <p className="product-descriptor">{ui.productDescriptor[locale]}</p>
        )}
        <p className="page-intro">{p.intro[locale]}</p>
        {path === "mutabiq" && (
          <div className="button-row">
            <Button to="mutabiq/demo" locale={locale}>
              {ui.demo[locale]}
            </Button>
            <Button secondary to="mutabiq/coverage" locale={locale}>
              {ui.coverage[locale]}
            </Button>
          </div>
        )}
        <span className="page-hero-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
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
                      {serviceLabels[k === "support" ? "mutabiq" : k][locale]}
                    </h2>
                    <p>{service[k][locale]}</p>
                  </Reveal>
                ),
              )}
              <Link href={href(locale, "mutabiq")} className="text-link">
                {ui.explore[locale]}
                <Arrow diagonal />
              </Link>
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
              <Button locale={locale} to="mutabiq/demo">
                {ui.demo[locale]}
              </Button>
            </div>
            <AssessmentExplorer locale={locale} />
          </div>
        </section>
        <Closing locale={locale} />
      </>
    );
  switch (path) {
    case "mutabiq":
      return (
        <>
          <section className="section">
            <div className="container">
              <div className="split-heading">
                <h2>{ui.whatMutabiqDoes[locale]}</h2>
                <p className="lead">{productNameMeaning[locale]}</p>
              </div>
              <div className="feature-list">
                {productFeatures.map((f, i) => (
                  <Reveal key={i} className="feature-item">
                    <span>0{i + 1}</span>
                    <h3>{f.title[locale]}</h3>
                    <p>{f.text[locale]}</p>
                  </Reveal>
                ))}
              </div>
              <Link
                className="text-link"
                href={href(locale, "mutabiq/how-it-works")}
              >
                {ui.how[locale]}
                <Arrow diagonal />
              </Link>
            </div>
          </section>
          <section className="section product-section">
            <div className="container product-grid">
              <div>
                <Eyebrow>
                  {ui.product[locale]} {ui.endorsement[locale]}
                </Eyebrow>
                <h2>{ui.verdicts[locale]}</h2>
                <p>{ui.judgement[locale]}</p>
                <h3 className="users-heading">{ui.users[locale]}</h3>
                <ul className="check-list">
                  {productUsers.map((s, i) => (
                    <li key={i}>
                      <Check size={16} />
                      {s[locale]}
                    </li>
                  ))}
                </ul>
              </div>
              <AssessmentExplorer locale={locale} />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h2>{ui.principles[locale]}</h2>
              <div className="principle-grid">
                {principles.map((s, i) => (
                  <div key={i}>
                    <span className="overline">0{i + 1}</span>
                    <h3>{s.title[locale]}</h3>
                    <p>{s.text[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "mutabiq/how-it-works":
      return (
        <>
          <section className="section">
            <div className="container steps-list">
              {steps.map((s, i) => (
                <Reveal className="step-row" key={i}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h2>{s.title[locale]}</h2>
                    <p>{s.text[locale]}</p>
                  </div>
                  <div className="step-output">
                    <FileText size={22} />
                    <span>{ui.outputs[locale]}</span>
                    <strong>{s.output[locale]}</strong>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
          <section className="section product-section">
            <div className="container product-grid">
              <div>
                <Eyebrow>
                  {ui.product[locale]} {ui.endorsement[locale]}
                </Eyebrow>
                <h2>{ui.verdicts[locale]}</h2>
                <p>{ui.judgement[locale]}</p>
              </div>
              <AssessmentExplorer locale={locale} />
            </div>
          </section>
          <Closing locale={locale} />
        </>
      );
    case "mutabiq/coverage":
      return (
        <>
          <section className="section">
            <div className="container">
              <CoverageTable locale={locale} />
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
    case "mutabiq/demo":
      return (
        <section className="section form-section">
          <div className="container form-layout">
            <aside className="form-aside">
              <Wordmark locale={locale} />
              <h2>{formCopy.detailsTitle[locale]}</h2>
              <ul className="check-list">
                {(path === "mutabiq/demo"
                  ? formCopy.details
                  : [ui.closingText, ui.judgement]
                ).map((s, i) => (
                  <li key={i}>
                    <Check size={16} />
                    {s[locale]}
                  </li>
                ))}
              </ul>
              <div className="aside-note">
                <ShieldCheck size={25} strokeWidth={1} />
                <p>{formCopy.confidential[locale]}</p>
              </div>
            </aside>
            <EnquiryForm
              locale={locale}
              kind={path === "contact" ? "contact" : "demo"}
            />
          </div>
        </section>
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
                <Button to="mutabiq" locale={locale}>
                  {ui.explore[locale]}
                </Button>
              </div>
              <AssessmentExplorer locale={locale} />
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
          <section className="section">
            <div className="container sector-list">
              {sectors.map((s, i) => (
                <div className="sector-row" key={i}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h2>{s.title[locale]}</h2>
                    <p>{s.text[locale]}</p>
                  </div>
                  <Link
                    className="round-arrow"
                    aria-label={`${ui.talk[locale]} — ${s.title[locale]}`}
                    href={href(locale, "contact")}
                  >
                    <Arrow diagonal />
                  </Link>
                </div>
              ))}
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
                <Button to="mutabiq" locale={locale}>
                  {ui.explore[locale]}
                </Button>
              </div>
              <AssessmentExplorer locale={locale} />
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
    case "client/login":
      return (
        <section className="section portal-section">
          <div className="container login-layout">
            <div>
              <Eyebrow>{ui.reserved[locale]}</Eyebrow>
              <Wordmark locale={locale} />
              <p>{ui.portalNotice[locale]}</p>
              <p className="application-domain" dir="ltr">
                {new URL(config.mutabiqAppUrl).hostname}
              </p>
            </div>
            <div className="login-card">
              <LockKeyhole size={32} strokeWidth={1} />
              <h2>{ui.login[locale]}</h2>
              <p>{ui.loginNotice[locale]}</p>
              <button className="button button-primary" disabled>
                {ui.signIn[locale]}
                <LockKeyhole size={16} />
              </button>
              <Link href={href(locale, "client/portal")} className="text-link">
                {ui.portalPreview[locale]}
                <Arrow />
              </Link>
            </div>
          </div>
        </section>
      );
    case "client/portal":
      return (
        <section className="section portal-section">
          <div className="container">
            <div className="notice">
              <LockKeyhole />
              <strong>{ui.portalNotice[locale]}</strong>
            </div>
            <div className="portal-shell">
              <aside>
                <Wordmark locale={locale} />
                {ui.portalAreas.map((s, i) => (
                  <span key={i}>
                    <CircleDot size={16} />
                    {s[locale]}
                  </span>
                ))}
              </aside>
              <div className="portal-content">
                <Eyebrow>{ui.reserved[locale]}</Eyebrow>
                <div className="portal-grid">
                  {ui.portalAreas.map((s, i) => (
                    <div key={i}>
                      <LockKeyhole size={20} />
                      <h2>{s[locale]}</h2>
                      <p>{ui.connectionPending[locale]}</p>
                      <div className="skeleton" />
                      <div className="skeleton short" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          name: "Treehouse Consultancy",
          url: config.siteUrl,
          logo: `${config.siteUrl}/brand/treehouse-official.png`,
        }
      : path === "mutabiq"
        ? {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Mutabiq by Treehouse",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: pages.mutabiq.intro[locale],
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
