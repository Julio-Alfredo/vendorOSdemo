# Cloudflare purchase launch

The pilot stays at `/`; the sales page is `/buy`, purchase access `/purchase`,
terms `/terms`, purchased app `/starter`. No paid domain or email provider is
required. Automated email is optional; recovery assistance is manual initially.
Do not turn on live sales before a full sandbox payment and delivery test.

## Deployment
Use the existing Pages project connected to main. Framework: None.
Build: `npm run build && cp index.html sw.js dist/`. Output: `dist`.
Functions are compiled by Pages from the repository's `functions/` directory.
The generated paid HTML is bundled server-side, not copied into dist.
No keys belong in the repository or client JavaScript.

## Runtime setup
1. Create a D1 database named `vendoros-purchases` on the free tier.
2. Execute `migrations/0001_commerce.sql` in its SQL console (once).
3. Bind it to this Pages project as `DB`, production and a separate test
   database for sandbox/preview use. Do not mix live and test purchase records.
4. Configure runtime variables/secrets below and redeploy.

Variables:
- PUBLIC_ORIGIN: https://vendor-os-mk1.pages.dev
- SALES_ENABLED: false (keep false until tested)
- STRIPE_LIVE: true for live; false for sandbox
- STRIPE_PRICE_ID: price_1US0UGISvN3g2xp9r3et4mUW for live; sandbox price for tests

Encrypted secrets:
- STRIPE_SECRET_KEY: restricted Stripe key; Checkout Sessions Write,
  Prices Read, Products Read. Verify actual permissions in sandbox.
- STRIPE_WEBHOOK_SECRET: signing secret for this endpoint, matching mode.
- PURCHASE_TOKEN_SECRET: unique password-manager-generated random secret,
  at least 32 random bytes. Changing it invalidates old access links.

Register Stripe webhook URL:
https://vendor-os-mk1.pages.dev/api/commerce/webhook
Events: checkout.session.completed, checkout.session.async_payment_succeeded.
The signed webhook verifies payment against Stripe and records access once.
Checkout return independently invokes the same idempotent fulfillment path.
Both require exact $29 USD, configured price, edition, quantity and live/test mode.

For a separate sandbox deployment, use that deployment's exact origin, sandbox
price/key/webhook, separate D1 binding, and SALES_ENABLED=true only there.
Complete a real sandbox Checkout, confirm the signed webhook, paid download,
unpaid rejection, recovery link, and iPhone install/offline use before live sales.
Do not enter test card details in live mode.

## Delivery / recovery
After paid verification, the buyer sees the app/download and a signed private
recovery link. It contains no financial event records. Save the link privately.
Optional RESEND_API_KEY and MAIL_FROM enable the existing email adapter later.
Without them, no automated purchase email is promised. For a lost link, owner
must verify the request against Stripe, confirm payment and purchaser identity,
then restore access; never grant access merely because someone knows an email.
Downloaded files are not DRM protected and cannot be remotely revoked.

## Verification performed
Production Vite build; ten backend tests with mocked Stripe/email and real
in-memory SQLite; Starter setup/storage/launch tests; Pages functions compilation.
No actual Stripe Checkout or physical iPhone test has been completed for this
Cloudflare purchase flow. Live sales remain disabled until runtime configuration
and end-to-end tests are complete. Rate limiting requires the D1 binding/schema.
