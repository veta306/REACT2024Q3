import { FC } from "react";
import styles from "./Spinner.module.scss";

interface Props {
  isLoading: boolean;
}

const Spinner: FC<Props> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className={styles.spinnerOverlay}>
        <div className={styles.spinner} role="status" />
      </div>
    )
  );
};

export default Spinner;
