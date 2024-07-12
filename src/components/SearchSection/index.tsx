import { FormEvent, useState, FC } from "react";
import "./SearchSection.css";

interface Props {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
}

const SearchSection: FC<Props> = ({ searchPhrase, setSearchPhrase }) => {
  const [searchInput, setSearchInput] = useState(searchPhrase);
  const [errorTriggered, setErrorTriggered] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchPhrase(searchInput);
  };

  if (errorTriggered) {
    throw new Error("Something went wrong");
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button className="search-button" type="submit">
        Search
      </button>
      <button
        className="error-button"
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
