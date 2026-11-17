"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Locale } from "@/lib/config";

/** A low-cost page reading indicator that never changes page content or captures data. */
export function SiteProgress({ locale }: { locale: Locale }) {
  const [amount, setAmount] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
        setAmount(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        setShowTop(window.scrollY > 900);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", sync);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="site-progress-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${amount})` }} />
      </div>
      {showTop && (
        <button
          type="button"
          className="site-back-to-top"
          aria-label={locale === "ar" ? "العودة إلى أعلى الصفحة" : "Back to top"}
          title={locale === "ar" ? "العودة للأعلى" : "Back to top"}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
