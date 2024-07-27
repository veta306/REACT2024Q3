import { FC } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import usePageNumber from "../../hooks/usePageNumber";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { useFetchPeopleQuery } from "../../features/api/apiSlice";
import styles from "./MainPage.module.scss";
import { useTheme } from "../../hooks/useTheme";
import Flyout from "../../components/Flyout";

const MainPage: FC = () => {
  const [page, setPage] = usePageNumber();
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
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

  const { data, isFetching } = useFetchPeopleQuery({
    page,
    searchPhrase,
  });
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
          persons={data?.results || []}
          isLoading={isFetching}
          closeDetailedCard={closeDetailedCard}
        />
        {!isFetching && data?.results.length !== 0 && (
          <Pagination
            currentPage={page}
            hasNextPage={Boolean(data?.next)}
            setPage={setPage}
            closeDetailedCard={closeDetailedCard}
          />
        )}
      </div>
      <Outlet />
      <Flyout />
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
