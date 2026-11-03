# Instructions for Codex / coding agents — CreaseGrid

You are working in the premium frontend rebuild. The user has already rejected a previous collection of 145 shallow and inconsistent screen templates. **Do not revert the UI to generic cards or attempt to mass-generate hundreds of nearly identical pages.**

## Read first

1. `README.md` — what currently works and what does not.
2. `reference/approved_nine_screen_design_direction.png` — approved visual hierarchy, colors and page coverage.
3. `styles.css` — design tokens and responsive implementation.
4. `app.js` — prototype routing, sample data and state flows.
5. `docs/FULL_MASTER_PRD.md` — future production requirements (23 modules and all backlog tools).
6. `docs/BUILD_STATUS_AND_GAPS.md` — technical debt and next phases.

## Non-negotiable design requirements

- White surfaces, ink navy, restrained cobalt blue, subtle orange accents. Do not return to green-heavy visuals.
- The homepage MUST display **Latest Cricket News** with a **More news** link to `#/news`, and article headlines MUST open the corresponding article pages.
- Dedicated News & Analysis MUST stay readable and mostly text-led, with filters/search and limited imagery.
- Pages MUST look unique by purpose (scoreboard is not an article, calculator is not a news listing, organizer scoring is not fan dashboard).
- Images should support the content, not dominate every card. Preserve visual consistency with the approved direction.
- Test the actual **browser** at desktop and mobile dimensions after every design change; screenshots trump assertions based solely on CSS or source code.

## Non-negotiable data requirements

- Current demo data is NOT real; keep a visible demo disclaimer until licensed live/historical feeds are connected.
- Use legal balls for cricket calculations. 17.4 overs equals 106 legal balls, not 17.4 decimal overs; reject impossible notation such as 17.6.
- Bowling figures, cumulative NRR, all-out treatment and tie-break rules must be explicitly verified against the specific governing competition rules.
- Do not present simplified DLS calculations as official.
- Do not invent player records, headlines or live match statuses in production.
- When building professional data pages, use a data provenance model, freshness labels and source rights.

## Recommended production implementation plan

1. Convert hash-routed templates into **Next.js App Router + TypeScript** components and meaningful URL routes. Preserve pixel-level layouts where possible.
2. Extract cricket mathematics into a separately tested library with pure functions and fixtures.
3. Add **Supabase/PostgreSQL**, row-level authorization, real identity, organization membership, audits and migrations.
4. Implement the editorial CMS with authors, draft-review-publish state, citation/source fields, correction history and scheduled publication.
5. Connect properly licensed fixture, score, player and tournament data. Display reliable freshness and coverage gaps.
6. Implement robust multi-user scoring, match state machine, legal deliveries, extras, dismissal types, score revisions, sync/conflict handling and audit trails.
7. Replace demonstration scorecards and UI metrics with validated data.
8. Add web performance / Core Web Vitals work, structured data, sitemaps, multilingual routing and real analytics.
9. Prioritize the P1 backlog of the PRD before advanced AI, paid live feeds, communities or 145 route expansion.

## Validation gate

- Run both scripts in `tests/`. Keep zero runtime errors and horizontal overflows.
- Add regression tests for every new calculator, organizer action or scoring rule.
- Compare new browser captures against the golden screenshots in `screens/` and the approved direction.
- No deceptive fully-functional claims: label stub/demos until actual end-to-end backend is completed.
