# BVC VendorOS — Event Profitability

Live app: https://julio-alfredo.github.io/vendorOSdemo/

React + TypeScript + Vite + Recharts, with custom responsive CSS. No backend, paid services, or API keys. The original uploaded MVP is preserved unchanged in `bvc-vendoros-mvp.zip` and extracted to `legacy/index.html`; its storage key is separate.

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
