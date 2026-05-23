import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveLocaleFromAcceptLanguage } from "@/domain/site/content";
import { homeMetadata } from "@/domain/site/seo";

export const metadata: Metadata = homeMetadata("en");

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = resolveLocaleFromAcceptLanguage(acceptLanguage);

  redirect(`/${locale}`);
}
