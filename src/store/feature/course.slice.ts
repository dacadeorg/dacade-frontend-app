import { Course } from "@/types/course";
import { createSlice } from "@reduxjs/toolkit";
import { List } from "@/utilities/CommunityNavigation";


// Define initial state
interface CourseState {
  list: Course[];
  count: number;
  current: Course | null;
  // TODO: Those type should be improved whenever they are known
  content: any | null;
  menus: List[];
}

const initialState: CourseState = {
  list: [],
  count: 0,
  current: null,
  content: null,
  menus: [],
};
// Define Redux Toolkit slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setNavigation: (state, action) => {
      const { list } = action.payload;
      state.menus = list;
    },
  }
});

export const { setCurrent, setList, setContent, setNavigation } =
  courseSlice.actions;