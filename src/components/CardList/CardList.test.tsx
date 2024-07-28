import { render, screen } from "@testing-library/react";
import CardList from ".";
import { Person } from "../../types/Person";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../../features/items/itemsSlice";

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
    selectedItems: selectedItemsReducer,
  },
});

const mockCloseDetailedCard = vi.fn();

describe("CardList component", () => {
  it("renders the specified number of cards", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList
            persons={mockPersons}
            isLoading={false}
            closeDetailedCard={mockCloseDetailedCard}
          />
        </MemoryRouter>
      </Provider>,
    );

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(mockPersons.length);
  });

  it("displays the appropriate message if no cards are present", () => {
    render(
      <CardList
        persons={[]}
        isLoading={false}
        closeDetailedCard={mockCloseDetailedCard}
      />,
    );

    const message = screen.getByText(/no search results/i);
    expect(message).toBeInTheDocument();
  });

  it("renders the spinner when loading", () => {
    render(
      <CardList
        persons={[]}
        isLoading={true}
        closeDetailedCard={mockCloseDetailedCard}
      />,
    );

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
