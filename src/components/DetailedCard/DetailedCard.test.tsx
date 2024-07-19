import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailedCard from ".";
import { Person } from "../../types/Person";
import { fetchPerson } from "../../api";
import { Mock } from "vitest";

vi.mock("../../api", () => ({
  fetchPerson: vi.fn(),
}));

const mockSetSearchParams = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(() => [
      new URLSearchParams({ details: "1" }),
      mockSetSearchParams,
    ]),
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

describe("DetailedCard component", () => {
  it("displays a loading indicator while fetching data", async () => {
    (fetchPerson as Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockPerson), 100)),
    );

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
  });

  it("correctly displays the detailed card data", async () => {
    (fetchPerson as Mock).mockResolvedValue(mockPerson);

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Birth Year: ${mockPerson.birth_year}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Eye Color: ${mockPerson.eye_color}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Gender: ${mockPerson.gender}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Hair Color: ${mockPerson.hair_color}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Height: ${mockPerson.height} cm`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Mass: ${mockPerson.mass} kg`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Skin Color: ${mockPerson.skin_color}`),
      ).toBeInTheDocument();
    });
  });

  it("hides the component when clicking the close button", async () => {
    (fetchPerson as Mock).mockResolvedValue(mockPerson);

    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    mockSetSearchParams.mock.calls[0][0](new URLSearchParams());
    expect(new URLSearchParams().toString()).not.toContain("details=1");
  });
});
