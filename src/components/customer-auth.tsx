"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck, LogOut } from "lucide-react";
import { config, href, type Locale } from "@/lib/config";

const copy = {
  en: {
    email: "Work email", password: "Password", signIn: "Sign in to MUTABIQ",
    signingIn: "Checking your credentials…", unavailable: "Client login is being configured. Accounts will be enabled once Treehouse has completed its security checks.",
    invalid: "Email or password not recognised. Please try again.", error: "Sign-in is temporarily unavailable. Please try again later.",
    forgot: "Forgot your password?", recoveryTitle: "Reset your password", recoveryBody: "Enter the work email for your MUTABIQ account.",
    sendLink: "Send recovery link", recoverySent: "If the email has a MUTABIQ account, a recovery message will be sent.",
    newPassword: "Choose a new password", passwordHelp: "Use at least 12 characters.", savePassword: "Save password",
    invalidLink: "This link is invalid or expired. Request another link.", updating: "Updating…",
    account: "Your secure workspace", loading: "Verifying your account…", signOut: "Sign out",
    notSignedIn: "Sign in to view your account.", awaiting: "Your account is active, but your organisation or subscription access has not yet been approved.",
    subscription: "Subscription", plan: "Plan", role: "Your access level", active: "Active", pending: "Pending",
    appPending: "Your secure MUTABIQ application connection is being prepared. No confidential assessments are hosted on this marketing website.",
    access: "Verified organisation access", changePassword: "Set your password",
  },
  ar: {
    email: "البريد الإلكتروني للعمل", password: "كلمة المرور", signIn: "تسجيل الدخول إلى مطابق",
    signingIn: "جارٍ التحقق من بيانات الدخول…", unavailable: "يجري إعداد دخول العملاء. ستُفعّل الحسابات بعد اكتمال فحوص الأمان لدى تري هاوس.",
    invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مجدداً.", error: "تعذر تسجيل الدخول حالياً. يرجى المحاولة لاحقاً.",
    forgot: "هل نسيت كلمة المرور؟", recoveryTitle: "استعادة كلمة المرور", recoveryBody: "أدخل البريد الإلكتروني للعمل المرتبط بحساب مطابق.",
    sendLink: "إرسال رابط الاستعادة", recoverySent: "إذا كان هناك حساب مطابق لهذا البريد فستصلك رسالة استعادة.",
    newPassword: "اختر كلمة مرور جديدة", passwordHelp: "استخدم ١٢ حرفاً على الأقل.", savePassword: "حفظ كلمة المرور",
    invalidLink: "الرابط غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً.", updating: "جارٍ التحديث…",
    account: "مساحة عملك الآمنة", loading: "جارٍ التحقق من حسابك…", signOut: "تسجيل الخروج",
    notSignedIn: "سجّل الدخول لعرض حسابك.", awaiting: "حسابك نشط، ولكن لم تتم الموافقة بعد على صلاحيات المؤسسة أو الاشتراك.",
    subscription: "الاشتراك", plan: "الخطة", role: "صلاحيتك", active: "نشط", pending: "قيد الانتظار",
    appPending: "يجري تجهيز الاتصال الآمن بتطبيق مطابق. لا تُستضاف تقييمات العملاء السرية على هذا الموقع التعريفي.",
    access: "صلاحيات المؤسسة المعتمدة", changePassword: "تعيين كلمة المرور",
  },
} as const;

export function CustomerLoginForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const enabled = config.authLoginEnabled;

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (res.ok) {
        setPassword("");
        window.location.assign(href(locale, "client/portal"));
        return;
      }
      setError(res.status === 401 ? t.invalid : t.error);
    } catch { setError(t.error); }
    finally { setSubmitting(false); }
  }
  return (
    <form className="portal-inactive-form customer-login-form" onSubmit={login} noValidate>
      <label><span>{t.email}</span>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
          autoComplete="username" inputMode="email" maxLength={254} required
          disabled={!enabled || submitting} dir="ltr" />
      </label>
      <label><span>{t.password}</span>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" required disabled={!enabled || submitting} />
      </label>
      {error && <p role="alert" className="auth-error">{error}</p>}
      {!enabled && <p className="auth-note" role="status">{t.unavailable}</p>}
      <button type="submit" className="button button-primary portal-connect-button"
        disabled={!enabled || submitting}>
        <LockKeyhole size={16} aria-hidden="true" />{submitting ? t.signingIn : t.signIn}
      </button>
      {enabled && <Link href={href(locale, "client/recover-password")} className="portal-support-link">{t.forgot}<ArrowRight size={16} /></Link>}
    </form>
  );
}

