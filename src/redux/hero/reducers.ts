import {Status} from "../../model/status";
import {
    SkillTranscendence,
    Accessory,
    GearSet,
    HeroName
} from "../../model/hero";
import {
    CHANGE_HERO_OWNERSHIP,
    CHANGE_HERO_TRANSCENDENCE,
    CHANGE_HERO_SKILL,
    CHANGE_HERO_UW_LEVEL,
    CHANGE_HERO_UT_LEVEL,
    CHANGE_HERO_GEARLINE,
    CHANGE_HERO_UT_GEARLINE,
    CHANGE_HERO_SW_LEVEL,
    CHANGE_HERO_ACCESSORY,
    CHANGE_HERO_UW_RUNES,
    CHANGE_HERO_ARMOR_RUNES,
    CHANGE_HERO_ENCHANTS,
    CHANGE_HERO_GEARSET,
    HeroConfigurationState,
    AllHeroActions,
    CHANGE_HERO_UT_PRIMARY
} from "./types";

function copyHeroConfigurationState(
    state: HeroConfigurationState,
    heroName: HeroName
): HeroConfigurationState {
    let newState: HeroConfigurationState = {...state};
    if (newState[heroName] === undefined) {
        newState[heroName] = {
            owned: false,
            t1: [false, false, false, false, false],
            t2: [false, false, false, false, false],
            t3: [
                SkillTranscendence.Neither,
                SkillTranscendence.Neither,
                SkillTranscendence.Neither,
                SkillTranscendence.Neither
            ],
            t5: [false, false],
            uwLevel: null,
            utLevel: [null, null, null, null],
            utPrimary: null,
            gearLines: [
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk,
                Status.Atk
            ],
            utGearLines: [
                [Status.Atk, Status.Atk],
                [Status.Atk, Status.Atk],
                [Status.Atk, Status.Atk],
                [Status.Atk, Status.Atk]
            ],
            swLevel: null,
            accessory: Accessory.Ring,
            uwRunes: [null, null, null],
            armorRunes: [null, null],
            enchants: [null, null, null, null],
            gearSets: [GearSet.BlackDragon, GearSet.BlackDragon]
        };
    }

    return newState;
}

export function heroConfigurationReducer(
    state: HeroConfigurationState = {},
    action: AllHeroActions
): HeroConfigurationState {
    let newState: HeroConfigurationState;
    switch (action.type) {
        case CHANGE_HERO_OWNERSHIP:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.owned = action.payload.value;
            break;
        case CHANGE_HERO_TRANSCENDENCE:
            newState = copyHeroConfigurationState(state, action.payload.name);
            switch (action.payload.tier) {
                case 1:
                    newState[action.payload.name]!.t1[action.payload.id - 1] =
                        action.payload.value;
                    break;
                case 2:
                    newState[action.payload.name]!.t2[action.payload.id - 1] =
                        action.payload.value;
                    break;
                case 5:
                    newState[action.payload.name]!.t5[action.payload.id - 1] =
                        action.payload.value;
                    break;
            }
            break;
        case CHANGE_HERO_SKILL:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.t3[action.payload.id - 1] =
                action.payload.value;
            break;
        case CHANGE_HERO_UW_LEVEL:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.uwLevel = action.payload.value;
            break;
        case CHANGE_HERO_UT_LEVEL:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.utLevel[action.payload.id - 1] =
                action.payload.value;
            break;
        case CHANGE_HERO_UT_PRIMARY:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.utPrimary = action.payload.value;
            break;
        case CHANGE_HERO_GEARLINE:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.gearLines[action.payload.id - 1] =
                action.payload.status;
            break;
        case CHANGE_HERO_UT_GEARLINE:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.utGearLines[action.payload.ut - 1][
            action.payload.id - 1
                ] = action.payload.status;
            break;
        case CHANGE_HERO_SW_LEVEL:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.swLevel = action.payload.value;
            break;
        case CHANGE_HERO_ACCESSORY:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.accessory = action.payload.value;
            break;
        case CHANGE_HERO_UW_RUNES:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.uwRunes[action.payload.id - 1] =
                action.payload.status;
            break;
        case CHANGE_HERO_ARMOR_RUNES:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.armorRunes[action.payload.id - 1] =
                action.payload.status;
            break;
        case CHANGE_HERO_ENCHANTS:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.enchants[action.payload.id - 1] = action.payload.status;
            break;
        case CHANGE_HERO_GEARSET:
            newState = copyHeroConfigurationState(state, action.payload.name);
            newState[action.payload.name]!.gearSets[action.payload.id - 1] =
                action.payload.value;
            break;
        default:
            return state;
    }

    return newState;
}
