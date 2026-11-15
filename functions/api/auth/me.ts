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
    const result = response({
      authenticated: true,
      user: { email: identity.user.email || "" },
      organizations: account,
      subscriptionActive: allowed,
      // This endpoint grants no access to the MUTABIQ application or documents.
    });
    if (identity.tokens) setTokens(result, identity.tokens);
    return result;
  } catch { return response({ error: "access_records_unavailable" }, 503); }
};