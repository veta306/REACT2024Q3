import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./DetailedCard.css";
import { fetchPerson } from "../../api";
import { Person } from "../../types/Person";
import Spinner from "../Spinner";

const DetailedCard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsLoading] = useState(false);
  const id = searchParams.get("details");

  useEffect(() => {
    if (id) {
      const getDetails = async () => {
        setIsLoading(true);
        const response = await fetchPerson(id);
        if (!ignore) {
          setIsLoading(false);
          setPerson(response);
        }
      };
      let ignore = false;
      getDetails();
      return () => {
        ignore = true;
      };
    }
  }, [id]);

  const handleClose = () => {
    setSearchParams((prev) => {
      prev.delete("details");
      return prev;
    });
    searchParams.delete("details");
  };

  return (
    <>
      {id && (
        <div className="details">
          {!isLoading && person && (
            <div className="details-content">
              <button className="close-button" onClick={handleClose}>
                ×
              </button>
              <img
                src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
                alt="person photo"
              />
              <h1>{person.name}</h1>
              <p>Birth Year: {person.birth_year}</p>
              <p>Eye Color: {person.eye_color}</p>
              <p>Gender: {person.gender}</p>
              <p>Hair Color: {person.hair_color}</p>
              <p>Height: {person.height} cm</p>
              <p>Mass: {person.mass} kg</p>
              <p>Skin Color: {person.skin_color}</p>
            </div>
          )}
          <Spinner isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default DetailedCard;
