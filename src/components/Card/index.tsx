import { FC } from "react";
import { Person } from "../../types/Person";
import "./Card.css";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  const id = person.url.match(/\/(\d+)\/$/)![1];
  return (
    <div className="card">
      <img
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt="person photo"
      />
      <div className="name">{person.name}</div>
    </div>
  );
};

export default Card;
