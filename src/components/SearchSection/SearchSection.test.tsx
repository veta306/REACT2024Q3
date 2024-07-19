import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchSection from ".";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import { Mock } from "vitest";

vi.mock("../../hooks/useSearchPhrase", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("SearchSection component", () => {
  it("saves the entered value to local storage when Search button is clicked", async () => {
    const mockSetSearchPhrase = vi.fn();
    const mockCloseDetailedCard = vi.fn();

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);

    render(
      <SearchSection
        searchPhrase=""
        setSearchPhrase={mockSetSearchPhrase}
        closeDetailedCard={mockCloseDetailedCard}
      />,
    );

    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "Test search" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchPhrase).toHaveBeenCalledWith("Test search");
    });
  });

  it("retrieves the value from local storage upon mounting", () => {
    const mockSetSearchPhrase = vi.fn();
    const mockCloseDetailedCard = vi.fn();
    const searchPhraseFromStorage = "Stored search phrase";

    (useSearchPhrase as Mock).mockReturnValue([
      searchPhraseFromStorage,
      mockSetSearchPhrase,
    ]);

    render(
      <SearchSection
        searchPhrase={searchPhraseFromStorage}
        setSearchPhrase={mockSetSearchPhrase}
        closeDetailedCard={mockCloseDetailedCard}
      />,
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toHaveValue(searchPhraseFromStorage);
  });

  it("throws an error when 'Throw error' button is clicked", () => {
    const mockSetSearchPhrase = vi.fn();
    const mockCloseDetailedCard = vi.fn();

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);

    render(
      <SearchSection
        searchPhrase=""
        setSearchPhrase={mockSetSearchPhrase}
        closeDetailedCard={mockCloseDetailedCard}
      />,
    );
    const errorButton = screen.getByText("Throw error");
    expect(() => fireEvent.click(errorButton)).toThrow("Something went wrong");
  });
});
