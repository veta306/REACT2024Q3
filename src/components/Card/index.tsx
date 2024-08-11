import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Person } from "../../types/Person";
import { RootState } from "../../store/store";
import { toggleSelectedItem } from "../../features/items/itemsSlice";
import styles from "./Card.module.scss";
import Image from "next/image";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  const id = person.url.match(/\/(\d+)\/$/)![1];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const isSelected = Boolean(
    useSelector((state: RootState) => state.items.selectedItems[id]),
  );

  return (
    <article
      className={styles.card}
      onClick={(e) => {
        e.stopPropagation();
        const params = new URLSearchParams(searchParams.toString());
        params.set("details", id);
        router.push(pathname + "?" + params);
      }}
    >
      <Image
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt="person photo"
        width={400}
        height={550}
      />
      <label htmlFor={id} className={styles.name}>
        {person.name}
      </label>
      <input
        id={id}
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
