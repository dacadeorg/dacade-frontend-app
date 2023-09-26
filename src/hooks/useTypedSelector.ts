import { IRootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

export const useMultiSelector = <Selected = unknown, RetunedType = unknown>(selectors: { [key: string]: (state: IRootState) => Selected }) => {
  const values = Object.values(selectors);

  const derivedState = createSelector(values, (...results) => {
    const data = results.reduce((acc, value, index) => {
      const key = Object.keys(selectors)[index];
      acc[key] = value;
      return acc;
    }, {} as Record<string, Selected>);
    return data;
  });

  return useSelector(derivedState) as RetunedType;
};
