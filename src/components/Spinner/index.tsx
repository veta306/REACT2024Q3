import { FC } from "react";
import "./Spinner.css";

interface Props {
  isLoading: boolean;
}

const Spinner: FC<Props> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="spinner-overlay">
        <div className="spinner" />
      </div>
    )
  );
};

export default Spinner;
