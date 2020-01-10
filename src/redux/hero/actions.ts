import { HeroClassType } from "../../model/hero-class-type";
import { Status } from "../../model/status";
import {
  HeroOwnershipAction,
  CHANGE_HERO_OWNERSHIP,
  CHANGE_HERO_TRANSCENDENCE,
  HeroTranscendenceAction,
  CHANGE_HERO_SKILL,
  HeroSkillAction,
  HeroUwLevelAction,
  CHANGE_HERO_UW_LEVEL,
  HeroUtLevelAction,
  CHANGE_HERO_UT_LEVEL,
  HeroUtPrimaryAction,
  CHANGE_HERO_GEARLINE,
  HeroGearLineAction,
  HeroUtGearLineAction,
  CHANGE_HERO_UT_GEARLINE,
  HeroSwLevelAction,
  CHANGE_HERO_SW_LEVEL,
  HeroAccessoryAction,
  CHANGE_HERO_ACCESSORY,
  HeroUwRunesAction,
  CHANGE_HERO_UW_RUNES,
  HeroArmorRunesAction,
  CHANGE_HERO_ARMOR_RUNES,
  HeroEnchantsAction,
  CHANGE_HERO_ENCHANTS,
  HeroGearSetsAction,
  CHANGE_HERO_GEARSET,
  CHANGE_HERO_UT_PRIMARY
} from "./types";
import {
  SkillTranscendence,
  Accessory,
  GearSet,
  HeroName
} from "../../model/hero";
import { StarLevel } from "../../model/star-effect";

export function changeHeroOwnership(
  name: HeroName,
  ownership: boolean
): HeroOwnershipAction {
  return {
    type: CHANGE_HERO_OWNERSHIP,
    payload: {
      name: name,
      value: ownership
    }
  };
}

export function changeHeroTranscendence(
  name: HeroName,
  tier: 1 | 2 | 5,
  id: 1 | 2 | 3 | 4 | 5,
  value: boolean
): HeroTranscendenceAction {
  return {
    type: CHANGE_HERO_TRANSCENDENCE,
    payload: {
      name: name,
      tier: tier,
      id: id,
      value: value
    }
  };
}

export function changeHeroSkill(
  name: HeroName,
  id: 1 | 2 | 3 | 4,
  value: SkillTranscendence
): HeroSkillAction {
  return {
    type: CHANGE_HERO_SKILL,
    payload: {
      name: name,
      id: id,
      value: value
    }
  };
}

export function changeHeroUwLevel(
  name: HeroName,
  level: StarLevel | null
): HeroUwLevelAction {
  return {
    type: CHANGE_HERO_UW_LEVEL,
    payload: {
      name: name,
      value: level
    }
  };
}

export function changeHeroUtLevel(
  name: HeroName,
  id: 1 | 2 | 3 | 4,
  level: StarLevel | null
): HeroUtLevelAction {
  return {
    type: CHANGE_HERO_UT_LEVEL,
    payload: {
      name: name,
      id: id,
      value: level
    }
  };
}

export function changeHeroUtPrimary(
  name: HeroName,
  id: 1 | 2 | 3 | 4 | null
): HeroUtPrimaryAction {
  return {
    type: CHANGE_HERO_UT_PRIMARY,
    payload: {
      value: id,
      name: name
    }
  };
}

export function changeHeroGearLine(
  name: HeroName,
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  status: Status
): HeroGearLineAction {
  return {
    type: CHANGE_HERO_GEARLINE,
    payload: {
      name: name,
      id: id,
      status: status
    }
  };
}

export function changeHeroUtGearLine(
  name: HeroName,
  ut: 1 | 2 | 3 | 4,
  id: 1 | 2,
  status: Status
): HeroUtGearLineAction {
  return {
    type: CHANGE_HERO_UT_GEARLINE,
    payload: {
      name: name,
      ut: ut,
      id: id,
      status: status
    }
  };
}

export function changeHeroSwLevel(
  name: HeroName,
  value: 0 | 1 | 2 | null
): HeroSwLevelAction {
  return {
    type: CHANGE_HERO_SW_LEVEL,
    payload: {
      value: value,
      name: name
    }
  };
}

export function changeHeroAccessory(
  name: HeroName,
  value: Accessory
): HeroAccessoryAction {
  return {
    type: CHANGE_HERO_ACCESSORY,
    payload: {
      name: name,
      value: value
    }
  };
}

export function changeHeroUwRunes(
  name: HeroName,
  id: 1 | 2 | 3,
  status: Status
): HeroUwRunesAction {
  return {
    type: CHANGE_HERO_UW_RUNES,
    payload: {
      name: name,
      id: id,
      status: status
    }
  };
}

export function changeHeroArmorRunes(
  name: HeroName,
  id: 1 | 2,
  status: Status
): HeroArmorRunesAction {
  return {
    type: CHANGE_HERO_ARMOR_RUNES,
    payload: {
      name: name,
      id: id,
      status: status
    }
  };
}

export function changeHeroEnchants(
  name: HeroName,
  id: 1 | 2 | 3 | 4,
  status: Status,
  value: number
): HeroEnchantsAction {
  return {
    type: CHANGE_HERO_ENCHANTS,
    payload: {
      name: name,
      id: id,
      status: status,
    }
  };
}

export function changeHeroGearSets(
  name: HeroName,
  id: 1 | 2,
  value: GearSet
): HeroGearSetsAction {
  return {
    type: CHANGE_HERO_GEARSET,
    payload: {
      name: name,
      id: id,
      value: value
    }
  };
}
