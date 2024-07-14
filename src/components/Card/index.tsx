import { FC } from "react";
import { Person } from "../../types/Person";
import "./Card.css";
import { useSearchParams } from "react-router-dom";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  const id = person.url.match(/\/(\d+)\/$/)![1];
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      className="card"
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
      <div className="name">{person.name}</div>
    </div>
  );
};

export default Card;
