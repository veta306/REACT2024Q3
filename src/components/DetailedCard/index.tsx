import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchPersonQuery } from "../../api";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Spinner from "../Spinner";
import styles from "./DetailedCard.module.scss";

const DetailedCard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("details");

  const { data: person, isFetching } = useFetchPersonQuery(id || skipToken);

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("details");
      return prev;
    });
  };

  return (
    <>
      {id && (
        <div className={styles.details}>
          {!isFetching && person && (
            <>
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
              <h1>{person.name}</h1>
              <img
                src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
                alt="person photo"
              />
              <p>Birth Year: {person.birth_year}</p>
              <p>Eye Color: {person.eye_color}</p>
              <p>Gender: {person.gender}</p>
              <p>Hair Color: {person.hair_color}</p>
              <p>Height: {person.height} cm</p>
              <p>Mass: {person.mass} kg</p>
              <p>Skin Color: {person.skin_color}</p>
            </>
          )}
          <Spinner isLoading={isFetching} />
        </div>
      )}
    </>
  );
};

export default DetailedCard;
