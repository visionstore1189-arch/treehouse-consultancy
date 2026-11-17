import { supa, type AuthEnv } from "./_shared";
export type DemoGrant = {
  access_kind: "preview" | "trial" | "paid";
  activated_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
};
export async function activateDemoTrial(env: AuthEnv, token: string) {
  const r = await supa(env, "/rest/v1/rpc/activate_dawabit_trial", { method: "POST", body: "{}" }, token);
  return r.ok;
}
export function describeDemoAccess(grant: DemoGrant | undefined, member: boolean, now = Date.now()) {
  if (!grant) return null;
  const kind = grant.access_kind;
  const validKind = ["preview", "trial", "paid"].includes(kind);
  const end = grant.expires_at === null ? null : Date.parse(grant.expires_at);
  const active = member && validKind && !grant.revoked_at &&
    ((kind === "paid" && end === null) || (end !== null && Number.isFinite(end) && end > now));
  return { kind, active, expiresAt: grant.expires_at, startedAt: grant.activated_at,
    serverTime: new Date(now).toISOString(),
    state: grant.revoked_at ? "revoked" : active ? "active" :
      kind === "trial" && !grant.activated_at ? "pending" : "expired" };
}
