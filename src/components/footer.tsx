import Link from "next/link";
import { ui, markets } from "@/content/site";
import { publishedArticles } from "@/content/articles";
import { config } from "@/lib/config";
import { href, type Locale } from "@/lib/config";
import { Brand, Arrow } from "./ui";
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand locale={locale} />
            <p>{ui.footerLine[locale]}</p>
            {config.portalConnected && (
              <Link className="text-link" href={href(locale, "client/login")}>
                {ui.login[locale]}<Arrow diagonal />
              </Link>
            )}
          </div>
          <div className="footer-column">
            <p>{ui.brand[locale]}</p>
            {ui.nav.map((n, i) =>
              i === 2 || (i === 4 && publishedArticles.length < 3) ? null : (
                <Link key={i} href={href(locale, ui.navPaths[i])}>
                  {n[locale]}
                </Link>
              ),
            )}
          </div>
          <div className="footer-column">
            <p>{ui.nav[2][locale]}</p>
            {markets.map((m) => (
              <Link key={m.slug} href={href(locale, m.slug)}>
                {m.name[locale]}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <p>{ui.information[locale]}</p>
            {(["privacy", "cookies", "terms"] as const).map((k) => (
              <Link key={k} href={href(locale, k)}>
                {ui[k][locale]}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>{ui.disclaimer[locale]}</p>
          <small>
            © {new Date().getFullYear()} {ui.copyright[locale]}
          </small>
        </div>
      </div>
    </footer>
  );
}
