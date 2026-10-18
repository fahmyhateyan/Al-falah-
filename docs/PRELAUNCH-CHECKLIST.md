# Pre-launch checklist

The site is complete and reviewable without these items. Each one must be resolved, or consciously left hidden,
before public launch. Settings referenced are in `src/config/site.ts` unless stated.

## 1. Names and facts to confirm

- [x] **Founders' public names** confirmed by the owner: **Dr Fuwad Abdallah Alnahdi** and **Dr Durra Said Sherman**.
      Note: these differ from the trustee names on the registered documents (Fuad Abdallah Mohamed; Durra F Abdallah),
      so the trustee list stays hidden unless you choose to publish it as registered.
- [ ] Founder roles, short biographies and photos (optional) – none invented.
- [ ] Preferred public name: "Al-Falah School, Kikambala" (logo) vs "Al-Falah Boys School, Kikambala" (curriculum document).
- [ ] Public address and map (currently "Kikambala, coastal Kenya, near Mombasa" only).
- [ ] Contact email, phone, WhatsApp and social media links (all hidden until supplied).
- [ ] Which curriculum levels/classes currently run. The supplied outline spans Pre-Primary to Senior School;
      the brief describes primary education. The curriculum page presents the outline as the school's pathway without
      claiming every level is running now (`src/content/curriculum.ts` → `curriculumDetails`).
- [ ] Daily routine, Qur'an memorisation approach, class groups and progress reporting (optional editable areas).

## 2. The trust

From the supplied **Certificate of Incorporation** (Trustees (Perpetual Succession) Act, Cap. 164) and **Trust Deed**:

| Item | Supplied value | Published? |
| --- | --- | --- |
| Registered name | "Al Falah Charitable Trust Deed" | Yes |
| Registration no. / date | TPS-AJCJPAB, 17 September 2026 | Yes |
| Trust deed date | 23 June 2026 | No (config only) |
| Objects (clause 4) | "Raise funds to educate needy/orphaned children" | Yes (paraphrased) |
| Trustees | Fuad Abdallah Mohamed; Durra F Abdallah | **No** – `publishTrustees: false` until spellings confirmed |

- [ ] Confirm you are happy for the registered name and registration number to be published (`publishRegistration`).
- [ ] **Possible scope mismatch to review:** the trust deed's only stated object is education ("raise funds to educate
      needy/orphaned children"), while the website asks for gifts towards boarding, food and care as well. Please confirm
      with your advocate that welfare costs fall within the trust's objects, or that another body receives those funds.
- [ ] Relationship between the trust and the school, and governance responsibilities (`trust.relationshipToSchool`, `trust.governance`).
- [ ] Whether to publish a **redacted** copy of the certificate. The supplied scans contain signatures, personal
      postal addresses and an ID-linked stamp reference and have **not** been published. Redact before adding to `trust.publishedDocument`.
- [ ] Note: the site makes no claims about tax exemption, UK charity registration, Gift Aid, US tax deductibility,
      audits or a 100% donations policy. Add any only with evidence.

## 3. Media

- [x] School photographs supplied (14) and placed in every slot and the gallery.
- [ ] Confirm consent arrangements cover publishing these photos – several show boys' faces clearly.
- [ ] School video (MP4 or YouTube/Vimeo) with captions, and a poster frame.
- [ ] Higher-resolution or vector logo (the supplied JPG was cropped and used intact).
- [ ] Written confirmation that published photos are approved for public use under the school's consent arrangements.

## 4. Payments and email

- [ ] Choose a payment provider the trust can actually use (Stripe if available to the entity; otherwise e.g. Paystack, Flutterwave, Pesapal, Daraja for M-Pesa).
- [ ] Provider credentials, webhook secret, and full sandbox test (see `docs/PAYMENTS.md`).
- [ ] Persistent database for payment records if hosting serverless.
- [ ] Payment confirmation emails enabled in the provider.
- [ ] Cancellation method (staff-handled or provider portal) – FAQ and terms currently say "contact us".
- [ ] Bank transfer / M-Pesa Paybill details, verified (`manualGiving`).
- [ ] Contact form email service: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified sending domain).

## 5. Sponsorship process

- [ ] Approve the pairing process (then set `sponsorship.pairingProcessConfirmed: true`).
- [ ] Decide update frequency and format; update the FAQ and terms wording.
- [ ] Confirm whether "Support one month" (one-off $100) should be offered (`allowOneMonthSupport`).
- [ ] Confirm the $100 amount and maximum children per sponsorship.

## 6. Policies (draft banners shown until approved)

- [ ] Privacy policy – retention periods, data controller details, rights process (`policies.privacyApproved`).
- [ ] Donation & sponsorship terms – refunds, cancellation, use of funds (`policies.termsApproved`).
- [ ] Safeguarding – designated safeguarding contact, visitor arrangements, staff vetting (`policies.safeguardingApproved`).

## 7. Go-live

- [ ] Domain and hosting; set `NEXT_PUBLIC_SITE_URL`.
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the live site only (robots.txt blocks indexing until then).
- [ ] Final read-through of all copy by the owner.
