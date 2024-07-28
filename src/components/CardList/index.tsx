import { FC } from "react";
import Card from "../Card";
import Spinner from "../Spinner";
import styles from "./CardList.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";
import { Person } from "../../types/Person";

interface Props {
  persons: Person[];
  isLoading: boolean;
}
const CardList: FC<Props> = ({ persons, isLoading }) => {
  const closeDetailedCard = useCloseDetailedCard();

  return (
    <>
      {!isLoading ? (
        <div className={styles.cards} onClick={() => closeDetailedCard()}>
          {persons.map((person) => (
            <Card key={person.name} person={person} />
          ))}
          {persons.length === 0 && <h1>No search results</h1>}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CardList;
