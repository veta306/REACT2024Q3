import { render, screen } from "@testing-library/react";
import Spinner from "./";
import { describe, it, expect } from "vitest";

describe("Spinner component", () => {
  it("renders the spinner correctly", () => {
    render(<Spinner />);
    const spinnerOverlay = screen.getByRole("status").parentElement;
    expect(spinnerOverlay).toBeInTheDocument();
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
