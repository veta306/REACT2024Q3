import { FC, useEffect, useState } from "react";
import SearchSection from "./components/SearchSection";
import CardList from "./components/CardList";
import Spinner from "./components/Spinner";
import fetchFilms from "./api";
import Film from "./types/Film";
import useSearchPhrase from "./hooks/useSearchPhrase";

const App: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const films = await fetchFilms(searchPhrase);
      setFilms(films);
      setIsLoading(false);
    };
    search();
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

export default App;
