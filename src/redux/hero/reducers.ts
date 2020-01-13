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
import {StarLevel} from "../../model/star-effect";
import {HeroClassType} from "../../model/hero-class-type";

export function calculationReducer(
    state: {
        heroConfiguration: HeroConfigurationState
        calculation: CalculationState
    } = {
        heroConfiguration: {},
        calculation: {
            battleType: BattleType.WorldBoss1,
            heroes: [{heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }]
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
                    calculation: {battleType: state.calculation.battleType, heroes: newheroes}
                };
            }

            for (let i = 0; i < 8; ++i) {
                if (newheroes[i]?.heroName === action.payload.heroName) {
                    newheroes[i].heroName = null;
                }
            }
            newheroes[action.payload.index] = {
                heroName: action.payload.heroName,
                dps: 0.0,
                tankiness: 0.0
            };
            return {
                heroConfiguration: state.heroConfiguration,
                calculation: {battleType: state.calculation.battleType, heroes: newheroes}
            };

        default:
            return state;
    }

    return state;
}

type UnitStatus = {
    effects: [Status, number][]
    absoluteEffects: [Status, number][]
    baseAttack: number,
    baseDef: number,
    baseHp: number
}

const pArmorValues: Record<HeroClassType, number> = {
    Tank: 34105 + 7832,
    Warrior: 34105 + 6528,
    Assassin: 22739 + 6968,
    Archer: 22739 + 4784,
    Mechanic: 22739 + 4784,
    Wizard: 11372 + 3480,
    Priest: 11372 + 4352
};

const mArmorValues: Record<HeroClassType, number> = {
    Tank: 34105 + 6096,
    Warrior: 34105 + 7832,
    Assassin: 11372 + 6096,
    Archer: 11372 + 3912,
    Mechanic: 11372 + 3912,
    Wizard: 22739 + 5224,
    Priest: 22739 + 5440
};

const hpInfos: Record<HeroClassType, number> = {
    Tank: 1520472,
    Warrior: 1291376,
    Assassin: 1233888,
    Archer: 950344,
    Mechanic: 1030920,
    Wizard: 877832,
    Priest: 984320
};

const uwAttackValues: Record<HeroClassType, Record<StarLevel | 'null', number>> = {
    Tank: {
        0: 38484,
        1: 42332,
        2: 50029,
        3: 61574,
        4: 76968,
        5: 96209,
        'null': 27928
    },
    Warrior: {
        0: 43615,
        1: 47976,
        2: 56699,
        3: 69784,
        4: 87230,
        5: 109037,
        'null': 31576
    },
    Assassin: {
        0: 47957,
        1: 52752,
        2: 62344,
        3: 76731,
        4: 95914,
        5: 119892,
        'null': 34734
    },
    Archer: {
        0: 53976,
        1: 59373,
        2: 70169,
        3: 86362,
        4: 107952,
        5: 134940,
        'null': 39174
    },
    Mechanic: {
        0: 49239,
        1: 54163,
        2: 64011,
        3: 78783,
        4: 98479,
        5: 123099,
        'null': 35721
    },
    Wizard: {
        0: 50325,
        1: 55357,
        2: 65422,
        3: 80520,
        4: 100650,
        5: 125812,
        'null': 36510
    },
    Priest: {
        0: 50325,
        1: 55357,
        2: 65422,
        3: 80520,
        4: 100650,
        5: 125812,
        'null': 36510
    },
}

type StatusCap = {
    MaxK: number,
    X1: number,
    A1: number,
    B1: number,
    X2: number,
    A2: number,
    B2: number,
    MinK: number,
    X3: number,
    A3: number,
    B3: number,
    X4: number,
    A4: number,
    B4: number
}

