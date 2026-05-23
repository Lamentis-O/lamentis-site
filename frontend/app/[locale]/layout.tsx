import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/site-footer";
import {
  contentByLocale,
  isSupportedLocale,
  supportedLocales,
} from "@/lib/home-content";

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
      {children}
      <SiteFooter locale={locale} content={contentByLocale[locale].footer} />
    </>
  );
}

