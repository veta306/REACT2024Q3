import { FC, useEffect, useState } from "react";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import Film from "../../types/Film";
import fetchFilms from "../../api";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Spinner from "../../components/Spinner";

const MainPage: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const films = await fetchFilms(searchPhrase);
      setIsLoading(false);
      if (!ignore) {
        setFilms(films);
      }
    };
    let ignore = false;
    search();
    return () => {
      ignore = true;
    };
  }, [searchPhrase]);

  return (
    <>
      <SearchSection
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <CardList films={films} />
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default MainPage;
