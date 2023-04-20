import { LearningModule } from "@/types/course";
import { createSlice } from "@reduxjs/toolkit";

/**
 * learning modules state
 * @date 4/18/2023 - 5:06:50 PM
 *
 * @interface LearningModulesState
 * @typedef {LearningModulesState}
 */
interface LearningModulesState {
  list: LearningModule[];
  current?: LearningModule | null;
}

const initialState: LearningModulesState = {
  list: [],
  current: null,
};

export const learningModules = createSlice({
  name: "learningModules",
  initialState,
  reducers: {
    setCurrent(state, action) {
      state.current = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setCurrent, setList } = learningModules.actions;
