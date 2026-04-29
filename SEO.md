# SEO Implementation Plan — Hatphones (hatphones.ca)

## Context

Hatphones is a local e-commerce + service platform in Medicine Hat, Alberta, Canada. It offers three core services: buying certified pre-owned phones (Shopify-powered), selling devices (with a live valuation wizard), and booking phone/tablet repairs. The site is built with Next.js 15 (App Router, TypeScript). Currently, the site has essentially **zero SEO** — placeholder metadata from `create-next-app`, no sitemap, no robots.txt, no structured data, and no social tags. The goal is to implement best-in-class SEO so the site ranks for: "buy used phones Medicine Hat", "sell my phone Medicine Hat", and "phone repair Medicine Hat".

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `app/layout.tsx` | Rewrite root metadata |
| `app/page.tsx` | Add page-level metadata export |
| `app/buy/page.tsx` | Add page-level metadata export |
| `app/sell/page.tsx` | Add page-level metadata export |
| `app/repair/page.tsx` | Add page-level metadata export |
| `app/contact/page.tsx` | Add page-level metadata export |
| `app/value-check/page.tsx` | Add page-level metadata export (noindex) |
| `app/sitemap.ts` | **Create** — dynamic XML sitemap |
| `app/robots.ts` | **Create** — robots.txt rules |
| `app/opengraph-image.tsx` | **Create** — homepage OG image |
| `app/buy/opengraph-image.tsx` | **Create** — buy page OG image |
| `app/sell/opengraph-image.tsx` | **Create** — sell page OG image |
| `app/repair/opengraph-image.tsx` | **Create** — repair page OG image |
| `app/components/StructuredData.tsx` | **Create** — JSON-LD component |
| `app/components/GoogleAnalytics.tsx` | **Create** — GA4 + GSC script component |
| `.env.local` | Add GA_MEASUREMENT_ID |
| `TODO.md` | **Create** — tracks placeholder values to fill in |

---

## Phase 1 — Root Metadata & Per-Page Metadata

### 1.1 Root Layout (`app/layout.tsx`)

Replace the placeholder `metadata` object with a complete base metadata object using Next.js 15 Metadata API:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://hatphones.ca'),
  title: {
    default: 'Hatphones | Buy, Sell & Repair Phones in Medicine Hat, AB',
    template: '%s | Hatphones',
  },
  description: 'Medicine Hat\'s trusted source for certified pre-owned phones, instant device sell quotes, and same-day phone repair. Serving Medicine Hat, AB since [year].',
  keywords: ['buy used phones Medicine Hat', 'sell phone Medicine Hat', 'phone repair Medicine Hat', 'certified pre-owned phones Alberta', 'same-day phone repair Medicine Hat'],
  authors: [{ name: 'Hatphones', url: 'https://hatphones.ca' }],
  creator: 'Hatphones',
  publisher: 'Hatphones',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://hatphones.ca' },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://hatphones.ca',
    siteName: 'Hatphones',
    title: 'Hatphones | Buy, Sell & Repair Phones in Medicine Hat, AB',
    description: '...',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hatphones | Buy, Sell & Repair Phones in Medicine Hat',
    description: '...',
    site: '@hatphones', // update if different
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}
```

### 1.2 Per-Page Metadata

Each page exports its own `metadata` (or `generateMetadata`) object that overrides the root template via `title.template`:

| Page | Title | Description |
|------|-------|-------------|
| `/` | "Buy, Sell & Repair Phones in Medicine Hat" | Homepage pitch |
| `/buy` | "Buy Certified Pre-Owned Phones" | Shop CTAs, models listed |
| `/sell` | "Sell Your Phone — Get an Instant Quote" | Value check CTA |
| `/repair` | "Same-Day Phone Repair in Medicine Hat" | Services, booking CTA |
| `/contact` | "Contact Us" | Address, hours, form |
| `/value-check` | noindex (tool page, not a landing page) | — |

Each metadata object also includes `alternates: { canonical: 'https://hatphones.ca/[path]' }`.

---

## Phase 2 — Structured Data (JSON-LD)

Create `app/components/StructuredData.tsx` — a simple component that renders a `<script type="application/ld+json">` tag. Inject it in the root layout and per-page layouts.

### 2.1 LocalBusiness Schema (root layout)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectronicsStore"],
  "name": "Hatphones",
  "url": "https://hatphones.ca",
  "telephone": "+14039570532",
  "email": "info@hatphones.ca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "516 3rd St SE",
    "addressLocality": "Medicine Hat",
    "addressRegion": "AB",
    "postalCode": "T1A 0H2",
    "addressCountry": "CA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 50.0405, "longitude": -110.6760 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "11:00", "closes": "18:00" }
  ],
  "sameAs": ["REPLACE_WITH_GOOGLE_MAPS_URL"],
  "priceRange": "$$",
  "currenciesAccepted": "CAD",
  "paymentAccepted": "Cash, Credit Card",
  "areaServed": { "@type": "City", "name": "Medicine Hat" }
}
```

> **TODO:** Replace `REPLACE_WITH_GOOGLE_MAPS_URL` with the actual Google Maps URL from the Google Business Profile.

### 2.2 Service Schema (repair page)

Inject on `/repair`:
```json
{
  "@type": "Service",
  "serviceType": "Phone Repair",
  "provider": { "@type": "LocalBusiness", "name": "Hatphones" },
  "areaServed": "Medicine Hat, AB",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Repair Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Screen Replacement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Replacement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Back Glass Replacement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Charging Port Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Camera Repair" } }
    ]
  }
}
```

