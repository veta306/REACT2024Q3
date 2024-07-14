import { FC } from "react";
import { Person } from "../../types/Person";
import "./Card.css";

interface Props {
  person: Person;
}

const Card: FC<Props> = ({ person }) => {
  return (
    <div className="card">
      <div className="name">{person.name}</div>
    </div>
  );
};

export default Card;
