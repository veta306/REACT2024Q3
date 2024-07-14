import { FC } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import Spinner from "../Spinner";
import "./CardList.css";

interface Props {
  persons: Person[];
  isLoading: boolean;
}
const CardList: FC<Props> = ({ persons, isLoading }) => {
  return (
    <>
      {!isLoading && (
        <div className="cards">
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
