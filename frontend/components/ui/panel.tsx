import type { ReactNode } from "react";

type SurfacePanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export function SurfacePanel({
  children,
  className = "",
  title,
}: SurfacePanelProps) {
  return (
    <section
      className={`ds-surface-panel ${className}`.trim()}
      aria-label={title}
    >
      {children}
    </section>
  );
}
