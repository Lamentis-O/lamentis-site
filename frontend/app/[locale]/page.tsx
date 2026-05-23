import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHome } from "@/components/site/site-home";
import {
  contentByLocale,
  isSupportedLocale,
  supportedLocales,
} from "@/lib/home-content";

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

  return {
    title: contentByLocale[locale].metaTitle,
    description: contentByLocale[locale].metaDescription,
  };
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

  return <SiteHome copy={contentByLocale[locale]} />;
}

