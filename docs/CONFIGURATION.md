# Configuration

Everything the website states about Al-Falah comes from **`src/config/site.ts`**. Change a value there and it updates
everywhere. Values marked `null` are hidden from the site until filled in – never put placeholder text in them.

| Setting | What it controls |
| --- | --- |
| `name`, `fullName`, `tagline` | School name in the header, footer, page titles and metadata |
| `foundedYear` | "Established in 2024" wherever it appears |
| `location` | General location text. `publicAddress` and `mapEmbedUrl` stay `null` until an address is approved |
| `founders` | Founder names (and optional role, bio and photo slot) on Home and About |
| `sponsorship.monthlyAmount` | **The sponsorship price.** All totals ($100, $200 for two…), labels, FAQs and checkout amounts derive from it |
| `sponsorship.maxChildrenPerCheckout` | Maximum children in one sponsorship (default 10) |
| `sponsorship.allowOneMonthSupport` | Shows/hides the one-off "Support one month" option |
| `sponsorship.pairingProcessConfirmed` | Set `true` once the pairing/updates process is approved (removes "we are finalising" wording) |
| `donations.suggestedAmounts`, `minAmount`, `maxAmount`, `allowMonthly` | Donation form options and validation |
| `donations.funds` | Only `general` is enabled. Add restricted funds with `enabled: false` until their purpose and handling policy are confirmed |
| `trust.*` | Trust wording, registration details, objects, trustees (hidden by default), governance text, optional redacted document link |
| `contact.email`, `phone`, `whatsapp` | Shown in the footer and Contact page only once set |
| `social.*` | Social links, shown only once set |
| `manualGiving` | Bank and M-Pesa details. Shown only when filled in **and** `verified: true` |
| `policies.*Approved` | Set `true` when final policy text is approved – removes the "Draft" banner |

Curriculum details (current classes, routine, Qur'an approach, progress reporting) are in
`src/content/curriculum.ts` → `curriculumDetails`. FAQ answers are in `src/content/faq.tsx`.

## Environment variables

See `.env.example`. Secrets (Stripe keys, email API key) go only in environment variables, never in code.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live site URL (sitemap, social previews, payment return URLs) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only on the live site. Otherwise robots.txt blocks search engines (safe for review sites) |
| `PAYMENT_PROVIDER` | `demo` or `stripe` |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe credentials |
| `DATA_DIR` | Private, persistent folder for payment records |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery. Until set, the form clearly says the message was **not** sent |

## Analytics and cookies

No analytics or advertising scripts are included. If you add analytics later, add a consent banner first and
update the privacy policy.
