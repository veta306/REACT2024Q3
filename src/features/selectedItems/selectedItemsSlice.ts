import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types/Person";

export interface SelectedItemsState {
  ids: string[];
  items: Record<string, Person>;
}

const initialState: SelectedItemsState = {
  ids: [],
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
      if (state.ids.includes(id)) {
        delete state.items[id];
        state.ids = state.ids.filter((itemId) => itemId !== id);
      } else {
        state.items[id] = item;
        state.ids.push(id);
      }
    },
    unselectAllItems: (state) => {
      state.items = {};
      state.ids = [];
    },
  },
});

export const { toggleSelectedItem, unselectAllItems } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
