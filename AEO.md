# AEO Implementation Plan — hatphones.ca

**AEO (Answer Engine Optimization)** = optimizing the site so LLMs (ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini) cite hatphones.ca when users ask phone-related questions about Medicine Hat.

Traditional SEO ranks pages on a SERP. AEO makes the content the **source an LLM quotes**. LLMs prefer content that is:
- Structured as direct Q&A
- Factually self-contained (no "click here for prices")
- Marked up with schema they can parse cheaply
- Crawlable by their bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)

The SEO pass already established the base (LocalBusiness schema, sitemap, clean metadata). AEO builds on top.

---

## Phase 1 — Allow AI crawlers (5 min)

Update `app/robots.ts` to **explicitly allow** AI crawlers:
- `GPTBot` (OpenAI training)
- `OAI-SearchBot` (ChatGPT search)
- `ClaudeBot` (Anthropic)
- `PerplexityBot`
- `Google-Extended` (Gemini / AI Overviews training)
- `Applebot-Extended` (Apple Intelligence)
- `Bytespider` (ByteDance / Doubao)

Keep `/api/` and `/value-check` disallowed for all bots.

**Files:** `app/robots.ts`

---

## Phase 2 — FAQ pages with FAQPage schema (highest ROI)

LLMs disproportionately cite content marked with `FAQPage` JSON-LD. Add a visible FAQ accordion + matching JSON-LD to each main page.

- **Home** — 5–8 general FAQs
  - "Do you buy broken phones?"
  - "How long does a phone repair take?"
  - "Do you offer warranty on used phones?"
  - "Where are you located in Medicine Hat?"
- **Buy** — "Are your phones unlocked?", "What warranty comes with used phones?", "Do you accept trade-ins?"
- **Sell** — "How do I get a quote?", "Do you buy phones with cracked screens?", "How fast do I get paid?", "What ID do I need?"
- **Repair** — "How long does a screen repair take?", "Do you use original parts?", "Is there a diagnostic fee?", "Do you fix water damage?"

Rules for answers:
- 40–80 words each
- Self-contained (no "see our pricing page")
- Factual, specific to Medicine Hat where relevant

**Files:** `app/page.tsx`, `app/buy/page.tsx`, `app/sell/page.tsx`, `app/repair/page.tsx`, new `app/components/FAQ.tsx`

---

## Phase 3 — Expand structured data

Add to the existing schema base:
- **Product** schema for each buy listing (model, price, condition: `"Refurbished"`, brand, availability)
- **Service** schema with `hasOfferCatalog` for each repair type (screen, battery, charging port) with prices
- **Review** / **AggregateRating** sourced from Google reviews
- **Speakable** schema on FAQ answers (voice assistant hint)
- **HowTo** schema for "How to sell your phone" — numbered steps

**Files:** `app/buy/page.tsx`, `app/repair/layout.tsx`, `app/sell/layout.tsx`, `app/components/StructuredData.tsx`

---

## Phase 4 — Content rewrites for "answerability"

LLMs extract better when pages follow this pattern:
- **First sentence answers the page's implicit question.**
  Example: "HatPhones buys, sells, and repairs phones in Medicine Hat, AB, with same-day repair on most models."
- **Short paragraphs** (2–3 sentences max), not marketing prose
- **Definition-style sentences**: "A certified pre-owned phone is a used device that has been..."
- **Local specificity**: postal code, neighborhoods, drive distance from Brooks / Redcliff / Dunmore
- **Pricing transparency**: price ranges beat "contact us"

Needs user input on copy + actual pricing data.

**Files:** `app/page.tsx`, `app/buy/page.tsx`, `app/sell/page.tsx`, `app/repair/page.tsx`

---

## Phase 5 — `llms.txt` file

Emerging convention (proposed by Jeremy Howard; adopted by Anthropic, Mintlify, and others). A markdown summary of the site placed at `/llms.txt` — cheap, low-risk, increasingly respected by AI crawlers.

```
# HatPhones
Medicine Hat, AB phone shop: buy certified pre-owned, sell your device, same-day repair.

## Services
- /buy — Used phones with warranty
- /sell — Instant quotes, paid same day
- /repair — Screen, battery, charging port

## Contact
516 3rd St SE, Medicine Hat, AB T1A 0H2
+1 403-957-0532
info@hatphones.ca
```

**Files:** `public/llms.txt` (new)

---

## Phase 6 — Off-page AEO signals (manual, user-driven)

LLMs are trained on the open web — citations elsewhere shape what they "know" about HatPhones.

- **Reddit** — answer r/MedicineHat questions about phone repair/sales naturally (no spam)
- **Quora** — answer "best phone repair in Medicine Hat" type questions
- **YouTube** — short walkthrough videos; transcripts get crawled
- **Local press / blog mentions** — earned media with consistent NAP
- **Wikidata** — entry for the business if notability supports it

---

## Recommended execution order

| Phase | Code? | Effort | Impact |
|-------|-------|--------|--------|
| 1 — AI crawler allow | Yes | 5 min | High |
| 2 — FAQ + FAQPage schema | Yes | 1–2 hr | **Highest** |
| 3 — Expanded structured data | Yes | 1 hr | High |
| 5 — llms.txt | Yes | 10 min | Medium |
| 4 — Content rewrites | Needs user copy | 2–3 hr | High |
| 6 — Off-page | User only | Ongoing | High over time |

**Start with Phases 1, 2, 5** — fastest wins. Then 3, then 4 once copy is ready.

---

## Known values (carry over from SEO.md)

- Domain: `https://www.hatphones.ca`
- Address: 516 3rd St SE, Medicine Hat, AB T1A 0H2
- Phone: +1 403-957-0532
- Email: info@hatphones.ca
- GA4 ID: `G-GPTYJ3ZGCD`
- Google review link: `https://g.page/r/CRX5AuYbGr1hEBM/review`

---

## Verification (after deploy)

- Visit `/robots.txt` → confirm AI bot allow rules present
- Visit `/llms.txt` → loads as plain text
- Test FAQ pages with [Google Rich Results Test](https://search.google.com/test/rich-results) → `FAQPage` detected
- Ask ChatGPT / Perplexity / Claude: "Where can I repair a phone in Medicine Hat?" — track if hatphones.ca is cited (re-test monthly)
- Schema validator: [validator.schema.org](https://validator.schema.org/)
