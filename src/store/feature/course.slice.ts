import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "@/types/course";
import { List } from "@/utilities/CommunityNavigation";
import api from "@/config/api";

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
export const { setCurrentCourse, setCourseList, setCourseContent, setCourseNavigation } = courseSlice.actions;

// TODO: createAsyncThunk will be replaced by services
// Define Redux Thunk async actions
// export const fetchCourse = createAsyncThunk("courses/find", async ({ slug, locale }: { slug?: string; locale?: string }) => {
//   try {
//     const { data } = await api(locale).server.get<Course>(`courses/${slug}`);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// });

// export const fetchAllCourses = createAsyncThunk("courses/all", async ({ slug, locale }: { slug?: string; locale: string }) => {
//   try {
//     const { data } = await api(locale).server.get(`communities/${slug}/courses`);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// });

export default courseSlice;
