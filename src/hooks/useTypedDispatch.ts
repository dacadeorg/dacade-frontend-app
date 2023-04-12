import { store } from "@/store";
import { useDispatch as useReduxDispatch } from "react-redux";
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
