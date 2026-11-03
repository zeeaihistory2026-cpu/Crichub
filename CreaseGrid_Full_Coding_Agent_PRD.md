# CREASEGRID — MASTER PRODUCT REQUIREMENTS DOCUMENT

**Document:** PRD 2.0 — Coding-agent implementation handoff  
**Prepared:** 3 November 2026  
**Status:** Approved functional scope; provisional brand; staged delivery  
**Product:** Global cricket intelligence, utilities, editorial and local cricket platform, originating in Pakistan  
**Build principle:** Accurate, fast, useful, visually polished, accessible, trustworthy and mobile-first  
**Source of truth:** This PRD + `specs/SCREEN_INVENTORY_145.csv` + `AGENTS.md` + `IMPLEMENTATION_ROADMAP.md`. When a previous mockup conflicts, **this PRD wins**.

## 0. Critical note on prior design package

The previous 145-screen image package is a rough **route-and-feature inventory**, **not approved production visual design**. Many layouts were repeated templates with sparse content and missing sports photography. Do not reproduce those UI screenshots literally. Use `assets/revised-homepage-direction.png` as a **directional visual reference only**; text/data in concept images is illustrative and may be inaccurate. Build a genuine design system, and seek review at the explicit UI gates in the implementation roadmap.

### Quality bars that cannot be traded away

1. Production pages must not look like recycled blank cards with different headings. Each screen family needs a task-specific composition.
2. The homepage must combine authentic cricket context, carefully sourced or original photography, live/data indicators, and genuinely useful calls to action. Never hotlink unlicensed photography.
3. All statistical values must come from validated formulas, explicitly marked demo fixtures, or authorized provider data. Do not manufacture real-world statistics.
4. Separate professional international data from user-organized local cricket records at the data-model, UI-label and search-index levels.
5. A paid feed must never be required to use basic calculators or create a local competition.
6. No real money betting, gambling features, fake probability certainty, invented AI statistics or misleading official affiliation.

## 1. Executive product overview

### Vision

Make cricket easier to understand, analyze, organize and share—one global platform with a credible Pakistan-origin identity. Build an audience on free interactive tools and evergreen cricket knowledge, then sustain repeat engagement with qualification scenarios, player research and local tournaments.

### Positioning

**Cricket intelligence + local cricket network**, not another generic live-score clone. Proposed tagline: **Every run tells a story.** 'CreaseGrid' is a working product name, requiring trademark and domain clearance.

### Product pillars

- **Pillar 1 — Tools and intelligence:** Calculators, tournament qualification, simulation, comparison, analysis, research and creator utilities.
- **Pillar 2 — Cricket information:** Fixtures/results, player/team/tournament profiles, records, venues, news, rules, academy and history.
- **Pillar 3 — Local cricket:** Team/organizer accounts, fixture generation, result collection, ball-by-ball scoring, public pages, verified stats and shareable graphics.

### Audiences and jobs to be done

| Persona | Job | Primary journey | Motivation to return |
| --- | --- | --- | --- |
| Cricket fan | Understand a chase/NRR quickly | Home → calculator → result | Future matches and saved tools |
| Tournament follower | Discover qualification requirements | Tournament → table → Qualification Lab | Updated scenarios |
| Analyst/creator | Compare players and produce reusable analysis | Player → compare → chart → share | Reliable research |
| Local captain | Manage a team | Account → team → roster → matches | New fixtures/results |
| Local organizer | Run tournaments with less effort | Wizard → fixtures → results → standings | Operational dashboard |
| Local player | Maintain credible playing history | Team → matches → verified player profile | Tournament rankings |
| Learner | Understand cricket rules | Glossary → guide → interactive quiz | Learning progress |
| Editor/moderator | Keep data and articles accurate | Admin → review → publish | Content workflow |

### Success criteria

- First-time calculator user obtains a valid result in under 45 seconds on ordinary mobile connectivity.
- Organizer can publish a small round-robin competition without developer assistance.
- Every local match result can be traced to an organizer and change history.
- No 'all-time' statistical record is published from a known incomplete dataset without a coverage caveat.
- Core user journeys work on 360px phones, touch interfaces and keyboard-only navigation.
- Source of professional cricket data is documented and legally usable.

## 2. Scope, priority and release model

**P1 public launch:** site shell; accessible blue/white design system; comprehensive homepage; global search basics; 12 math utilities; tools directory; records with clearly licensed coverage; player/team/tournament/venue basics where data permits; editorial/learn pages; fixtures/results from authorized sources; basic accounts; organizer tournament setup, fixtures, manual match results, public page, standings; CMS/admin.

**P2 product depth:** Qualification Lab; player/team/bowler comparisons; deeper data and analytics; mobile delivery scoring; score corrections; player verified statistics; Urdu localization; practical creator tools; community polls; personalization; optional licensed real-time scores; advanced calculators and tournament scenarios.

**P3 strategic expansion:** professional model-based probabilities; AI research; full historic time machine; advanced scouting; offline-first scoring; sponsor subscriptions; fan communities; push notifications; public APIs; mobile native apps. P3 features must not block P1.

**Important priority exception:** The Qualification Lab is the intended flagship, but a *basic mock scenario* may accompany P1; complete mathematically correct competition-specific qualification is P2 after the rules engine is validated.

**Feature flags:** `professional_live`, `qual_lab_v2`, `ball_by_ball`, `ai_lab`, `prediction_league`, `premium`, `urdu`, `public_api`. All disabled until requirements and legal/technical gates pass.

## 3. Navigation, sitemap and cross-links

Public main navigation: **Home | Matches | Tournaments | Stats | Tools | Local Cricket | News & Learn**. Global search, theme, language and account are utilities in the header. Desktop has a 1280px content maximum; mobile uses compact navigation and task-specific footer navigation where appropriate.

```text
/
/matches/                                /matches/[matchId]/
/matches/[matchId]/scorecard/             /matches/[matchId]/analysis/
/tournaments/                            /tournaments/[slug]/
/tournaments/[slug]/points-table/        /tournaments/[slug]/stats/
/players/                                /players/[slug]/
/teams/                                  /teams/[slug]/
/stats/records/                          /stats/records/[format]/[category]/
/stats/rankings/                         /compare/players/
/compare/teams/                          /compare/batter-vs-bowler/
/venues/                                 /venues/[slug]/
/tools/                                  /tools/[toolSlug]/
/tools/qualification-lab/               /tools/what-if-cricket/
/tools/graphics-studio/                 /news/ and /news/[slug]/
/learn/                                  /learn/glossary/
/learn/[slug]/                           /history/
/local/                                  /local/tournaments/[slug]/
/local/teams/[id]/                       /local/players/[id]/
/auth/sign-in/                           /auth/sign-up/
/account/                                /account/following/
/dashboard/                              /dashboard/tournaments/new/
/dashboard/tournaments/[id]/teams/      /dashboard/tournaments/[id]/fixtures/
/dashboard/matches/[id]/score/           /dashboard/matches/[id]/result/
/admin/                                  /admin/content/
/admin/data-imports/                    /admin/moderation/
/legal/privacy/                          /legal/terms/
```

**Routing rules:** static directory/SEO pages are server rendered; every entity uses stable IDs plus editable SEO slugs; migrated slugs receive 301 redirects; unsupported routes receive meaningful 404 pages; internal result filters use canonical rules and noindex for duplicate combinations.

