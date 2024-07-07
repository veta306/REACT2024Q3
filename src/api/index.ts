const URL = "https://swapi.dev/api/films/";

export default async function fetchFilms(searchPhrase: string) {
  if (searchPhrase) return await fetch(URL + "?search=" + searchPhrase);
  return await fetch(URL);
}
