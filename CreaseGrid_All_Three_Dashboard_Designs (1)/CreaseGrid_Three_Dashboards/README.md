# CreaseGrid — Three Dashboard UI/UX Design Package

## Open first

Open `index.html` to view the design gallery and enter all three dashboard prototypes. Each page also links to the other dashboard roles in the left-hand sidebar.

To preview with a web server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000/index.html`.

## Included designs

| Role | HTML prototype | Desktop PNG | Mobile PNG |
|---|---|---|---|
| Super Admin | `admin.html` | `screens/desktop/admin_desktop.png` | `screens/mobile/admin_mobile.png` |
| Tournament Organizer | `organizer.html` | `screens/desktop/organizer_desktop.png` | `screens/mobile/organizer_mobile.png` |
| Cricket Fan / User | `user.html` | `screens/desktop/user_desktop.png` | `screens/mobile/user_mobile.png` |

`/screens/full_page/` contains one full-page desktop and one full-page mobile PNG per dashboard. `PREVIEW_ALL_DASHBOARDS.jpg` is a combined visual board.

## Design choices

- Global cricket platform, developed in Pakistan; clean, international visual identity.
- White and cool gray background, deep navy sidebar, cobalt blue action accents, restrained color for status indicators.
- Information-first, not image-heavy; no stock photos or oversized banners.
- Distinct roles and page hierarchies rather than three identical KPI-grid mockups.
- Mobile layouts at 390px and desktop at 1600px, with responsive bottom navigation.
- Latest cricket news is prominent on the fan dashboard. News headlines are text-focused and there is a View All News entry point.

## Frontend and interactions

`dashboard.css` defines responsive tokens and components. `dashboard.js` provides inline SVG icon rendering, role switch navigation, demo modals, toast feedback, tab selection, checkboxes and match follow control. This is a **design prototype**, not a working backend.

## Accuracy

All statistics, news, matches, rankings, usage metrics and tournament data are *illustrative*, not current or verified. Live scoring, editorial publishing, subscriptions, search and account management require production APIs, authentication, validation and role-based permissions.

## Quality checks

See `QA_RESULTS.json` for desktop/mobile rendering checks; there were no JavaScript page errors or viewport-level horizontal overflows in the six checked views.
