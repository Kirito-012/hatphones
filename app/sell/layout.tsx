import type { Metadata } from "next";
import StructuredData from "../components/StructuredData";

const sellHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Sell Your Phone at HatPhones in Medicine Hat",
  description: "Sell your used phone or tablet at HatPhones in Medicine Hat, AB. Get paid the same day in cash or e-transfer.",
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Check Your Device Value",
      text: "Use our Value Check tool to get an instant estimate for your device based on model, condition, and storage.",
      url: "https://www.hatphones.ca/value-check/",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Bring Your Device In",
      text: "Drop into our store at 516 3rd St SE, Medicine Hat, AB. No appointment needed — walk-ins are always welcome.",
      url: "https://www.hatphones.ca/sell/",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "We Inspect & Verify",
      text: "Our team does a quick in-person inspection to confirm condition. Transparent and straightforward, no surprises.",
      url: "https://www.hatphones.ca/sell/",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Get Paid Today",
      text: "Walk out with cash or Interac e-transfer — same day, every time. Fair market value, no lowball offers.",
      url: "https://www.hatphones.ca/sell/",
    },
  ],
};

const sellFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I get a quote for my phone?", acceptedAnswer: { "@type": "Answer", text: "Use our Value Check tool on the website to get an instant estimate based on your device model, storage, and condition. You can also call or text us and we'll give you a ballpark over the phone. Final offer is confirmed after a quick in-person inspection." } },
    { "@type": "Question", name: "Do you buy phones with cracked screens or damage?", acceptedAnswer: { "@type": "Answer", text: "It depends on the condition and model. Bring your device in and our team will inspect it on the spot — we'll let you know right away if it's something we can take and what we'd offer for it." } },
    { "@type": "Question", name: "How fast do I get paid?", acceptedAnswer: { "@type": "Answer", text: "Same day, every time. Once we inspect your device and agree on a price, you walk out with cash or an Interac e-transfer. There's no waiting period or delayed payment." } },
    { "@type": "Question", name: "What ID do I need to bring?", acceptedAnswer: { "@type": "Answer", text: "You'll need to bring a valid government-issued photo ID — a driver's licence or provincial ID works. This is required for all device purchases as part of our standard process." } },
    { "@type": "Question", name: "Do I need to erase my phone before coming in?", acceptedAnswer: { "@type": "Answer", text: "You don't have to — we wipe every device ourselves before processing. That said, backing up your data beforehand is always a good idea. We'll remove your accounts and personal information securely." } },
    { "@type": "Question", name: "Do I need an appointment to sell my phone?", acceptedAnswer: { "@type": "Answer", text: "No appointment needed. Walk-ins are always welcome during store hours: Monday to Friday 10 AM–6 PM, Saturday 11 AM–6 PM." } },
  ],
};

export const metadata: Metadata = {
  title: "Sell Your Phone — Get an Instant Quote",
  description:
    "Sell your used phone or tablet in Medicine Hat, AB. Get an instant valuation from HatPhones and walk away with cash the same day.",
  alternates: { canonical: "https://www.hatphones.ca/sell/" },
  openGraph: {
    url: "https://www.hatphones.ca/sell/",
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
  return (
    <>
      <StructuredData data={sellHowToSchema} />
      <StructuredData data={sellFAQSchema} />
      {children}
    </>
  );
}
