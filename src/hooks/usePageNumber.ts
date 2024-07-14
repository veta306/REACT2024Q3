import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePageNumber = (): [number, Dispatch<SetStateAction<number>>] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  }, [setSearchParams, page]);
  return [page, setPage];
};

export default usePageNumber;
