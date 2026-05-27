import { notFound } from "next/navigation";
import { type Metadata } from "next";
import {
  isSupportedLocale,
  type Locale,
  supportedLocales,
} from "@/domain/site/content";
import {
  createLocalizedMetadata,
  localizedUrl,
  siteName,
} from "@/domain/site/seo";
import { JsonLd } from "@/components/site/json-ld";
import { ArticleSection } from "@/components";
import { NaomeFeatureGrid } from "@/components/site/naome-feature-grid";
import { naomeArticles } from "@/domain/site/naome-page";

const emptyPageSlugs = ["naome", "nox", "noma", "legal-notice"] as const;

type EmptyPageSlug = (typeof emptyPageSlugs)[number];
type ProductPageSlug = Exclude<EmptyPageSlug, "legal-notice">;
type ProductPageContent = {
  tagline: string;
  title: string;
  titleClassName: string;
};

type NaomeNavItem = {
  id: string;
  label: string;
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
    naome:
      "NAOME is an autopoietic software operating system for autonomous, proof-driven software evolution.",
    nox: "Nox project page on Lamentis.",
    noma: "Noma project page on Lamentis.",
    "legal-notice":
      "Legal notice and responsible person information for Lamentis.",
  },
  de: {
    naome:
      "NAOME ist ein autopoietisches Software-OS für autonome, beweisgetriebene Software-Evolution.",
    nox: "Nox-Projektseite auf Lamentis.",
    noma: "Noma-Projektseite auf Lamentis.",
    "legal-notice":
      "Impressum und Verantwortlichenangaben für Lamentis.",
  },
};

const naomeSeoData: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
    lastModified: string;
    geoPlacename: string;
    geoRegion: string;
    latitude: string;
    longitude: string;
  }
> = {
  en: {
    title: "NAOME | Autopoietic Software OS for proof-driven development",
    description:
      "NAOME is an autopoietic software operating system for deterministic, proof-driven software evolution. Explore its kernel model, process pipeline, and production-safe automation roadmap.",
    lastModified: "2026-05-27",
    keywords: [
      "NAOME",
      "autopoietic software OS",
      "proof-driven software development",
      "software transactional kernel",
      "Rust",
      "background proof receipts",
      "deterministic gates",
      "Git automation",
      "software evolution",
      "autonomous development",
    ],
    geoPlacename: "Germany",
    geoRegion: "DE",
    latitude: "52.5200",
    longitude: "13.4050",
  },
  de: {
    title:
      "NAOME | Autopoietisches Software-OS für beweisgetriebene Software-Evolution",
    description:
      "NAOME ist ein autopoietisches Software-OS für autonome, beweisgetriebene Software-Evolution mit deterministischem Ablauf, auditierbarer Beweislage und sauberer Release-Kontrolle.",
    lastModified: "2026-05-27",
    keywords: [
      "NAOME",
      "Autopoietisches Software-OS",
      "beweisgetriebene Softwareentwicklung",
      "transaktionaler Kernel",
      "Rust",
      "Proof-Receipts",
      "deterministische Gates",
      "Git Automatisierung",
      "Software-Evolution",
      "autonomes Development",
    ],
    geoPlacename: "Deutschland",
    geoRegion: "DE",
    latitude: "52.5200",
    longitude: "13.4050",
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

function naomeJsonLd({ locale }: { locale: Locale }) {
  const url = localizedUrl(locale, "naome");
  const {
    title,
    description,
    keywords,
    lastModified,
    geoPlacename,
    geoRegion,
    latitude,
    longitude,
  } = naomeSeoData[locale];
  const sectionHeadlines = naomeArticles[locale].map((article) => article.headline);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "de" ? "Startseite" : "Home",
      item: localizedUrl(locale, "/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "NAOME",
      item: url,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: title,
    description,
    inLanguage: locale,
    dateModified: lastModified,
    datePublished: "2026-05-23",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        ".ds-naome-hero__copy p",
        "h1.ds-product-title",
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${localizedUrl(locale, "naome")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: localizedUrl(locale, "/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: new URL("/assets/images/naome-texture-20260523.webp", "https://lamentis.de")
        .toString(),
      caption: "NAOME project visual.",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "NAOME",
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Autopoietic Software OS",
      description,
      operatingSystem: "Cross-platform",
      inLanguage: locale,
      keywords: keywords.join(", "),
      codeRepository: "https://github.com/Lamentis-O/naome",
      featureList: sectionHeadlines,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
    hasPart: {
      "@type": "ItemList",
      numberOfItems: naomeArticles[locale].length,
      itemListElement: naomeArticles[locale].map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.label,
        item: `${url}#${article.id}`,
      })),
    },
    about: {
      "@type": "Thing",
      name:
        locale === "de"
          ? "Autopoietisches Software-OS"
          : "Autopoietic Software OS",
      description:
        locale === "de"
          ? "Ein Repository-First Operating-System für kontrollierte Software-Weiterentwicklung."
          : "A repository-first operating system for controlled software evolution.",
      url,
      sameAs: "https://github.com/Lamentis-O/naome",
    },
    spatialCoverage: {
      "@type": "Place",
      name: geoPlacename,
      geo: {
        "@type": "GeoCoordinates",
        latitude,
        longitude,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: localizedUrl(locale, "/"),
      areaServed: {
        "@type": "Country",
        name: geoPlacename,
      },
    },
    isAccessibleForFree: true,
    additionalType: "https://schema.org/TechArticle",
    areaServed: {
      "@type": "Country",
      name: geoPlacename,
      sameAs: `https://www.iso.org/obp/ui/en/#iso:3166:${geoRegion}`,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Software engineers and engineering teams",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: geoPlacename,
      },
    },
  };
}

function stripMarkdown(value: string) {
  return value.replace(/\*([^*]+)\*/g, "$1");
}

function truncateText(value: string, maxLength: number) {
  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength).trimEnd()}…`;
}

function naomeFaqJsonLd({ locale }: { locale: Locale }) {
  const questionAnswerItems = naomeArticles[locale].flatMap((article) =>
    article.sections.map((section) => ({
      "@type": "Question",
      name: section.subheadline,
      acceptedAnswer: {
        "@type": "Answer",
        text: truncateText(stripMarkdown(section.body), 320),
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questionAnswerItems,
    about: {
      "@type": "SoftwareApplication",
      name: "NAOME",
      url: localizedUrl(locale, "naome"),
    },
    inLanguage: locale,
  };
}

function naomeSectionListJsonLd({ locale }: { locale: Locale }) {
  const url = localizedUrl(locale, "naome");
  const articleItems = naomeArticles[locale].map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.label,
    item: {
      "@type": "Article",
      headline: article.headline,
      url: `${url}#${article.id}`,
      author: {
        "@type": "Organization",
        name: siteName,
      },
      inLanguage: locale,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "de" ? "NAOME Themenübersicht" : "NAOME topic map",
    numberOfItems: articleItems.length,
    itemListElement: articleItems,
  };
}

