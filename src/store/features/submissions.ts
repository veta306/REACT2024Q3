import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SubmitData } from "../../utils/types";

type SubmissionsState = {
  submissions: SubmitData[];
};

const initialState: SubmissionsState = {
  submissions: [],
};

const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<SubmitData>) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const submissionsReducer = submissionsSlice.reducer;
export const { submitForm } = submissionsSlice.actions;