### Global search

Search by player, team, competition, match, venue, calculator, glossary and article. Debounce ~200ms, keyboard Arrow/Enter/Escape support; return grouped and labeled results, not one undifferentiated list. P1 can start with PostgreSQL full-text and trigram indexing; upgrade only after proven search demand.

## 4. Visual design specification and UI remediation

### Brand expression

Internationally premium without overusing Pakistan flags or national colors. **Light-first** with white, slate, navy, cobalt and a restrained warm accent. Cricket photography and editorial imagery should feel dynamic, real, inclusive and competition-specific. Never use fake official tournament badges or misleading 'live' status.

### Tokens

| Token | Light theme |
| --- | --- |
| `color.page` | `#F7F9FC` |
| `color.surface` | `#FFFFFF` |
| `color.ink` | `#111827` |
| `color.muted` | `#64748B` |
| `color.primary` | `#2563EB` |
| `color.primaryDark` | `#173B88` |
| `color.accent` | `#F97316` |
| `color.border` | `#E2E8F0` |
| `color.success` | `#16805D` |
| `color.danger` | `#DC2626` |
| `radius.card` | 16px |
| `radius.control` | 10px |
| `space.scale` | 4, 8, 12, 16, 24, 32, 48, 64px |
| `font.en` | Inter / system sans |
| `font.ur` | Tested legible Urdu font with RTL support |

Typography: headings 44–56px desktop hero / 30–36px mobile, section titles 24–30px, body 15–16px minimum, dense tables 13–14px minimum. Large tabular numbers use `font-variant-numeric: tabular-nums`. Label forms explicitly; inputs at least 44px height, scoring buttons at least 48px.

### Image and media standards

- Homepage hero: one high-quality licensed or original cricket action photo with correct crop at 1440px and 390px; no text baked into the source image.
- Player portraits: only image where license and identity are verified; fallback to initials and team icon, not wrong face.
- Tournament/venue pages: contextual licensed imagery. Add descriptive alt text, optimized responsive `srcset`, lazy load below fold.
- Editorial images: credited when required; no scraped/watermarked Getty, broadcaster or team photography.
- Illustration is acceptable for tools and empty states but should not substitute for every actual sports image.
- Reusable image asset manifest tracks license, owner, credits, source URL and allowed use.

### Distinct page compositions — mandatory

1. **Home:** cinematic but restrained photographic hero with readable text, compact real/demo-labeled match rail, 3 curated section cards, flagship interactive feature, editorial stories, records and organizer CTA.
2. **Tools directory:** fast search, categories, icon cards, popular/related; **calculator detail** has two-column sticky result and formula/explanation, not generic dashboard charts.
3. **Player profile:** identity masthead, portrait, format chips, verified stats, career sparkline, comparison and record links.
4. **Tournament:** identity banner, schedule/results, standings table, qualification CTA, player leaders; tabs below header.
5. **Match centre:** scoreboard-first with match state, ball-by-ball timeline, scorecard, key performers and source timestamp.
6. **News/article:** immersive editorial image, reading-friendly text column, author/byline/source, related content—not dashboard cards.
7. **Local organizer:** utilitarian management shell, task checklist, context sidebar only where useful.
8. **Mobile scorer:** thumb-zone controls, persistent score/over state, immediate score confirmation, undo and sync status; no decorative hero.
9. **Admin:** dense but readable forms/tables, audit trails, error and source health, not an oversized marketing interface.

### Design system components

`AppShell, PublicHeader, MobileNav, SearchCommand, Breadcrumbs, SectionHeader, MatchTicker, MatchTile, Hero, ToolCard, MetricCard, StatTable, FilterBar, FormatTabs, PlayerHeader, CompareMatrix, OutcomeBadge, LiveBadge, Scoreboard, InningsTable, BallEventTimeline, ChartShell, FormulaExplainer, SourcesDisclosure, AlertBanner, EmptyState, ErrorState, Skeleton, Modal, Drawer, Toast, FormField, Stepper, Wizard, ScoringPad, PublicSharePanel, ConsentDialog, LanguageSwitcher`.

Every component: keyboard focus, ARIA labels, contrast checked, light/dark tokens, responsive behavior, loading/error/empty/success states and semantic HTML.

## 5. Page acceptance specifications

### HOME — `/`

**Purpose:** Cross-audience discovery without overwhelming first-time visitors. **Modules:** global nav, photo-led hero with search, match ticker or upcoming cards, flagship Qualification Lab promo, six top utilities, upcoming competitions, player comparison showcase, latest editorial, local cricket CTA, footer. **Action:** search, calculate, open match, create tournament. **Data:** source-labelled matches, editorial content, top tool usage. **Responsive:** stacked hero image, horizontal match rail, 2-column tool grid, no tiny tables. **Acceptance:** desktop and mobile coherent, no invented data, image licenses present, useful fold above 800px viewport.

### TOOLS DIRECTORY — `/tools/`

**Modules:** heading, searchable categories (calculators/tournaments/analytics/research/simulation/learning/creator/utility), frequently-used tools, cards with description, difficulty and related; SEO explainer. **Acceptance:** keyboard search, filter states, tool route click works, each P1 tool is genuinely functional.

### UNIVERSAL CALCULATOR — `/tools/[slug]/`

**Modules:** title/description, inputs with units/validation, one primary compute CTA or instant result, exact output, formula, worked example, constraints, share/copy, related tools, FAQ and data/rules notes. Preserve state in URL only for non-sensitive compact scenarios; no server required for ordinary arithmetic. **Acceptance:** output not calculated with floating-point overs; invalid inputs yield specific errors; keyboard/touch works; 15+ unit tests per high-risk formula family.

### QUALIFICATION LAB — `/tools/qualification-lab/`

Wizard or tabs: **Set competition → enter/import standings & match history → choose remaining fixtures → edit results/scores → recalculate → compare/save/share.** Displays deterministic updated points/NRR, tie-break order, possible qualifiers, assumptions, event provenance and a full equation breakdown. Configurable league rules, points for W/T/NR, penalties, all-out handling, rain-adjusted rules and ranked tie-breaks. Never infer exact qualification from only W/L without necessary innings. Scenario calculation for many fixtures must be bounded and explain search truncation. Acceptance: verified against manually calculated fixtures, fixtures invariants respected, no fake accuracy.

### MATCH DIRECTORY/MATCH CENTRE

Filters: date, format, gender, competition, country and status. A match page has match identification, teams, toss, state, innings score, scorecard, partnerships, FOW, timeline and provider timestamp; optional analysis can explain run-chase equation with clear math. Live state only if authorized feed confirms; otherwise 'last updated' and 'final'. Mobile scoreboard is always above secondary content.

### TOURNAMENT DIRECTORY/PROFILE

Discover by series, year, location and status. Profile: hero, dates/format, teams, fixtures, results, points, qualification rules, leaders, news, related tools, historic editions. Admin imports cannot silently overwrite approved published records. Tables need competition-specific sorting and notes.

### PLAYER PROFILE / TEAM PROFILE

Only publish professional stats where dataset coverage supports them. Show formats and time spans for career totals. Profile: bio, current teams, role, match data, charts, opponent splits, comparisons, citation/source. Team: squad, captain, schedule, results, records, tournament history and head-to-head. All rankings require a source and effective date.