function naomeGeoKeywords(locale: Locale): Record<string, string> {
  const { geoPlacename, latitude, longitude, geoRegion } = naomeSeoData[locale];

  return {
    "geo.region": geoRegion,
    "geo.placename": geoPlacename,
    "geo.position": `${latitude};${longitude}`,
    ICBM: `${latitude},${longitude}`,
  };
}

function naomeSocialMetaImage() {
  return {
    url: "/assets/images/naome-texture-20260523.webp",
    width: 1800,
    height: 1012,
    alt: "NAOME project visual on Lamentis.",
  } as const;
}

function naomeMetadata(locale: Locale) {
  const image = naomeSocialMetaImage();

  const metadata = createLocalizedMetadata({
    locale,
    path: "naome",
    title: naomeSeoData[locale].title,
    description: naomeSeoData[locale].description,
    images: [image],
    noIndex: false,
  });

  return {
    ...metadata,
    keywords: naomeSeoData[locale].keywords,
    other: {
      ...(metadata.other || {}),
      ...naomeGeoKeywords(locale),
      "twitter:card": "summary_large_image",
      "article:section": locale === "de" ? "Software-OS" : "Software OS",
      "article:tag": naomeSeoData[locale].keywords.join(","),
    },
  };
}

function isEmptyPageSlug(value: string): value is EmptyPageSlug {
  return (emptyPageSlugs as readonly string[]).includes(value);
}

