import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { NextRouter } from "next/router";
import navigation from "@/config/navigation";
import { store } from "@/store";
import { Course } from "@/types/course";
import { Community } from "@/types/community";
import { List } from "@/utilities/CommunityNavigation";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { cloneDeep } from "lodash";
import Slugger from "github-slugger";

// Does not support TypeScript
const extractToc = require("remark-extract-toc");

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
export interface Item extends SubItem {
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
  hideTitle: boolean;
  title: string;
  id: string | string[] | undefined;
  items: Item[];
}

// Define initial state
interface NavigationState {
  menus: Items[];
  showPageNavigation: boolean;
}

const initialState: NavigationState = {
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

/**
 * Updates the navigation menu with the contents of a Markdown string.
 *
 * @param {string} markdown - The Markdown string to extract the headlines from.
 * @param {NextRouter} route - The Next.js router object for the current route.
 * @param {Dispatch} dispatch - The Redux dispatch function to update the navigation menu state.
 *
 * @returns {void}
 *
 * @date 4/25/2023 - 7:49:47 PM
 */
export const updateNavigationMarkdownMenu = () => (markdown: string, route: NextRouter, dispatch: Dispatch) => {
  // Get the current menus state
  const menus = store.getState().navigation.menus;

  /**
   * Markdown processor uses remark-extract-toc library to extract all the headlines
   * @date 4/25/2023 - 7:49:47 PM
   *
   * @type {*}
   */
  const processor = unified().use(remarkParse).use(extractToc);

  /**
   * The parsed AST (abstract syntax tree) of the Markdown string.
   *
   * @type {Root}
   *
   * @date 4/25/2023 - 7:51:22 PM
   */
  const node = processor.parse(markdown);

  /**
   * The tree structure representing the extracted headlines.
   * Casting with any because processor.runSync has not arrays methods type infered.
   * @type {any[]}
   */
  const tree = processor.runSync(node) as any;
  /**
   * A deep clone of the current navigation menu state.
   *
   * @type {Items[]}
   */
  const data: Items[] = cloneDeep(menus);

  /**
   * A slugger instance to generate unique slugs for the headlines.
   *
   * @type {Slugger}
   */
  const slugger: Slugger = new Slugger();

  /**
   * The updated navigation menu list.
   *
   * @type {Items[]}
   */
  const list: Items[] = data.map((menu) => {
    if (menu.id !== "learning-modules") {
      return menu;
    }
    /**
     * Filters the learning modules menu and replaces the subitems with the extracted headlines.
     *
     * @param {Menu} menu - The menu object to update.
     *
     * @returns {Menu} The updated menu object.
     */
    menu.items = menu.items.map((item) => {
      if (item.id !== route.query.id) {
        return item;
      }
      slugger.reset();
      item.subitems = tree.map((el: { value: string }) => {
        return {
          label: String(el.value).replace(/^\d+\.+\d\s*/, ""),
          link: `${slugger.slug(el.value)}`,
          exact: false,
        };
      });
      return item;
    });
    return menu;
  });

  /**
   * Updates the Redux store with the new navigation menu state.
   *
   * @param {Menu[]} list - The new list of menus.
   *
   * @returns {void}
   */
  dispatch(setNavigationList(list));
};
