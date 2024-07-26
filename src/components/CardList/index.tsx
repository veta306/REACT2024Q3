import { FC } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import Spinner from "../Spinner";
import styles from "./CardList.module.scss";

interface Props {
  persons: Person[];
  isLoading: boolean;
  closeDetailedCard: () => void;
}
const CardList: FC<Props> = ({ persons, isLoading, closeDetailedCard }) => {
  return (
    <>
      {!isLoading && (
        <div className={styles.cards} onClick={() => closeDetailedCard()}>
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
