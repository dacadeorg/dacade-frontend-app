import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import community from "./feature/community.slice";
import ui from "./feature/ui.slice";

export interface IRootState {
  communities: ReturnType<typeof community.reducer> ;
  ui: ReturnType<typeof ui.reducer>;
}

export const store = configureStore({
  reducer: {
    [ui.name]: ui.reducer,
    [community.name]: community.reducer,
  },
  devTools: true,
});

export const wrapper = createWrapper(() => store);
