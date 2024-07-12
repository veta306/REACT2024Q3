import { FC } from "react";
import Film from "../../types/Film";
import Card from "../Card";
import "./CardList.css";

interface Props {
  films: Film[];
}
const CardList: FC<Props> = ({ films }) => {
  return (
    <div className="cards-container">
      {films.map((film) => (
        <Card key={film.title} film={film} />
      ))}
      {films.length === 0 && <h1>No search results</h1>}
    </div>
  );
};

export default CardList;
