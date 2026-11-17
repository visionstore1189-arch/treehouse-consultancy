"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe2 } from "lucide-react";
import { ui, services, markets } from "@/content/site";
import { publishedArticles } from "@/content/articles";
import { href, type Locale } from "@/lib/config";
import { Brand, Arrow } from "./ui";
export function Header({ locale, path }: { locale: Locale; path: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => document.body.style.removeProperty("overflow");
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("close", onClose);
      onClose();
    };
  }, []);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      document
        .querySelectorAll<HTMLDetailsElement>(".nav-dropdown[open]")
        .forEach((d) => {
          if (!d.contains(e.target as Node)) d.open = false;
        });
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const showInsights = publishedArticles.length >= 3;
  const subnav = (i: number) =>
    i === 0
      ? [
          { path: "dawabit", label: ui.explore },
          { path: "dawabit/how-it-works", label: ui.how },
          { path: "dawabit/coverage", label: ui.coverage },
          { path: "dawabit/faq", label: { en: "Frequently asked questions", ar: "الأسئلة الشائعة" } },
          { path: "dawabit/demo", label: ui.demo },
        ]
      : i === 1
        ? [
            { path: "services", label: ui.allServices },
            ...services.map((s) => ({
              path: `services/${s.slug}`,
              label: s.title,
            })),
          ]
        : [
            { path: "markets", label: ui.allMarkets },
            ...markets.map((m) => ({ path: m.slug, label: m.name })),
          ];
  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skip[locale]}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand locale={locale} />
          <nav className="desktop-nav" aria-label={ui.menu[locale]}>
            {ui.nav.map((item, i) =>
              i === 4 && !showInsights ? null : i < 3 ? (
                <details
                  key={i}
                  className="nav-dropdown"
                  name="primary-navigation"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.currentTarget.removeAttribute("open");
                      e.currentTarget.querySelector("summary")?.focus();
                    }
                  }}
                >
                  <summary>
                    {i === 0 && <img src="/brand/treehouse-favicon-v4.svg" alt="" aria-hidden="true" className="nav-dawabit-symbol" width={16} height={16} />}
                    {item[locale]}
                    <ChevronDown size={12} />
                  </summary>
                  <div className="nav-popover">
                    {subnav(i).map((s) => (
                      <Link
                        key={s.path}
                        href={href(locale, s.path)}
                        aria-current={path === s.path ? "page" : undefined}
                        onClick={(e) =>
                          e.currentTarget
                            .closest("details")
                            ?.removeAttribute("open")
                        }
                      >
                        {s.label[locale]}
                        <Arrow />
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={i}
                  href={href(locale, ui.navPaths[i])}
                  aria-current={path === ui.navPaths[i] ? "page" : undefined}
                >
                  {item[locale]}
                </Link>
              ),
            )}
          </nav>
          <div className="header-actions">
            <Link
              className="language-switch"
              href={href(locale === "en" ? "ar" : "en", path)}
              lang={locale === "en" ? "ar" : "en"}
              hrefLang={locale === "en" ? "ar" : "en"}
            >
              <Globe2 size={15} />
              <span>{locale === "en" ? "العربية" : "English"}</span>
            </Link>
            <Link className="header-cta" href={href(locale, "dawabit/demo")}>
              {ui.demo[locale]}
              <Arrow diagonal />
            </Link>
            <button
              className="icon-button menu-trigger"
              ref={trigger}
              aria-label={ui.menu[locale]}
              onClick={() => {
                dialog.current?.showModal();
                document.body.style.overflow = "hidden";
              }}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="mobile-menu"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-menu-head">
          <Brand locale={locale} />
          <button
            autoFocus
            onClick={close}
            className="icon-button"
            aria-label={ui.close[locale]}
          >
            <X />
          </button>
        </div>
        <nav aria-label={ui.menu[locale]}>
          {ui.nav.map((item, i) =>
            i === 4 && !showInsights ? null : i < 3 ? (
              <details className="mobile-markets" key={i}>
                <summary>{item[locale]}<ChevronDown size={17} /></summary>
                <div className="mobile-subnav">
                  {subnav(i).map((s) => (
                    <Link key={s.path} href={href(locale, s.path)} onClick={close}>
                      {s.label[locale]}<Arrow />
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={i} href={href(locale, ui.navPaths[i])} onClick={close}>
                {item[locale]}<Arrow />
              </Link>
            ),
          )}
        </nav>
        <Link
          className="button button-primary"
          href={href(locale, "dawabit/demo")}
          onClick={close}
        >
          {ui.demo[locale]}
          <Arrow />
        </Link>
      </dialog>
    </>
  );
}
