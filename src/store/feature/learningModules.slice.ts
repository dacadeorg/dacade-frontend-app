import api from "@/config/api";
import { LearningModule } from "@/types/course";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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

export const learningModulesSlice = createSlice({
  name: "learningModules",
  initialState,
  reducers: {
    setCurrentLearningModule(state, action) {
      state.current = action.payload;
    },
    setLearningModuleList(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(findLearningModule.fulfilled, (state, action) => {
      //   state.current = action.payload;
      // })
      // .addCase(getAllLearningModules.fulfilled, (state, action) => {
      //   state.list = action.payload;
      // })
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          ...action.payload["learningModules"],
        };
      });
  },
});

// export const findLearningModule = createAsyncThunk("learningModules/find", async (id: string) => {
//   const { data } = await api().server.get(`learning-modules/${id}`);
//   return data;
// });

// export const getAllLearningModules = createAsyncThunk("learningModules/all", async (slug: string) => {
//   const { data } = await api().server.get<LearningModule[]>(`courses/${slug}/learning-modules`);
//   return data;
// });

export const submitModuleAnswer = createAsyncThunk("learningModules/submitAnswer", async ({ ref, course }: { ref: string; course: string }) => {
  await api().client.put("interactive-modules/answer", {
    module: ref,
    course,
    score: 100,
  });
});

export const checkAnswer = async (ref: string) => {
  const { data } = await api().client.post<any[]>("interactive-modules/check-answer", {
    module: ref,
  });
  return data;
};

export const { setCurrentLearningModule, setLearningModuleList } = learningModulesSlice.actions;
export default learningModulesSlice;
