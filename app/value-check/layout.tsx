import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Device Value Check",
  robots: { index: false, follow: false },
};

export default function ValueCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
