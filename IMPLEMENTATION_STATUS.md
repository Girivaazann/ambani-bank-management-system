# Ambani Bank UI — implementation status

Based on the original P650 portal. The protected files `src/LiveBank.jsx`, `src/live-api.js`, `src/amount.js`, and `src/cloudflare-config.js` are unchanged. Central Worker repo and API are untouched.

Added `src/components/AppShell.jsx`, `src/pages/BankPages.jsx`, and `src/api/api.js`. Only original source edit: `src/main.jsx` to mount the shell. Sign-in calls the existing Worker, then calls the separate bank `/api/me` to verify ADMIN/CUSTOMER. If `/api/me` is unavailable, sign-in cannot complete (no role bypass). The original LiveBank module retains its own sign-in session.

Customer screens have API-driven tables, request forms, and indicative deposit/loan calculators. Admin screens have API-driven tables and approval actions. Registration uses multipart upload. No financial data is fabricated. No Firebase SDK used in browser.

**Not finished:** This is an additive frontend scaffold, not a production banking system. The bank's Node/Express backend must implement the specified endpoints and security. Several workflows (statement downloads, complete card actions, schedule/prepayment, full registration document set, status tracking, notification read, audit/reports export) are not yet complete. API payloads beyond the brief require backend contract confirmation. Admin decisions and bank operations require backend authorization. No backend integration or end-to-end banking test has been performed.

**Build:** Attempted `npm install` in the execution environment but it timed out; `npm run build` could not be completed here. On Windows run `cd ambani-bank-main`, `npm.cmd install`, `npm.cmd run build`, `npm.cmd run dev`.

Set `VITE_BANK_API_URL` to the bank backend origin if it is on a different origin. Configure CORS appropriately. Do not place secrets in VITE variables. Existing Worker URL remains in cloudflare-config.js.
