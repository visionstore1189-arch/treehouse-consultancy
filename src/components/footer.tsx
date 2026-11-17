import Link from "next/link";
import { ui, markets } from "@/content/site";
import { publishedArticles } from "@/content/articles";
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
            <p>{locale === "ar" ? "المعلومات" : "Product information"}</p>
            <Link href={href(locale, "dawabit/faq")}>{locale === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions"}</Link>
            <Link href={href(locale, "dawabit/how-it-works")}>{ui.how[locale]}</Link>
            <Link href={href(locale, "dawabit/coverage")}>{ui.coverage[locale]}</Link>
            <Link href={href(locale, "dawabit/demo")}>{ui.demo[locale]}</Link>
            <a href="mailto:enquiries@treehouseconsulting.co.uk">enquiries@treehouseconsulting.co.uk</a>
          </div>
          <div className="footer-column">
            <p>{ui.nav[2][locale]}</p>
            {markets.map((m) => (
              <Link key={m.slug} href={href(locale, m.slug)}>
                {m.name[locale]}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>{ui.disclaimer[locale]}</p>
          <p className="dawabit-trademark">{locale === "ar" ? "«ضوابط» علامة تجارية لتري هاوس للاستشارات. © 2026 تري هاوس للاستشارات. جميع الحقوق محفوظة." : "Dawabit is a trade mark of Treehouse Consulting. © 2026 Treehouse Consulting. All rights reserved."}</p>
          <small>
            © {new Date().getFullYear()} {ui.copyright[locale]}
          </small>
        </div>
      </div>
    </footer>
  );
}
