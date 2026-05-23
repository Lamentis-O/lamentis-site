import type { Metadata } from "next";

export const defaultSiteIcons = {
  icon: [
    { url: "/assets/images/favicon-20260424.svg", type: "image/svg+xml" },
    { url: "/assets/images/favicon-32-20260424.png", type: "image/png", sizes: "32x32" },
    { url: "/assets/images/favicon-16-20260424.png", type: "image/png", sizes: "16x16" },
  ],
  shortcut: "/assets/images/favicon-20260424.png",
  apple: {
    url: "/assets/images/apple-touch-icon-20260424.png",
  },
} satisfies Metadata["icons"];
