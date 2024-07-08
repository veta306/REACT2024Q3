import { ChangeEvent, Component, FormEvent } from "react";
import "./SearchSection.css";

interface Props {
  search: (searchPhrase: string) => void;
}

interface State {
  searchInput: string;
  errorTriggered: boolean;
}

export default class SearchSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchInput: localStorage.getItem("searchPhrase") || "",
      errorTriggered: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchInput: e.target.value });
  }
  handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.search(this.state.searchInput);
  }
  render() {
    if (this.state.errorTriggered) {
      throw new Error("Something went wrong");
    }
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          className="search-input"
          type="text"
          onChange={this.handleInput}
          value={this.state.searchInput}
        />
        <button className="search-button" type="submit">
          Search
        </button>
        <button
          className="error-button"
          type="button"
          onClick={() => {
            this.setState({ errorTriggered: true });
          }}
        >
          Throw error
        </button>
      </form>
    );
  }
}
