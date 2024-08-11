import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useSearchPhrase = (): [string, Dispatch<SetStateAction<string>>] => {
  const isClient = typeof window !== "undefined";
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchPhrase, setSearchPhrase] = useState(
    isClient ? localStorage.getItem("searchPhrase") || "" : "",
  );

  useEffect(() => {
    localStorage.setItem("searchPhrase", searchPhrase);
    if (searchParams.get("searchPhrase") !== searchPhrase) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("searchPhrase", searchPhrase.toString());
      params.set("page", "1");
      router.push(pathname + "?" + params.toString());
    }
  }, [searchPhrase, pathname, router, searchParams]);

  return [searchPhrase, setSearchPhrase];
};

export default useSearchPhrase;