### RECORDS / RESEARCH / COMPARE

Records filters: format, competition, category, team, player, venue, opponent, year. Comparison: choose subjects, same time period/format scope, statistics and explanations; label missing and small samples. Advanced batter-v-bowler only when ball-level datasets support matchup integrity. Charts accompany accessible data tables.

### EDITORIAL / LEARN

News index with categories and editorial sorting. Article: title, dek, author, date, updated date, hero, summary, text, citations, related entities. 'News Explained' cards: what happened, importance, people affected, next steps. Glossary: definition, example, formula/rules reference, related tools. Academy lessons and quizzes require clear educational framing, not training certifications.

### LOCAL CRICKET LANDING/PUBLIC PAGES

Landing: benefit story, sample published tournaments, start CTA, supported match formats, FAQ. Public tournament: organizer identity, rules, schedule, points, teams, stats, share link; public player cards require privacy options. Local team/player IDs must never collide with professional record IDs. No home address, phone or private profile exposed by default.

### AUTH / ACCOUNT

Sign-up, sign-in, sign-out, reset, session management; email verification for organizer write operations. `My Cricket` preferences, followed entities, saved scenarios, privacy, export/delete request; account users can be multiple-team players and organizers. No permissions inferred from mere client-side navigation.

### ORGANIZER DASHBOARD / TOURNAMENT WIZARD

Dashboard: tournaments, pending score approvals, recent activity, quick actions. Wizard stages: name/slug/privacy → format/rule set → teams/players → scheduling → review/publish. Validate duplicates, date overlap, round-robin counts, bracket progression. Autosave drafts and allow resume; publishing creates immutable public IDs and revision metadata.

### LOCAL SCORING / SCORECARD

P1: match setup + final manually entered innings totals + public result, standings update. P2: delivery-by-delivery authoritative server record, batsmen, bowler, extras, wickets, strike rotation, over change, undo/redo with audit, innings close conditions and abandoned/no result states. The scoring pad must prioritize accuracy and reversible actions over visual decoration. Offline P3 sync requires idempotency, sequence numbers, conflict resolution, manual review for diverging clients.

### COMMUNITY / CREATOR / AI / ADMIN

Community: free polls/predictor league, moderation, anti-spam and no cash betting. Graphics studio: selected scorecard/player/tournament templates, edit branding, generate PNG/PDF while preserving source attribution and export dimensions. AI P3: verified retrieval plus citation, refusal when data missing, no invented facts, rate limits and cost controls. Admin: role-based editorial and import review, source-health timestamps, moderation queues, audit trail, revocation and backups.

## 6. Cricket calculation specification

**Rule:** Use integer legal-ball counts for match state. `18.3` overs is **18 overs + 3 legal deliveries**, not 18.3 mathematical overs. Overs notation `'18.6'` invalid; `'18.0'` is valid. Some ball-by-ball events (wide/no-ball) are not legal deliveries and do not advance legal-ball count. A wicket on a no-ball must obey applicable cricket playing conditions. Match rules differ by competition/era; store a versioned `rule_set` with every match.

| Calculator | Required inputs | Output / formula | Validation |
| --- | --- | --- | --- |
| Run rate | runs, legal balls | `runs*6/balls`; handle 0 balls as undefined | runs>=0, balls>=0 |
| Required run rate | target, current runs, total balls, elapsed legal balls | `max(0,target-currentRuns)*6 / remainingBalls` | target positive; remaining balls>0 unless win/loss resolved |
| Batting average | runs, innings, not-outs | `runs/(innings-notOuts)`; undefined if 0 dismissals | innings>=notOuts>=0 |
| Batting strike rate | runs, balls faced | `100*runs/balls` | balls>0 unless n/a |
| Bowling average | conceded runs, wickets credited | `runs/wickets`; undefined with 0 wickets | wickets>=0 |
| Bowling economy | runs conceded, legal balls bowled | `6*runs/balls` | balls>0 |
| Bowling strike rate | legal balls bowled, wickets credited | `balls/wickets`; undefined with 0 wickets | wickets>=0 |
| Overs converter | overs notation e.g. 18.3, ballsPerOver | `oversInteger*ballsPerOver + ballDigit` | default 6; `ballDigit<ballsPerOver` |
| Projected score | current runs/balls, scheduled total balls, assumed rate | `currentRuns + remainingBalls*rate/6` for simple projection | label linear assumption, no probabilistic guarantee |
| Target/chase | opponent score, chase score, remaining balls | winning target=opponent+1; needed=max(target-current,0) | innings limits checked |
| Partnership | partners' contributions, extras, legal balls | partnership runs=sum contributions + extras | distinguish partnership balls and individual balls |
| Boundary percent | runs from boundaries, total runs | `100*boundaryRuns/totalRuns` | undefined at 0 runs; ensure <=100 |
| Dot-ball percent | dot deliveries, legal balls | `100*dots/legalBalls` | dots<=balls; define no-ball/wide handling explicitly |
| Powerplay rate | runs, legal powerplay balls | `6*runs/balls` | phase-specific and format-specific |
| Extras | wides/no-balls/byes/leg-byes/penalty | sum category runs | allow rule-specific extras accounting |
| Follow-on | first innings A/B and scheduled days | applicable threshold, e.g. standard 5-day test 200 run lead | use official rules for duration/conditions |
| Super Over | innings events, competition rules | score, target, result | configurable tie-break and permitted batters |
| Winning margin | innings totals/wickets, match state | runs or wickets; do not fabricate rain rules | distinguish tie/no-result/DLS |
| NRR | per-match innings runs and entitled legal balls | `(runsFor*6/ballsFaced) - (runsAgainst*6/ballsBowled)` accumulated over eligible matches | rule-versioned all-out and DLS handling; preserve exact rationals until display |
| DLS | match interruptions, resources, official method/tables | only a properly licensed or officially validated implementation labeled 'DLS' | block until approved/legal; otherwise educational explainer only |

NRR **must not** average individual match NRR values; calculate from accumulated totals under the specific competition rules. All-out innings may count the full entitled overs, and abandoned/rain matches have competition-specific treatment. Treat NRR as a domain service with fixtures/test vectors, not a generic form formula.

### Qualification logic

- A `competition_rule_set` defines points, tie handling, ranking keys, stages, penalties, eligibility and overs entitlement.
- Input standings optionally import completed matches; reject inconsistent totals and schedule impossible states.
- Each hypothetical fixture result changes points and, with score details, NRR; explain when precise NRR isn't calculable.
- For exact qualification enumerate feasible results under specified conditions; report truncated/capped searches.
- Save scenarios as a versioned snapshot including source-data timestamp and scenario assumptions.
- Never replace deterministic calculations with language-model generated numbers.

### Predictions and rating models

All win probability, Player DNA, Team Strength and player forecasting require a documented model card: training data scope, features, calibration assessment, last validation date, bias limitations, uncertainty display and post-event performance checks. The model output is informational only.

## 7. Detailed tools catalog and unified module contracts

**Tool detail contract:** `{id, slug, category, priority, title, summary, inputSchema, calculatorVersion, computeFn, resultSchema, example, explanation, faq, relatedTools, sources, isExperimental}`. A tool may be `calculator`, `workflow`, `dataset explorer`, `simulator`, `creator`, `game` or `AI`. Do not implement different pages with unrelated copy-pasted form logic. See `specs/TOOL_REQUIREMENTS.csv` for the exhaustive 89-tool plan, one row per tool.

