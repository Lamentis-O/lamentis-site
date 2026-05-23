export const supportedLocales = ["en", "de"] as const;

export type Locale = (typeof supportedLocales)[number];

export type FooterSectionLink = {
  label: string;
  href?: string;
  disabled?: boolean;
  action?: boolean;
  external?: boolean;
  icon?: "github" | "linkedin" | "about";
};

export type FooterSection = {
  title: string;
  links: FooterSectionLink[];
};

export type FooterCopy = {
  brand: string;
  platform: FooterSection;
  account: FooterSection;
  legal: FooterSection;
  social: FooterSection;
  languageLabel: string;
  languageOptions: { code: Locale; label: string }[];
  copyright: string;
};

export type HomepageCopy = {
  metaTitle: string;
  metaDescription: string;
  footer: FooterCopy;
};

export const contentByLocale: Record<Locale, HomepageCopy> = {
  en: {
    metaTitle: "Lamentis",
    metaDescription:
      "Lamentis landing page: plan, coordinate, and host private and public events with your social circle.",
    footer: {
      brand: "Lamentis",
      platform: {
        title: "Platform",
        links: [
          { label: "Naome", href: "/en/naome" },
          { label: "Nox", href: "/en/nox" },
          { label: "Noma", href: "/en/noma" },
        ],
      },
      account: {
        title: "Account",
        links: [
          { label: "Log in", disabled: true },
          { label: "Sign up", disabled: true },
          { label: "Safety", disabled: true },
          { label: "View roadmap", disabled: true },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Privacy Policy", disabled: true },
          { label: "Terms of Service", disabled: true },
          { label: "Legal Notice", href: "/en/legal-notice" },
        ],
      },
      social: {
        title: "Links",
        links: [
          {
            label: "About Me",
            href: "/en/about-me",
            icon: "about",
          },
          {
            label: "GitHub",
            href: "https://github.com/Lamentis-O",
            external: true,
            icon: "github",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/elias-pvls",
            external: true,
            icon: "linkedin",
          },
        ],
      },
      languageLabel: "Language",
      languageOptions: [
        { code: "en", label: "English" },
        { code: "de", label: "Deutsch" },
      ],
      copyright: "© 2026 Lamentis. Responsible: Elias Papavlassopoulos",
    },
  },
  de: {
    metaTitle: "Lamentis",
    metaDescription:
      "Lamentis-Startseite: Plane, koordiniere und organisiere private und öffentliche Events.",
    footer: {
      brand: "Lamentis",
      platform: {
        title: "Plattform",
        links: [
          { label: "Naome", href: "/de/naome" },
          { label: "Nox", href: "/de/nox" },
          { label: "Noma", href: "/de/noma" },
        ],
      },
      account: {
        title: "Konto",
        links: [
          { label: "Einloggen", disabled: true },
          { label: "Registrieren", disabled: true },
          { label: "Sicherheit", disabled: true },
          { label: "Roadmap ansehen", disabled: true },
        ],
      },
      legal: {
        title: "Rechtliches",
        links: [
          { label: "Datenschutzerklärung", disabled: true },
          { label: "Nutzungsbedingungen", disabled: true },
          { label: "Impressum", href: "/de/legal-notice" },
        ],
      },
      social: {
        title: "Links",
        links: [
          {
            label: "Über mich",
            href: "/de/about-me",
            icon: "about",
          },
          {
            label: "GitHub",
            href: "https://github.com/Lamentis-O",
            external: true,
            icon: "github",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/elias-pvls",
            external: true,
            icon: "linkedin",
          },
        ],
      },
      languageLabel: "Sprache",
      languageOptions: [
        { code: "en", label: "English" },
        { code: "de", label: "Deutsch" },
      ],
      copyright: "© 2026 Lamentis. Verantwortlich: Elias Papavlassopoulos",
    },
  },
};

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) {
    return false;
  }

  return (supportedLocales as readonly string[]).includes(value);
}

export function resolveLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
): Locale {
  if (!acceptLanguage) {
    return "en";
  }

  const requested = acceptLanguage
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .map((entry) => entry.split(";")[0]);

  for (const raw of requested) {
    if (raw.startsWith("de")) {
      return "de";
    }
    if (raw.startsWith("en")) {
      return "en";
    }
  }

  return "en";
}
