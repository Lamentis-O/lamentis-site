import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "../components/site/site-footer";
import { SiteHome } from "../components/site/site-home";
import { contentByLocale } from "../lib/home-content";

describe("Homepage shell", () => {
  it("renders the German homepage as an empty shell with localized footer", () => {
    render(<SiteHome locale="de" copy={contentByLocale.de} />);

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
        name: contentByLocale.de.footer.legal.links[0].label,
      }),
    ).toHaveAttribute("href", "/de/privacy-policy");
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

    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/en/privacy-policy",
    );
    expect(
      screen.getByRole("link", { name: "Instagram" }),
    ).toHaveAttribute("target", "_blank");

    expect(screen.getByRole("option", { name: "English" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("option", { name: "Deutsch" })).toHaveAttribute("href", "/de");
    expect(screen.getByRole("option", { name: "English" })).toHaveAttribute("aria-selected", "true");
  });
});
