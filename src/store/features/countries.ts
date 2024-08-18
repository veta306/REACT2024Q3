import { createSlice } from "@reduxjs/toolkit";
import { countries } from "../../utils/countries";

type CountriesState = {
  countries: string[];
};

const initialState: CountriesState = {
  countries: countries,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
