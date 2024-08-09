"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "../contexts/ThemeContext";
import { store } from "../store/store";
import ErrorBoundary from "../components/ErrorBoundary";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
