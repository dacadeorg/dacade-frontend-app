import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/config/api";
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
    setCoursesList: (state, action) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

// Extract actions and reducer
export const {
  setCurrentCourse,
  setCoursesList,
  setCourseContent,
  setCourseNavigation,
} = courseSlice.actions;

// Define Redux Thunk async actions
export const fetchCourse = createAsyncThunk(
  "courses/find",
  async ({ slug, locale }: { slug?: string; locale: string }) => {
    try {
      const { data } = await api(locale).server.get(
        `courses/${slug}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchAllCourses = createAsyncThunk(
  "courses/all",
  async ({ slug, locale }: { slug?: string; locale: string }) => {
    try {
      const { data } = await api(locale).server.get(
        `communities/${slug}/courses`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export default courseSlice;
