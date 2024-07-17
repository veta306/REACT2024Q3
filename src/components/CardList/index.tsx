import { FC, useRef } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import Spinner from "../Spinner";
import "./CardList.css";

interface Props {
  persons: Person[];
  isLoading: boolean;
  closeDetailedCard: () => void;
}
const CardList: FC<Props> = ({ persons, isLoading, closeDetailedCard }) => {
  const cards = useRef<HTMLDivElement>(null);
  return (
    <>
      {!isLoading && (
        <div
          className="cards"
          ref={cards}
          onClick={(e) => {
            if (e.target === cards.current) closeDetailedCard();
          }}
        >
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
