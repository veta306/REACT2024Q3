import { FC } from "react";
import "./Pagination.css";

interface Props {
  currentPage: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  closeDetailedCard: () => void;
}

const Pagination: FC<Props> = ({
  currentPage,
  hasNextPage,
  setPage,
  closeDetailedCard,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className="pagination" onClick={closeDetailedCard}>
      <button onClick={handlePrev} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNext} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
