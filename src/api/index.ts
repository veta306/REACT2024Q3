import { Person } from "../types/Person";

const URL = "https://swapi.dev/api/people/";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export async function fetchPeople(page: number, searchPhrase: string) {
  const url =
    URL + `?page=${page}` + (searchPhrase ? `&search=${searchPhrase}` : "");
  const result = await fetch(url);
  const response: ApiResponse = await result.json();
  return response;
}

export async function fetchPerson(id: string) {
  const url = URL + id;
  const result = await fetch(url);
  const response: Person = await result.json();
  return response;
}
