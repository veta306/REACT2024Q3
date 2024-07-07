import { Component } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import SearchSection from "./components/SearchSection";
import fetchFilms from "./api";

export default class App extends Component {
  state = {
    films: [],
    searchPhrase: localStorage.getItem("searchPhrase") || "",
    isLoading: false,
  };
  search() {
    localStorage.setItem("searchPhrase", this.state.searchPhrase);
    fetchFilms(this.state.searchPhrase);
  }
  componentDidMount() {
    this.search();
  }
  componentDidUpdate() {
    this.search();
  }
  render() {
    return (
      <ErrorBoundary>
        <SearchSection
          search={(searchPhrase: string) =>
            this.setState({ searchPhrase: searchPhrase })
          }
        />
      </ErrorBoundary>
    );
  }
}
