/** Server-side contract for the separate, client-owned application. No secrets or data here. */
export interface VerifiedSession {
  userId: string;
  tenantId: string;
  expiresAt: string;
  mfaVerified: true;
  roles: string[];
}
export interface Entitlement {
  tenantId: string;
  subscriptionId: string;
  status: "active" | "trialing" | "past_due" | "cancelled";
  features: string[];
}
export interface DawabitIntegration {
  getVerifiedSession(request: Request): Promise<VerifiedSession | null>;
  getEntitlement(session: VerifiedSession): Promise<Entitlement | null>;
  authorise(
    session: VerifiedSession,
    resource: { tenantId: string; action: string },
  ): Promise<boolean>;
  recordAudit(event: {
    userId: string;
    tenantId: string;
    action: string;
    resourceId?: string;
  }): Promise<void>;
}
export function canAccess(
  session: VerifiedSession | null,
  entitlement: Entitlement | null,
  feature: string,
  now = Date.now(),
): boolean {
  return !!(
    session &&
    entitlement &&
    session.mfaVerified &&
    Date.parse(session.expiresAt) > now &&
    session.tenantId === entitlement.tenantId &&
    ["active", "trialing"].includes(entitlement.status) &&
    entitlement.features.includes(feature)
  );
}
// This contract is not an authentication mechanism. The real application must verify
// sessions, MFA, tenant authorisation and entitlements on EVERY protected request.
