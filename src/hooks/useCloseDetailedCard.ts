import { useSearchParams } from "react-router-dom";

const useCloseDetailedCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeDetailedCard = () => {
    if (searchParams.has("details")) {
      setSearchParams(() => {
        searchParams.delete("details");
        return searchParams;
      });
    }
  };

  return closeDetailedCard;
};

export default useCloseDetailedCard;
