import Link from "next/link";
import { contentByLocale, type Locale } from "../../domain/site/content";

type SiteNavigationProps = {
  locale: Locale;
};

export function SiteNavigation({ locale }: SiteNavigationProps) {
  const links = contentByLocale[locale].footer.platform.links;

  return (
    <nav className="ds-site-navigation" aria-label="Product navigation">
      <div className="ds-page-boundary ds-site-navigation__inner">
        {links.map((link) => {
          if (!link.href) {
            return null;
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className="ds-site-navigation__link"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
