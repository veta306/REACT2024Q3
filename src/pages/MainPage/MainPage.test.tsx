import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainPage from ".";
import { fetchPeople } from "../../api";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import usePageNumber from "../../hooks/usePageNumber";
import { MemoryRouter } from "react-router-dom";
import { Mock, MockedFunction } from "vitest";

vi.mock("../../api", () => ({
  fetchPeople: vi.fn(),
}));

vi.mock("../../hooks/useSearchPhrase", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../hooks/usePageNumber", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("MainPage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the MainPage with initial state", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockSetPage = vi.fn();

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    const mockFetchPeople = fetchPeople as MockedFunction<typeof fetchPeople>;

    const mockPeopleResponse = {
      results: [
        {
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          name: "Luke Skywalker",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      ],
      next: "/people/2/",
      previous: null,
      count: 1,
    };
    mockFetchPeople.mockResolvedValue(mockPeopleResponse);

    await waitFor(() => {
      render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
    });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Throw error")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Previous/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("fetches and displays people based on searchPhrase and page", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockSetPage = vi.fn();
    const mockFetchPeople = fetchPeople as MockedFunction<typeof fetchPeople>;

    const mockPeopleResponse = {
      results: [
        {
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          name: "Luke Skywalker",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      ],
      next: "/people/2/",
      previous: null,
      count: 1,
    };
    mockFetchPeople.mockResolvedValue(mockPeopleResponse);

    (useSearchPhrase as Mock).mockReturnValue([
      "Skywalker",
      mockSetSearchPhrase,
    ]);
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockFetchPeople).toHaveBeenCalledWith(1, "Skywalker");
    });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("handles page changes and updates URL", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockSetPage = vi.fn();
    const mockFetchPeople = fetchPeople as MockedFunction<typeof fetchPeople>;

    const mockPeopleResponse = {
      results: [
        {
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          name: "Luke Skywalker",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      ],
      next: "/people/2/",
      previous: null,
      count: 1,
    };
    mockFetchPeople.mockResolvedValue(mockPeopleResponse);

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    await waitFor(() => {
      render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
