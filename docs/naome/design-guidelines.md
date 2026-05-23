# Design Guidelines

Status: Initial baseline (v0.2)

## Quelle

Für die Farbpalette übernehmen wir die primären Farben aus `nox/hosting/src/styleguide.css`
(bestehende Lamentis-Webseite) und mappen sie auf die lokale `--ds-*` Token-Schicht in
`frontend/app/globals.css`.

## Global Typography

- Primary font: `Geist` via `next/font/google` (`frontend/app/layout.tsx`)
- Secondary font: `Geist Mono`

- `--ds-font-size-base`: `1rem`
- `--ds-font-size-sm`: `0.875rem`
- `--ds-font-size-lg`: `1.125rem`
- `--ds-font-size-xl`: `1.25rem`
- `--ds-font-size-2xl`: `1.5rem`
- `--ds-font-weight-regular`: `400`
- `--ds-font-weight-medium`: `500`
- `--ds-font-weight-bold`: `700`
- `--ds-font-weight-strong`: `800`

## Color System (importiert aus Lamentis)

### Light

- Primary text: `--ds-color-primary-text-light: rgb(16, 19, 23)`
- Secondary text: `--ds-color-secondary-text-light: rgb(183, 190, 198)`
- Primary accent: `--ds-color-primary-accent-light: rgb(106, 80, 255)`
- Success: `--ds-color-success-light: rgb(38, 175, 93)`
- Error: `--ds-color-error-light: rgb(255, 0, 86)`
- Primary background: `--ds-color-primary-background-light: rgb(254, 254, 254)`
- Secondary background: `--ds-color-secondary-background-light: rgb(244, 245, 246)`
- Sheet background: `--ds-color-sheet-background-light: rgb(254, 254, 254)`
- Line color: `--ds-color-line-light` (derived via `color-mix` aus primary-text)
- Muted text: `--ds-color-muted-light: rgb(92, 95, 102)`
- Subtle surface: `--ds-color-surface-subtle-light: rgb(247, 247, 247)`
- CTA background: `--ds-color-cta-bg-light: rgb(16, 19, 23)`
- CTA text: `--ds-color-cta-text-light: rgb(255, 255, 255)`
- Gradients:
  - `--ds-color-light-gradient-light: rgb(236, 14, 242)`
  - `--ds-color-middle-gradient-light: rgb(172, 100, 245)`
  - `--ds-color-dark-gradient-light: rgb(128, 32, 233)`

### Dark

- Primary text: `--ds-color-primary-text-dark: rgb(248, 246, 247)`
- Secondary text: `--ds-color-secondary-text-dark: rgb(90, 92, 97)`
- Primary accent: `--ds-color-primary-accent-dark: rgb(95, 67, 221)`
- Success: `--ds-color-success-dark: rgb(38, 175, 93)`
- Error: `--ds-color-error-dark: rgb(221, 47, 94)`
- Primary background: `--ds-color-primary-background-dark: rgb(0, 0, 0)`
- Secondary background: `--ds-color-secondary-background-dark: rgb(14, 14, 14)`
- Sheet background: `--ds-color-sheet-background-dark: rgb(14, 14, 14)`
- Line color: `--ds-color-line-dark` (derived via `color-mix` aus primary-text)
- Muted text: `--ds-color-muted-dark: rgb(141, 142, 148)`
- Subtle surface: `--ds-color-surface-subtle-dark: rgb(8, 8, 8)`
- CTA background: `--ds-color-cta-bg-dark: rgb(255, 255, 255)`
- CTA text: `--ds-color-cta-text-dark: rgb(16, 19, 23)`
- Gradients:
  - `--ds-color-light-gradient-dark: rgb(203, 0, 210)`
  - `--ds-color-middle-gradient-dark: rgb(202, 100, 245)`
  - `--ds-color-dark-gradient-dark: rgb(113, 45, 233)`

### Resolved tokens used by components

- `--ds-color-primary-text`
- `--ds-color-secondary-text`
- `--ds-color-primary-accent`
- `--ds-color-success`
- `--ds-color-error`
- `--ds-color-primary-background`
- `--ds-color-secondary-background`
- `--ds-color-sheet-background`
- `--ds-color-line`
- `--ds-color-muted`
- `--ds-color-surface-subtle`
- `--ds-color-cta-bg`
- `--ds-color-cta-text`

Theme switching:

- Light mode ist Standard (`data-theme="light"` oder kein `data-theme`)
- Dark mode via `data-theme="dark"` oder `prefers-color-scheme: dark`

## Spacing

- `--ds-space-xxx-small: 0.2rem`
- `--ds-space-xx-small: 0.4rem`
- `--ds-space-x-small: 0.8rem`
- `--ds-space-small: 1.2rem`
- `--ds-space-medium: 1.6rem`
- `--ds-space-large: 2.4rem`
- `--ds-space-x-large: 3.2rem`
- Basis:
  - `--ds-space-1: 0.25rem`
  - `--ds-space-2: 0.5rem`
  - `--ds-space-3: 0.75rem`
  - `--ds-space-4: 1rem`
  - `--ds-space-6: 1.5rem`
  - `--ds-space-8: 2rem`
  - `--ds-space-12: 3rem`
  - `--ds-space-16: 4rem`

Layout:

- `--ds-layout-page-max-width: 150rem`
- `--ds-layout-page-x-padding: 1.6rem`
- `--ds-layout-page-x-padding-large: 2.4rem`
- `--ds-layout-page-x-padding-x-large: 3.2rem`

## Radius and Borders

- `--ds-radius-sm`: `0.5rem`
- `--ds-radius-md`: `0.75rem`
- `--ds-radius-lg`: `1rem`
- `--ds-radius-pill`: `9999px`
- `--ds-border-width`: `1px`

## Motion

- `--ds-transition`: `all 150ms ease`
- `--ds-transition-faster`: `all 120ms ease`

## Component defaults for next feature work

- Buttons / interactive:
  - `color`: `var(--ds-color-cta-text)`
  - `background`: `var(--ds-color-cta-bg)`
  - `radius`: `var(--ds-radius-md)` (Pill: `var(--ds-radius-pill)`)
  - `font-weight`: `var(--ds-font-weight-bold)`
- Surface cards:
  - `background`: `var(--ds-color-sheet-background)`
  - `border`: `var(--ds-border-width) solid var(--ds-color-line)`
  - `radius`: `var(--ds-radius-lg)`
  - `padding`: `var(--ds-space-4)` bis `var(--ds-space-8)`

### Reusable shell/panel primitives

- `PageShell` (`components/ui/page-shell.tsx`)
  - container tokenized shell, `max-width` via `--ds-layout-page-max-width`
  - optional center alignment via `centered` prop
  - wraps global classes `ds-page-shell` / `ds-page-shell-center`

- `SurfacePanel` (`components/ui/panel.tsx`)
  - panel wrapper with tokenized surface, border and radius
  - uses global class `ds-surface-panel`

- Global helper classes used by both:
  - `ds-meta-badge`
  - `ds-page-shell`
  - `ds-page-shell-center`
  - `ds-surface-panel`
  - `ds-button`

### Theme variants for Tailwind

- Added in `frontend/app/globals.css`:
  - `@custom-variant dark (&:where([data-theme="dark"] *));`
  - `@custom-variant light (&:where([data-theme="light"] *), :root:not([data-theme="dark"]) *);`
- Practical effect: `dark:` utility classes now align with the `data-theme` flag and allow explicit variant usage.

## Source of truth

- Diese Werte sind bindend für neue UI-Implementierungen.
- Neue Komponenten bitte nur über `frontend/app/globals.css` konsumieren.
