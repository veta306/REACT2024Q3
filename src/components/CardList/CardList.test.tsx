import { render, screen } from "@testing-library/react";
import CardList from ".";
import { Person } from "../../types/Person";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../../features/items/itemsSlice";

vi.mock("../../hooks/useCloseDetailedCard", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockRouterPush = vi.fn();
const mockSearchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: () => "/",
  useSearchParams: () => mockSearchParams,
}));

const mockPersons: Person[] = [
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
  {
    birth_year: "112BBY",
    eye_color: "yellow",
    gender: "n/a",
    hair_color: "n/a",
    height: "167",
    mass: "75",
    name: "C-3PO",
    skin_color: "gold",
    url: "https://swapi.dev/api/people/2/",
  },
];

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

describe("CardList component", () => {
  it("renders the specified number of cards", () => {
    render(
      <Provider store={store}>
        <CardList persons={mockPersons} isLoading={false} />
      </Provider>,
    );

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(mockPersons.length);
  });

  it("displays the appropriate message if no cards are present", () => {
    render(<CardList persons={[]} isLoading={false} />);

    const message = screen.getByText(/no search results/i);
    expect(message).toBeInTheDocument();
  });

  it("renders the spinner when loading", () => {
    render(<CardList persons={[]} isLoading={true} />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
