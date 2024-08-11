/* eslint-disable react-refresh/only-export-components */
import { FC } from "react";
import useSearchPhrase from "../hooks/useSearchPhrase";
import usePageNumber from "../hooks/usePageNumber";
import SearchSection from "../components/SearchSection";
import CardList from "../components/CardList";
import Pagination from "../components/Pagination";
import apiSlice, {
  ApiResponse,
  getRunningQueriesThunk,
} from "../features/api/apiSlice";
import { useTheme } from "../hooks/useTheme";
import Flyout from "../components/Flyout";
import styles from "../styles/MainPage.module.scss";
import DetailedCard from "../components/DetailedCard";
import { wrapper } from "../store/store";
import { normalizeQuery } from "../functions/normalizeQuery";
import { Person } from "../types/Person";

interface Props {
  items: ApiResponse;
  details: Person | undefined;
}

const MainPage: FC<Props> = ({ items, details }) => {
  const [page, setPage] = usePageNumber();
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className={`${styles.main} ${styles[theme]}`}>
      <div className={styles.mainPanel}>
        <SearchSection
          searchPhrase={searchPhrase}
          setSearchPhrase={(searchPhrase: string) => {
            setPage(1);
            setSearchPhrase(searchPhrase);
          }}
        />
        {items && <CardList persons={items.results} />}
        {items && items?.results.length !== 0 && (
          <Pagination
            currentPage={page}
            hasNextPage={Boolean(items?.next)}
            setPage={setPage}
          />
        )}
      </div>
      <DetailedCard person={details} />
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { searchPhrase, page, details } = normalizeQuery(context.query);

    const items = await store.dispatch(
      apiSlice.endpoints.fetchPeople.initiate({
        searchPhrase: searchPhrase ?? "",
        page: page,
      }),
    );
    let person;
    if (details) {
      person = await store.dispatch(
        apiSlice.endpoints.fetchPerson.initiate(details),
      );
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        items: items?.data,
        details: person?.data ?? null,
      },
    };
  },
);

export default MainPage;
