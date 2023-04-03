import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import ui from "./feature/ui.slice";
import { communitiesApi } from "./feature/communities.slice";

export interface IRootState {
  ui: ReturnType<typeof ui.reducer>;
  communities: ReturnType<typeof communitiesApi.reducer>;
}

const makeStore = () =>
  configureStore({
    reducer: {
      [ui.name]: ui.reducer,
      [communitiesApi.reducerPath]: communitiesApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(communitiesApi.middleware);
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
