import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isSupportedLocale, type Locale, supportedLocales } from "@/lib/home-content";

const aboutPageSlugs = ["elias-papavlassopoulos"] as const;
const aboutSlugLabels: Record<Locale, Record<(typeof aboutPageSlugs)[number], string>> = {
  en: {
    "elias-papavlassopoulos": "About Me",
  },
  de: {
    "elias-papavlassopoulos": "Über mich",
  },
};

type AboutPageSlug = (typeof aboutPageSlugs)[number];

function isAboutPageSlug(value: string): value is AboutPageSlug {
  return (aboutPageSlugs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    aboutPageSlugs.map((slug) => ({ locale, slug })),
  );
}

export function generateMetadata(): Metadata {
  return {
    icons: "/assets/images/about-favicon-circle.svg",
  };
}

export default async function AboutMePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale) || !isAboutPageSlug(slug)) {
    notFound();
  }

  return <main className="ds-home-empty" aria-label={aboutSlugLabels[locale][slug]} />;
}
