import { FC, useEffect, useState } from "react";
import styles from "./PasswordStrength.module.scss";

interface Props {
  password: string;
}

const colors = ["#ff0000", "#ee5a43", "#de8508", "#eee92f", "#00ff00"];

export const PasswordStrength: FC<Props> = ({ password }) => {
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password: string) => {
    let strength = 0;

    if (password && password.length >= 8) {
      strength += 1;
    }
    if (/[A-Z]/.test(password)) {
      strength += 1;
    }
    if (/[a-z]/.test(password)) {
      strength += 1;
    }
    if (/\d/.test(password)) {
      strength += 1;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 1;
    }

    return Math.min(strength, 5);
  };

  useEffect(() => {
    const computedStrength = calculateStrength(password);
    setStrength(computedStrength);
  }, [password]);

  return (
    password && (
      <div className={styles.wrapper}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={styles.bar}
            style={
              index < strength
                ? { backgroundColor: colors[strength - 1] }
                : undefined
            }
          />
        ))}
      </div>
    )
  );
};

export default PasswordStrength;
