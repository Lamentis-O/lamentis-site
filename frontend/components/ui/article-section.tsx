import type { ReactNode } from "react";
import Image from "next/image";

type ArticleMedia = {
  alt?: string;
  src?: string;
};

export type ArticleBlock =
  | { kind: "headline"; text: string }
  | { kind: "subheadline"; text: string }
  | { kind: "body"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "media"; media: ArticleMedia }
  | { kind: "mediaTextLeft"; media: ArticleMedia; text: string }
  | { kind: "mediaTextRight"; media: ArticleMedia; text: string };

type ArticleSectionProps = {
  blocks: readonly ArticleBlock[];
  boundary?: boolean;
  id?: string;
  label?: string;
};

function ArticleMediaBox({ media }: { media: ArticleMedia }) {
  if (media.src) {
    return (
      <span className="ds-article-media__image-wrap">
        <Image
          className="ds-article-media__image"
          src={media.src}
          alt={media.alt ?? ""}
          fill
          sizes="(max-width: 720px) 100vw, 50vw"
        />
      </span>
    );
  }

  return <div className="ds-article-media__placeholder" aria-hidden="true" />;
}

function ArticleMediaWithText({
  media,
  reverse,
  text,
}: {
  media: ArticleMedia;
  reverse?: boolean;
  text: string;
}) {
  const className = reverse
    ? "ds-article-media-text ds-article-media-text--reverse"
    : "ds-article-media-text";

  return (
    <div className={className}>
      <ArticleMediaBox media={media} />
      <p>{text}</p>
    </div>
  );
}

function renderArticleBlock(block: ArticleBlock, index: number): ReactNode {
  switch (block.kind) {
    case "headline":
      return <h2 key={index}>{block.text}</h2>;
    case "subheadline":
      return <h3 key={index}>{block.text}</h3>;
    case "body":
      return <p key={index}>{block.text}</p>;
    case "list":
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "media":
      return <ArticleMediaBox key={index} media={block.media} />;
    case "mediaTextLeft":
      return (
        <ArticleMediaWithText key={index} media={block.media} text={block.text} />
      );
    case "mediaTextRight":
      return (
        <ArticleMediaWithText
          key={index}
          media={block.media}
          reverse
          text={block.text}
        />
      );
  }
}

export function ArticleSection({
  blocks,
  boundary = true,
  id,
  label,
}: ArticleSectionProps) {
  const className = boundary
    ? "ds-page-boundary ds-article-section"
    : "ds-article-section";

  return (
    <section id={id} className={className} aria-label={label}>
      <div className="ds-article-section__content">
        {blocks.map(renderArticleBlock)}
      </div>
    </section>
  );
}
