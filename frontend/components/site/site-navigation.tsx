import { SegmentedNavigation } from "../ui/segmented-navigation";
import type { Locale } from "@/domain/site/content";

type SiteNavigationProps = {
  locale: Locale;
};

const productNavigationItems = [
  {
    slug: "naome",
    label: "Naome ASOS",
    mobileLabel: "Naome",
  },
  {
    slug: "noma",
    label: "Noma Tasks",
    mobileLabel: "Noma",
  },
  {
    slug: "nox",
    label: "Nox - Social events",
    mobileLabel: "Nox",
  },
] as const;

export function SiteNavigation({ locale }: SiteNavigationProps) {
  const items = productNavigationItems.map((item) => ({
    href: `/${locale}/${item.slug}`,
    label: item.label,
    mobileLabel: item.mobileLabel,
  }));

  return <SegmentedNavigation aria-label="Primary product navigation" items={items} />;
}
