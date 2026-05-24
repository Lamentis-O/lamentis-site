import rawArticles from "./naome-page-content.json";
import type { Locale } from "./content";

export type NaomeArticle = {
  headline: string;
  id: string;
  label: string;
  sections: readonly {
    body: string;
    subheadline: string;
  }[];
};

function normalizeArticles(locale: Locale): readonly NaomeArticle[] {
  return rawArticles[locale].map((article) => ({
    headline: article.headline,
    id: article.id,
    label: article.label,
    sections: article.sections.map((section) => ({
      body: section.body,
      subheadline: section.subheadline,
    })),
  }));
}

export const naomeArticles: Record<Locale, readonly NaomeArticle[]> = {
  en: normalizeArticles("en"),
  de: normalizeArticles("de"),
};
