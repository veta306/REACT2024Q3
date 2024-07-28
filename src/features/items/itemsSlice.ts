import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types/Person";

export interface ItemsState {
  selectedItems: Record<string, Person>;
}

const initialState: ItemsState = {
  selectedItems: {},
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    toggleSelectedItem: (
      state,
      action: PayloadAction<{ id: string; item: Person }>,
    ) => {
      const { id, item } = action.payload;
      if (state.selectedItems[id]) {
        delete state.selectedItems[id];
      } else {
        state.selectedItems[id] = item;
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = {};
    },
  },
});

export const { toggleSelectedItem, unselectAllItems } = itemsSlice.actions;
export default itemsSlice.reducer;
