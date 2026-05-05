import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.hatphones.ca", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.hatphones.ca/buy/", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://www.hatphones.ca/sell/", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://www.hatphones.ca/repair/", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://www.hatphones.ca/contact/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://www.hatphones.ca/privacy/", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: "https://www.hatphones.ca/terms/", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    // /value-check excluded (noindex)
  ];
}