**Special treatment:** Fantasy Points Calculator must specify an exact scoring system/competition; Fantasy Team Builder and Dream XI are educational/team-planning features, not wagering. Team name generator can be P3 without external API. Export tools require server-side asset generation safeguards and template licensing.

## 8. Local cricket rules engine and scoring state machine

**Core entities:** Tournament → tournament teams → match → innings → delivery events. `format` (Test/ODI/T20/T10/custom/tape-ball), `ballsPerOver`, scheduled overs/innings, substitutions, wide/no-ball penalties, boundary options, wickets permitted, innings closure, super-over handling and NRR rules belong to versioned JSON schema plus validated relational fields.

**Match states:** `draft → scheduled → ready → in_progress → innings_break → in_progress → completed → approved → published`, with alternate `postponed`, `abandoned`, `cancelled`, `void`, `under_review`. Transitions require role permissions and audit log. No official-looking published score until approved or marked provisional.

**Delivery event:** `deliveryId(UUID)`, `matchId`, `inningsId`, `sequence`, `idempotencyKey`, `legalDelivery` Boolean, `batterId`, `nonStrikerId`, `bowlerId`, `batRuns`, `extraKind`, `extraRuns`, `dismissals[]`, `fielders[]`, `timestamp`, `authorId`, `status`, `ruleVersion`. Prohibit accidental duplicate sequence/key. A no-ball/wide may carry runs and/or dismissal subject to competition rules. Maintain event log append-only; corrections via reversal/superseding events with reason and actor, then rebuild materialized scorecards.

**Transactional scoring:** validate current state → lock innings or use compare-and-swap version → authorize scorer → append idempotent event → recalculate innings state → publish realtime update → audit. Handle mid-request timeout/retry deterministically. Websocket clients are projections, never authoritative score keepers. Offline mode introduced only after multi-device conflict strategy is tested.

**Local player verification:** organizers approve scorecards; aggregate statistics derive from approved deliveries/results; self-entered performance is displayed separately. Player can request correction/disassociation. For minors, default to private or limited profiles and require safeguarding/consent policies before public discovery.

## 9. Database architecture (PostgreSQL)

Separate schemas: `auth` managed by provider, `core` shared metadata, `pro` licensed professional datasets, `local` user competition data, `content`, `analytics` derived stats and `audit`. Use UUID primary keys for first-party entities; provider IDs stored with `(provider, provider_entity_id)` unique constraint. Time always UTC in storage; render local match time with IANA TZ. Financial flows never reuse user PII as public IDs.

| Area | Tables and constraints |
| --- | --- |
| Accounts | `user_profiles`, `user_settings`, `user_follows`, `notification_preferences`, `consents` |
| Organizations | `organizations`, `organization_members`, `organization_roles`, `invitations` |
| Professional | `pro_players`, `pro_teams`, `pro_competitions`, `pro_seasons`, `pro_matches`, `pro_innings`, `pro_deliveries`, `pro_venues`, `pro_rankings`, `provider_entity_map` |
| Local tournaments | `local_tournaments`, `local_rule_sets`, `local_tournament_teams`, `local_teams`, `local_players`, `local_memberships`, `local_fixtures`, `local_matches` |
| Local scoring | `local_innings`, `local_delivery_events`, `local_score_approvals`, `local_match_revisions`, `local_scorecards` |
| Stats | `player_stats_cache`, `team_stats_cache`, `standings_cache`, `scenario_snapshots`, `stat_derivation_versions` |
| Editorial | `articles`, `article_revisions`, `authors`, `taxonomies`, `content_entities`, `media_assets`, `editorial_sources` |
| Operations | `data_sources`, `import_jobs`, `import_errors`, `report_flags`, `audit_logs`, `feature_flags`, `webhooks_outbox` |
| Community | `polls`, `poll_votes`, `predictions`, `leaderboards`, `comments`, `moderation_actions` (P2/P3) |

**Must-have constraints:** unique member per team and valid date window; `legal_ball_index` valid; `teamA!=teamB`; `runs>=0`; restricted enum states; foreign keys enforce organization ownership; row-level security policies for all tenant tables; read-public views explicitly whitelisted; soft-delete only when compliance requires and backups/retention are documented.

**Suggested indexes:** `(match_id, innings_number, event_sequence)`, `(tournament_id, status, start_at)`, `(provider,provider_entity_id)`, player search trigram, `articles(published_at DESC, status)`; all public slug uniqueness enforced within appropriate namespace. Materialized aggregates need invalidation and reconciliation jobs after scoring corrections.

## 10. API and integration contracts

Use Next.js App Router API handlers, typed server services and a single domain rule engine. APIs return predictable `{data, error, meta}`. Validation errors carry stable codes and field paths. OpenAPI description required before external-facing API publication. Never expose service-role keys in client-side bundles.

| Route | Method | Purpose | Auth |
| --- | --- | --- | --- |
| `/api/v1/search?q=` | GET | grouped global search | public/rate limited |
| `/api/v1/tools/run-rate` | POST (optional) | server validation/mirroring | public/rate limited |
| `/api/v1/pro/players` | GET | browsable players | public/source constrained |
| `/api/v1/pro/players/:id` | GET | profile + scopes | public/source constrained |
| `/api/v1/pro/tournaments/:id` | GET | metadata, standings | public/source constrained |
| `/api/v1/scenarios` | POST | create saved qualification scenario | user |
| `/api/v1/scenarios/:id` | GET | scenario snapshot | owner or public share-token |
| `/api/v1/local/tournaments` | POST | create draft tournament | organizer |
| `/api/v1/local/tournaments/:id` | PATCH | validated edits | organization role |
| `/api/v1/local/tournaments/:id/publish` | POST | publish after checks | owner/editor |
| `/api/v1/local/tournaments/:id/fixtures` | POST | generate fixtures | organizer |
| `/api/v1/local/matches/:id/result` | POST | manual result and approval | scorer/editor |
| `/api/v1/local/matches/:id/deliveries` | POST | idempotent event append | authorized scorer |
| `/api/v1/local/matches/:id/scorecard` | GET | aggregate/provenance | public if published |
| `/api/v1/admin/import-jobs` | POST | authorized provider data import | admin only |

**Example event response:** `{data:{eventId,inningVersion,score:{runs,wickets,legalBalls,oversDisplay}},meta:{timestamp,ruleVersion}}`. Use `409 STATE_CONFLICT` for version errors; `422 RULE_VIOLATION` for impossible cricket events, `403` for ownership errors, `429` for throttling.

**Provider ingestion:** isolate adapters behind `CricketDataProvider` interface, store licenses/attributions, coverage, freshness and provider timestamps; ETL stage → validate → diff → approve → publish. Never rely on scraping of a third-party site without permission. Cricsheet can supplement historical deliveries if applicable licenses and attribution are met; no assumption of complete history.

## 11. SEO, localization, accessibility and analytics

**SEO:** semantic server-rendered public pages, unique title/description, breadcrumbs, canonical links, XML sitemaps partitioned by type, article and event structured data where eligible, noindex thin filters/account/admin, redirect old slugs. Entity pages include source coverage and updates. Avoid thousands of thin programmatic pages or fabricated record claims.

