import { render, screen } from "@testing-library/react";
import ErrorPage from ".";
import { MemoryRouter } from "react-router-dom";

describe("ErrorPage component", () => {
  it("renders the error page with correct elements", () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
    const link = screen.getByText("Go to main page");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
