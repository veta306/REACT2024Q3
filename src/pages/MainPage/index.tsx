import { FC, useEffect, useState } from "react";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import Film from "../../types/Film";
import fetchFilms from "../../api";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Spinner from "../../components/Spinner";
import usePageNumber from "../../hooks/usePageNumber";
import Pagination from "../../components/Pagination";

const MainPage: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = usePageNumber();
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const response = await fetchFilms(page, searchPhrase);
      setIsLoading(false);
      if (!ignore) {
        setFilms(response.results);
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
        setSearchPhrase={setSearchPhrase}
      />
      <CardList films={films} />
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
