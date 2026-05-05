import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/value-check"] },
    ],
    sitemap: "https://www.hatphones.ca/sitemap.xml",
    host: "https://www.hatphones.ca",
  };
}
