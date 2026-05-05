import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const metadata: Metadata = {
  title: "Same-Day Phone Repair in Medicine Hat",
  description:
    "Fast, affordable phone and tablet repair in Medicine Hat, AB. Screen replacements, battery swaps, charging ports, and more. Book online with HatPhones.",
  alternates: { canonical: "https://www.hatphones.ca/repair/" },
  openGraph: {
    url: "https://www.hatphones.ca/repair/",
    title: "Same-Day Phone Repair in Medicine Hat | HatPhones",
    description:
      "Fast, affordable phone and tablet repair in Medicine Hat, AB. Screen replacements, battery swaps, charging ports, and more.",
    images: [{ url: "/og-image-repair.png", width: 1200, height: 630, alt: "Same-Day Phone Repair in Medicine Hat — HatPhones" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image-repair.png"],
  },
};

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Phone Repair",
  name: "Phone & Tablet Repair — HatPhones",
  description: "Same-day phone and tablet repair in Medicine Hat, AB. Screen replacement, battery swap, charging port repair, camera fix, and water damage assessment.",
  url: "https://www.hatphones.ca/repair/",
  provider: {
    "@type": "LocalBusiness",
    name: "HatPhones",
    url: "https://www.hatphones.ca",
    telephone: "+14039570532",
    address: {
      "@type": "PostalAddress",
      streetAddress: "516 3rd St SE",
      addressLocality: "Medicine Hat",
      addressRegion: "AB",
      postalCode: "T1A 0H2",
      addressCountry: "CA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "212",
      bestRating: "5",
    },
  },
  areaServed: { "@type": "City", name: "Medicine Hat", containedInPlace: { "@type": "State", name: "Alberta" } },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Phone Repair Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Screen Replacement", description: "iPhone and Android screen replacement. Most repairs completed in 45–90 minutes." },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "79", maxPrice: "300", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Battery Replacement", description: "iPhone and Android battery replacement. Completed in 30–60 minutes." },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "55", maxPrice: "150", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Charging Port Repair", description: "Fix charging port issues on iPhones and Android devices. Completed in 45–75 minutes." },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "49", maxPrice: "79", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Camera & Audio Repair", description: "Camera and speaker/mic repair for iPhones and Android devices." },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "69", maxPrice: "119", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Back Glass Replacement", description: "iPhone back glass replacement." },
        priceSpecification: { "@type": "PriceSpecification", minPrice: "100", maxPrice: "180", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Water Damage Assessment & Repair", description: "Water damage diagnostics and repair. Free assessment — bring it in as soon as possible." },
        priceSpecification: { "@type": "PriceSpecification", price: "0", priceCurrency: "CAD" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "General Diagnostics", description: "Free device diagnostic. No commitment required." },
        priceSpecification: { "@type": "PriceSpecification", price: "0", priceCurrency: "CAD" },
      },
    ],
  },
};

const repairFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How long does a screen repair take?", acceptedAnswer: { "@type": "Answer", text: "Most iPhone and Samsung screen replacements are completed in 45 to 90 minutes while you wait. We'll give you an accurate time estimate when you drop off your device." } },
    { "@type": "Question", name: "Do you use original or aftermarket parts?", acceptedAnswer: { "@type": "Answer", text: "We use high-quality parts for all repairs. For screen replacements we offer both OEM-grade and original options depending on the model — we'll walk you through the difference and let you choose." } },
    { "@type": "Question", name: "Is there a diagnostic fee?", acceptedAnswer: { "@type": "Answer", text: "No — diagnostics are free at HatPhones. Bring your device in and we'll assess the issue at no cost before you commit to any repair." } },
    { "@type": "Question", name: "Do you fix water-damaged phones?", acceptedAnswer: { "@type": "Answer", text: "Yes, we do water damage assessments and repairs. Results depend on the extent of the damage, but bring it in as soon as possible — the sooner we look at it, the better the chances of recovery." } },
    { "@type": "Question", name: "Do repairs come with a warranty?", acceptedAnswer: { "@type": "Answer", text: "Yes. All repairs at HatPhones come with a 90-day service warranty. If the same issue comes back within that period, we'll fix it at no charge." } },
    { "@type": "Question", name: "Do I need an appointment for a repair?", acceptedAnswer: { "@type": "Answer", text: "Walk-ins are welcome, but booking an appointment through our website guarantees your time slot. Most walk-ins are accommodated the same day during store hours: Monday to Friday 10 AM–6 PM, Saturday 11 AM–6 PM." } },
  ],
};

export default function RepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={repairServiceSchema} />
      <StructuredData data={repairFAQSchema} />
      {children}
    </>
  );
}
