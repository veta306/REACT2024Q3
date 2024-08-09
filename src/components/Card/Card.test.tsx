import { render, screen, fireEvent } from "@testing-library/react";
import { Person } from "../../types/Person";
import Card from ".";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../../features/items/itemsSlice";

const mockRouterPush = vi.fn();
const mockSearchParams = new URLSearchParams();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: () => "/",
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

const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

describe("Card component", () => {
  it("renders the relevant card data", () => {
    render(
      <Provider store={store}>
        <Card person={mockPerson} />
      </Provider>,
    );

    const nameElement = screen.getByText(mockPerson.name);
    expect(nameElement).toBeInTheDocument();

    const imgElement = screen.getByAltText(/person photo/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Fvieraboschkova.github.io%2Fswapi-gallery%2Fstatic%2Fassets%2Fimg%2Fpeople%2F1.jpg&w=828&q=75",
      ),
    );
  });

  it("opens a detailed card component on click", () => {
    render(
      <Provider store={store}>
        <Card person={mockPerson} />
      </Provider>,
    );

    const cardElement = screen.getByRole("article");
    fireEvent.click(cardElement);

    expect(mockRouterPush).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining("details=1"),
    );

    mockSearchParams.set("details", "1");
    expect(mockSearchParams.toString()).toContain("details=1");
  });
});
