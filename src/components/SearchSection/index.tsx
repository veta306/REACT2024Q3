import { ChangeEvent, Component, FormEvent } from "react";

interface Props {
  search: (searchPhrase: string) => void;
}

interface State {
  searchInput: string;
}

export default class SearchSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchInput: localStorage.getItem("searchPhrase") || "" };
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
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleInput}
          value={this.state.searchInput}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
