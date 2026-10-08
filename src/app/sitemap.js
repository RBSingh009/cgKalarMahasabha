import { MetadataRoute } from "next";

export default function sitemap() {
  const base = "https://www.cgkalarmahasangh.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/members`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/join`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/notice`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/publication`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/donation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    // ...add remaining URLs from your list
  ];
}