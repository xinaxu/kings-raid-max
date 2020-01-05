import { classBuffReducer } from "./class-buff/reducers";

import { combineReducers } from "redux";
import { navigationReducer } from "./navigation/reducers";
import { artifactConfigurationReducer } from "./artifact/reducers";

export const allReducers = combineReducers({
  selectedNav: navigationReducer,
  classBuffs: classBuffReducer,
  artifactConfiguration: artifactConfigurationReducer
});
