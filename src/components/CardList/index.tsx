import { FC } from "react";
import Card from "../Card";
import { Person } from "../../types/Person";
import { Outlet, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner";
import "./CardList.css";

interface Props {
  persons: Person[];
  isLoading: boolean;
}
const CardList: FC<Props> = ({ persons, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      {!isLoading && (
        <div className="card-list">
          <div
            className="cards"
            onClick={() => {
              if (searchParams.has("details"))
                setSearchParams((prev) => {
                  prev.delete("details");
                  return prev;
                });
            }}
          >
            {persons.map((person) => (
              <Card key={person.name} person={person} />
            ))}
            {persons.length === 0 && <h1>No search results</h1>}
          </div>
          <Outlet />
        </div>
      )}
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default CardList;
