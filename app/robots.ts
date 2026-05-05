import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bytespider",
    "Amazonbot",
    "Meta-ExternalAgent",
    "DuckAssistBot",
    "YouBot",
    "cohere-ai",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/value-check"] },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/value-check"],
      })),
    ],
    sitemap: "https://www.hatphones.ca/sitemap.xml",
    host: "https://www.hatphones.ca",
  };
}
