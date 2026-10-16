# BVC VendorOS — Event Profitability

Live app: https://julio-alfredo.github.io/vendorOSdemo/

React + TypeScript + Vite + Recharts, with custom responsive CSS. No backend, paid services, or API keys. The original uploaded MVP is preserved unchanged in `bvc-vendoros-mvp.zip` and extracted to `legacy/index.html`; its storage key is separate.

## Download and use — no setup

**[Download VendorOS.html](https://github.com/Julio-Alfredo/vendorOSdemo/raw/refs/heads/main/downloads/VendorOS.html)** · **[Download page](https://julio-alfredo.github.io/vendorOSdemo/downloads/)**

1. Download `VendorOS.html` and keep it in a permanent folder.
2. Open it with a desktop browser such as Chrome, Edge, Firefox, or Safari. No Node, terminal, server, or installation is needed.
3. Use **Backup → Export JSON backup** after each session. Import that backup to restore or move your data.

All code, styles, and charts are inside the file, so calculations and event tracking work offline. Local-file storage depends on the browser and file location; moving or renaming the file may make previous entries unavailable. The app warns when storage is unavailable. Keep JSON backups separate from the app file. Opening the cloud link requires internet; local entries are not automatically uploaded.

**On iPhone/iPad:** use the [live app](https://julio-alfredo.github.io/vendorOSdemo/) in Safari. Downloaded HTML may open as a Files preview rather than a working browser app. For convenient access, use Safari’s Share → Add to Home Screen. This is a web app, not an App Store or native installer.

Optional account storage: [cloud dashboard](https://bvc-event-profit.solarmink3.chatgpt.site/). Export local data first, sign in, then import it there.

Developers: `npm run build:download` regenerates the standalone file; `npm run test:download` checks it launches from local-file and web URLs. Rebuild it after changing application code.

## Development

Use Node 24+. Run `npm ci`, `npm test`, `node tests/ui.test.mjs`, and `npm run build`.
The editable HTML entry is `app.html`. The build produces the committed root `index.html` and `assets/` for GitHub Pages main-branch/root publishing. Do not edit generated files. Navigation uses internal state, avoiding subpath routing failures. All asset URLs are relative.

## Features

Event planning, configurable recommendations, three transaction scenarios, fixed/variable costs, break-even, ROI, owner-time profitability, actual results, searchable/filterable/sortable history, three-event comparison, duplication, event and monthly charts, date-aware annual projections, financial goals, realistic removable samples, local persistence, validated JSON backup/restore.

## Financial conventions

- Transaction revenue = rounded transactions × average sale. Conversion mode = attendance × vendor-specific conversion rate.
- Product costs are a percentage of transaction revenue. Packaging and flat processing costs are per transaction. Percentage processing applies to all revenue, including additional revenue.
- Fixed costs include booth, travel, employee wages × combined employee hours, rental, and other costs.
- Scenarios change transaction counts by ±25%, keeping fixed costs, rates, and additional revenue constant.
- Return on costs = profit / total event costs. Undefined ratios display unavailable.
- Break-even transactions = rounded-up fixed costs less net extra revenue, divided by contribution per transaction. Nonpositive contribution is marked not reachable.
- Hours are owner work hours including preparation and travel. Employee labor is an expense; owner wages are only deducted if entered as an expense.
- Annual results count completed events dated this year through today. Forecast adds confirmed events dated today onward this year. Opportunities and overdue confirmations are excluded. Optional hypothetical events use actual average profit and are additional to bookings.
- Calendar pace counts elapsed days using UTC date arithmetic to avoid daylight-saving-hour distortion. The browser's local calendar date determines today.
- Operating profit excludes taxes, owner distributions and overhead not allocated to events.

## Data

Browser key: `bvc.event-profit.v1`. Data is specific to the browser and origin. Back up regularly. Import validates schema and replaces data only after confirmation. Existing legacy data is not migrated automatically. Pure models in `src/model.ts` are separate from UI/persistence to support a future cloud adapter.

## Verification

Financial and forecast assertions, malformed backup rejection, JSON round-trip, and DOM interaction tests pass. DOM tests cover create/edit/delete/duplicate, search/filter, results, goal updates, export/import, and remounting with saved local storage. JSDOM does not render layouts or charts. Actual Safari/iPhone layout, touch behavior, browser download UX, and live browser interaction require a real-browser check; they have not been claimed as tested.

## Navy/teal redesign and optional cloud accounts

The event planner now guides users through four steps. The guest dashboard stays on GitHub Pages, preserves the original browser storage, and links to https://bvc-event-profit.solarmink3.chatgpt.site/ for optional cloud saving using ChatGPT sign-in. Export a JSON backup from the guest site and import it after signing into the cloud workspace. Trial users need no account.

Cloud hosting runs a separate server-backed Sites build with a D1 database. The shared handler in `src/cloud-api.ts` is tested with SQLite in `tests/cloud-api.test.ts`; it requires a server-supplied identity, enforces origin checks, and uses atomic revisions to reject stale writes. GitHub Pages does not run server endpoints. Cloud saves occur when saving an event, results, goals, or an import; unfinished form input is not auto-saved. Browser recovery copies are isolated by account. Sign-in and live cross-device behavior still require account-level verification.

Additional tests: `node tests/cloud-ui.test.mjs` and `node --import tsx tests/cloud-api.test.ts`.
