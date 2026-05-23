import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavigation } from "@/components/site/site-navigation";
import {
  contentByLocale,
  isSupportedLocale,
  supportedLocales,
} from "@/domain/site/content";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      <SiteNavigation locale={locale} />
      {children}
      <SiteFooter locale={locale} content={contentByLocale[locale].footer} />
    </>
  );
}
