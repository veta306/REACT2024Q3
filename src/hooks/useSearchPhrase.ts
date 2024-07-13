import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSearchPhrase = (): [string, Dispatch<SetStateAction<string>>] => {
  const [searchPhrase, setSearchPhrase] = useState(
    localStorage.getItem("searchPhrase") || "",
  );

  useEffect(() => {
    localStorage.setItem("searchPhrase", searchPhrase);
  }, [searchPhrase]);

  return [searchPhrase, setSearchPhrase];
};

export default useSearchPhrase;
