import { Status } from "../../model/status";
import {
  HeroName,
  HeroConfiguration,
  SkillTranscendence,
  Accessory,
  GearSet
} from "../../model/hero";
import { StarLevel } from "../../model/star-effect";

export type HeroConfigurationState = Partial<
  Record<HeroName, HeroConfiguration>
>;

export const CHANGE_HERO_OWNERSHIP = "CHANGE_HERO_OWNERSHIP";
export const CHANGE_HERO_TRANSCENDENCE = "CHANGE_HERO_TRANSCENDENCE";
export const CHANGE_HERO_SKILL = "CHANGE_HERO_SKILL";
export const CHANGE_HERO_UW_LEVEL = "CHANGE_HERO_UW_LEVEL";
export const CHANGE_HERO_UT_LEVEL = "CHANGE_HERO_UT_LEVEL";
export const CHANGE_HERO_UT_PRIMARY = "CHANGE_HERO_UT_PRIMARY";
export const CHANGE_HERO_GEARLINE = "CHANGE_HERO_GEARLINE";
export const CHANGE_HERO_UT_GEARLINE = "CHANGE_HERO_UT_GEARLINE";
export const CHANGE_HERO_SW_LEVEL = "CHANGE_HERO_SW_LEVEL";
export const CHANGE_HERO_ACCESSORY = "CHANGE_HERO_ACCESSORY";
export const CHANGE_HERO_UW_RUNES = "CHANGE_HERO_UW_RUNES";
export const CHANGE_HERO_ARMOR_RUNES = "CHANGE_HERO_ARMOR_RUNES";
export const CHANGE_HERO_ENCHANTS = "CHANGE_HERO_ENCHANTS";
export const CHANGE_HERO_GEARSET = "CHANGE_HERO_GEARSET";

export type HeroOwnershipAction = {
  type: typeof CHANGE_HERO_OWNERSHIP;
  payload: {
    name: HeroName;
    value: boolean;
  };
};

export type HeroTranscendenceAction = {
  type: typeof CHANGE_HERO_TRANSCENDENCE;
  payload: {
    tier: 1 | 2 | 5;
    id: 1 | 2 | 3 | 4 | 5;
    name: HeroName;
    value: boolean;
  };
};

export type HeroSkillAction = {
  type: typeof CHANGE_HERO_SKILL;
  payload: {
    id: 1 | 2 | 3 | 4;
    name: HeroName;
    value: SkillTranscendence;
  };
};

export type HeroUwLevelAction = {
  type: typeof CHANGE_HERO_UW_LEVEL;
  payload: {
    name: HeroName;
    value: StarLevel | null;
  };
};

export type HeroUtLevelAction = {
  type: typeof CHANGE_HERO_UT_LEVEL;
  payload: {
    name: HeroName
    id: 1 | 2 | 3 | 4;
    value: StarLevel | null;
  };
};

export type HeroUtPrimaryAction = {
  type: typeof CHANGE_HERO_UT_PRIMARY;
  payload: {
    name: HeroName
    value:1 | 2 | 3 | 4 | null};
};

export type HeroGearLineAction = {
  type: typeof CHANGE_HERO_GEARLINE;
  payload: {
    id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    name: HeroName
    status: Status;
  };
};

export type HeroUtGearLineAction = {
  type: typeof CHANGE_HERO_UT_GEARLINE;
  payload: {
    name: HeroName
    ut: 1 | 2 | 3 | 4;
    id: 1 | 2;
    status: Status;
  };
};

export type HeroSwLevelAction = {
  type: typeof CHANGE_HERO_SW_LEVEL;
  payload: {
    name: HeroName
    value:0 | 1 | 2 | null};
};

export type HeroAccessoryAction = {
  type: typeof CHANGE_HERO_ACCESSORY;
  payload: {
    name: HeroName
    value: Accessory};
};

export type HeroUwRunesAction = {
  type: typeof CHANGE_HERO_UW_RUNES;
  payload: {
    id: 1 | 2 | 3;
    name: HeroName
    status: Status;
  };
};

export type HeroArmorRunesAction = {
  type: typeof CHANGE_HERO_ARMOR_RUNES;
  payload: {
    id: 1 | 2;
    name: HeroName
    status: Status;
  };
};

export type HeroEnchantsAction = {
  type: typeof CHANGE_HERO_ENCHANTS;
  payload: {
    id: 1 | 2 | 3 | 4;
    status: Status;
    name: HeroName
    value: number;
  };
};

export type HeroGearSetsAction = {
  type: typeof CHANGE_HERO_GEARSET;
  payload: {
    id: 1 | 2;
    value: GearSet;
    name: HeroName
  };
};

export type AllHeroActions =
  | HeroOwnershipAction
  | HeroTranscendenceAction
  | HeroSkillAction
  | HeroUwLevelAction
  | HeroUtLevelAction
  | HeroUtPrimaryAction
  | HeroGearLineAction
  | HeroUtGearLineAction
  | HeroSwLevelAction
  | HeroAccessoryAction
  | HeroUwRunesAction
  | HeroArmorRunesAction
  | HeroEnchantsAction
  | HeroGearSetsAction;
