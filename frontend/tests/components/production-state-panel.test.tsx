import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductionStatePanel } from "../../components";

describe("ProductionStatePanel", () => {
  it("renders default production label", () => {
    render(<ProductionStatePanel />);

    expect(screen.getByText("IN PRODUCTION")).toBeInTheDocument();
  });

  it("supports overriding the label", () => {
    render(<ProductionStatePanel label="System is live" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("System is live");
  });
});
