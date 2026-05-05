import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";

export const metadata: Metadata = {
  title: "Same-Day Phone Repair in Medicine Hat",
  description:
    "Fast, affordable phone and tablet repair in Medicine Hat, AB. Screen replacements, battery swaps, charging ports, and more. Book online with HatPhones.",
  alternates: { canonical: "https://www.hatphones.ca/repair" },
  openGraph: {
    url: "https://www.hatphones.ca/repair",
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
  provider: { "@type": "LocalBusiness", name: "HatPhones", url: "https://www.hatphones.ca" },
  areaServed: "Medicine Hat, AB",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Repair Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Screen Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Battery Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Back Glass Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Charging Port Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Camera Repair" } },
    ],
  },
};

export default function RepairLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={repairServiceSchema} />
      {children}
    </>
  );
}
