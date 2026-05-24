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

const naomeSquareGridLabels: Record<Locale, string[]> = {
  en: [
    "What Is an Autopoietic Software OS?",
    "Naome for Roadmaps",
    "State of the Art",
    "How to Use It",
  ],
  de: [
    "Was ist ein autopoietisches Software-OS?",
    "Naome für Roadmaps",
    "Stand der Technik",
    "So nutzt du es",
  ],
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
      {slug === "naome" ? <NaomeSquareGrid locale={locale} /> : null}
    </main>
  );
}

function NaomeSquareGrid({ locale }: { locale: Locale }) {
  return (
    <section className="ds-page-boundary ds-naome-square-grid" aria-label="Naome feature grid">
      {naomeSquareGridLabels[locale].map((label) => (
        <div key={label} className="ds-naome-square-grid__item">
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
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
