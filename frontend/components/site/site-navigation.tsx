import Image from "next/image";
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
        <Link href={`/${locale}`} className="ds-site-navigation__brand" aria-label="Lamentis">
          <Image
            src="/assets/images/app-logo-20260424.png"
            alt=""
            width={44}
            height={44}
            className="ds-site-navigation__brand-logo"
          />
          <span>Lamentis</span>
        </Link>

        <div className="ds-site-navigation__links">
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
      </div>
    </nav>
  );
}