**Localization:** English P1; Urdu P2. UI labels/number presentation translate, proper `dir=rtl` on Urdu containers, test mixed Urdu/English names and numeric score tables; retain standardized cricket notation and time-zone representation. No automatic translation of player names without review. Locale URLs optional but consistent canonical/hreflang if introduced.

**Accessibility:** WCAG 2.2 AA target, text contrast, skip link, focus outline, labels, 44px minimum tap targets in key workflows, table row/column headers, accessible chart data tables, announcements for scoring updates without overwhelming screen-reader users. Support prefers-reduced-motion.

**Performance targets:** 75th percentile Core Web Vitals LCP <=2.5s, INP <=200ms, CLS <=0.1; a fast calculator-first route with minimal JS. Lazy-load editor/charts/score animations and photos below fold. Never allow live score polling to flood clients or providers.

**Product analytics:** privacy-aware events `tool_opened`, `tool_calculated`, `scenario_created`, `scenario_shared`, `tournament_created`, `tournament_published`, `fixture_generated`, `score_event_recorded`, `scorecard_approved`, `news_read`, `account_signup`, `export_download`. No medical/financial/children-sensitive attributes in analytics. Track conversion funnels and error rates by route.

## 12. Authentication, authorization, abuse and privacy

Roles: `anonymous`, `user`, `local_player`, `organizer_owner`, `organizer_editor`, `scorer`, `moderator`, `editor`, `admin`, `superadmin`. Implement RBAC on the server plus row-level security; memberships determine scope. Email-verification and session protection for writes. Rate-limit public search, auth, creator rendering, prediction submission and upload endpoints. Uploads: signed URLs, file size/type checks, malware scanning strategy, retention rules. Multi-factor authentication for admin users. Audit all data edits and moderation.

Consent and profile visibility: public player data opt-in; no exact address for minors, no unauthorized photos, mechanisms for removal/dispute. Store minimal PII; publish a privacy policy and retention schedule before signups. Provide account deletion/export processes, reasonable audit retention and server-side data access logging.

## 13. Business models

Free: calculators, core coverage, basic profiles, glossary and public local results. Potential future revenue: modest non-invasive ads on editorial/tools pages, organizer subscriptions for custom branding/advanced stats, licensed data/API plans, sponsor placements (clearly labeled), affiliates for cricket equipment and ad-free analytics tiers. **Do not** place disruptive ads inside the mobile scorer. Trial pricing needs validation; no hard-coded $3.99 or unsupported user volume claims.

## 14. System test strategy and completion gates

### Automated tests

- Unit: every formula; valid/invalid overs; zero balls; all out; NRR aggregation; tournament rank ordering; points ties; rule variations.
- Property-based: score never negative, legal ball counts monotonic except logged reversal, sums reconcile, a fixture cannot feature the same team twice, duplicate scorer event keys have no side effects.
- Integration: signup → create tournament → roster → fixture → manual result → published standings; scoring → correction → reaggregation.
- E2E: calculator result, search, player comparison, accessibility keyboard, organizer mobile flow, permission errors, deep links, dark theme.
- Visual regression: 1440, 1280, 768, 390, 360px; home/tools/calculator/match/player/tournament/scorepad/admin; no overflow or clipped controls.
- Security: authorization, IDOR, RLS, CSRF protection patterns as applicable, rate limits, content upload security, secret scanning.
- Resilience: data-feed failure, network timeout, duplicate POST, disconnect during ball entry, stale client version, race between two scorers.

### Definition of done (all features)

1. Link to requirement and screen family; documented state/inputs/outputs/error cases.
2. Production-quality responsive UI, authentic imagery where needed, meaningful empty/loading/error/success states.
3. Function works with seeded deterministic demo data and suitable real provider integration (when authorized).
4. Unit/integration/E2E coverage appropriate to risk and permission checks.
5. Accessibility, localization hooks, SEO metadata and analytics event as applicable.
6. Documentation updated; reviewer can test from a local URL; no misleading fake stats or invented references.
7. Technical owner and product reviewer sign off; feature flag only enabled when data/licensing gates clear.

### P1 acceptance checklist

- [ ] Homepage has a meaningful mobile/desktop design and real licensed/original media asset manifest.
- [ ] Search works by tool/player/team from approved seed dataset.
- [ ] 12 P1 calculator routes compute accurately and show examples.
- [ ] Records/profiles show source, format and coverage dates.
- [ ] Tournament points generator calculates W/L/T/NR points and correct ranking under configured rule.
- [ ] Auth + organizer ownership + protected dashboard routes work.
- [ ] Organizer creates tournament, teams and fixtures without errors.
- [ ] Organizer records a result and publishes a public tournament page + updated points table.
- [ ] Unit tests, E2E checks, schema migration and production build pass.
- [ ] Responsive, 360px usability, keyboard focus and acceptable vitals are verified.
- [ ] Data rights, source attribution, privacy and legal pages approved before public promotion.

## 15. Development delivery workflow for Codex

1. Read `AGENTS.md` and this PRD first. Inspect existing repo; do not overwrite without identifying conflicts.
2. Output `docs/architecture.md`, `docs/schema.md`, `docs/design-system.md`, `docs/release-scope.md` and a numbered backlog before implementing features.
3. Scaffold TypeScript + Next.js App Router + Tailwind + PostgreSQL/Supabase adapter; use strict typing, Zod schemas and testing.
4. Implement design system and **one visually complete homepage** before mass-generating the other routes; review images and responsive screenshots.
5. Implement cricket-math pure functions with test vectors, then 12 working P1 calculator pages.
6. Implement editable, licensed/source-aware professional entities and editorial templates (seed labeled demos).
7. Implement account/RBAC and local tournament CRUD + basic results + automatic table from source-of-truth matches.
8. Add real integrations only after credentials, licensing and provider coverage verified.
9. Gate P2 and P3 strictly. Never replace missing API with secretly fabricated live matches.
10. For every phase run lint, typecheck, test, E2E and screenshots, then report exact results and pending blockers.

## 16. Open decisions / assumptions (non-blocking)

- Brand name, trademark and domain are unverified; use 'CreaseGrid' as placeholder in code/config.
- Professional cricket data supplier, license, commercial plan and official current rankings feeds are TBD.
- Competition rules for specific leagues must be configured, not guessed.
- Urdu editorial staffing and content translation workflow are TBD.
- Payment provider and subscriptions remain out of P1.
- Precise P2/P3 delivery timetable requires team capacity and API budget.

## 17. Source and reference links

- Official Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Official Next.js App Router: https://nextjs.org/docs/app
- Supabase documentation: https://supabase.com/docs
- Laws of Cricket: https://www.lords.org/mcc/the-laws-of-cricket
- International playing conditions: https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions
- Cricsheet matches and license: https://cricsheet.org/matches/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Google web vitals: https://web.dev/articles/vitals

---

# ANNEX A — 23 FEATURE CATEGORIES, SCOPE & OWNER GUIDE

