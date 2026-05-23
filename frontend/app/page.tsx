import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultSiteIcons, resolveLocaleFromAcceptLanguage } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "Lamentis",
  description: "Lamentis Frontend on Next.js",
  icons: defaultSiteIcons,
};

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = resolveLocaleFromAcceptLanguage(acceptLanguage);

  redirect(`/${locale}`);
}
