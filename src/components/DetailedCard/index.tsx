import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchPersonQuery } from "../../features/api/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Spinner from "../Spinner";
import styles from "./DetailedCard.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";
import Image from "next/image";

const DetailedCard: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("details");
  const handleClose = useCloseDetailedCard();

  const { data: person, isFetching } = useFetchPersonQuery(id || skipToken);

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
              <Image
                src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
                alt="person photo"
                width={400}
                height={550}
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
          {isFetching && <Spinner />}
        </div>
      )}
    </>
  );
};

export default DetailedCard;
