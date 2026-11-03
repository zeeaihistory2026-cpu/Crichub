# Codex Handoff — CreaseGrid Dashboard Design V1

## Scope and goal
Implement three role-specific dashboards within the CreaseGrid Next.js app. Use the provided static HTML/CSS/JS and PNG references for layout, hierarchy and interaction cues. Do not treat demo values as real operational data.

### Shared UI system
- Page shell: desktop sidebar (250 px) + topbar (73 px) + fluid content. On screens <=760 px, switch to 56 px topbar and 5-item bottom navigation.
- Typography: Inter/system UI, headers 26–31 px, cards 11–15 px body and large numeric KPIs 23–27 px.
- Palette: background `#f5f7fb`, surfaces `#fff`, navy `#0f1d38`, primary `#2563eb`, stroke `#e5eaf2`, primary text `#17243c`.
- Components: `AppShell`, `Sidebar`, `Topbar`, `RoleSwitcher`, `StatsCard`, `SectionHeader`, `DataTable`, `StatusTag`, `QuickAction`, `MatchScoreStrip`, `Toast`, `Modal` and `BottomNav`.
- Do not force identical information layouts across the three roles. Maintain their distinct content priorities.

### Dashboard 1: Super Admin — `/admin`
**Roles:** `super_admin` and scoped staff permissions (`editor`, `data_admin`, `moderator`).
**Sections:** 5 KPI cards, monthly audience-growth chart, editorial review queue, latest newsroom activity table, local match monitoring, quick actions, tool usage.
**Endpoints:** `GET /api/admin/summary`, `/api/admin/traffic?period=...`, `/api/admin/articles`, `/api/admin/matches`, `/api/admin/tools/usage`.
**Actions:** create/update/schedule/publish articles; manage match metadata; audit changes; manage user roles; moderate public content; see data import diagnostics.
**Rules:** admin-only API checks, CSRF where needed, protected audit logging, no unrestricted user PII, editorial source verification and scheduled publication.

### Dashboard 2: Tournament Organizer — `/organizer/:tournamentId`
**Roles:** owner, co-organizer, scorer and read-only viewer. Scope data by tournament membership.
**Sections:** tournament state banner, next fixture, 4 operational KPIs, fixture list with scoring CTA, standings table, pending tasks, player leaders, recent activity and shortcuts.
**Endpoints:** `GET /api/local/tournaments/:id/overview`, `/fixtures`, `/standings`, `/leaders`, `/tasks`; `POST /api/local/matches/:id/scoring-session`.
**Actions:** register a team, approve squad, schedule fixture, start scoring, approve result, share public tournament URL.
**Rules:** standings and NRR must be derived from authoritative match results, with versioned local competition rules and integer-ball notation, not entered manually. Use optimistic controls carefully and support safe conflict resolution for mobile scoring.

### Dashboard 3: User / Cricket Fan — `/me`
**Roles:** signed-in registered viewer, optional local player profile.
**Sections:** followed match hero, personal KPIs, text-first latest cricket news and tabs, upcoming followed matches, favourite teams, quick calculators, daily insight.
**Endpoints:** `GET /api/me/dashboard`, `/api/me/follows`, `/api/me/saved`, `/api/news?category=...`, `/api/fixtures?follows=true`.
**Actions:** follow/unfollow team or match, save an article, manage notification subscriptions and language preferences.
**Rules:** avoid private details on public routes; store explicit follow preferences; news pages link to canonical indexed articles; the homepage Latest News entry must navigate to `/news` (not a dead-end).

### Acceptance criteria
1. Each role receives only authorized data and routes; unauthenticated users are redirected safely.
2. All three layouts render at 1600 and 390 px without horizontal page overflow.
3. Keyboard navigation, buttons and tab focus states are visible; contrast is checked against WCAG AA.
4. Dates/time zones are localized and user-controlled; demo 'live' scores are never shown as real live data.
5. News links and View All News go to real news routes; article pages show source/author/date and canonical URL.
6. Admin actions create audit entries; local score corrections preserve original events.
7. Loading, empty, error, offline and unauthorized states are built for production even if omitted from concept previews.

## Required integration order
1. Scaffold shared shell, tokens and role-aware routing.
2. Implement static screens matching references.
3. Wire Supabase/PostgreSQL read models and protected APIs.
4. Add create/update actions, validation and access policies.
5. Add responsive and accessibility tests.
6. Run end-to-end tests with a real tournament beta and editorial authoring workflow.

## Production constraints
Reuse the complete CreaseGrid PRD and original route inventory for non-dashboard functionality. Do not claim official DLS if no validated methodology is licensed. Do not calculate NRR from decimalized overs. External historical/live cricket feeds must have documented coverage and redistribution rights.
