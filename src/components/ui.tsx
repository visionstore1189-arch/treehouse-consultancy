import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { href, type Locale } from "@/lib/config";
import { ui } from "@/content/site";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon size={17} aria-hidden="true" className="directional" />;
}
export function Button({
  children,
  to,
  secondary = false,
  locale = "en",
}: {
  children: ReactNode;
  to: string;
  secondary?: boolean;
  locale?: Locale;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={href(locale, to)}
    >
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="small-square" />
      {children}
    </p>
  );
}
// Exact client-supplied vector masters, imported unchanged from v4 brand pack.
const englishLogoPackInstalled = true;
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <div className="wordmark dawabit-brand-mark" role="img" aria-label={`${ui.product[locale]} ${ui.endorsement[locale]}`}>
      {locale === "ar" ? (
        <span className="dawabit-logo-arabic" aria-hidden="true">
          <img className="dawabit-lockup-primary" src="/brand/dawabit-by-treehouse-lockup-ar-v1.svg" width={420} height={112} alt="" />
          <img className="dawabit-lockup-reversed" src="/brand/dawabit-by-treehouse-lockup-ar-light-v1.svg" width={420} height={112} alt="" />
        </span>
      ) : englishLogoPackInstalled ? (
        <span className="dawabit-logo-art" aria-hidden="true">
          <img className="dawabit-wordmark-dark" src="/brand/dawabit-logo-primary-v4.svg" alt="" width={500} height={112} />
          <img className="dawabit-wordmark-light" src="/brand/dawabit-logo-reversed-v4.svg" alt="" width={500} height={112} />
        </span>
      ) : (
        <span className="dawabit-logo-pending" aria-hidden="true">
          <span>Dawabit</span>
          <small>by Treehouse</small>
        </span>
      )}
    </div>
  );
}
export function Brand({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link href={href(locale)} aria-label={`${ui.brand[locale]} — ${ui.home[locale]}`} className="brand treehouse-official-brand">
      <img className="treehouse-logo-primary" src="/brand/treehouse-logo-primary-v4.svg" width={350} height={75} alt="" />
      <img className="treehouse-logo-reversed" src="/brand/treehouse-logo-reversed-v4.svg" width={350} height={75} alt="" />
    </Link>
  );
}
export function Closing({ locale }: { locale: Locale }) {
  return (
    <section className="closing">
      <div className="container closing-inner">
        <div>
          <Eyebrow>{ui.tagline[locale]}</Eyebrow>
          <h2>{ui.closingTitle[locale]}</h2>
          <p>{ui.closingText[locale]}</p>
        </div>
        <div className="button-row">
          <Button to="dawabit/demo" locale={locale}>
            {ui.demo[locale]}
          </Button>
          <Button to="contact" locale={locale} secondary>
            {ui.talk[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
