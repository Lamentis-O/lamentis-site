"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  contentByLocale,
  type FooterSectionLink,
  type Locale,
} from "../../domain/site/content";

type SiteNavigationProps = {
  locale: Locale;
};

type ProductLink = FooterSectionLink & { href: string };

function ProductLinks({ links }: { links: ProductLink[] }) {
  return (
    <div className="ds-site-navigation__links">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="ds-site-navigation__link">
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  const paths = isOpen
    ? ["M5.5 5.5L16.5 16.5", "M16.5 5.5L5.5 16.5"]
    : ["M4.5 7H17.5", "M4.5 15H17.5"];

  return (
    <svg
      className="ds-site-navigation__menu-icon"
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      {paths.map((path) => (
        <path
          key={path}
          d={path}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function MobileMenu({
  links,
  onNavigate,
}: {
  links: ProductLink[];
  onNavigate: () => void;
}) {
  return (
    <div id="site-navigation-mobile-menu" className="ds-site-navigation__mobile-menu">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="ds-site-navigation__mobile-link"
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteNavigation({ locale }: SiteNavigationProps) {
  const links = contentByLocale[locale].footer.platform.links;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const productLinks = links.filter((link): link is ProductLink => Boolean(link.href));

  useEffect(() => {
    document.body.classList.toggle("has-open-site-navigation", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("has-open-site-navigation");
    };
  }, [isMobileMenuOpen]);

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

        <ProductLinks links={productLinks} />

        <button
          type="button"
          className="ds-site-navigation__menu-button"
          aria-label={
            isMobileMenuOpen ? "Close product navigation" : "Open product navigation"
          }
          aria-controls="site-navigation-mobile-menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <MenuIcon isOpen={isMobileMenuOpen} />
        </button>

        {isMobileMenuOpen ? (
          <MobileMenu
            links={productLinks}
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        ) : null}
      </div>
    </nav>
  );
}
