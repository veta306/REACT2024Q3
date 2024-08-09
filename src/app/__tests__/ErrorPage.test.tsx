import { render, screen } from "@testing-library/react";
import ErrorPage from "../not-found";

describe("ErrorPage component", () => {
  it("renders the error page with correct elements", () => {
    render(<ErrorPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Not found")).toBeInTheDocument();
    const link = screen.getByText("Go to main page");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
