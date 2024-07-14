import { FC } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import "./CardList.css";

interface Props {
  persons: Person[];
}
const CardList: FC<Props> = ({ persons }) => {
  return (
    <div className="cards-container">
      {persons.map((person) => (
        <Card key={person.name} person={person} />
      ))}
      {persons.length === 0 && <h1>No search results</h1>}
    </div>
  );
};

export default CardList;
