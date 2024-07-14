import { FC, useEffect, useState } from "react";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import { Person } from "../../types/Person";
import { fetchPeople } from "../../api";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import usePageNumber from "../../hooks/usePageNumber";
import Pagination from "../../components/Pagination";
import { Outlet, useSearchParams } from "react-router-dom";
import "./MainPage.css";

const MainPage: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = usePageNumber();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const closeDetailedCard = () => {
    setSearchParams(() => {
      searchParams.delete("details");
      return searchParams;
    });
  };

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const response = await fetchPeople(page, searchPhrase);
      if (!ignore) {
        setIsLoading(false);
        setPersons(response.results);
        setHasNextPage(Boolean(response.next));
      }
    };
    let ignore = false;
    search();
    return () => {
      ignore = true;
    };
  }, [page, searchPhrase]);

  return (
    <main className="main">
      <div className="main-panel">
        <SearchSection
          searchPhrase={searchPhrase}
          setSearchPhrase={(searchPhrase: string) => {
            setSearchPhrase(searchPhrase);
            setPage(1);
          }}
          closeDetailedCard={closeDetailedCard}
        />
        <CardList persons={persons} isLoading={isLoading} />
        {!isLoading && persons.length !== 0 && (
          <Pagination
            currentPage={page}
            hasNextPage={hasNextPage}
            setPage={setPage}
            closeDetailedCard={closeDetailedCard}
          />
        )}
      </div>
      <Outlet />
    </main>
  );
};

export default MainPage;
