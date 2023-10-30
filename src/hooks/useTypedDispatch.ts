import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch as useReduxDispatch } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppDispatch = Dispatch<any>;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
