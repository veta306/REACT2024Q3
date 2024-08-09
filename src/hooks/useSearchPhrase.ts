import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSearchPhrase = (): [string, Dispatch<SetStateAction<string>>] => {
  const isClient = typeof window !== "undefined";

  const [searchPhrase, setSearchPhrase] = useState(
    isClient ? localStorage.getItem("searchPhrase") || "" : "",
  );

  useEffect(() => {
    localStorage.setItem("searchPhrase", searchPhrase);
  }, [searchPhrase]);

  return [searchPhrase, setSearchPhrase];
};

export default useSearchPhrase;
