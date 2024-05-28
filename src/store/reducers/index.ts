import { combineReducers } from "@reduxjs/toolkit";
import flowReducer from "../slices/flowSlices";

const rootReducer = combineReducers({
  flow: flowReducer,
});

export default rootReducer;
