import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useCloseDetailedCard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeDetailedCard = () => {
    if (searchParams.has("details")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("details");
      router.push(pathname + "?" + params);
    }
  };

  return closeDetailedCard;
};

export default useCloseDetailedCard;
