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
type ProductPageSlug = Exclude<EmptyPageSlug, "legal-notice">;
type ProductPageContent = {
  githubHref: string;
  tagline: string;
  title: string;
  titleClassName: string;
};

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

const noxPageCopy: Record<Locale, { tagline: string }> = {
  en: {
    tagline:
      "A mobile platform for nightclubs to host events, sell tickets, and understand their audiences, paired with a social experience that helps guests connect with their circle before, during, and after the night.",
  },
  de: {
    tagline:
      "Eine mobile Plattform, mit der Nightclubs Events veranstalten, Tickets verkaufen und ihre Zielgruppen besser verstehen, kombiniert mit einem sozialen Erlebnis, das Gäste vor, während und nach der Nacht mit ihrem Freundeskreis verbindet.",
  },
};

const nomaPageCopy: Record<Locale, { tagline: string }> = {
  en: {
    tagline:
      "An iOS task manager built around a calm daily flow: capture today's todos, organize them into projects, complete what matters, and let unfinished tasks roll into tomorrow automatically.",
  },
  de: {
    tagline:
      "Ein iOS-Task-Manager für einen klaren Tagesablauf: heutige Todos erfassen, in Projekte sortieren, Wichtiges abschließen und unerledigte Aufgaben automatisch in den nächsten Tag übernehmen.",
  },
};

function isEmptyPageSlug(value: string): value is EmptyPageSlug {
  return (emptyPageSlugs as readonly string[]).includes(value);
}

function ProductIntroPage({
  githubHref,
  locale,
  slug,
  title,
  titleClassName,
  tagline,
}: {
  githubHref: string;
  locale: Locale;
  slug: ProductPageSlug;
  title: string;
  titleClassName: string;
  tagline: string;
}) {
  const titleId = `${slug}-title`;

  return (
    <main className="ds-product-page" aria-label={emptyPageLabels[locale][slug]}>
      <section
        className="ds-page-boundary ds-product-intro"
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className={`ds-product-title ${titleClassName}`}>
          {title}
        </h1>
        <p className="ds-product-subline">{tagline}</p>
        <a
          className="ds-product-github-link"
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
          <span>View Github</span>
        </a>
      </section>
    </main>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.016-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.335-1.756-1.335-1.756-1.091-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.81 1.305 3.495.998.108-.774.418-1.306.76-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.467-2.381 1.236-3.22-.125-.304-.535-1.527.117-3.184 0 0 1.008-.322 3.3 1.23a11.37 11.37 0 0 1 3.003-.404c1.02.005 2.046.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.657.244 2.88.12 3.184.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.922.43.372.823 1.103.823 2.222 0 1.605-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z"
      />
    </svg>
  );
}

function getProductPageContent(locale: Locale, slug: ProductPageSlug) {
  const productPageContent: Record<ProductPageSlug, ProductPageContent> = {
    naome: {
      githubHref: "https://github.com/Lamentis-O/naome",
      title: "NAOME",
      titleClassName: "ds-product-title--naome",
      tagline: naomePageCopy[locale].tagline,
    },
    nox: {
      githubHref: "https://github.com/Lamentis-O/nox",
      title: "NOX",
      titleClassName: "ds-product-title--nox",
      tagline: noxPageCopy[locale].tagline,
    },
    noma: {
      githubHref: "https://github.com/Lamentis-O/noma",
      title: "Noma Tasks",
      titleClassName: "ds-product-title--noma",
      tagline: nomaPageCopy[locale].tagline,
    },
  };

  return productPageContent[slug];
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
    noIndex: slug !== "legal-notice" && slug !== "naome",
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

  if (slug !== "legal-notice") {
    const productPageContent = getProductPageContent(locale, slug);

    return (
      <ProductIntroPage
        githubHref={productPageContent.githubHref}
        locale={locale}
        slug={slug}
        title={productPageContent.title}
        titleClassName={productPageContent.titleClassName}
        tagline={productPageContent.tagline}
      />
    );
  }

  return (
    <main
      className="ds-home-empty"
      aria-label={emptyPageLabels[locale][slug]}
    />
  );
}