function ProductIntroPage({
  locale,
  slug,
  title,
  titleClassName,
  tagline,
}: {
  locale: Locale;
  slug: ProductPageSlug;
  title: string;
  titleClassName: string;
  tagline: string;
}) {
  const titleId = `${slug}-title`;
  const productPageClassName = `ds-product-page ds-product-page--${slug}`;

  if (slug === "naome") {
    return (
      <NaomeProductPage
        locale={locale}
        tagline={tagline}
        title={title}
        titleClassName={titleClassName}
        titleId={titleId}
      />
    );
  }

  return (
    <main className={productPageClassName} aria-label={emptyPageLabels[locale][slug]}>
      <section
        className="ds-page-boundary ds-product-intro"
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className={`ds-product-title ${titleClassName}`}>
          {title}
        </h1>
        <p className="ds-product-subline">{tagline}</p>
      </section>
    </main>
  );
}

function NaomeProductPage({
  locale,
  tagline,
  title,
  titleClassName,
  titleId,
}: {
  locale: Locale;
  tagline: string;
  title: string;
  titleClassName: string;
  titleId: string;
}) {
  const articles = naomeArticles[locale];
  const navItems = getNaomeNavItems(articles);
  const referenceTargets = getNaomeReferenceTargets(articles);

  return (
    <main
      className="ds-product-page ds-product-page--naome"
      aria-label={emptyPageLabels[locale].naome}
    >
      <section className="ds-page-boundary ds-naome-hero" aria-labelledby={titleId}>
        <div className="ds-naome-hero__copy">
          <p>{tagline}</p>
        </div>
        <h1 id={titleId} className={`ds-product-title ${titleClassName}`}>
          {title}
        </h1>
      </section>
      <section className="ds-page-boundary ds-naome-article-layout">
        <NaomeFeatureGrid items={navItems} />
        <NaomeContentSections
          locale={locale}
          referenceTargets={referenceTargets}
        />
        <JsonLd data={naomeJsonLd({ locale })} />
        <JsonLd data={naomeFaqJsonLd({ locale })} />
        <JsonLd data={naomeSectionListJsonLd({ locale })} />
      </section>
    </main>
  );
}

function NaomeContentSections({
  locale,
  referenceTargets,
}: {
  locale: Locale;
  referenceTargets: Record<string, string>;
}) {
  const articles = naomeArticles[locale];

  return (
    <div className="ds-naome-article-stack">
      {articles.map((article) => (
        <div key={article.id}>
          <ArticleSection
            boundary={false}
            id={article.id}
            label={article.label}
            blocks={[{ kind: "headline" as const, text: article.headline }]}
          />
          {article.sections.map((section, sectionIndex) => (
            <ArticleSection
              key={`${article.id}-${sectionIndex}`}
              boundary={false}
              id={getNaomeSectionId(article.id, sectionIndex)}
              label={section.subheadline}
              blocks={[
                { kind: "subheadline" as const, text: section.subheadline },
                { kind: "body" as const, text: section.body },
              ]}
              referenceTargets={referenceTargets}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function getNaomeSectionId(articleId: string, sectionIndex: number): string {
  return `${articleId}-section-${sectionIndex + 1}`;
}

function getNaomeNavItems(articles: typeof naomeArticles.en): NaomeNavItem[] {
  return articles.map((article) => ({
    id: article.id,
    label: article.label,
  }));
}

function normalizeReferenceKey(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getNaomeReferenceTargets(
  articles: typeof naomeArticles.en,
): Record<string, string> {
  const targets: Record<string, string> = {};

  for (const article of articles) {
    targets[article.label] = article.id;
    targets[article.headline] = article.id;
    targets[normalizeReferenceKey(article.label)] = article.id;
    targets[normalizeReferenceKey(article.headline)] = article.id;

    for (const [sectionIndex, section] of article.sections.entries()) {
      const sectionId = getNaomeSectionId(article.id, sectionIndex);
      const normalizedSubheadline = normalizeReferenceKey(section.subheadline);
      targets[section.subheadline] = sectionId;
      targets[normalizedSubheadline] = sectionId;
    }
  }

  return targets;
}

function getProductPageContent(locale: Locale, slug: ProductPageSlug) {
  const productPageContent: Record<ProductPageSlug, ProductPageContent> = {
    naome: {
      title: "NAOME",
      titleClassName: "ds-product-title--naome",
      tagline: naomePageCopy[locale].tagline,
    },
    nox: {
      title: "NOX",
      titleClassName: "ds-product-title--nox",
      tagline: noxPageCopy[locale].tagline,
    },
    noma: {
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

  if (slug === "naome") {
    return naomeMetadata(locale);
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

  if (slug !== "legal-notice") {
    const productPageContent = getProductPageContent(locale, slug);

    return (
      <ProductIntroPage
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
