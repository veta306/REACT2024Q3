import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const usePageNumber = (): [number, Dispatch<SetStateAction<number>>] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  useEffect(() => {
    if (searchParams.get("page") !== page.toString()) {
      const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
      };
      router.push(pathname + "?" + createQueryString("page", page.toString()));
    }
  }, [searchParams, router, pathname, page]);
  return [page, setPage];
};

export default usePageNumber;
