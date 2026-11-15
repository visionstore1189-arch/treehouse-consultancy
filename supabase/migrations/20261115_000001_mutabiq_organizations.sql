-- MUTABIQ client access schema. Apply to the client's dedicated Supabase project
-- ONLY after organisation and security policies are approved.
-- All exposed tables have RLS; direct client writes are disallowed.
create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,61}$'),
  name text not null check (length(name) between 2 and 200),
  created_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member','reader')),
  status text not null default 'active' check (status in ('active','suspended','invited')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create index if not exists org_memberships_user_active_idx
  on public.organization_memberships(user_id, organization_id)
  where status = 'active';

create table if not exists public.organization_subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  plan text not null default 'none' check (length(plan) between 1 and 80),
  status text not null default 'pending'
    check (status in ('pending','trialing','active','past_due','suspended','canceled','expired')),
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.organization_subscriptions enable row level security;
alter table public.organizations force row level security;
alter table public.organization_memberships force row level security;
alter table public.organization_subscriptions force row level security;

revoke all on public.organizations from anon, authenticated;
revoke all on public.organization_memberships from anon, authenticated;
revoke all on public.organization_subscriptions from anon, authenticated;

grant usage on schema public to authenticated;
grant select on public.organizations to authenticated;
grant select on public.organization_memberships to authenticated;
grant select on public.organization_subscriptions to authenticated;

drop policy if exists "members can see only their own membership" on public.organization_memberships;
create policy "members can see only their own membership"
  on public.organization_memberships
  for select to authenticated
  using (user_id = (select auth.uid()) and status = 'active');

drop policy if exists "members can see their own organizations" on public.organizations;
create policy "members can see their own organizations"
  on public.organizations
  for select to authenticated
  using (exists (
    select 1 from public.organization_memberships membership
    where membership.organization_id = organizations.id
      and membership.user_id = (select auth.uid())
      and membership.status = 'active'
  ));

drop policy if exists "members can see their organizations subscriptions" on public.organization_subscriptions;
create policy "members can see their organizations subscriptions"
  on public.organization_subscriptions
  for select to authenticated
  using (exists (
    select 1 from public.organization_memberships membership
    where membership.organization_id = organization_subscriptions.organization_id
      and membership.user_id = (select auth.uid())
      and membership.status = 'active'
  ));

-- No INSERT/UPDATE/DELETE grants or policies for anon/authenticated.
-- Provision organizations, memberships and entitlements through a trusted admin
-- dashboard/server-side process, never through end-user submitted claims.
