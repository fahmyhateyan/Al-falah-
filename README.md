# Al-Falah School, Kikambala – website

The public website for Al-Falah, a school and care initiative for orphaned and needy boys in Kikambala, coastal Kenya.

Built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS**. Payments use a pluggable provider
boundary (demo by default, Stripe Checkout ready). There is no database requirement for review.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional – the site runs without it, in demo mode
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

Checks:

```bash
npm run typecheck   # TypeScript
npm test            # unit tests: pricing, validation, webhook signature + idempotency
npm run build       # full production build
```

## Pages

| URL | Page |
| --- | --- |
| `/` | Home (hero → school video → about → provision → sponsorship → curriculum → school life → trust → FAQ → giving) |
| `/about` | Our story, founders, mission, the trust, education |
| `/curriculum` | Islamic curriculum (Ta'lim + Tahfidh) and Kenyan CBE curriculum |
| `/sponsor-a-child` | $100/month sponsorship with quantity selector and consent |
| `/donate` | One-off / monthly general donations |
| `/school-life` | Photo gallery |
| `/contact` | Enquiry form |
| `/privacy`, `/terms`, `/safeguarding` | Policy page structures (marked as drafts until approved) |
| `/checkout/demo`, `/checkout/success`, `/checkout/cancelled` | Checkout return pages (not indexed) |

## Where things live

| What | File |
| --- | --- |
| **All facts** (name, founders, $100 price, trust, contacts, socials, bank details) | `src/config/site.ts` |
| **All photos, gallery and the school video** | `src/config/media.ts` → see [docs/ASSETS.md](docs/ASSETS.md) |
| Curriculum content | `src/content/curriculum.ts` |
| FAQ answers | `src/content/faq.tsx` |
| Payment logic | `src/lib/payments/` → see [docs/PAYMENTS.md](docs/PAYMENTS.md) |
| Validation and pricing | `src/lib/validation.ts`, `src/lib/pricing.ts` |
| Pages | `src/app/**/page.tsx` |
| Reusable components | `src/components/` |

## Documentation

- [docs/CONFIGURATION.md](docs/CONFIGURATION.md) – changing facts, the sponsorship price, contacts and policies
- [docs/ASSETS.md](docs/ASSETS.md) – adding photographs, the gallery and the school video
- [docs/PAYMENTS.md](docs/PAYMENTS.md) – connecting Stripe, M-Pesa/bank options, staff workflow
- [docs/PRELAUNCH-CHECKLIST.md](docs/PRELAUNCH-CHECKLIST.md) – facts, approvals, credentials and policies still needed
- [docs/CONTENT-STATUS.md](docs/CONTENT-STATUS.md) – which content is verified and which is draft/placeholder

## Deployment

Any Node.js host works (Vercel, Render, Railway, a VPS). Set the environment variables from `.env.example`.
On serverless hosts the local JSON payment store is not persistent – replace it with a database before taking live
payments (see docs/PAYMENTS.md).
