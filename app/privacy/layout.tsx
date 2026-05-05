import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how HatPhones collects, uses, and protects your personal information.",
  alternates: { canonical: "https://www.hatphones.ca/privacy/" },
  openGraph: {
    url: "https://www.hatphones.ca/privacy/",
    title: "Privacy Policy | HatPhones",
    description: "Learn how HatPhones collects, uses, and protects your personal information.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
