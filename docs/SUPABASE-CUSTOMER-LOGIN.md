# MUTABIQ — Real email/password customer login (Supabase + Cloudflare Pages)

## Deployment status
This pull request prepares an actual password-based login frontend, user sessions, account status and invitations/password reset flow, implemented through Cloudflare Pages Functions and Supabase Auth REST APIs. **It is intentionally OFF until a Supabase project is created and approved for this client.** No customer credentials, passwords, or privileged keys are present in the repository.

The static corporate website can continue to run on Cloudflare Pages. Authentication endpoints execute in Cloudflare Pages Functions, backed by Supabase Auth.

### 1. Create and own the right project
Treehouse's client should own the Supabase organisation/project and grant its website developer appropriate permissions. Confirm UK vs Saudi data residency, privacy notice and data-processing arrangements **before** onboarding any real end users. Start with a free-tier project only if account billing confirms $0. Project region should be chosen by Treehouse based on legal/regulatory requirements.

### 2. Initialise and secure Supabase
- Run the reviewed SQL in `supabase/migrations/20261115_000001_mutabiq_organizations.sql` using the Supabase migration/SQL process. It creates 3 RLS-protected tables: `organizations`, `organization_memberships`, and `organization_subscriptions`.
- Go to **Authentication → Sign In / Providers**. Enable email/password authentication and email confirmation. **Disable public new-user signup.** Only authorised administrators should invite users.
- Under **Authentication → URL Configuration**, set Site URL to the approved Treehouse live site and allow exact callback path `https://<approved-host>/client/reset-password/`. On preview domains use a separate approved dev configuration; don't broadly wildcard untrusted hosts.
- Set secure custom SMTP on the approved Treehouse domain for production invitations/recovery. Configure and test rate limits, bot protection and account recovery.
- Confirm MFA enforcement appropriate for financial-sector users **before** confidential MUTABIQ data is exposed.
- Run Supabase database/security advisors. Perform at least a two-organisation RLS test to verify cross-tenant access is denied.

### 3. Deploy Cloudflare Pages variables
Under the existing `treehouse-consultancy` Pages project:
- Server-only variable `SUPABASE_URL`: your Supabase project HTTPS API URL (example: `https://abc.supabase.co`)
- Server-only variable `SUPABASE_PUBLISHABLE_KEY`: the publishable key (`sb_publishable_...`). Do not use `service_role` or `sb_secret_...` in website code, Cloudflare logs or user-visible files.
- Build environment variable `NEXT_PUBLIC_AUTH_LOGIN_ENABLED=true` (set this only AFTER successful end-to-end auth tests).
- Redeploy after updating the variables. The site is a static Next.js export and needs a new build for this feature flag.

Never enable `NEXT_PUBLIC_MUTABIQ_PORTAL_CONNECTED` until the separately hosted MUTABIQ application has its own audited authenticated access. This feature flag is separate from the Treehouse customer account login.

### 4. Invite users — never share passwords
Supabase Dashboard → Authentication → Users → Add user → **Send invitation**. Only approved email addresses should be invited. The user opens the link and sets a unique password at the site's `/client/reset-password/` page (English/Arabic equivalents). No password should be sent to an agency, client, or ChatGPT.

Create an organisation for each subscribed business. Example admin-only SQL, after its primary contact has accepted invitation:

```sql
insert into public.organizations (slug, name)
values ('example-firm', 'Example Firm Ltd')
on conflict (slug) do nothing;

insert into public.organization_memberships (organization_id, user_id, role, status)
select o.id, u.id, 'owner', 'active'
from public.organizations o
join auth.users u on lower(u.email) = lower('CUSTOMER@EXAMPLE.COM')
where o.slug = 'example-firm'
on conflict (organization_id, user_id) do nothing;

insert into public.organization_subscriptions (organization_id, plan, status, current_period_end)
select id, 'business', 'active', now() + interval '30 days'
from public.organizations where slug = 'example-firm'
on conflict (organization_id)
do update set plan = excluded.plan, status = excluded.status,
  current_period_end = excluded.current_period_end, updated_at = now();
```

Replace customer details with real approved values. The subscription row is a **manual administrative entitlement**, not proof of payment. A real billing service must update entitlements server-side in production.

### 5. Security boundaries
The new endpoints are `/api/auth/login`, `me`, `logout`, `recover`, `establish`, `update-password`. All credentials are exchanged with Supabase only via Cloudflare Pages Functions. Access and refresh tokens are stored in `HttpOnly; Secure; SameSite=Lax` host-only cookies. Every account lookup verifies the token via Supabase Auth, and RLS applies to organisation/subscription queries. Only the verified user's own authorised organisation membership and subscription fields are returned.

**This account dashboard is not itself the MUTABIQ application.** It does not provide permission to view assessments, regulatory library documents or customer uploads. When the existing software is connected, its own backend MUST independently authenticate each session, check MFA and verify subscription and tenant-level access before every sensitive operation. Marketing-page account state or browser redirects are never sufficient for authorization.

### 6. Manual acceptance tests
1. Environment unconfigured: disabled login inputs, no usable account. API returns 503, no cookies.
2. Public self-signup disabled; non-invited address can't log in.
3. Approved invitation sets a new password, sign-in succeeds on English and Arabic pages.
4. Customer A sees only customer A's organisation; customer B data is invisible.
5. Expired subscription: site shows pending, no app access.
6. Logout invalidates local browser cookies. Supabase session revocation and MFA policy should be assessed for higher-risk accounts.
7. Recovery email operates using approved sender and only exact allowed redirect domain.
8. HTTPS, email validation, CSRF-origin checks, browser cookie flags, mobile layout, and reduced motion.
9. Confirm the Pages functions are available at `/api/auth/*` and the API responses are never cached.

## Operational limitations
A Supabase project, its RLS tables, authorized staff accounts, legal notices and Cloudflare environment settings **must exist before login can be called working**. Since there is currently no Supabase project in the connected account, all login controls remain fail-closed until this setup is approved.

