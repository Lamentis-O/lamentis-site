import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter, SiteHome } from "../components";
import { contentByLocale } from "../domain/site/content";

describe("Homepage shell", () => {
  it("renders the German homepage as an empty shell with localized footer", () => {
    render(
      <>
        <SiteHome copy={contentByLocale.de} />
        <SiteFooter locale="de" content={contentByLocale.de.footer} />
      </>,
    );

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: contentByLocale.de.footer.legal.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: contentByLocale.de.footer.brand }),
    ).toHaveAttribute("href", "/de");
    expect(
      screen.getByRole("link", {
        name: contentByLocale.de.footer.legal.links[2].label,
      }),
    ).toHaveAttribute("href", "/de/legal-notice");
    expect(screen.queryByText("IN PRODUCTION")).not.toBeInTheDocument();
    expect(
      screen.queryByText("One place for plans, people, and events."),
    ).not.toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders footer sections and opens language switcher with both locales", () => {
    render(<SiteFooter locale="en" content={contentByLocale.en.footer} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: contentByLocale.en.footer.platform.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: contentByLocale.en.footer.account.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: contentByLocale.en.footer.legal.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: contentByLocale.en.footer.social.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Log in")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("Sign up")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("Privacy Policy")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(
      screen.getByRole("link", { name: "GitHub" }),
    ).toHaveAttribute("target", "_blank");

    expect(screen.getByRole("option", { name: "English" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("option", { name: "Deutsch" })).toHaveAttribute("href", "/de");
    expect(screen.getByRole("option", { name: "English" })).toHaveAttribute("aria-selected", "true");
  });
});
