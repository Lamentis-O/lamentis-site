"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MutableRefObject, RefObject } from "react";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SegmentedNavigationItem = {
  href: string;
  label: string;
  mobileLabel: string;
};

type IndicatorState = {
  left: number;
  width: number;
};

type SegmentedNavigationProps = {
  "aria-label": string;
  items: SegmentedNavigationItem[];
  className?: string;
};

type ItemRefs = MutableRefObject<Array<HTMLAnchorElement | null>>;

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function resolveActiveIndex(
  items: SegmentedNavigationItem[],
  pathname: string | null,
) {
  const currentPath = normalizePath(pathname ?? "");
  const exactIndex = items.findIndex(
    (item) => normalizePath(item.href) === currentPath,
  );

  if (exactIndex >= 0) {
    return exactIndex;
  }

  const nestedIndex = items.findIndex((item) =>
    currentPath.startsWith(`${normalizePath(item.href)}/`),
  );

  return nestedIndex >= 0 ? nestedIndex : null;
}

function measureIndicator(
  container: HTMLDivElement,
  item: HTMLAnchorElement,
): IndicatorState {
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  return {
    left: itemRect.left - containerRect.left,
    width: itemRect.width,
  };
}

function useSegmentIndicator(
  listRef: RefObject<HTMLDivElement | null>,
  itemRefs: ItemRefs,
  visualIndex: number | null,
) {
  const [indicator, setIndicator] = useState<IndicatorState | null>(null);

  useLayoutEffect(() => {
    if (visualIndex === null) {
      return;
    }

    const container = listRef.current;
    const activeItem = itemRefs.current[visualIndex];

    if (container && activeItem) {
      setIndicator(measureIndicator(container, activeItem));
    }
  }, [itemRefs, listRef, visualIndex]);

  useEffect(() => {
    function updateIndicator() {
      if (visualIndex === null) {
        return;
      }

      const container = listRef.current;
      const activeItem = itemRefs.current[visualIndex];

      if (container && activeItem) {
        setIndicator(measureIndicator(container, activeItem));
      }
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [itemRefs, listRef, visualIndex]);

  return indicator;
}

export function SegmentedNavigation({
  "aria-label": ariaLabel,
  items,
  className = "",
}: SegmentedNavigationProps) {
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = useMemo(
    () => resolveActiveIndex(items, pathname),
    [items, pathname],
  );
  const visualIndex = hoveredIndex ?? activeIndex;
  const indicator = useSegmentIndicator(listRef, itemRefs, visualIndex);

  return (
    <nav className={`ds-floating-navigation ${className}`.trim()} aria-label={ariaLabel}>
      <div
        ref={listRef}
        className="ds-segmented-navigation"
        onPointerLeave={() => setHoveredIndex(null)}
      >
        {visualIndex !== null && indicator ? (
          <span
            className="ds-segmented-navigation__indicator"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
            }}
            aria-hidden="true"
          />
        ) : null}
        {items.map((item, index) => (
          <Link
            key={item.href}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            href={item.href}
            className="ds-segmented-navigation__item"
            aria-label={item.label}
            aria-current={index === activeIndex ? "page" : undefined}
            onPointerEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
          >
            <span className="ds-segmented-navigation__label ds-segmented-navigation__label--desktop">
              {item.label}
            </span>
            <span className="ds-segmented-navigation__label ds-segmented-navigation__label--mobile">
              {item.mobileLabel}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
