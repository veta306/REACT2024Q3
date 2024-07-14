import { FC, useEffect, useState } from "react";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import { Person } from "../../types/Person";
import fetchPeople from "../../api";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Spinner from "../../components/Spinner";
import usePageNumber from "../../hooks/usePageNumber";
import Pagination from "../../components/Pagination";

const MainPage: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = usePageNumber();
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const response = await fetchPeople(page, searchPhrase);
      setIsLoading(false);
      if (!ignore) {
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
    <>
      <SearchSection
        searchPhrase={searchPhrase}
        setSearchPhrase={(searchPhrase: string) => {
          setSearchPhrase(searchPhrase);
          setPage(1);
        }}
      />
      <CardList persons={persons} />
      <Pagination
        currentPage={page}
        hasNextPage={hasNextPage}
        setPage={setPage}
      />
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default MainPage;
