import { render, screen, fireEvent } from "@testing-library/react";
import Flyout from ".";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer, { ItemsState } from "../../features/items/itemsSlice";
import { ThemeProvider } from "../../contexts/ThemeContext";

const renderWithStore = (initialState: ItemsState) => {
  const store = configureStore({
    reducer: {
      items: itemsReducer,
    },
    preloadedState: { items: initialState },
  });

  render(
    <Provider store={store}>
      <ThemeProvider>
        <Flyout />
      </ThemeProvider>
    </Provider>,
  );
  return { store };
};

describe("Flyout component", () => {
  it("renders and displays selected items count", () => {
    const initialState: ItemsState = {
      selectedItems: {
        "1": {
          name: "Luke Skywalker",
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      },
    };

    renderWithStore(initialState);

    expect(screen.getByText("1 item(s) are selected")).toBeInTheDocument();
  });

  it("generates and downloads CSV when clicking 'Download' button", () => {
    const initialState: ItemsState = {
      selectedItems: {
        "1": {
          name: "Luke Skywalker",
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      },
    };

    renderWithStore(initialState);

    const downloadLink = screen.getByText("Download") as HTMLAnchorElement;

    expect(downloadLink.download).toBe("1_persons.csv");
  });

  it("unselects all items when clicking 'Unselect all' button", () => {
    const initialState: ItemsState = {
      selectedItems: {
        "1": {
          name: "Luke Skywalker",
          birth_year: "19BBY",
          eye_color: "blue",
          gender: "male",
          hair_color: "blond",
          height: "172",
          mass: "77",
          skin_color: "fair",
          url: "https://swapi.dev/api/people/1/",
        },
      },
    };

    const { store } = renderWithStore(initialState);

    fireEvent.click(screen.getByText("Unselect all"));

    const state = store.getState() as { items: ItemsState };
    expect(state.items.selectedItems).toEqual({});
  });
});
