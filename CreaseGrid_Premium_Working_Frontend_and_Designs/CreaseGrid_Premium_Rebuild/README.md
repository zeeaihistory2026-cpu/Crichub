# CreaseGrid — Premium Frontend Rebuild (v1.0)

**This is a working, responsive frontend prototype, not a live cricket platform.** It was rebuilt to follow the nine-screen visual direction approved in the conversation: white, navy, cobalt-blue, an editorial-first homepage, readable cricket news, selective cricket imagery, detailed statistics and separate organizer interfaces.

## Open it

The simplest way is to open `START_HERE.html`, then select **Open Working Prototype** or **Browse Design Gallery**.

For the most predictable browser behavior (including localStorage), run a local HTTP server:

```bash
cd CreaseGrid_Premium_Rebuild
python -m http.server 8000
```

Open **http://localhost:8000**. No installation, npm, database or API keys are required.

## What's genuinely working

- **31 routable screens**, including the nine priority page types, 12 separate calculator routes, three dashboard experiences, scoring and extended views.
- **Homepage → More news → News listing → Individual article**.
- News category filters, headline search, article saved state and local demo article publication.
- **12 mathematical calculators:** run rate, required run rate, NRR, batting average/strike rate, bowling average/economy/strike rate, overs-to-balls, target/chase, projected score and partnership.
- Qualification Lab: change teams, score, overs and all-out treatment to update points and cumulative NRR in a **specified demo ruleset**.
- Organizer demo: create tournament, register teams, record basic match results and export team CSV.
- Simplified phone-first scoring: dot/1/2/3/4/6/wicket/wide/no ball, undo, legal-ball over count and score export CSV.
- Follow a player, save news and see those choices in My Cricket.
- Admin **local-only** publish-article demo.
- Desktop and mobile responsive layouts, keyboard-friendly controls and screen-reader labels for critical actions.

## What is NOT implemented

- No production backend or real signup/login; profiles and organizer workspaces are front-end demonstrations.
- No licensed live cricket API, professional statistics feed, official live commentary, real match predictions or actual news publishing.
- No verified historical database, real ICC rankings or complete player records.
- No official Duckworth-Lewis-Stern calculator.
- No advanced cricket scoring engine (batter strike rotation, run-outs, detailed wicket types, leg byes/byes, penalty runs, DLS, declarations, innings management, conflict resolution or offline sync).
- No public tournament storage, multi-user permissions, payment system, push notifications, real app or AI assistant.
- No production SEO server rendering; the prototype uses `#/hash-routes` to work without a server framework.
- The full **145-screen PRD backlog is NOT implemented** in this rebuild. Those future features are specified in `docs/FULL_MASTER_PRD.md`.

## Files

| File / folder | Purpose |
|---|---|
| `index.html` | Open the working website prototype |
| `styles.css` | Design tokens, layouts, responsive rules |
| `app.js` | View templates, routing, sample data, interactions and cricket mathematics |
| `OPEN_DESIGN_GALLERY.html` | Browse all 62 desktop/mobile screenshots |
| `screens/desktop/` | 31 individually rendered desktop screens |
| `screens/mobile/` | 31 individually rendered mobile screens |
| `reference/` | Approved nine-screen visual direction |
| `docs/FULL_MASTER_PRD.md` | Full 23-category product requirements / future backlog |
| `docs/BUILD_STATUS_AND_GAPS.md` | Exact working scope and next steps |
| `AGENTS.md` | Instructions to Codex or another coding agent |
| `tests/` | Playwright visual, math and interaction test scripts + results |

## Run tests

Requires Python with Playwright and Chromium installed:

```bash
python tests/render_and_smoke.py
python tests/extended_qa.py
```

Our exported test results report **62 responsive renders across 31 routes, 21 numerical/workflow assertions passing, and no detected overflow across 320, 375, 390, 768, 1024 and 1440px for the audited routes**.

The tests load equivalent inline HTML/CSS/JavaScript into a browser because direct filesystem navigation was blocked in the execution environment; the shipped `index.html`, `app.js` and `styles.css` contain the same source.

## Sample data and imagery

All displayed fixtures, scorecards, biographies, articles, standings, traffic and comparisons are **illustrative placeholders**, even when they mention real teams or players. Generated imagery is design reference imagery and should not be presented as officially licensed player photography. Production content must be sourced, verified, appropriately licensed and updated.

## Design direction

Use **white / navy / blue**, with limited orange accents, moderate shadows, dense but readable sports information and a **text-first news section**. `reference/approved_nine_screen_design_direction.png` is a visual north star, not a source file with editable layers. This rebuild implements its visual hierarchy and navigation workflows rather than attempting an ungrounded claim of exact pixel-level equivalence.
