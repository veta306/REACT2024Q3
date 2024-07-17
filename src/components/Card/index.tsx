import { FC } from "react";
import { Person } from "../../types/Person";
import { useSearchParams } from "react-router-dom";
import styles from "./Card.module.scss";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  const id = person.url.match(/\/(\d+)\/$/)![1];
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      className={styles.card}
      onClick={() => {
        setSearchParams(() => {
          searchParams.set("details", id);
          return searchParams;
        });
      }}
    >
      <img
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt="person photo"
      />
      <div className={styles.name}>{person.name}</div>
    </div>
  );
};

export default Card;
