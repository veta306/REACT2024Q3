import { Component, ReactNode } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import SearchSection from "./components/SearchSection";
import fetchFilms from "./api";
import Spinner from "./components/Spinner";
import Film from "./types/Film";
import ResultSection from "./components/ResultSection";

interface Props {
  children?: ReactNode;
}

interface State {
  films: Film[];
  searchPhrase: string;
  isLoading: boolean;
}

export default class App extends Component<Props, State> {
  state: State = {
    films: [],
    searchPhrase: localStorage.getItem("searchPhrase") || "",
    isLoading: false,
  };
  async search() {
    localStorage.setItem("searchPhrase", this.state.searchPhrase);
    this.setState({ isLoading: true });
    const films = await fetchFilms(this.state.searchPhrase);
    this.setState({ films: films });
    this.setState({ isLoading: false });
  }
  componentDidMount() {
    this.search();
  }
  componentDidUpdate(_: Props, prevState: State) {
    if (prevState.searchPhrase !== this.state.searchPhrase) this.search();
  }
  render() {
    return (
      <ErrorBoundary>
        <SearchSection
          search={(searchPhrase: string) =>
            this.setState({ searchPhrase: searchPhrase })
          }
        />
        <ResultSection films={this.state.films} />
        <Spinner isLoading={this.state.isLoading} />
      </ErrorBoundary>
    );
  }
}
