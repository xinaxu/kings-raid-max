import {Status} from "../../model/status";
import {Accessory, DamageType, GearSet, HeroInfo, HeroInfos, HeroName, SkillTranscendence} from "../../model/hero";
import {
    AllCalculationActions,
    AllHeroActions,
    BattleInfos,
    BattleType,
    CalculationState,
    CHANGE_BATTLE_TYPE,
    CHANGE_HERO_ACCESSORY,
    CHANGE_HERO_ARMOR_RUNES,
    CHANGE_HERO_ENCHANTS,
    CHANGE_HERO_GEARLINE,
    CHANGE_HERO_GEARSET,
    CHANGE_HERO_OWNERSHIP,
    CHANGE_HERO_SELECTION,
    CHANGE_HERO_SKILL,
    CHANGE_HERO_SW_LEVEL,
    CHANGE_HERO_TRANSCENDENCE,
    CHANGE_HERO_UT_GEARLINE,
    CHANGE_HERO_UT_LEVEL,
    CHANGE_HERO_UT_PRIMARY,
    CHANGE_HERO_UW_LEVEL,
    CHANGE_HERO_UW_RUNES,
    HeroConfigurationState,
    HeroSelection
} from "./types";
import {updateArmor} from "../../model/calculation/armor";
import {BattleCalculation} from "../../model/calculation/types";
import {applyEffects} from "../../model/calculation/applyEffects";
import {updateWeapon} from "../../model/calculation/weapon";
import {normalize} from "../../model/calculation/normalizer";
import {calculateDps} from "../../model/calculation/calculateDps";
import {calculateTankiness} from "../../model/calculation/calculateTankiness";

export function calculationReducer(
    state: {
        heroConfiguration: HeroConfigurationState
        calculation: CalculationState
    } = {
        heroConfiguration: {},
        calculation: {
            battleType: BattleType.WorldBoss1,
            heroes: [{heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null,
            }, {heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null
            }],
            battleCalculation: {
                heroes: [],
                enemy: {
                    damageType: DamageType.Physical,
                    stats: {},
                    effects: []
                }
            }
        }
    },
    action: AllCalculationActions
): {
    heroConfiguration: HeroConfigurationState
    calculation: CalculationState
} {
    switch (action.type) {
        case CHANGE_BATTLE_TYPE:
            return {
                heroConfiguration: state.heroConfiguration,
                calculation: {...state.calculation, battleType: action.payload}
            };
        case CHANGE_HERO_SELECTION:
            let newheroes: [HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection, HeroSelection] = [state.calculation.heroes[0], state.calculation.heroes[1], state.calculation.heroes[2], state.calculation.heroes[3], state.calculation.heroes[4], state.calculation.heroes[5], state.calculation.heroes[6], state.calculation.heroes[7]];
            if (action.payload.heroName === null) {
                newheroes[action.payload.index]!.heroName = action.payload.heroName;
                return {
                    heroConfiguration: state.heroConfiguration,
                    calculation: {
                        battleType: state.calculation.battleType,
                        heroes: newheroes,
                        battleCalculation: state.calculation.battleCalculation
                    }
                };
            }

            for (let i = 0; i < 8; ++i) {
                if (newheroes[i]?.heroName === action.payload.heroName) {
                    newheroes[i].heroName = null;
                }
            }
            newheroes[action.payload.index] = {
                heroName: action.payload.heroName
            };
            return {
                heroConfiguration: state.heroConfiguration,
                calculation: {
                    battleType: state.calculation.battleType,
                    heroes: newheroes,
                    battleCalculation: state.calculation.battleCalculation
                }
            };

        default:
            return state;
    }

    return state;
}

function reCalculate(state: HeroCombinedState): CalculationState {
    let newState: CalculationState = {...state.calculation};
    let numOfHeroes: number = BattleInfos[state.calculation.battleType].numOfHeroes;
    let enemyDamageType = BattleInfos[state.calculation.battleType].attackType;
    let battle: BattleCalculation = {
        heroes: [],
        enemy: {
            damageType: enemyDamageType,
            effects: [],
            stats: {}
        }
    };
    newState.battleCalculation = battle;
    for (let i = 0; i < numOfHeroes; ++i) {
        let heroName = state.calculation.heroes[i].heroName;
        if (heroName === null) {
            continue;
        }

        let configuration = state.heroConfiguration[heroName];
        if (configuration === undefined || !configuration.owned) {
            continue;
        }

        let heroInfo: HeroInfo | undefined = HeroInfos[heroName];
        if (heroInfo === undefined) {
            continue;
        }

        battle.heroes[i] = {
            stats: {},
            effects: [],
            heroInfo: heroInfo,
            heroConfiguration: configuration,
            dps: 0,
            tankiness: 0
        };
    }

    updateArmor(battle);
    updateWeapon(battle);
    applyEffects(battle);
    normalize(battle);
    calculateDps(battle);
    calculateTankiness(battle);
    return newState;
};

/* Base Status - Unique Treasure
for(let ut of configuration.utLevel) {
    switch(ut) {
        case 0:
            heroStatus[i].baseHp += 1361742;
            break;
        case 1:
            heroStatus[i].baseHp += 1497907;
            break;
        case 2:
            heroStatus[i].baseHp += 1770264;
            break;
        case 3:
            heroStatus[i].baseHp += 2178785;
            break;
        case 4:
            heroStatus[i].baseHp += 2723485;
            break;
        case 5:
            heroStatus[i].baseHp += 3404349;
            break;
    }
}
}
*/

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

function heroConfigurationReducer(
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

export type HeroCombinedState = {
    heroConfiguration: HeroConfigurationState
    calculation: CalculationState
}

export function heroCombinedReducer(
    state: HeroCombinedState = {
        heroConfiguration: {},
        calculation: {
            battleType: BattleType.WorldBoss1,
            heroes: [{heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null,
            }, {heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null
            }],
            battleCalculation: {
                heroes: [],
                enemy: {
                    damageType: DamageType.Physical,
                    stats: {},
                    effects: []
                }
            }
        }
    },
    action: AllHeroActions | AllCalculationActions
): HeroCombinedState {
    if (action.type === CHANGE_BATTLE_TYPE || action.type === CHANGE_HERO_SELECTION) {
        let result = calculationReducer(state, action as AllCalculationActions);
        return {
            heroConfiguration: result.heroConfiguration,
            calculation: reCalculate(result)
        }
    }

    let result = {
        heroConfiguration: heroConfigurationReducer(state.heroConfiguration, action),
        calculation: state.calculation
    };
    return {
        heroConfiguration: result.heroConfiguration,
        calculation: reCalculate(result)
    }
}