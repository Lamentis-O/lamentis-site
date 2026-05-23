import { notFound } from "next/navigation";
import { type Metadata } from "next";
import {
  isSupportedLocale,
  type Locale,
  supportedLocales,
} from "@/domain/site/content";
import { createLocalizedMetadata } from "@/domain/site/seo";

const emptyPageSlugs = ["naome", "nox", "noma", "legal-notice"] as const;

type EmptyPageSlug = (typeof emptyPageSlugs)[number];

const emptyPageLabels: Record<Locale, Record<EmptyPageSlug, string>> = {
  en: {
    naome: "Naome",
    nox: "Nox",
    noma: "Noma",
    "legal-notice": "Legal Notice",
  },
  de: {
    naome: "Naome",
    nox: "Nox",
    noma: "Noma",
    "legal-notice": "Impressum",
  },
};

const emptyPageDescriptions: Record<Locale, Record<EmptyPageSlug, string>> = {
  en: {
    naome: "Naome project page on Lamentis.",
    nox: "Nox project page on Lamentis.",
    noma: "Noma project page on Lamentis.",
    "legal-notice":
      "Legal notice and responsible person information for Lamentis.",
  },
  de: {
    naome: "Naome-Projektseite auf Lamentis.",
    nox: "Nox-Projektseite auf Lamentis.",
    noma: "Noma-Projektseite auf Lamentis.",
    "legal-notice":
      "Impressum und Verantwortlichenangaben für Lamentis.",
  },
};

const naomePageCopy: Record<Locale, { tagline: string }> = {
  en: {
    tagline:
      "An Autopoietic Software OS for autonomous, proof-driven software evolution. The first system of its kind.",
  },
  de: {
    tagline:
      "Ein autopoietisches Software-OS für autonome, beweisgestützte Software-Evolution. Das erste System dieser Art.",
  },
};

function isEmptyPageSlug(value: string): value is EmptyPageSlug {
  return (emptyPageSlugs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    emptyPageSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale) || !isEmptyPageSlug(slug)) {
    notFound();
  }

  const title = emptyPageLabels[locale][slug];

  return createLocalizedMetadata({
    locale,
    path: slug,
    title,
    description: emptyPageDescriptions[locale][slug],
    noIndex: slug !== "legal-notice",
  });
}

export default async function EmptyLocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale) || !isEmptyPageSlug(slug)) {
    notFound();
  }

  if (slug === "naome") {
    return (
      <main className="ds-product-page" aria-label={emptyPageLabels[locale][slug]}>
        <section
          className="ds-page-boundary ds-product-intro"
          aria-labelledby="naome-title"
        >
          <h1
            id="naome-title"
            className="ds-product-title ds-product-title--naome"
          >
            NAOME
          </h1>
          <p className="ds-product-subline">{naomePageCopy[locale].tagline}</p>
        </section>
      </main>
    );
  }

  return (
    <main
      className="ds-home-empty"
      aria-label={emptyPageLabels[locale][slug]}
    />
  );
}
