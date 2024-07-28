import { FC } from "react";
import styles from "./Spinner.module.scss";

const Spinner: FC = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner} role="status" />
    </div>
  );
};

export default Spinner;
