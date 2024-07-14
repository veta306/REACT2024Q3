import { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <>
      <h1>404</h1>
      <h2>Not found</h2>
      <Link to={"/"}>Go to main page</Link>
    </>
  );
};

export default ErrorPage;
