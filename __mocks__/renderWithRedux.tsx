import { IRootState, middlewares, reducers } from "@/store";
import { configureStore } from "@reduxjs/toolkit";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

const mockStore = (state: Partial<IRootState>) => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(...middlewares);
    },
    preloadedState: state,
  });
};

export const renderWithRedux = (component: ReactElement, state: Partial<IRootState> = {}) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={mockStore(state)}>{children}</Provider>;
  };

  return render(component, { wrapper: Wrapper });
};
