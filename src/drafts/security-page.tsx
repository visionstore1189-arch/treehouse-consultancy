// V6 B2 / V5 N1. Draft only: intentionally absent from routes and sitemap.
// No fact is publishable until Treehouse supplies its approved value/text.
import type { Locale } from "@/lib/config";
export type SecurityFact = { en: string; ar: string };
export const securitySections = [
  {id:"hosting",en:"Where your data is held",ar:"مكان حفظ البيانات"},
  {id:"access",en:"Who can see it",ar:"من يطّلع عليها"},
  {id:"ai",en:"Use in artificial intelligence",ar:"الاستخدام في الذكاء الاصطناعي"},
  {id:"encryption",en:"Encryption",ar:"التشفير"},
  {id:"retention",en:"Retention and deletion",ar:"الاحتفاظ والحذف"},
  {id:"confidentiality",en:"Confidentiality",ar:"السرية"},
] as const;
export function SecurityPageDraft({locale,facts={}}:{locale:Locale;facts?:Partial<Record<typeof securitySections[number]["id"],SecurityFact>>}) {
  return <section className="section"><div className="container">
    <h1>{locale==="ar"?"كيف نحمي مستنداتكم":"How we protect your documents"}</h1>
    <div className="dawabit-role-grid">{securitySections.map(section=><article key={section.id}>
      <h2>{section[locale]}</h2>
      <p>{facts[section.id]?.[locale] || (locale==="ar"?"بانتظار المعلومات المعتمدة من تري هاوس.":"Awaiting Treehouse’s confirmed information.")}</p>
    </article>)}</div>
  </div></section>;
}
