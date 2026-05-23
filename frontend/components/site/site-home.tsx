import type { HomepageCopy } from "@/domain/site/content";

type SiteHomeProps = {
  copy: HomepageCopy;
};

export function SiteHome({ copy }: SiteHomeProps) {
  return <main className="ds-home-empty" aria-label={copy.metaTitle} />;
}
