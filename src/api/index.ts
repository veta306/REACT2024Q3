import Film from "../types/Film";
const URL = "https://swapi.dev/api/films/";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export default async function fetchFilms(searchPhrase: string) {
  const result = searchPhrase
    ? await fetch(URL + "?search=" + searchPhrase)
    : await fetch(URL);
  const films: ApiResponse = await result.json();
  return films.results;
}
