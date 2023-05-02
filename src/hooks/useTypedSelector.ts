import { IRootState } from "@/store";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
