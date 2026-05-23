import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  centered?: boolean;
  className?: string;
};

export function PageShell({
  children,
  centered = false,
  className = "",
}: PageShellProps) {
  const wrapper = centered ? "ds-page-shell ds-page-shell-center" : "ds-page-shell";
  return <main className={`${wrapper} ${className}`.trim()}>{children}</main>;
}
