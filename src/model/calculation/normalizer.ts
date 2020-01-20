import {Status} from "../status";
import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";

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
    [Status.Crit]: {
        MaxK: 2000,
        X1: 2000,
        A1: 1,
        B1: 1500,
        X2: 1500,
        A2: 500,
        B2: 750,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
    [Status.Acc]: {
        MaxK: 2000,
        X1: 2000,
        A1: 1,
        B1: 1500,
        X2: 1500,
        A2: 500,
        B2: 750,
        MinK: -920,
        X3: -2,
        A3: 3,
        B3: -938,
        X4: 1,
        A4: 0,
        B4: 0
    },
    [Status.CCAcc]: {
        MaxK: 900,
        X1: 900,
        A1: 1000000,
        B1: 1000000,
        X2: 450,
        A2: 1000,
        B2: 0,
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
    [Status.CritResistance]: {
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
    [Status.CCResistance]: {
        MaxK: 1000,
        X1: 1000,
        A1: 1000000,
        B1: 1000000,
        X2: 500,
        A2: 1000,
        B2: 0,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
    },
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
    [Status.AtkSpd]: {
        MaxK: 2500,
        X1: 2400,
        A1: 1,
        B1: -733,
        X2: 1600,
        A2: 500,
        B2: 800,
        MinK: 250,
        X3: -10000,
        A3: 0,
        B3: 0,
        X4: 500,
        A4: 1,
        B4: -1500
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
    },
    [Status.ManaPerAttack]: {
        MaxK: 2300,
        X1: 2400,
        A1: 1,
        B1: -900,
        X2: 1200,
        A2: 500,
        B2: 600,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
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

function _actualStat(statType: StatusCap, istat: number): number {
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

function actualStat(statType: Status, istat: number): number {
    switch (statType) {
        case Status.Crit:
            return _actualStat(StatusCapMap[Status.Crit], istat * 10);
        case Status.Acc:
            return _actualStat(StatusCapMap[Status.Acc], istat * 10);
        case Status.CCAcc:
            return _actualStat(StatusCapMap[Status.CCAcc], istat * 10);
        case Status.CritResistance:
            return _actualStat(StatusCapMap[Status.CritResistance], istat * 10);
        case Status.CCResistance:
            return _actualStat(StatusCapMap[Status.CCResistance], istat * 10);
        case Status.PDodge:
        case Status.MDodge:
        case Status.PBlock:
        case Status.MBlock:
        case Status.Lifesteal:
            return _actualStat(StatusCapMap[Status.Dodge], istat * 10);
        case Status.Pen:
        case Status.PTough:
        case Status.MTough:
            return _actualStat(StatusCapMap[Status.Pen], istat * 10);
        case Status.AtkSpd:
            return _actualStat(StatusCapMap[Status.AtkSpd], istat * 10);
        case Status.PBlockDef:
        case Status.MBlockDef:
            return _actualStat(StatusCapMap[Status.BlockDef], istat * 10);
        case Status.ManaPerAttack:
            return _actualStat(StatusCapMap[Status.ManaPerAttack], istat * 10);
    }
    
    return istat;
}

export function normalize(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            for(let s in hero.stats) {
                let status = (s as Status);
                switch (status) {
                    case Status.Def:
                        hero.stats[Status.PDef]! += hero.stats[Status.Def]!;
                        hero.stats[Status.MDef]! += hero.stats[Status.Def]!;
                        break;
                    case Status.Dodge:
                        hero.stats[Status.PDodge]! += hero.stats[Status.Dodge]!;
                        hero.stats[Status.MDodge]! += hero.stats[Status.Dodge]!;
                        break;
                    case Status.Block:
                        hero.stats[Status.PBlock]! += hero.stats[Status.Block]!;
                        hero.stats[Status.MBlock]! += hero.stats[Status.Block]!;
                        break;
                    case Status.BlockDef:
                        hero.stats[Status.PBlockDef]! += hero.stats[Status.BlockDef]!;
                        hero.stats[Status.MBlockDef]! += hero.stats[Status.BlockDef]!;
                        break;
                    case Status.Tough:
                        hero.stats[Status.PTough]! += hero.stats[Status.Tough]!;
                        hero.stats[Status.MTough]! += hero.stats[Status.Tough]!;
                        break;
                    case Status.Weakness:
                        hero.stats[Status.PWeakness]! += hero.stats[Status.Weakness]!;
                        hero.stats[Status.MWeakness]! += hero.stats[Status.Weakness]!;
                        break;
                    case Status.CritResistance:
                        hero.stats[Status.PCritResistance]! += hero.stats[Status.CritResistance]!;
                        hero.stats[Status.MCritResistance]! += hero.stats[Status.CritResistance]!;
                        break;
                    case Status.Dps:
                        hero.stats[Status.PDps]! += hero.stats[Status.Dps]!;
                        hero.stats[Status.MDps]! += hero.stats[Status.Dps]!;
                        break;
                    default:
                        hero.stats[status] = actualStat(status, hero.stats[status]!);
                }
            }
        }
    });
}