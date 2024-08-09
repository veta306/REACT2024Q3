import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DetailedCard from ".";
import { Person } from "../../types/Person";
import { useFetchPersonQuery } from "../../features/api/apiSlice";
import { Mock } from "vitest";

vi.mock("../../features/api/apiSlice", () => ({
  useFetchPersonQuery: vi.fn(),
}));

const mockRouterPush = vi.fn();
const mockSearchParams = new URLSearchParams("?details=1");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: () => "/?details=1",
  useSearchParams: () => mockSearchParams,
}));

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
  it("correctly displays the detailed card data", async () => {
    (useFetchPersonQuery as Mock).mockReturnValue({
      data: mockPerson,
      isFetching: false,
    });

    render(<DetailedCard />);
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
    (useFetchPersonQuery as Mock).mockReturnValue({
      data: mockPerson,
      isFetching: false,
    });

    render(<DetailedCard />);

    await waitFor(() => {
      expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    });

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("details"),
    );
    const newSearchParams = new URLSearchParams(mockSearchParams.toString());
    newSearchParams.delete("details");
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining(newSearchParams.toString()),
    );
  });
});
