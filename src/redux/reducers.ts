import { classBuffReducer } from "./class-buff/reducers";

import { combineReducers } from "redux";
import { navigationReducer } from "./navigation/reducers";

export const allReducers = combineReducers({
  selectedNav: navigationReducer,
  classBuffs: classBuffReducer
});
