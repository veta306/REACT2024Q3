import Film from "../types/Film";
const URL = "https://swapi.dev/api/films/";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export default async function fetchFilms(page: number, searchPhrase: string) {
  const url =
    URL + `?page=${page}` + (searchPhrase ? `&search=${searchPhrase}` : "");
  const result = await fetch(url);
  const response: ApiResponse = await result.json();
  return response;
}
