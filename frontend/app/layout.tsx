import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteName, siteUrl } from "@/domain/site/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  applicationName: siteName,
  description:
    "Lamentis is a personal portfolio and project overview for Elias Papavlassopoulos.",
  authors: [{ name: "Elias Papavlassopoulos" }],
  creator: "Elias Papavlassopoulos",
  publisher: siteName,
  category: "personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
