import { combineReducers } from "@reduxjs/toolkit";
import { certificatesProfile } from "./certificates.slice";
export default combineReducers({
  [certificatesProfile.name]: certificatesProfile.reducer,
});
