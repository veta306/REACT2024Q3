const URL = "https://swapi.dev/api/films/";

export default async function fetchFilms(searchPhrase: string) {
  const result = searchPhrase
    ? await fetch(URL + "?search=" + searchPhrase)
    : await fetch(URL);
  const films = await result.json();
  return films.results;
}