type Me = {
  authenticated: boolean;
  user: { email: string };
  organizations: { organizationName: string; organizationId: string; role: string; subscription: string; plan: string }[];
  subscriptionActive: boolean;
};
export function CustomerPortal({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"loading" | "guest" | "ready" | "unavailable">("loading");
  const [account, setAccount] = useState<Me | null>(null);
  useEffect(() => {
    if (!config.authLoginEnabled) { setStatus("unavailable"); return; }
    let active = true;
    fetch("/api/auth/me", { credentials: "same-origin", cache: "no-store" })
      .then(async r => {
        if (!active) return;
        if (r.status === 401) { setStatus("guest"); return; }
        if (!r.ok) { setStatus("unavailable"); return; }
        const data: Me = await r.json();
        if (!active) return;
        setAccount(data); setStatus("ready");
      })
      .catch(() => { if (active) setStatus("unavailable"); });
    return () => { active = false; };
  }, []);
  async function logout() {
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" }, body: "{}" }); }
    finally { window.location.assign(href(locale, "client/login")); }
  }
  return (
    <section className="section portal-login-section">
      <div className="container portal-closed-note">
        <ShieldCheck size={36} aria-hidden="true" />
        <h1>{t.account}</h1>
        {status === "loading" ? <p role="status">{t.loading}</p>
          : status === "unavailable" ? <p>{t.unavailable}</p>
          : status === "guest" ? (
            <>
              <p>{t.notSignedIn}</p>
              <Link className="button button-primary" href={href(locale, "client/login")}>
                {t.signIn}<ArrowRight size={17} />
              </Link>
            </>
          ) : account ? (
            <div className="account-view" aria-live="polite">
              <div className="account-identity">
                <span>{t.email}</span><strong dir="ltr">{account.user.email}</strong>
              </div>
              {!account.subscriptionActive && <p className="account-pending">{t.awaiting}</p>}
              {account.organizations.map((o) => (
                <div key={o.organizationId} className="account-organization">
                  <h2>{o.organizationName}</h2>
                  <div className="account-property"><span>{t.role}</span><strong>{o.role}</strong></div>
                  <div className="account-property"><span>{t.subscription}</span><strong>{o.subscription}</strong></div>
                  <div className="account-property"><span>{t.plan}</span><strong>{o.plan}</strong></div>
                </div>
              ))}
              <p className="account-pending">{t.appPending}</p>
              <button type="button" onClick={logout} className="button button-secondary account-signout">
                <LogOut size={17} />{t.signOut}
              </button>
            </div>
          ) : null}
      </div>
    </section>
  );
}

export function RecoverPasswordForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!config.authLoginEnabled) return;
    setState("sending");
    try {
      const r = await fetch("/api/auth/recover", { method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }
  return (
    <section className="section portal-login-section">
      <div className="container auth-single-card">
        <h1>{t.recoveryTitle}</h1><p>{t.recoveryBody}</p>
        {state === "done" ? <p role="status">{t.recoverySent}</p> : (
          <form onSubmit={submit} className="portal-inactive-form">
            <label>{t.email}<input type="email" value={email} maxLength={254} required dir="ltr"
              onChange={e => setEmail(e.target.value)} disabled={!config.authLoginEnabled || state === "sending"} /></label>
            {state === "error" && <p role="alert" className="auth-error">{t.error}</p>}
            {!config.authLoginEnabled && <p>{t.unavailable}</p>}
            <button className="button button-primary" disabled={!config.authLoginEnabled || state === "sending"}>{t.sendLink}</button>
          </form>
        )}
      </div>
    </section>
  );
}
export function SetPasswordForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!config.authLoginEnabled) return;
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    const token = hash.get("access_token");
    const refresh = hash.get("refresh_token");
    const tokenHash = query.get("token_hash");
    const type = query.get("type");
    // Remove one-time credentials from the address bar immediately.
    window.history.replaceState(null, "", window.location.pathname);
    const body = token && refresh ? { access_token: token, refresh_token: refresh }
      : tokenHash && (type === "invite" || type === "recovery") ? { token_hash: tokenHash, type }
      : null;
    if (!body) { setFailed(true); return; }
    fetch("/api/auth/establish", { method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(r => { if (r.ok) setReady(true); else setFailed(true); })
      .catch(() => setFailed(true));
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 12) { setMessage(t.passwordHelp); return; }
    setSubmitting(true); setMessage("");
    try {
      const r = await fetch("/api/auth/update-password", { method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!r.ok) { setMessage(t.error); setSubmitting(false); return; }
      setPassword(""); window.location.assign(href(locale, "client/portal"));
    } catch { setMessage(t.error); setSubmitting(false); }
  }
  return (
    <section className="section portal-login-section">
      <div className="container auth-single-card">
        <h1>{t.changePassword}</h1>
        {!config.authLoginEnabled ? <p>{t.unavailable}</p>
          : failed ? <p role="alert">{t.invalidLink}</p>
          : !ready ? <p role="status">{t.loading}</p>
          : <form className="portal-inactive-form" onSubmit={submit}>
              <label>{t.newPassword}
                <input type="password" autoComplete="new-password" minLength={12} required
                  value={password} onChange={e => setPassword(e.target.value)} disabled={submitting} />
              </label>
              <p>{t.passwordHelp}</p>
              {message && <p role="alert" className="auth-error">{message}</p>}
              <button className="button button-primary" disabled={submitting}>
                {submitting ? t.updating : t.savePassword}
              </button>
            </form>}
      </div>
    </section>
  );
}
