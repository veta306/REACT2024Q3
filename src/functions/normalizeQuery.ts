import { ParsedUrlQuery } from "querystring";

export function normalizeQuery({
  searchPhrase,
  page,
  details,
}: ParsedUrlQuery) {
  return {
    searchPhrase: typeof searchPhrase === "string" ? searchPhrase : "",
    page: typeof page === "string" ? +page : 1,
    details: typeof details === "string" ? details : "",
  };
}
