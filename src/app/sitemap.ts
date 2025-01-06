import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://minty.subhambharadwaz.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
