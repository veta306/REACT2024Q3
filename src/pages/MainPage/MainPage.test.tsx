import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MainPage from ".";
import { useFetchPeopleQuery } from "../../features/api/apiSlice";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import usePageNumber from "../../hooks/usePageNumber";
import { Mock } from "vitest";
import { ThemeProvider } from "../../contexts/ThemeContext";
import itemsReducer from "../../features/items/itemsSlice";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("../../features/api/apiSlice", () => ({
  useFetchPeopleQuery: vi.fn(),
}));

vi.mock("../../hooks/useSearchPhrase", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../hooks/usePageNumber", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

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

    (useFetchPeopleQuery as Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Throw error")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("fetches and displays people based on searchPhrase and page", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockSetPage = vi.fn();
    const mockFetchPeople = useFetchPeopleQuery as Mock;

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

    mockFetchPeople.mockReturnValue({
      data: mockPeopleResponse,
      isFetching: false,
    });

    (useSearchPhrase as Mock).mockReturnValue([
      "Skywalker",
      mockSetSearchPhrase,
    ]);
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(mockFetchPeople).toHaveBeenCalledWith({
        page: 1,
        searchPhrase: "Skywalker",
      });
    });

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("handles page changes and updates URL", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockSetPage = vi.fn();
    const mockFetchPeople = useFetchPeopleQuery as Mock;

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

    mockFetchPeople.mockReturnValue({
      data: mockPeopleResponse,
      isFetching: false,
    });

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
