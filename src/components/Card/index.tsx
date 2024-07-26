import { FC } from "react";
import { Person } from "../../types/Person";
import { useSearchParams } from "react-router-dom";
import styles from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toggleSelectedItem } from "../../features/selectedItems/selectedItemsSlice";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  const id = person.url.match(/\/(\d+)\/$/)![1];
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const isSelected = Boolean(
    useSelector((state: RootState) => state.selectedItems.items[id]),
  );

  return (
    <article
      className={styles.card}
      onClick={(e) => {
        e.stopPropagation();
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
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isSelected}
        onClick={(e) => e.stopPropagation()}
        onChange={() => dispatch(toggleSelectedItem({ id, item: person }))}
      />
    </article>
  );
};

export default Card;
