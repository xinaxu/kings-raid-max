import { classBuffReducer } from "./class-buff/reducers";

import { combineReducers } from "redux";
import { navigationReducer } from "./navigation/reducers";
import { artifactConfigurationReducer } from "./artifact/reducers";
import { heroCombinedReducer } from "./hero/reducers";

export const allReducers = combineReducers({
  selectedNav: navigationReducer,
  classBuffs: classBuffReducer,
  artifactConfiguration: artifactConfigurationReducer,
  heroConfiguration: heroCombinedReducer,
});