| # | Category | P1 baseline | P2 enhancement | P3 expansion |
| --- | --- | --- | --- | --- |
| 1 | Homepage & dashboard | discovery, matches, tools, links | personalized home | predictive insights |
| 2 | Match & score centre | fixtures/results | licensed live scorecards | momentum/probability |
| 3 | Tournaments & series | profiles, fixtures, points | detailed leaders/qualification | advanced forecasts |
| 4 | Player database | bios, stats, format tabs | split analysis & career graphs | Performance DNA |
| 5 | Team database | profile, squad, results | H2H, rankings, stats | strength index |
| 6 | Statistics, records & history | records by format | filtered advanced stats | time machine |
| 7 | Stadiums, venues & pitches | venue profiles | averages/pitch context | predictive venues |
| 8 | News & editorial | categories, articles | explained news, interviews | personalization |
| 9 | Women, youth & emerging | inclusive coverage | youth/domestic spotlights | talent tracker |
| 10 | Cricket calculators | 12 tested core tools | percentage/DLS/super over | planners |
| 11 | Tournament utilities | points, fixtures, brackets | Qualification Lab, scenarios | pathways |
| 12 | Comparison & analytics | basic player compare data | matchup and splits | era/pressure studies |
| 13 | Match simulators | optional simple scenario | what-if, innings forecast | probability models |
| 14 | Record finders & research | record filters | preset search explorers | milestones/history |
| 15 | Academy & learning | glossary/guides | quizzes/explorers | coaching assistant |
| 16 | Graphics & creator | result image maker | graphics studio, exports | overlays/widgets |
| 17 | Local tournaments | accounts, CRUD, fixtures, result, table | scoring analytics | clubs/discovery |
| 18 | Local score & identity | manual result/public score | ball-by-ball/verified player stats | offline/video |
| 19 | Fan community | — | polls, predictor league | social community |
| 20 | Personalization | auth and settings | follows/saves/alerts | premium intelligence |
| 21 | AI Cricket Lab | — | — | verified retrieval and reports |
| 22 | Global platform/SEO | design/perf/SEO/security | Urdu, PWA, timezone | native apps/API |
| 23 | Admin & monetization | CMS, source audits, users | sponsor and paid organizer | premium/data API |

# ANNEX B — COMPLETE SCREEN BACKLOG

The screen inventory below is **scope inventory, not UI design approval**. Each requires a distinct review of information hierarchy and responsive behavior. Status for every screen at handoff: `specification only / existing preview not approved`.

