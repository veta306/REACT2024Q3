import { FormEvent, useState, FC } from "react";
import styles from "./SearchSection.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";

interface Props {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
}

const SearchSection: FC<Props> = ({ searchPhrase, setSearchPhrase }) => {
  const [searchInput, setSearchInput] = useState(searchPhrase);
  const [errorTriggered, setErrorTriggered] = useState(false);
  const closeDetailedCard = useCloseDetailedCard();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchPhrase(searchInput);
  };

  if (errorTriggered) {
    throw new Error("Something went wrong");
  }

  return (
    <form
      className={styles.searchForm}
      onSubmit={handleSubmit}
      onClick={closeDetailedCard}
    >
      <input
        className={styles.searchInput}
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button
        className={`${styles.button} ${styles.searchButton}`}
        type="submit"
      >
        Search
      </button>
      <button
        className={`${styles.button} ${styles.errorButton}`}
        type="button"
        onClick={() => {
          setErrorTriggered(true);
        }}
      >
        Throw error
      </button>
    </form>
  );
};

export default SearchSection;
