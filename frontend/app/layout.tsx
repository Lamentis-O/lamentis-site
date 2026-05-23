import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lamentis",
  description: "Lamentis Frontend on Next.js",
  icons: {
    icon: [
      {
        url: "/assets/images/favicon-20260424.svg",
        type: "image/svg+xml",
      },
      {
        url: "/assets/images/favicon-32-20260424.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/assets/images/favicon-16-20260424.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    shortcut: "/assets/images/favicon-20260424.png",
    apple: {
      url: "/assets/images/apple-touch-icon-20260424.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
