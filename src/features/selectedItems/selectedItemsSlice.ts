import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types/Person";

export interface SelectedItemsState {
  items: Record<string, Person>;
}

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    toggleSelectedItem: (
      state,
      action: PayloadAction<{ id: string; item: Person }>,
    ) => {
      const { id, item } = action.payload;
      if (state.items[id]) {
        delete state.items[id];
      } else {
        state.items[id] = item;
      }
    },
  },
});

export const { toggleSelectedItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
