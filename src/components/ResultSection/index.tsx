import { Component } from "react";
import Film from "../../types/Film";
import "./ResultSection.css";

interface Props {
  films: Film[];
}

export default class ResultSection extends Component<Props> {
  render() {
    return (
      <div className="result-container">
        {this.props.films.map((film) => (
          <div key={film.title} className="film-card">
            <div className="film-title">{film.title}</div>
            <div className="film-description">{film.opening_crawl}</div>
          </div>
        ))}
        {this.props.films.length === 0 && <h1>No search results</h1>}
      </div>
    );
  }
}
