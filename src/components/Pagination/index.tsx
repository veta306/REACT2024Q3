import { FC } from "react";
import styles from "./Pagination.module.scss";
import useCloseDetailedCard from "../../hooks/useCloseDetailedCard";

interface Props {
  currentPage: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
}

const Pagination: FC<Props> = ({ currentPage, hasNextPage, setPage }) => {
  const closeDetailedCard = useCloseDetailedCard();
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    setPage(currentPage + 1);
  };

  return (
    <div className={styles.pagination} onClick={closeDetailedCard}>
      <button
        className={styles.changeButton}
        onClick={handlePrev}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className={styles.pageNumber}>Page {currentPage}</span>
      <button
        className={styles.changeButton}
        onClick={handleNext}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
