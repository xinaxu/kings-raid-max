import { NavigationAction, SELECT_NAVIGATION, NavigationHeader } from "./types";
import { HeroClassType } from "../../model/hero-class-type";

export function selectNavigation(
  header: NavigationHeader,
  heroClass: HeroClassType | null
): NavigationAction {
  return {
    type: SELECT_NAVIGATION,
    payload: {
      header: header,
      heroClass: heroClass
    }
  };
}
