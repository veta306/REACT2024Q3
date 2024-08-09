import { FC } from "react";
import Link from "next/link";

const ErrorPage: FC = () => {
  return (
    <>
      <h1>404</h1>
      <h2>Not found</h2>
      <Link href={"/"}>Go to main page</Link>
    </>
  );
};

export default ErrorPage;
