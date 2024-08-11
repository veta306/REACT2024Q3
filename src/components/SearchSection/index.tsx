import { FormEvent, useState, FC } from "react";
import styles from "./SearchSection.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";

interface Props {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
}

const SearchSection: FC<Props> = ({ searchPhrase, setSearchPhrase }) => {
  const [searchInput, setSearchInput] = useState(searchPhrase);
  const closeDetailedCard = useCloseDetailedCard();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchPhrase(searchInput);
  };

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
      <button className={styles.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchSection;