| Screen ID | Page / tool screen | Category | Priority |
|---|---|---|---|
| home | Home — Global Cricket Dashboard | Discovery | P1 |
| tools | Cricket Tools Directory | Tools | P1 |
| matches | Fixtures & Results | Matches | P1 |
| match-preview | Match Preview | Matches | P2 |
| live-match | Live Match Centre | Matches | P2 |
| scorecard | Detailed Match Scorecard | Matches | P2 |
| tournaments | Tournament Directory | Tournaments | P1 |
| tournament | Tournament Overview | Tournaments | P1 |
| tournament-table | Tournament Points Table | Tournaments | P1 |
| tournament-stats | Tournament Player Statistics | Tournaments | P2 |
| players | Players Directory | Statistics | P1 |
| player | Player Profile | Statistics | P1 |
| player-dna | Player Performance DNA | Intelligence | P3 |
| teams | Teams Directory | Statistics | P1 |
| team | Team Profile | Statistics | P1 |
| team-h2h | Team Head-to-Head | Statistics | P2 |
| records | Cricket Records Explorer | Statistics | P1 |
| record-detail | Individual Record Ranking | Statistics | P1 |
| rankings | Cricket Rankings | Statistics | P2 |
| comparison | Player Comparison Lab | Intelligence | P2 |
| matchup | Batter vs Bowler Intelligence | Intelligence | P2 |
| venue | Venue Profile | Statistics | P2 |
| venues | Venues Directory | Statistics | P2 |
| qualification | Qualification Lab — Flagship | Intelligence | P2 |
| what-if | What If Cricket? Simulator | Intelligence | P2 |
| momentum | Match Momentum Explorer | Intelligence | P3 |
| graphics | Cricket Graphics Studio | Creator Tools | P2 |
| news | Cricket News Centre | Content | P1 |
| article | Editorial Article / News Explained | Content | P1 |
| learn | Cricket Learning Academy | Learning | P1 |
| lesson | Academy Lesson | Learning | P2 |
| glossary | Cricket Glossary | Learning | P1 |
| history | Cricket Time Machine | Content | P3 |
| women | Women & Emerging Cricket | Content | P2 |
| media | Cricket Multimedia Hub | Content | P3 |
| local | Local Cricket Landing | Local Cricket | P1 |
| local-tournament | Local Tournament Public Page | Local Cricket | P1 |
| local-team | Local Team Profile | Local Cricket | P1 |
| local-player | Local Player Identity | Local Cricket | P2 |
| organizer | Organizer Dashboard | Organizer | P1 |
| create-tournament | Create Tournament — Wizard | Organizer | P1 |
| manage-teams | Manage Teams & Players | Organizer | P1 |
| fixture-builder | Tournament Fixture Builder | Organizer | P1 |
| scoring | Phone Ball-by-Ball Scoring | Organizer | P2 |
| organizer-analytics | Organizer Analytics & Reports | Organizer | P2 |
| community | Fan Community & Polls | Community | P2 |
| predictor | Cricket Predictor League | Community | P2 |
| profile | My Cricket Dashboard | Account | P2 |
| notifications | Notifications & Following | Account | P2 |
| login | Login & Signup | Account | P1 |
| settings | Account Settings | Account | P1 |
| ai | Ask Cricket AI Research | Intelligence | P3 |
| admin | Admin Content Dashboard | Administration | P1 |
| admin-data | Admin Data Imports & Integrity | Administration | P1 |
| pricing | Pro Membership & Organizer Plans | Business | P3 |
| design-system | Design System — Components | Design System | P1 |
| tool-run-rate | Run Rate Calculator | Calculators | P1 |
| tool-required-run-rate | Required Run Rate | Calculators | P1 |
| tool-net-run-rate | Net Run Rate (NRR) | Calculators | P1 |
| tool-batting-average | Batting Average | Calculators | P1 |
| tool-batting-strike-rate | Batting Strike Rate | Calculators | P1 |
| tool-bowling-average | Bowling Average | Calculators | P1 |
| tool-bowling-economy | Bowling Economy | Calculators | P1 |
| tool-bowling-strike-rate | Bowling Strike Rate | Calculators | P1 |
| tool-overs-converter | Overs to Balls | Calculators | P1 |
| tool-chase-target | Target & Chase | Calculators | P1 |
| tool-projected-score | Projected Innings Score | Calculators | P1 |
| tool-partnership | Partnership Calculator | Calculators | P1 |
| tool-boundary-percentage | Boundary Percentage | Calculators | P2 |
| tool-dot-ball-percentage | Dot Ball Percentage | Calculators | P2 |
| tool-powerplay-run-rate | Powerplay Run Rate | Calculators | P2 |
| tool-bowling-figures | Bowling Figures | Calculators | P2 |
| tool-extras | Extras Calculator | Calculators | P2 |
| tool-batting-milestone | Batting Milestone | Calculators | P2 |
| tool-follow-on | Test Match Follow-on | Calculators | P2 |
| tool-super-over | Super Over Calculator | Calculators | P2 |
| tool-match-result | Winning Margin Calculator | Calculators | P2 |
| tool-required-boundaries | Required Boundaries | Calculators | P2 |
| tool-dls | DLS Revised Target | Calculators | P2 |
| tool-batting-order | Batting Order Planner | Planning | P3 |
| tool-match-target | Match Target Planner | Planning | P3 |
| tool-points-table-generator | Points Table Generator | Tournament Tools | P1 |
| tool-fixture-generator | Fixture Generator | Tournament Tools | P1 |
| tool-bracket-generator | Knockout Bracket Maker | Tournament Tools | P1 |
| tool-nrr-qualifier | NRR Qualification | Tournament Tools | P2 |
| tool-playoff-scenarios | Playoff Scenarios | Tournament Tools | P2 |
| tool-group-stage-simulator | Group Stage Simulator | Tournament Tools | P2 |
| tool-auction-budget | Auction Budget Tracker | Tournament Tools | P2 |
| tool-world-cup-tracker | World Cup Qualification Tracker | Tournament Tools | P3 |
| tool-team-ranking-explorer | Team Ranking Explorer | Research | P2 |
| tool-fantasy-team-builder | Fantasy Team Builder | Planning | P2 |
| tool-dream-xi-builder | Dream XI Builder | Planning | P2 |
| tool-record-finder | Cricket Record Finder | Research | P1 |
| tool-century-finder | Century Finder | Research | P2 |
| tool-wicket-finder | Wicket Finder | Research | P2 |
| tool-boundaries-finder | Sixes & Fours Finder | Research | P2 |
| tool-fastest-centuries | Fastest Century Finder | Research | P2 |
| tool-highest-score-finder | Highest Score Finder | Research | P2 |
| tool-partnership-finder | Partnership Finder | Research | P2 |
| tool-player-debut-finder | Player Debut Finder | Research | P2 |
| tool-venue-record-finder | Venue Record Finder | Research | P2 |
| tool-world-cup-record-finder | World Cup Record Finder | Research | P2 |
| tool-milestone-tracker | Cricket Milestone Tracker | Research | P3 |
| tool-match-archive-search | Historic Match Finder | Research | P3 |
| tool-on-this-day | On This Day in Cricket | Research | P3 |
| tool-player-form | Player Form Analyzer | Analytics | P2 |
| tool-home-away | Home vs Away Analyzer | Analytics | P2 |
| tool-venue-performance | Venue Performance | Analytics | P2 |
| tool-pace-spin | Pace vs Spin Analyzer | Analytics | P3 |
| tool-chasing-first | Chasing vs Batting First | Analytics | P3 |
| tool-captain-comparison | Captain Comparison | Analytics | P2 |
| tool-keeper-comparison | Wicketkeeper Comparison | Analytics | P2 |
| tool-allrounder-comparison | All-rounder Comparison | Analytics | P2 |
| tool-league-comparison | League Comparison | Analytics | P3 |
| tool-era-comparison | Era Comparison | Analytics | P3 |
| tool-win-probability | Win Probability Explorer | Simulation | P3 |
| tool-first-innings-predictor | First Innings Predictor | Simulation | P2 |
| tool-powerplay-simulator | Powerplay Simulator | Simulation | P2 |
| tool-death-overs-simulator | Death Overs Simulator | Simulation | P2 |
| tool-toss-impact | Toss Impact Explorer | Simulation | P3 |
| tool-pitch-impact | Pitch Impact Analyzer | Simulation | P3 |
| tool-weather-impact | Weather Impact Explorer | Simulation | P3 |
| tool-field-placement | Field Placement Planner | Learning Tools | P3 |
| tool-umpire-quiz | Cricket Umpire Quiz | Learning Tools | P2 |
| tool-rules-quiz | Cricket Rules Quiz | Learning Tools | P2 |
| tool-guess-player | Guess the Cricketer | Learning Tools | P2 |
| tool-coaching-planner | Cricket Coaching Planner | Learning Tools | P3 |
| tool-scorecard-image | Scorecard Image Maker | Creator Tools | P1 |
| tool-match-poster | Match Poster Generator | Creator Tools | P2 |
| tool-player-graphic | Player Comparison Graphic | Creator Tools | P2 |
| tool-stats-infographic | Cricket Stats Infographic | Creator Tools | P2 |
| tool-caption-generator | Cricket Caption Generator | Creator Tools | P2 |
| tool-hashtag-generator | Cricket Hashtag Generator | Creator Tools | P2 |
| tool-match-report-generator | Match Report Generator | Creator Tools | P2 |
| tool-newsletter-generator | Newsletter Generator | Creator Tools | P3 |
| tool-cricket-calendar | Cricket Match Calendar | Utilities | P2 |
| tool-time-converter | Match Time Zone Converter | Utilities | P2 |
| tool-ground-finder | Cricket Ground Finder | Utilities | P3 |
| tool-bat-weight-converter | Cricket Bat Weight Converter | Utilities | P2 |
| tool-ball-weight-converter | Cricket Ball Weight Converter | Utilities | P2 |
| tool-scorecard-exporter | Cricket Scorecard Export | Utilities | P2 |
| tool-notification-builder | Cricket Notification Builder | Utilities | P2 |
| tool-fantasy-points | Fantasy Points Calculator | Utilities | P2 |
| tool-team-balancer | Cricket Team Balancer | Planning | P2 |
| tool-cricket-names | Cricket Team Name Generator | Creator Tools | P3 |

# ANNEX C — COMPLETE TOOL REQUIREMENTS

The following are the 89 individual tool/view requirements. These can share an implementation engine; their public routes must have distinct useful explanations and valid inputs. A detailed machine-readable copy is in `specs/TOOL_REQUIREMENTS.csv`.

