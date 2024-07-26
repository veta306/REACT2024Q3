import { FC, useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import usePageNumber from "../../hooks/usePageNumber";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { Person } from "../../types/Person";
import { fetchPeople } from "../../api";
import styles from "./MainPage.module.scss";
import { useTheme } from "../../hooks/useTheme";

const MainPage: FC = () => {
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = usePageNumber();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { theme, toggleTheme } = useTheme();

  const closeDetailedCard = () => {
    if (searchParams.has("details")) {
      setSearchParams(() => {
        searchParams.delete("details");
        return searchParams;
      });
    }
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
    <main className={styles.main}>
      <div className={styles.mainPanel}>
        <SearchSection
          searchPhrase={searchPhrase}
          setSearchPhrase={(searchPhrase: string) => {
            setSearchPhrase(searchPhrase);
            setPage(1);
          }}
          closeDetailedCard={closeDetailedCard}
        />
        <CardList
          persons={persons}
          isLoading={isLoading}
          closeDetailedCard={closeDetailedCard}
        />
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
      <p className={styles.toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </p>
      <input
        className={styles.toggleInput}
        type="checkbox"
        id="switch"
        onClick={toggleTheme}
      />
      <label className={styles.toggleLabel} htmlFor="switch">
        Toggle
      </label>
    </main>
  );
};

export default MainPage;
