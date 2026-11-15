import { tibqaAssets } from "@/content/tibqa-assets";
import type { Locale } from "@/lib/config";
type ImageId = keyof typeof tibqaAssets.images;
export function TIBQAVisual({ locale, id, priority = false }: { locale: Locale; id: ImageId; priority?: boolean }) {
  if (!tibqaAssets.visualsEnabled) return null;
  const asset = tibqaAssets.images[id];
  const base = tibqaAssets.imageBase + asset.file;
  return (
    <figure className="tibqa-visual">
      <div className="tibqa-browser-frame">
        <div className="tibqa-browser-dots" aria-hidden="true"><i /><i /><i /></div>
        <picture>
          <source type="image/webp" srcSet={`${base}-1600.webp 1600w, ${base}-3200.webp 3200w`} sizes="(max-width: 900px) 100vw, 50vw" />
          <img src={`${base}-1600.webp`} alt={asset.alt[locale]} width={1600} height={1000} decoding="async" loading={priority ? "eager" : "lazy"} />
        </picture>
      </div>
      <figcaption>{locale === "ar" ? "مثال توضيحي" : "Illustrative example"}</figcaption>
    </figure>
  );
}
export function TIBQAProof({ locale }: { locale: Locale }) {
  const { proof } = tibqaAssets;
  if (!proof.enabled || proof.figures.some((figure) => figure.value === null)) return null;
  return (
    <div className="tibqa-proof">
      {proof.figures.map((figure, i) => (
        <div key={i}><strong>{figure.value?.toLocaleString(locale)}</strong><span>{figure.label[locale]}</span></div>
      ))}
    </div>
  );
}
