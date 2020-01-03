import { HeroClassType } from "../../model/hero-class-type";

export const CLASS_BUFF = "class_buff";
export const HERO_CONFIGURATION = "hero";
export const ARTIFACT_CONFIGURATION = "artifact";
export type NavigationHeader =
  | typeof CLASS_BUFF
  | typeof HERO_CONFIGURATION
  | typeof ARTIFACT_CONFIGURATION;
export type NavigationState = {
  header: NavigationHeader;
  heroClass: HeroClassType | null;
};

export const SELECT_NAVIGATION = "SELECT_NAVIGATION";
export type NavigationActionPayload = NavigationState;
export type NavigationAction = {
  type: typeof SELECT_NAVIGATION;
  payload: NavigationState;
};
