import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Subitem interface
 * @date 4/19/2023 - 8:58:05 PM
 *
 * @interface SubItem
 * @typedef {SubItem}
 */
export interface SubItem {
  label: string;
  link: string;
  exact: boolean;
}

/**
 *  Item interface
 * @date 4/19/2023 - 8:58:20 PM
 *
 * @interface Item
 * @typedef {Item}
 */
export interface Item {
  id: string | string[] | undefined;
  subitems: SubItem[];
}

// Define initial state
interface NavigationState {
  list: Item[];
}

const initialState: NavigationState = {
  list: [],
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationList(state, action: PayloadAction<Item[]>) {
      state.list = action.payload;
    },
  },
});


export const  { setNavigationList } = navigationSlice.actions;