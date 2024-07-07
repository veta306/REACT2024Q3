import { Component } from "react";
import Film from "../../types/Film";

interface Props {
  films: Film[];
}

export default class ResultSection extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.films.map((film) => (
          <>
            <div>{film.title}</div>
            <div>{film.opening_crawl}</div>
          </>
        ))}
      </div>
    );
  }
}