| Tool ID | Tool | Priority | Minimum input | Required output |
|---|---|---|---|---|
| TOOL-057 | Run Rate Calculator | P1 | runs scored; legal balls/over notation | runs per six-ball over |
| TOOL-058 | Required Run Rate | P1 | runs scored; legal balls/over notation | runs per six-ball over |
| TOOL-059 | Net Run Rate (NRR) | P1 | runs scored; legal balls/over notation | runs per six-ball over |
| TOOL-060 | Batting Average | P1 | total runs; innings; not outs | runs per dismissal |
| TOOL-061 | Batting Strike Rate | P1 | batter runs; balls faced | runs per 100 balls |
| TOOL-062 | Bowling Average | P1 | runs conceded; wickets credited | runs per wicket |
| TOOL-063 | Bowling Economy | P1 | bowler conceded runs; legal balls bowled | runs per over |
| TOOL-064 | Bowling Strike Rate | P1 | legal balls bowled; wickets credited | balls per wicket |
| TOOL-065 | Overs to Balls | P1 | integer overs dot legal balls; balls per over | integer legal balls and reverse overs notation |
| TOOL-066 | Target & Chase | P1 | opponent runs; chasing runs; legal balls remaining | winning target; runs needed; required rate |
| TOOL-067 | Projected Innings Score | P1 | current runs; elapsed balls; scheduled balls; assumed rate | simple projected total |
| TOOL-068 | Partnership Calculator | P1 | two batters contributions; partnership extras; balls | partnership runs and rate |
| TOOL-069 | Boundary Percentage | P2 | boundary runs; total runs | percentage |
| TOOL-070 | Dot Ball Percentage | P2 | dots; legal balls | percentage |
| TOOL-071 | Powerplay Run Rate | P2 | runs scored; legal balls/over notation | runs per six-ball over |
| TOOL-072 | Bowling Figures | P2 | balls bowled; runs conceded; wickets | overs, figures, economy |
| TOOL-073 | Extras Calculator | P2 | wides; no balls; byes; leg byes; penalty | extras total and breakdown |
| TOOL-074 | Batting Milestone | P2 | batter runs; desired milestone | runs to milestone |
| TOOL-075 | Test Match Follow-on | P2 | 1st innings scores; scheduled match days | lead and follow-on threshold |
| TOOL-076 | Super Over Calculator | P2 | two team innings; deliveries; rule set | result and tie-break status |
| TOOL-077 | Winning Margin Calculator | P2 | team scores and innings state | runs/wickets margin |
| TOOL-078 | Required Boundaries | P2 | runs needed; balls available; boundary mix assumptions | illustrative combinations |
| TOOL-079 | DLS Revised Target | P2 | interruptions; overs; wickets; validated DLS resources | revised target, par score |
| TOOL-080 | Batting Order Planner | P3 | team/players/rules/limits/roles/constraints | suggested lineup, budget or match plan |
| TOOL-081 | Match Target Planner | P3 | team/players/rules/limits/roles/constraints | suggested lineup, budget or match plan |
| TOOL-082 | Points Table Generator | P1 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-083 | Fixture Generator | P1 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-084 | Knockout Bracket Maker | P1 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-085 | NRR Qualification | P2 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-086 | Playoff Scenarios | P2 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-087 | Group Stage Simulator | P2 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-088 | Auction Budget Tracker | P2 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-089 | World Cup Qualification Tracker | P3 | tournament format, teams, fixtures, match results, rule set, points and scoring parameters | points table, qualifying scenarios, brackets, fixtures or validated rankings |
| TOOL-090 | Team Ranking Explorer | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-091 | Fantasy Team Builder | P2 | team/players/rules/limits/roles/constraints | suggested lineup, budget or match plan |
| TOOL-092 | Dream XI Builder | P2 | team/players/rules/limits/roles/constraints | suggested lineup, budget or match plan |
| TOOL-093 | Cricket Record Finder | P1 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-094 | Century Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-095 | Wicket Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-096 | Sixes & Fours Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-097 | Fastest Century Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-098 | Highest Score Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-099 | Partnership Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-100 | Player Debut Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-101 | Venue Record Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-102 | World Cup Record Finder | P2 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-103 | Cricket Milestone Tracker | P3 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-104 | Historic Match Finder | P3 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-105 | On This Day in Cricket | P3 | format, era, year, opposition, player/team, venue, category filters | record table, matching innings/matches, source and coverage |
| TOOL-106 | Player Form Analyzer | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-107 | Home vs Away Analyzer | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-108 | Venue Performance | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-109 | Pace vs Spin Analyzer | P3 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-110 | Chasing vs Batting First | P3 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-111 | Captain Comparison | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-112 | Wicketkeeper Comparison | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-113 | All-rounder Comparison | P2 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-114 | League Comparison | P3 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-115 | Era Comparison | P3 | player/team IDs, format, competition, date window, opponent, venue filters | scope-matched comparable statistics with chart/table and source coverage |
| TOOL-116 | Win Probability Explorer | P3 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-117 | First Innings Predictor | P2 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-118 | Powerplay Simulator | P2 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-119 | Death Overs Simulator | P2 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-120 | Toss Impact Explorer | P3 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-121 | Pitch Impact Analyzer | P3 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-122 | Weather Impact Explorer | P3 | baseline state, format, overs, wickets, assumptions, scenario edits | scenario outcomes, trajectory or probability with uncertainty |
| TOOL-123 | Field Placement Planner | P3 | selected topic, ruleset, quiz answers or player clues | lesson/explanation, score/progress, source |
| TOOL-124 | Cricket Umpire Quiz | P2 | selected topic, ruleset, quiz answers or player clues | lesson/explanation, score/progress, source |
| TOOL-125 | Cricket Rules Quiz | P2 | selected topic, ruleset, quiz answers or player clues | lesson/explanation, score/progress, source |
| TOOL-126 | Guess the Cricketer | P2 | selected topic, ruleset, quiz answers or player clues | lesson/explanation, score/progress, source |
| TOOL-127 | Cricket Coaching Planner | P3 | selected topic, ruleset, quiz answers or player clues | lesson/explanation, score/progress, source |
| TOOL-128 | Scorecard Image Maker | P1 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-129 | Match Poster Generator | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-130 | Player Comparison Graphic | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-131 | Cricket Stats Infographic | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-132 | Cricket Caption Generator | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-133 | Cricket Hashtag Generator | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-134 | Match Report Generator | P2 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-135 | Newsletter Generator | P3 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |
| TOOL-136 | Cricket Match Calendar | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-137 | Match Time Zone Converter | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-138 | Cricket Ground Finder | P3 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-139 | Cricket Bat Weight Converter | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-140 | Cricket Ball Weight Converter | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-141 | Cricket Scorecard Export | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-142 | Cricket Notification Builder | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-143 | Fantasy Points Calculator | P2 | dates/times/units or verified cricket data; user preferences | correct conversion, saved alert, export or fixture information |
| TOOL-144 | Cricket Team Balancer | P2 | team/players/rules/limits/roles/constraints | suggested lineup, budget or match plan |
| TOOL-145 | Cricket Team Name Generator | P3 | verified match/player data or manual entries; template; brand styles; image dimensions | preview and downloadable visual or text, with attribution |

# ANNEX D — PROPOSED SCREEN STATE MATRIX

| Family | Primary | Loading | Empty | Invalid / error | Authorized / permissions | Mobile UX |
|---|---|---|---|---|---|---|
| Home | search + navigation | skeleton modules | no matches/story | feed unavailable | guest and signed-in | photo-first and horizontal match rail |
| Tools | input/result | rare; local math | no searched tools | validation rules | public | sticky primary action and accessible form |
| Records | filters/table | table skeleton | no rows in scope | data coverage warning | public | sticky left column, scrollable stats |
| Match | status/scorecard | source timestamp | upcoming/no data | provider outage | public | scoreboard and run equation first |
| Tournament | standings/fixtures | source skeleton | no matches | rule/tie-break ambiguity | public | tabs then table |
| Player | bio/stats | portrait/text skeleton | incomplete record | source/coverage missing | public | identity, headline metrics, filters |
| Editorial | read article | image placeholder | no articles | content unavailable | public | reading width and editorial crop |
| Account | settings/follows | save progress | no favourites | auth failure | owner only | large controls, clear feedback |
| Organizer | tournament actions | saving indicator | empty tournament | permission or save failure | role checked | task-focused drawer |
| Scorer | record delivery | sending event | innings not started | invalid event/conflict | assigned scorer only | thumb-zone scoring controls |
| Admin | CRUD + review | import status | no queue items | provider/license failure | admin only | desktop primary, responsive tables |

# ANNEX E — CODING AGENT DELIVERY EVIDENCE TEMPLATE

Every milestone PR shall attach `Requirement IDs`, `Screens/URLs`, `Desktop/Mobile screenshots`, `Math and business rule tests`, `Security and a11y checks`, `Known limits`, and `Unresolved external data licenses`; do not say a page is complete merely because it renders.
