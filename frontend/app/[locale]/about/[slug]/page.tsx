import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/site/json-ld";
import {
  isSupportedLocale,
  type Locale,
  supportedLocales,
} from "@/domain/site/content";
import {
  aboutPersonIcons,
  aboutPersonImages,
  createLocalizedMetadata,
  personJsonLd,
} from "@/domain/site/seo";

const aboutPageSlugs = ["elias-papavlassopoulos"] as const;
const aboutSlugLabels: Record<Locale, Record<(typeof aboutPageSlugs)[number], string>> = {
  en: {
    "elias-papavlassopoulos": "About Me",
  },
  de: {
    "elias-papavlassopoulos": "Über mich",
  },
};

const aboutSlugDescriptions: Record<Locale, Record<(typeof aboutPageSlugs)[number], string>> = {
  en: {
    "elias-papavlassopoulos":
      "About Elias Papavlassopoulos, the person responsible for Lamentis and its portfolio of projects.",
  },
  de: {
    "elias-papavlassopoulos":
      "Ueber Elias Papavlassopoulos, verantwortlich fuer Lamentis und das Projektportfolio.",
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale) || !isAboutPageSlug(slug)) {
    notFound();
  }

  return createLocalizedMetadata({
    locale,
    path: `about/${slug}`,
    title: "Elias Papavlassopoulos",
    description: aboutSlugDescriptions[locale][slug],
    icons: aboutPersonIcons,
    images: aboutPersonImages,
  });
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

  return (
    <>
      <main className="ds-home-empty" aria-label={aboutSlugLabels[locale][slug]} />
      <JsonLd data={personJsonLd(locale)} />
    </>
  );
}
