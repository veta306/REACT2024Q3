import { FC } from "react";
import { Outlet } from "react-router-dom";
import useSearchPhrase from "../../hooks/useSearchPhrase";
import usePageNumber from "../../hooks/usePageNumber";
import SearchSection from "../../components/SearchSection";
import CardList from "../../components/CardList";
import Pagination from "../../components/Pagination";
import { useFetchPeopleQuery } from "../../features/api/apiSlice";
import { useTheme } from "../../hooks/useTheme";
import Flyout from "../../components/Flyout";
import styles from "./MainPage.module.scss";

const MainPage: FC = () => {
  const [page, setPage] = usePageNumber();
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const { theme, toggleTheme } = useTheme();
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
        />
        <CardList persons={data?.results || []} isLoading={isFetching} />
        {!isFetching && data?.results.length !== 0 && (
          <Pagination
            currentPage={page}
            hasNextPage={Boolean(data?.next)}
            setPage={setPage}
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
      <label className={styles.toggleLabel} htmlFor="switch" />
    </main>
  );
};

export default MainPage;
