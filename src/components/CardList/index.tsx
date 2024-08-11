import { FC } from "react";
import Card from "../Card";
import styles from "./CardList.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";
import { Person } from "../../types/Person";

interface Props {
  persons: Person[];
}
const CardList: FC<Props> = ({ persons }) => {
  const closeDetailedCard = useCloseDetailedCard();

  return (
    <div className={styles.cards} onClick={() => closeDetailedCard()}>
      {persons.map((person) => (
        <Card key={person.name} person={person} />
      ))}
      {persons.length === 0 && <h1>No search results</h1>}
    </div>
  );
};

export default CardList;
