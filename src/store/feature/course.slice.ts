import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "@/types/course";
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
    setCurrentCourse: (state, action) => {
      state.current = action.payload;
    },
    setCourseList: (state, action) => {
      state.list = action.payload;
    },
    setCourseContent: (state, action) => {
      state.content = action.payload;
    },
    setCourseNavigation: (state, action) => {
      const { list } = action.payload;
      state.menus = list;
    },
  },
});

// Extract actions and reducer
export const {
  setCurrentCourse,
  setCourseList,
  setCourseContent,
  setCourseNavigation,
} = courseSlice.actions;

export default courseSlice;
