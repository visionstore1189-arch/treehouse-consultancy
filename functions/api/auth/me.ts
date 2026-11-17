import { MATERIALS_READY } from "./_materials";
import { activateDemoTrial, describeDemoAccess, type DemoGrant } from "./_demo-access";
import { authEnabled, clearTokens, response, session, setTokens, supa, type AuthEnv } from "./_shared";
type Membership = {
  organization_id: string;
  role: string;
  status: string;
  organizations: { name: string } | null;
};
type Subscription = { organization_id: string; plan: string; status: string; current_period_end?: string | null };
export const onRequestGet: PagesFunction<AuthEnv> = async ({ request, env }) => {
  if (!authEnabled(env)) return response({ error: "auth_not_configured" }, 503);
  const identity = await session(request, env);
  if (!identity) {
    const result = response({ authenticated: false }, 401);
    clearTokens(result);
    return result;
  }
  try {
    const res = await supa(
      env,
      "/rest/v1/organization_memberships?select=organization_id,role,status,organizations(name)&user_id=eq." +
        encodeURIComponent(identity.user.id) + "&status=eq.active",
      { method: "GET" }, identity.accessToken
    );
    if (!res.ok) return response({ error: "access_records_unavailable" }, 503);
    const memberships = await res.json() as Membership[];
    const subsRes = await supa(env,
      "/rest/v1/organization_subscriptions?select=organization_id,plan,status,current_period_end",
      { method: "GET" }, identity.accessToken);
    if (!subsRes.ok) return response({ error: "access_records_unavailable" }, 503);
    const subscriptions = await subsRes.json() as Subscription[];
    const account = memberships.map(m => {
      const subscription = subscriptions.find(s => s.organization_id === m.organization_id);
      const periodValid = !subscription?.current_period_end ||
        Date.parse(subscription.current_period_end) > Date.now();
      const entitled = !!subscription && ["active", "trialing"].includes(subscription.status) && periodValid;
      return {
        organizationId: m.organization_id,
        organizationName: m.organizations?.name || "Organisation",
        role: m.role,
        subscription: entitled ? subscription?.status : "pending",
        plan: subscription?.plan || "none",
      };
    });
    const allowed = account.some(a => a.subscription === "active" || a.subscription === "trialing");
    if (memberships.length && !await activateDemoTrial(env, identity.accessToken)) return response({ error: "access_records_unavailable" }, 503);
    const demoRes = await supa(env, "/rest/v1/dawabit_demo_grants?select=access_kind,activated_at,expires_at,revoked_at&limit=1", { method: "GET" }, identity.accessToken);
    if (!demoRes.ok) return response({ error: "access_records_unavailable" }, 503);
    const demoGrants = await demoRes.json() as DemoGrant[];
    const demoAccess = describeDemoAccess(demoGrants[0], memberships.length > 0);
    const result = response({
      authenticated: true,
      demoAvailable: !!demoAccess?.active,
      demoMaterialsAvailable: !!demoAccess?.active && MATERIALS_READY,
      demoAccess,
      user: { email: identity.user.email || "" },
      organizations: account,
      subscriptionActive: allowed,
      resources: privateResources(env, identity.user.email, memberships.length > 0),
      // Live assessment engines and confidential guide access remain independently controlled.
    });
    if (identity.tokens) setTokens(result, identity.tokens);
    return result;
  } catch { return response({ error: "access_records_unavailable" }, 503); }
};
// Resource links are returned only after server-side membership and named identity checks.
// The destination must independently enforce Cloudflare Access; this is never a proxy.
export function privateResources(env: AuthEnv, email: string | undefined, member: boolean) {
  if (!member || env.CLIENT1_ACCESS_READY !== "true" || !email || !env.CLIENT1_ALLOWED_EMAIL ||
      email.toLowerCase() !== env.CLIENT1_ALLOWED_EMAIL.toLowerCase()) return [];
  try {
    const url = new URL(env.CLIENT1_GUIDE_URL || "");
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") return [];
    return [{ id: "client1-guide", url: url.href }];
  } catch { return []; }
}
