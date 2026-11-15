"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe2 } from "lucide-react";
import { ui, services, markets } from "@/content/site";
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
  const subnav = (i: number) =>
    i === 0
      ? [
          { path: "mutabiq", label: ui.explore },
          { path: "mutabiq/how-it-works", label: ui.how },
          { path: "mutabiq/coverage", label: ui.coverage },
        ]
      : i === 1
        ? [
            { path: "services", label: ui.allServices },
            ...services.map((s) => ({
              path: `services/${s.slug}`,
              label: s.title,
            })),
          ]
        : markets.map((m) => ({ path: m.slug, label: m.name }));
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
              i < 3 ? (
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
            <Link className="header-cta" href={href(locale, "mutabiq/demo")}>
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
          {ui.nav.map((item, i) => (
            <Link key={i} href={href(locale, ui.navPaths[i])} onClick={close}>
              {item[locale]}
              <Arrow />
            </Link>
          ))}
          <Link href={href(locale, "client/login")} onClick={close}>
            {ui.login[locale]}
            <Arrow />
          </Link>
        </nav>
        <Link
          className="button button-primary"
          href={href(locale, "mutabiq/demo")}
          onClick={close}
        >
          {ui.demo[locale]}
          <Arrow />
        </Link>
      </dialog>
    </>
  );
}
