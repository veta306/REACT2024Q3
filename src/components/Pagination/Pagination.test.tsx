import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Pagination from ".";
import usePageNumber from "../../hooks/usePageNumber";
import { Mock } from "vitest";

vi.mock("../../hooks/usePageNumber", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Pagination component", () => {
  it("updates the page number and URL query parameter when 'Next' is clicked", async () => {
    const mockSetPage = vi.fn();
    const mockCloseDetailedCard = vi.fn();
    (usePageNumber as Mock).mockReturnValue([1, mockSetPage]);

    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          hasNextPage={true}
          setPage={mockSetPage}
          closeDetailedCard={mockCloseDetailedCard}
        />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(2);
    });
  });

  it("updates the page number and URL query parameter when 'Previous' is clicked", async () => {
    const mockSetPage = vi.fn();
    const mockCloseDetailedCard = vi.fn();
    (usePageNumber as Mock).mockReturnValue([2, mockSetPage]);

    render(
      <MemoryRouter>
        <Pagination
          currentPage={2}
          hasNextPage={true}
          setPage={mockSetPage}
          closeDetailedCard={mockCloseDetailedCard}
        />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mockSetPage).toHaveBeenCalledWith(1);
    });
  });

  it("disables the 'Previous' button on the first page", () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          hasNextPage={true}
          setPage={() => {}}
          closeDetailedCard={() => {}}
        />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("disables the 'Next' button when there is no next page", () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          hasNextPage={false}
          setPage={() => {}}
          closeDetailedCard={() => {}}
        />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
