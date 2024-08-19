import { FC } from "react";
import { SubmitData } from "../../utils/types";
import styles from "./SubmissionCard.module.scss";

interface Props {
  submission: SubmitData;
}

export const SubmissionCard: FC<Props> = ({ submission }) => {
  const {
    name,
    email,
    age,
    gender,
    country,
    files: picture,
    password,
  } = submission;

  return (
    <>
      <div className={styles.info}>
        <div>
          <span className={styles.label}>Name:</span> {name}
        </div>
        <div>
          <span className={styles.label}>Email:</span> {email}
        </div>
        <div>
          <span className={styles.label}>Password:</span> {password}
        </div>
        <div>
          <span className={styles.label}>Gender:</span> {gender}
        </div>
        <div>
          <span className={styles.label}>Age:</span> {age}
        </div>
        <div>
          <span className={styles.label}>Country:</span> {country}
        </div>
      </div>
      <div className={styles.imageContainer}>
        Image:
        <img src={picture} alt="Profile" />
      </div>
    </>
  );
};

export default SubmissionCard;
