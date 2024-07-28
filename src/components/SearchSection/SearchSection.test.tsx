import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mock } from "vitest";
import SearchSection from ".";
import useSearchPhrase from "../../hooks/useSearchPhrase";

vi.mock("../../hooks/useSearchPhrase", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../hooks/useCloseDetailedCard", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("SearchSection component", () => {
  it("saves the entered value to local storage when Search button is clicked", async () => {
    const mockSetSearchPhrase = vi.fn();

    (useSearchPhrase as Mock).mockReturnValue(["", mockSetSearchPhrase]);

    render(
      <SearchSection searchPhrase="" setSearchPhrase={mockSetSearchPhrase} />,
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
    const searchPhraseFromStorage = "Stored search phrase";

    (useSearchPhrase as Mock).mockReturnValue([
      searchPhraseFromStorage,
      mockSetSearchPhrase,
    ]);

    render(
      <SearchSection
        searchPhrase={searchPhraseFromStorage}
        setSearchPhrase={mockSetSearchPhrase}
      />,
    );

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toHaveValue(searchPhraseFromStorage);
  });
});
