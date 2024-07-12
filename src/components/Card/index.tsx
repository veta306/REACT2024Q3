import { FC } from "react";
import Film from "../../types/Film";
import "./Card.css";

interface Props {
  film: Film;
}

const Card: FC<Props> = ({ film }) => {
  return (
    <div className="film-card">
      <div className="film-title">{film.title}</div>
      <div className="film-description">{film.opening_crawl}</div>
    </div>
  );
};

export default Card;
