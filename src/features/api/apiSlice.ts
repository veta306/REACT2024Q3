import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Person } from "../../types/Person";

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/people/" }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<
      ApiResponse,
      { page: number; searchPhrase: string }
    >({
      query: ({ page, searchPhrase }) =>
        `?page=${page}${searchPhrase ? `&search=${searchPhrase}` : ""}`,
    }),
    fetchPerson: builder.query<Person, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useFetchPeopleQuery, useFetchPersonQuery } = apiSlice;

export default apiSlice;
