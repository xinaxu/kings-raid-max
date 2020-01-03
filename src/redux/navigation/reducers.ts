import {
  HERO_CONFIGURATION,
  NavigationAction,
  NavigationState,
  SELECT_NAVIGATION
} from "./types";
import { HeroClassType } from "../../model/hero-class-type";

export function navigationReducer(
  state: NavigationState = {
    header: HERO_CONFIGURATION,
    heroClass: HeroClassType.Tank
  },
  action: NavigationAction
): NavigationState {
  switch (action.type) {
    case SELECT_NAVIGATION:
      return action.payload;
    default:
      return state;
  }
}
