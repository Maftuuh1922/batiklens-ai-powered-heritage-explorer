# BatikLens Auth Setup (Supabase)

This document explains how to provision Supabase auth so the `/login` and
`/signup` routes work in production.

## 1. Create the project

1. Sign in at https://supabase.com/dashboard.
2. Click **New project**, pick a region close to your users (e.g. Singapore for
   Indonesian users), set a strong database password, and wait for the project
   to finish provisioning.
3. Open **Project Settings → API**:
   - Copy **Project URL** → store as `VITE_SUPABASE_URL`.
   - Copy **anon / public key** → store as `VITE_SUPABASE_ANON_KEY`.

> ⚠️ Never expose the `service_role` key in the frontend. It bypasses all RLS.

## 2. Configure auth providers

### Email + password (enabled by default)

1. **Authentication → Providers → Email**: ensure it is enabled.
2. **Authentication → URL Configuration**: set **Site URL** to your production
   origin (e.g. `https://batiklens.vercel.app`). Add the local dev origin
   (`http://localhost:3000`) under **Additional Redirect URLs** so the dev
   server can complete the email confirmation flow.
3. (Optional) **Authentication → Email Templates**: customize the confirmation
   and magic-link templates with the BatikLens brand voice.

### Google OAuth (optional, enables one-click sign-in)

1. In Google Cloud Console, create an OAuth 2.0 Web Client. Authorized redirect
   URI must be `https://<project-ref>.supabase.co/auth/v1/callback`.
2. In Supabase **Authentication → Providers → Google**, paste the **Client ID**
   and **Client Secret**, then **Enable**.
3. Re-deploy the frontend so the env vars are picked up.

## 3. Set environment variables

### Vercel

Project Settings → Environment Variables:

| Name                       | Scope        | Value                                          |
| -------------------------- | ------------ | ---------------------------------------------- |
| `VITE_SUPABASE_URL`        | Production / Preview / Development | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY`   | Production / Preview / Development | `eyJ…` (anon public)         |

### Local development (`.env.local`)

```
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

The repo's `.gitignore` already excludes `.env*.local`, so this file will not
be committed.

## 4. Verify

After deploying:

- `/login` and `/signup` should render without the orange "Auth not configured"
  banner.
- Submitting the email form should send a confirmation link.
- Google button should redirect to Google's consent screen (if you configured
  the provider).
- After signing in, the navbar avatar dropdown should show the user's name and
  email.

## 5. (Future) Cross-device engagement sync

The current implementation persists streak, XP, badges, diary, and favorites in
`localStorage` under `batiklens-engagement-v1`. To sync this state across
devices once a user signs in, a future PR can:

1. Add a `user_engagement` table keyed by `auth.users.id`.
2. On `auth.onAuthStateChange('SIGNED_IN')`, upsert/load the row and rehydrate
   the Zustand store.
3. Subscribe to changes via Supabase Realtime so multi-tab/device updates stay
   consistent.

For now, keeping engagement state local keeps the app fast and avoids server
round-trips for casual visitors.
