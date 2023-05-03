import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import navigation from "@/config/navigation";
import { store } from "@/store";
import { Course } from "@/types/course";
import { Community } from "@/types/community";
import { List } from "@/utilities/CommunityNavigation";

/**
 * Initial navigation state interface
 * @date 4/20/2023 - 4:08:28 PM
 *
 * @interface NavigationState
 * @typedef {NavigationState}
 */
interface NavigationState {
  menus: List[];
  showPageNavigation: boolean;
}

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
  menus: [],
  showPageNavigation: true,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationList: (state, action: PayloadAction<any[]>) => {
      state.menus = action.payload;
    },
    setShowPageNavigation: (state, action: PayloadAction<boolean>) => {
      state.showPageNavigation = action.payload;
    },
  },
});

export const { setNavigationList, setShowPageNavigation } = navigationSlice.actions;

export const communityPath = (link: string, router: NextRouter) => {
  return `/communities/${router.query.slug}/courses/${router.query.course_slug}/${link}`;
};

export const learningModulePath = (link: string, router: NextRouter) => {
  return `/communities/${router.query.slug}/courses/${router.query.course_slug}/${link}`;
};

/**
 * Init action
 * @date 4/20/2023 - 4:09:38 PM
 *
 * @returns {(dispatch: any) => void}
 */
export const initNavigationMenu = () => (dispatch: Dispatch) => {
  const course = store.getState().courses.current as Course;
  const community = store.getState().communities.current as Community;
  const menus: List[] = navigation.community.init({
    course,
    community,
  });
  dispatch(setNavigationList(menus));
};

/**
 * Hide navigation action
 * @date 4/20/2023 - 4:09:46 PM
 *
 * @returns {(dispatch: Dispatch) => void}
 */

export const hidePageNavigation = () => (dispatch: Dispatch) => {
  dispatch(setShowPageNavigation(false));
};

/**
 * Show navigation action
 * @date 4/20/2023 - 4:09:58 PM
 *
 * @returns {(dispatch: Dispatch) => void}
 */

export const showPageNavigation = () => (dispatch: Dispatch) => {
  dispatch(setShowPageNavigation(true));
};
