import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Phone — Get an Instant Quote",
  description:
    "Sell your used phone or tablet in Medicine Hat, AB. Get an instant valuation from HatPhones and walk away with cash the same day.",
  alternates: { canonical: "https://www.hatphones.ca/sell" },
  openGraph: {
    url: "https://www.hatphones.ca/sell",
    title: "Sell Your Phone — Get an Instant Quote | HatPhones",
    description:
      "Get an instant valuation for your phone or tablet in Medicine Hat, AB. Walk away with cash the same day.",
    images: [{ url: "/og-image-sell.png", width: 1200, height: 630, alt: "Sell Your Phone — Get an Instant Quote at HatPhones" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image-sell.png"],
  },
};

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
