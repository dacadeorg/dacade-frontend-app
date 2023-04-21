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

/**
 * Items interface
 * @date 4/19/2023 - 9:56:39 PM
 *
 * @export
 * @interface Items
 * @typedef {Items}
 */
export interface Items {
  id: string | string[] | undefined;
  items: Item[];
}

// Define initial state
interface NavigationState {
  list: Items[];
}

const initialState: NavigationState = {
  list: [],
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationList(state, action: PayloadAction<Items[]>) {
      state.list = action.payload;
    },
  },
});

export const { setNavigationList } = navigationSlice.actions;
