import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { Person } from "../../types/Person";
import Card from ".";

const mockSetSearchParams = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), mockSetSearchParams]),
  };
});

const mockPerson: Person = {
  birth_year: "19BBY",
  eye_color: "blue",
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  name: "Luke Skywalker",
  skin_color: "fair",
  url: "https://swapi.dev/api/people/1/",
};

describe("Card component", () => {
  it("renders the relevant card data", () => {
    render(
      <MemoryRouter>
        <Card person={mockPerson} />
      </MemoryRouter>,
    );

    const nameElement = screen.getByText(mockPerson.name);
    expect(nameElement).toBeInTheDocument();

    const imgElement = screen.getByAltText(/person photo/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      expect.stringContaining("/1.jpg"),
    );
  });

  it("opens a detailed card component on click", () => {
    const [searchParams, setSearchParams] = useSearchParams();
    render(
      <MemoryRouter>
        <Card person={mockPerson} />
      </MemoryRouter>,
    );

    const cardElement = screen.getByRole("article");
    fireEvent.click(cardElement);

    expect(setSearchParams).toHaveBeenCalled();
    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));

    searchParams.set("details", "1");
    mockSetSearchParams.mock.calls[0][0](searchParams);
    expect(searchParams.toString()).toContain("details=1");
  });
});
