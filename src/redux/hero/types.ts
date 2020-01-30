import {Status} from "../../model/status";
import {
    HeroName,
    HeroConfiguration,
    SkillTranscendence,
    Accessory,
    GearSet,
    DamageType
} from "../../model/hero";
import {StarLevel} from "../../model/star-effect";
import {BattleCalculation} from "../../model/calculation/types";
import {ArtifactName} from "../../model/artifact";

export type HeroConfigurationState = Partial<Record<HeroName, HeroConfiguration>>;

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
export const CHANGE_HERO_ARTIFACT_NAME = "CHANGE_HERO_ARTIFACT_NAME";
export const CHANGE_HERO_ARTIFACT_LEVEL = "CHANGE_HERO_ARTIFACT_LEVEL";
export const CHANGE_HERO_T5 = "CHANGE_HERO_T5";

export type HeroT5Action = {
    type: typeof CHANGE_HERO_T5;
    payload: {
        name: HeroName;
        id: 0|1
        value: boolean;
    };
}

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
        value: 1 | 2 | 3 | 4 | null
    };
};

export type HeroGearLineAction = {
    type: typeof CHANGE_HERO_GEARLINE;
    payload: {
        id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
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
        value: 0 | 1 | 2 | null
    };
};

export type HeroAccessoryAction = {
    type: typeof CHANGE_HERO_ACCESSORY;
    payload: {
        name: HeroName
        value: Accessory
    };
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

export type HeroArtifactNameAction = {
    type: typeof CHANGE_HERO_ARTIFACT_NAME;
    payload: {
        name: HeroName
        value: ArtifactName | null
    }
}

export type HeroArtifactLevelAction = {
    type: typeof CHANGE_HERO_ARTIFACT_LEVEL;
    payload: {
        name: HeroName
        value: 0 | 1|2|3|4|5 
    }
}

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
    | HeroGearSetsAction
    | HeroArtifactNameAction
    |HeroArtifactLevelAction
    | HeroT5Action;


export enum BattleType {
    WorldBoss1 = "World Boss - Mountain Fortress",
    WorldBoss2 = "World Boss - Protianus",
    WorldBoss3 = "World Boss - Xanadus"
}

export type BattleInfo = {
    numOfHeroes: number
    defence: number
    attackType: DamageType
    attack: number
    duration: number
    dispel?: number
}

export const BattleInfos: Record<BattleType, BattleInfo> = {
    [BattleType.WorldBoss1]: {
        numOfHeroes: 8,
        defence: 100000,
        attack: 100000,
        attackType: DamageType.Physical,
        duration: 330
    },
    [BattleType.WorldBoss2]: {
        numOfHeroes: 8,
        defence: 100000,
        attack: 100000,
        attackType: DamageType.Magic,
        duration: 330
    },
    [BattleType.WorldBoss3]: {
        numOfHeroes: 8,
        defence: 100000,
        attack: 100000,
        attackType: DamageType.Magic,
        duration: 210
    }
};

export type HeroSelection = {
    heroName: HeroName | null
}

export type CalculationState = {
    battleType: BattleType
    heroes: [HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection],
    battleCalculation: BattleCalculation
}

export const CHANGE_BATTLE_TYPE = "CHANGE_BATTLE_TYPE";
export type ChangeBattleTypeActionPayload = BattleType

export type ChangeBattleTypeAction = {
    type: typeof CHANGE_BATTLE_TYPE;
    payload: ChangeBattleTypeActionPayload;
};

export const CHANGE_HERO_SELECTION = "CHANGE_HERO_SELECTION";
export type ChangeHeroSelectionActionPayload = {
    index: number
    heroName: HeroName | null
}

export type ChangeHeroSelectionAction = {
    type: typeof CHANGE_HERO_SELECTION
    payload: ChangeHeroSelectionActionPayload
}

export type AllCalculationActions =
    ChangeBattleTypeAction | ChangeHeroSelectionAction