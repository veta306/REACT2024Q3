import { FC } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import "./CardList.css";
import Spinner from "../Spinner";

interface Props {
  persons: Person[];
  isLoading: boolean;
}
const CardList: FC<Props> = ({ persons, isLoading }) => {
  return (
    <>
      {!isLoading && (
        <div className="cards-container">
          {persons.map((person) => (
            <Card key={person.name} person={person} />
          ))}
          {persons.length === 0 && <h1>No search results</h1>}
        </div>
      )}
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default CardList;
