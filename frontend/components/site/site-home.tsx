import Image from "next/image";
import type { HomepageCopy } from "@/domain/site/content";

type SiteHomeProps = {
  copy: HomepageCopy;
};

export function SiteHome({ copy }: SiteHomeProps) {
  return (
    <main className="ds-home-empty ds-home-loader-preview" aria-label={copy.metaTitle}>
      <div className="ds-home-loader-preview__content">
        <Image
          src="/assets/images/lamentis-loader-logo-20260523.gif"
          alt=""
          className="ds-home-loader-preview__image"
          width="256"
          height="256"
          unoptimized
        />
        <p className="ds-home-loader-preview__label">Coming soon</p>
      </div>
    </main>
  );
}
