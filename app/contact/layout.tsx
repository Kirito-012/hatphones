import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact HatPhones in Medicine Hat, AB",
  description:
    "Get in touch with HatPhones in Medicine Hat, AB. Visit us at 516 3rd St SE, call +1 (403) 977-5164, or send a message online.",
  alternates: { canonical: "https://www.hatphones.ca/contact/" },
  openGraph: {
    url: "https://www.hatphones.ca/contact/",
    title: "Contact HatPhones in Medicine Hat, AB",
    description:
      "Get in touch with HatPhones in Medicine Hat, AB. Visit us at 516 3rd St SE or call +1 (403) 977-5164.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
