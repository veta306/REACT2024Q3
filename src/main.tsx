import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import "./index.css";
import ControlledForm from "./pages/Controlled/ControlledForm";
import UncontrolledForm from "./pages/Uncontrolled/UncontrolledForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/controlled",
    element: <ControlledForm />,
  },
  {
    path: "/uncontrolled",
    element: <UncontrolledForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
