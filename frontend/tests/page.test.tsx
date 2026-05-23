import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders the shared production component", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("IN PRODUCTION");
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("font-black");
  });
});
