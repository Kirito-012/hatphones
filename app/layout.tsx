import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { SmoothScroll } from "./components/SmoothScroll";
import { CartProvider } from "./components/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import StructuredData from "./components/StructuredData";
import GoogleAnalytics from "./components/GoogleAnalytics";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectronicsStore"],
  name: "HatPhones",
  url: "https://www.hatphones.ca",
  telephone: "+14039570532",
  email: "info@hatphones.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "516 3rd St SE",
    addressLocality: "Medicine Hat",
    addressRegion: "AB",
    postalCode: "T1A 0H2",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 50.0405, longitude: -110.676 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "11:00", closes: "18:00" },
  ],
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card",
  areaServed: { "@type": "City", name: "Medicine Hat" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "212",
    bestRating: "5",
    worstRating: "1",
  },
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hatphones.ca"),
  title: {
    default: "HatPhones | Buy, Sell & Repair Phones in Medicine Hat, AB",
    template: "%s | HatPhones",
  },
  description:
    "Medicine Hat's trusted source for certified pre-owned phones, instant device sell quotes, and same-day phone repair. Serving Medicine Hat, AB.",
  keywords: [
    "buy used phones Medicine Hat",
    "sell phone Medicine Hat",
    "phone repair Medicine Hat",
    "certified pre-owned phones Alberta",
    "same-day phone repair Medicine Hat",
  ],
  authors: [{ name: "HatPhones", url: "https://www.hatphones.ca" }],
  creator: "HatPhones",
  publisher: "HatPhones",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://www.hatphones.ca" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.hatphones.ca",
    siteName: "HatPhones",
    title: "HatPhones | Buy, Sell & Repair Phones in Medicine Hat, AB",
    description:
      "Medicine Hat's trusted source for certified pre-owned phones, instant device sell quotes, and same-day phone repair.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HatPhones — Buy, Sell & Repair Phones in Medicine Hat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HatPhones | Buy, Sell & Repair Phones in Medicine Hat, AB",
    description:
      "Medicine Hat's trusted source for certified pre-owned phones, instant device sell quotes, and same-day phone repair.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <StructuredData data={localBusinessSchema} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <CartDrawer />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
