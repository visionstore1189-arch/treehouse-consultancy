# Mutabiq client integration handover

Mutabiq already exists and is not rebuilt by this project. The website provides product pages, a clearly unavailable sign-in interface and a reserved portal design. There is no public regulatory library, client document, operational dashboard, password field or active application redirect in the export.

## Application configuration

The intended URL is `https://app.treehouseconsultancy.com`. Its future value is set through `NEXT_PUBLIC_MUTABIQ_APP_URL`. This is a public hostname, not a secret. `config.portalConnected` is hard-coded false in this delivery; do not treat changing a frontend flag as a security implementation.

`/client/login/` and `/client/portal/`, and their Arabic mirrors, carry noindex/nofollow metadata and response-header rules. These indexing controls are not access control. The pages contain only explanatory text and inert design placeholders.

## Integration contract

`src/lib/mutabiq.ts` describes the future server-side interfaces:

- `getVerifiedSession(request)` returns a verified named user, tenant, expiry, roles and confirmed MFA state.
- `getEntitlement(session)` checks the authoritative subscription for the same tenant.
- `authorise(session, resource)` checks the action and tenant for every requested resource.
- `recordAudit(event)` records relevant access and download activity.

`canAccess` is a fail-closed helper with tests for expired sessions, absent MFA, tenant mismatch, missing features and inactive subscriptions. It is not an authentication provider, a token verifier, or a complete authorisation implementation. No static client-side decision may be trusted to grant access.

## Recommended connection sequence

1. Inventory the existing application's authentication, identity provider, tenancy model, subscription provider, storage region and current security controls with the client developer.
2. Implement authentication in the application backend or identity provider. Use a standard redirect-based flow such as OIDC authorisation code with PKCE if appropriate for the existing system. Do not collect credentials on this marketing site.
3. Require MFA for named accounts. Enforce session expiry, revocation and secure HttpOnly cookies. Prefer host-only cookies on the `app` domain; avoid granting the public marketing domain access to session cookies.
4. Verify token signature, issuer, audience, expiry and nonce/state where applicable. Restrict return URLs to an allowlist. Reject arbitrary redirect targets.
5. Enforce tenant/resource authorisation on every API call, download and server-side library access. Never put the regulatory library into public HTML, JavaScript, `public/`, source maps or static JSON.
6. Verify the subscription against the authoritative server-side record. Validate signatures and replay protection on billing webhooks, process events idempotently, and define behaviour for trial, payment failure, cancellation and refund.
7. Apply rate limits, access/download auditing, encrypted transit and storage, agreed document retention/deletion, backup controls and noindex headers on the application. `robots.txt` alone does not protect private data.
8. Complete threat modelling and tests for unauthenticated access, direct download URLs, revoked sessions, MFA bypass, cross-tenant IDs and inactive subscriptions.
9. Only after these checks pass, update the login component to link to the verified application sign-in URL. Keep any dashboard in the protected application. The public site's reserved dashboard must not become an unauthenticated data proxy.

## Client sign-off required before operational access

Document ownership of identity, MFA support/recovery, subscription decisions, permission roles, storage location, retention, deletion, auditing, incident response and encryption. The existing application's hosting and security costs are not included in the public website's $0 architecture and have not been changed. This project does not require a new paid application subscription.
