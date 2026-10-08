import { MetadataRoute } from "next";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: "https://www.cgkalarmahasangh.com/sitemap.xml",
    host: "https://www.cgkalarmahasangh.com",
  };
}