import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions governing purchases, repairs, and use of the HatPhones website.",
  alternates: { canonical: "https://www.hatphones.ca/terms/" },
  openGraph: {
    url: "https://www.hatphones.ca/terms/",
    title: "Terms & Conditions | HatPhones",
    description: "Read the terms and conditions governing purchases, repairs, and use of the HatPhones website.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
