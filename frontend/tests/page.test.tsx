import { describe, expect, it } from "vitest";
import { resolveLocaleFromAcceptLanguage } from "../domain/site/content";

describe("Locale detection", () => {
  it("prefers German when Accept-Language contains de", () => {
    expect(resolveLocaleFromAcceptLanguage("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
  });

  it("falls back to English when no language is recognized", () => {
    expect(resolveLocaleFromAcceptLanguage("fr-FR,es;q=0.9")).toBe("en");
  });

  it("uses English as default when header is missing", () => {
    expect(resolveLocaleFromAcceptLanguage(null)).toBe("en");
  });
});
