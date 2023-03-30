import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import ui from "./feature/ui.slice";

export interface IRootState {
  ui: ReturnType<typeof ui.reducer>;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
