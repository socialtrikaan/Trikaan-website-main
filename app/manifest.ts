import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      {
        src: absoluteUrl("/icon"),
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: absoluteUrl("/apple-icon"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
