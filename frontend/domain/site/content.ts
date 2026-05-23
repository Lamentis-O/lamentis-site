export const supportedLocales = ["en", "de"] as const;

export type Locale = (typeof supportedLocales)[number];

export type FooterSectionLink = {
  label: string;
  href?: string;
  disabled?: boolean;
  action?: boolean;
  external?: boolean;
  icon?: "github" | "linkedin" | "about";
  iconSrc?: string;
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

const languageOptions = [{ code: "en", label: "English" }, { code: "de", label: "Deutsch" }] satisfies FooterCopy["languageOptions"];

const platformNames = ["Naome", "Nox", "Noma"] as const;

export const externalProfileUrls = {
  github: "https://github.com/Lamentis-O",
  linkedin: "https://www.linkedin.com/in/elias-pvls",
} as const;

const sharedExternalLinks: FooterSectionLink[] = [
  {
    label: "GitHub",
    href: externalProfileUrls.github,
    external: true,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: externalProfileUrls.linkedin,
    external: true,
    icon: "linkedin",
  },
];

function localizedPlatformLinks(locale: Locale): FooterSectionLink[] {
  return platformNames.map((label) => ({
    label,
    href: `/${locale}/${label.toLowerCase()}`,
  }));
}

function socialLinks(locale: Locale, aboutLabel: string): FooterSectionLink[] {
  return [
    {
      label: aboutLabel,
      href: `/${locale}/about/elias-papavlassopoulos`,
      icon: "about",
      iconSrc: "/assets/images/elias-portrait.JPG",
    },
    ...sharedExternalLinks,
  ];
}

type LocalizedCopy = readonly [
  metaTitle: string,
  metaDescription: string,
  platformTitle: string,
  accountTitle: string,
  accountLinks: FooterSectionLink[],
  legalTitle: string,
  legalLinks: FooterSectionLink[],
  aboutLabel: string,
  languageLabel: string,
  copyright: string,
];

const localizedCopy = {
  en: [
    "Projects by Elias Papavlassopoulos",
    "Lamentis landing page: plan, coordinate, and host private and public events with your social circle.",
    "Platform",
    "Account",
    [{ label: "Log in", disabled: true }, { label: "Sign up", disabled: true }, { label: "Safety", disabled: true }, { label: "View roadmap", disabled: true }],
    "Legal",
    [{ label: "Privacy Policy", disabled: true }, { label: "Terms of Service", disabled: true }, { label: "Legal Notice", href: "/en/legal-notice" }],
    "About Me",
    "Language",
    "© 2026 Lamentis. Responsible: Elias Papavlassopoulos",
  ],
  de: [
    "Projekte von Elias Papavlassopoulos",
    "Lamentis-Startseite: Plane, koordiniere und organisiere private und öffentliche Events.",
    "Plattform",
    "Konto",
    [{ label: "Einloggen", disabled: true }, { label: "Registrieren", disabled: true }, { label: "Sicherheit", disabled: true }, { label: "Roadmap ansehen", disabled: true }],
    "Rechtliches",
    [{ label: "Datenschutzerklärung", disabled: true }, { label: "Nutzungsbedingungen", disabled: true }, { label: "Impressum", href: "/de/legal-notice" }],
    "Über mich",
    "Sprache",
    "© 2026 Lamentis. Verantwortlich: Elias Papavlassopoulos",
  ],
} satisfies Record<Locale, LocalizedCopy>;

function footerCopy(locale: Locale, copy: LocalizedCopy): FooterCopy {
  const [, , platformTitle, accountTitle, accountLinks, legalTitle, legalLinks, aboutLabel, languageLabel, copyright] = copy;

  return {
    brand: "Lamentis",
    platform: { title: platformTitle, links: localizedPlatformLinks(locale) },
    account: { title: accountTitle, links: accountLinks },
    legal: { title: legalTitle, links: legalLinks },
    social: { title: "Links", links: socialLinks(locale, aboutLabel) },
    languageLabel,
    languageOptions,
    copyright,
  };
}

export const contentByLocale = Object.fromEntries(
  supportedLocales.map((locale) => {
    const copy = localizedCopy[locale];
    const [metaTitle, metaDescription] = copy;

    return [locale, {
      metaTitle,
      metaDescription,
      footer: footerCopy(locale, copy),
    }];
  }),
) as Record<Locale, HomepageCopy>;

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