### 2.3 BreadcrumbList Schema (buy page)

Inject on `/buy`:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hatphones.ca" },
    { "@type": "ListItem", "position": 2, "name": "Buy Phones", "item": "https://hatphones.ca/buy" }
  ]
}
```

### 2.4 WebSite + SearchAction Schema (homepage)

Enables sitelinks search box in Google:
```json
{
  "@type": "WebSite",
  "url": "https://hatphones.ca",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hatphones.ca/buy?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## Phase 3 — Sitemap & Robots

### 3.1 `app/sitemap.ts`

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://hatphones.ca', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://hatphones.ca/buy', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://hatphones.ca/sell', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://hatphones.ca/repair', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://hatphones.ca/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    // /value-check excluded (noindex)
  ]
}
```

### 3.2 `app/robots.ts`

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/value-check'] },
    ],
    sitemap: 'https://hatphones.ca/sitemap.xml',
    host: 'https://hatphones.ca',
  }
}
```

---

## Phase 4 — Open Graph Images (4 branded images)

Use Next.js `ImageResponse` (from `next/og`) to generate branded OG images server-side. Each image: **1200×630px**. Use the indigo brand color scheme.

| File | Page | Content |
|------|------|---------|
| `app/opengraph-image.tsx` | `/` | Logo + tagline + "Medicine Hat's #1 Phone Store" |
| `app/buy/opengraph-image.tsx` | `/buy` | "Buy Certified Pre-Owned Phones" + device imagery |
| `app/sell/opengraph-image.tsx` | `/sell` | "Sell Your Phone — Get an Instant Quote" |
| `app/repair/opengraph-image.tsx` | `/repair` | "Same-Day Phone Repair" + service icons |

Each file exports `size`, `contentType`, and a default function using `ImageResponse`.

---

## Phase 5 — Google Analytics 4 + Search Console

### 5.1 `app/components/GoogleAnalytics.tsx`

Uses Next.js `<Script>` with `strategy="afterInteractive"`. Reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` from env.

Inject this component in `app/layout.tsx`.

### 5.2 Search Console Verification

```ts
verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
}
```

### 5.3 `.env.local` additions

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX        # TODO: replace with real ID
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=REPLACE_ME   # TODO: replace with real token
```

---

## Phase 6 — Technical SEO Hardening

### 6.1 Canonical Tags
Every `metadata` export includes `alternates.canonical` pointing to the absolute URL. Prevents duplicate content from `www` vs non-`www`.

### 6.2 `noindex` for Tool Pages
`/value-check` gets `robots: { index: false, follow: false }` — it's a wizard UI, not a content landing page.

### 6.3 Image `alt` Text Audit
Audit all `<Image>` and `<img>` tags across the codebase for descriptive `alt` attributes. Key pages: `/buy` product grid, `/repair` service images.

### 6.4 Heading Hierarchy Audit
Ensure exactly one `<h1>` per page with keyword-rich text, followed by logical `<h2>`/`<h3>` structure. Audit all 5 main pages.

### 6.5 Page Speed / Core Web Vitals
- All images use `next/image` with `width`/`height` set (prevents CLS).
- Add `priority` prop to above-the-fold hero images.
- Verify Lenis smooth scroll doesn't block LCP.

### 6.6 Favicon & Touch Icons
Ensure `public/favicon.ico`, `public/apple-touch-icon.png` (180×180), and `public/icon.png` (32×32) exist.

---

## Phase 7 — Off-Page / Non-Code Recommendations

Critical for local SEO — action items outside the codebase:

1. **Google Business Profile** ✅ Already live — ensure GBP description and services match website copy. Add store/device photos.
2. **NAP Consistency** — Name, Address, Phone must match exactly across the website, GBP, and all directory listings.
3. **Local Citations** — Submit to: Canada411, YellowPages.ca, Yelp, BBB, Foursquare.
4. **Google Reviews CTA** — Add a "Leave us a review" button on `/contact` linking to the GBP review URL.
5. **Submit Sitemap to GSC** — After deployment, submit `https://hatphones.ca/sitemap.xml` in Google Search Console.

---

## Known Values

- **Address**: 516 3rd St SE, Medicine Hat, AB, Canada
- **Phone**: +1 (403) 957-0532
- **Email**: info@hatphones.ca
- **Domain**: `hatphones.ca`
- **Store Hours**: Mon–Fri 10:00–18:00, Sat 11:00–18:00, Sun Closed
- **GA4 ID**: Placeholder `G-XXXXXXXXXX` — see TODO.md
- **GSC Token**: Placeholder `REPLACE_ME` — see TODO.md
- **Google Maps URL**: Needs to be pulled from Google Business Profile

---

## Verification Checklist

After implementation:
- [ ] `https://hatphones.ca/sitemap.xml` returns valid XML
- [ ] `https://hatphones.ca/robots.txt` returns correct rules
- [ ] Paste homepage URL into opengraph.xyz — OG image renders correctly
- [ ] Paste homepage into Google Rich Results Test — JSON-LD validates
- [ ] Submit sitemap in Google Search Console
- [ ] Run Lighthouse SEO audit on all 4 main pages — target score ≥ 95
- [ ] Verify GA4 receiving events in Realtime dashboard
- [ ] Replace all TODO placeholders in `.env.local`