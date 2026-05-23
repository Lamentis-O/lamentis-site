import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/site/json-ld";
import { SiteHome } from "@/components/site/site-home";
import {
  contentByLocale,
  isSupportedLocale,
  supportedLocales,
} from "@/domain/site/content";
import { homeMetadata, organizationJsonLd } from "@/domain/site/seo";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return homeMetadata(locale);
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      <SiteHome copy={contentByLocale[locale]} />
      <JsonLd data={organizationJsonLd(locale)} />
    </>
  );
}
