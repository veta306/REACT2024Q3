import { FC, useEffect, useState } from "react";
import SearchSection from "./components/SearchSection";
import CardList from "./components/CardList";
import Spinner from "./components/Spinner";
import fetchFilms from "./api";
import Film from "./types/Film";

const App: FC = () => {
  const [searchPhrase, setSearchPhrase] = useState(
    localStorage.getItem("searchPhrase") || "",
  );
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      localStorage.setItem("searchPhrase", searchPhrase);
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