let StatusCapMap = {
    [Status.Pen]: {
        MaxK: 900,
        X1: 1000,
        A1: 2,
        B1: 1000,
        X2: 450,
        A2: 409,
        B2: 266,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
    [Status.Tough]: {
        MaxK: 900,
        X1: 1000,
        A1: 2,
        B1: 1000,
        X2: 450,
        A2: 409,
        B2: 266,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
    [Status.Dodge]: {
        MaxK: 1000,
        X1: 1000,
        A1: 3,
        B1: 0,
        X2: 500,
        A2: 500,
        B2: 250,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
    [Status.Block]: {
        MaxK: 1000,
        X1: 1000,
        A1: 3,
        B1: 0,
        X2: 500,
        A2: 500,
        B2: 250,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
    [Status.BlockDef]: {
        MaxK: 450,
        X1: 775,
        A1: 3,
        B1: 1500,
        X2: 225,
        A2: 204,
        B2: 179,
        MinK: -920,
        X3: -2,
        A3: 3,
        B3: -938,
        X4: -1,
        A4: 0,
        B4: 0
    }
};

function attenuate(x: number, k: number, a: number, b: number) {
    return Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
}

function attenuateInv(x: number, k: number, a: number, b: number) {
    return k - Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
}

function actualStat(statType: StatusCap, istat: number): number {
    var actual = 0;
    // variable names are fucked cause vespa
    if (istat === 0) {
        actual = 0;
        // 2nd upper softcap
    } else if (istat > statType.X1) {
        actual = attenuateInv(
            istat,
            statType.MaxK,
            statType.A1,
            statType.B1
        );
        // 1st upper softcap
    } else if (istat > statType.X2) {
        actual = Math.floor((istat * statType.A2) / 1000) + statType.B2;
        // 2nd lower softcap
    } else if (istat < statType.X3) {
        actual = attenuateInv(
            istat,
            statType.MinK,
            statType.A3,
            statType.B3
        );
        // 1st lower softcap
    } else if (istat < statType.X4) {
        actual = attenuate(istat, statType.MinK, statType.A4, statType.B4);
        // uncapped
    } else {
        actual = istat;
    }
    // return to 1 significant decimal place
    actual = Math.round(actual) / 10;
    return actual
}

function reCalculate(state: HeroCombinedState): CalculationState {
    let newState: CalculationState = {...state.calculation};
    let numOfHeroes: number = BattleInfos[state.calculation.battleType].numOfHeroes;
    let enemyDamageType = BattleInfos[state.calculation.battleType].attackType;
    let heroStatus: Array<UnitStatus> = new Array<UnitStatus>(numOfHeroes);
    heroStatus.fill({effects: [], absoluteEffects: [], baseAttack: 0.0, baseDef: 0.0, baseHp: 0.0});
    let enemyStatus: UnitStatus = {effects: [], absoluteEffects: [], baseAttack: 0.0, baseDef: 0.0, baseHp: 0.0};
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

        // Base Status - Weapon
        heroStatus[i].baseAttack += uwAttackValues[heroInfo.heroClass][configuration.uwLevel === null ? 'null' : configuration.uwLevel];

        // Base Status - Armor
        if (enemyDamageType === DamageType.Physical) {
            heroStatus[i].baseDef += pArmorValues[heroInfo.heroClass];
        }
        else {
            heroStatus[i].baseDef += mArmorValues[heroInfo.heroClass];
        }

        // Base Status - Hp
        heroStatus[i].baseHp += hpInfos[heroInfo.heroClass];
        
        // Base Status - Accessory
        switch(configuration.accessory) {
            case Accessory.Ring:
                heroStatus[i].baseHp += 1089487;
                break;
            case Accessory.Earring:
                heroStatus[i].baseAttack += 23702;
                break;
            case Accessory.Bracelet:
                if (enemyDamageType === DamageType.Physical) {
                    heroStatus[i].baseDef += 11369;
                }
                break;
            case Accessory.Necklace:
                if (enemyDamageType === DamageType.Magic) {
                    heroStatus[i].baseDef += 11369;
                }
                break;
        }
        
        // Base Status - Unique Treasure
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

        let enemyMDef = 1000;
        let enemyPDef = 1000;

        // Calculate Damage
        let dps: number = heroStatus[i].baseAttack;
        let additionalAtk: number = 0;
        let crit: number = 0.0;
        let critDmg: number = 0.0;
        let dpsIncrease: number = 0.0;
        let atkPercentage: number = 0.0;
        let pen: number = 0.0
        for (let [status, number] of heroStatus[i].effects) {
            switch (status) {
                case Status.Atk:
                    atkPercentage += number;
                    break;
                case Status.Crit:
                    crit += number;
                    break;
                case Status.CritDmg:
                    critDmg += number;
                    break;
                case Status.Dps:
                    dpsIncrease += number;
                    break;
                case Status.MDps:
                    if (heroInfo.damageType === DamageType.Magic) {
                        dpsIncrease += number;
                    }
                    break;
                case Status.PDps:
                    if (heroInfo.damageType === DamageType.Physical) {
                        dpsIncrease += number;
                    }
                    break;
                case Status.Pen:
                    pen += number;
                    break;
            }
        }

        for (let [status, number] of heroStatus[i].absoluteEffects) {
            switch (status) {
                case Status.Atk:
                    additionalAtk += number;
                    break;
            }
        }

        if (crit > 100) {
            crit = 100;
        }

        dps *= (1 + atkPercentage / 100);
        dps += additionalAtk;
        dps *= (1 + crit / 100 * (critDmg / 100 + 1));
        dps *= (1 + dpsIncrease);

        let def = heroInfo.damageType === DamageType.Magic ? enemyMDef : enemyPDef;
        let defPenetrated = def * (1 - actualStat(StatusCapMap[Status.Pen], pen * 10) / 1000);
        let mitigation = 0.9817 * defPenetrated / (19360.3675 + defPenetrated);
        dps *= (1 - mitigation);
        newState.heroes[i].dps = Math.round(dps);

        // Calculate Tankiness
        let block: number = 0;
        let blockDef: number = 0;
        let dodge: number = 0;
        let toughness: number = 0;
        let hpPercentage: number = 0;
        let tankiness: number = heroStatus[i].baseHp;
        let defence = heroStatus[i].baseDef;
        let defencePercentage = 0;
        let defenceAbsolute = 0;
        for (let [status, number] of heroStatus[i].effects) {
            switch (status) {
                case Status.Hp:
                    hpPercentage += number;
                    break;
                case Status.Block:
                    block += number;
                    break;
                case Status.PBlock:
                    if (enemyDamageType === DamageType.Physical) {
                        block += number;
                    }
                    break;
                case Status.MBlock:
                    if (enemyDamageType === DamageType.Magic) {
                        block += number;
                    }
                    break;
                case Status.BlockDef:
                    blockDef += number;
                    break;
                case Status.PBlockDef:
                    if (enemyDamageType === DamageType.Physical) {
                        blockDef += number;
                    }
                    break;
                case Status.MBlockDef:
                    if (enemyDamageType === DamageType.Magic) {
                        blockDef += number;
                    }
                    break;
                case Status.Dodge:
                    dodge += number;
                    break;
                case Status.PDodge:
                    if (enemyDamageType === DamageType.Physical) {
                        dodge += number;
                    }
                    break;
                case Status.MDodge:
                    if (enemyDamageType === DamageType.Magic) {
                        dodge += number;
                    }
                    break;
                case Status.Tough:
                    toughness += number;
                    break;
                case Status.PTough:
                    if (enemyDamageType === DamageType.Physical) {
                        toughness += number;
                    }
                    break;
                case Status.MTough:
                    if (enemyDamageType === DamageType.Magic) {
                        toughness += number;
                    }
                    break;
                case Status.Def:
                    defencePercentage += number;
                    break;
                case Status.PDef:
                    if (enemyDamageType === DamageType.Physical) {
                        defencePercentage += number;
                    }
                    break;
                case Status.MDef:
                    if (enemyDamageType === DamageType.Magic) {
                        defencePercentage += number;
                    }
                    break;
            }
        }

        for (let [status, number] of heroStatus[i].absoluteEffects) {
            switch (status) {
                case Status.Def:
                    defenceAbsolute += number;
                    break;
                case Status.PDef:
                    if (enemyDamageType === DamageType.Physical) {
                        defenceAbsolute += number;
                    }
                    break;
                case Status.MDef:
                    if (enemyDamageType === DamageType.Magic) {
                        defenceAbsolute += number;
                    }
                    break;
            }
        }

        tankiness *= (1 + hpPercentage / 100);
        tankiness /= (1 - actualStat(StatusCapMap[Status.Dodge], dodge * 10) / 1000);
        let actualBlock = actualStat(StatusCapMap[Status.Block], block * 10) / 1000;
        let actualBlockDef = actualStat(StatusCapMap[Status.BlockDef], blockDef * 10) / 1000;
        tankiness /= (1 - 0.5 * actualBlock - actualBlock * actualBlockDef);
        tankiness /= (1 - actualStat(StatusCapMap[Status.Tough], toughness * 10) / 1000);
        defence *= (1 + defencePercentage / 100);
        defence += defenceAbsolute;
        tankiness /= (1- 0.9817 * defence / (19360.3675 + defence));

        newState.heroes[i].tankiness = Math.round(tankiness);
    }

    return newState;
}

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
            heroes: [{heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }, {heroName: null, dps: 0.0, tankiness: 0.0}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
            }]
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