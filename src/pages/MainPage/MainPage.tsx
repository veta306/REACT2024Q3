import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";

const MainPage: FC = () => {
  const submissions = useSelector(
    (state: RootState) => state.submissions.submissions,
  );

  return (
    <div>
      <nav className={styles.navbar}>
        <Link className={styles.link} to="/uncontrolled">
          Uncontrolled Form
        </Link>
        <Link className={styles.link} to="/controlled">
          Controlled Form
        </Link>
      </nav>
      <div>
        <h2 className={styles.title}>Submissions</h2>
        <div className={styles.submissionsContainer}>
          {submissions.map((submission, index) => (
            <div
              key={index}
              className={`${styles.submissionCard} ${index === 0 ? `${styles.highlighted}` : ""}`}
            >
              <SubmissionCard submission={submission} />
            </div>
          ))}
        </div>
        {submissions.length === 0 && (
          <h2 className={styles.title}>No submissions yet</h2>
        )}
      </div>
    </div>
  );
};

export default MainPage;
