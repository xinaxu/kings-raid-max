import { HeroClassType } from "../model/hero-class-type";
import { compose, createStore } from "redux";
import { RootState } from "./types";
import { allReducers } from "./reducers";
import { HERO_CONFIGURATION } from "./navigation/types";

const initialSession = window.localStorage.getItem("session");

const initialState: RootState =
  initialSession == null
    ? {
        selectedNav: {
          header: HERO_CONFIGURATION,
          heroClass: HeroClassType.Tank
        },
        classBuffs: {},
        heroConfiguration: {}
      }
    : JSON.parse(initialSession);

declare global {
  interface Window {
    devToolsExtension?: typeof compose;
  }
}

export const store = createStore(
  allReducers,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);
