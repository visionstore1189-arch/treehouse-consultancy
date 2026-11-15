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
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <div className="wordmark" role="img" aria-label={`${ui.product[locale]} ${ui.endorsement[locale]}`}>
      <span>{ui.product[locale]}</span>
      <small>{ui.endorsement[locale]}</small>
    </div>
  );
}
export function Brand({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link
      href={href(locale)}
      aria-label={`${ui.brand[locale]} — ${ui.home[locale]}`}
      className="brand"
    >
      <img
        src="/brand/treehouse-official.png"
        alt={ui.brand[locale]}
        width="1280"
        height="1280"
      />
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
          <Button to="mutabiq/demo" locale={locale}>
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
