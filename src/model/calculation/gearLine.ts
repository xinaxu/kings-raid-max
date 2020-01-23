import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

export function updateGearLine(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            for (let status of hero.heroConfiguration.gearLines) {
                let value = 12;
                switch (status) {
                    case Status.PBlock:
                    case Status.MBlock:
                    case Status.PCritResistance:
                    case Status.MCritResistance:
                    case Status.PDef:
                    case Status.MDef:
                    case Status.CritDmg:
                    case Status.ManaPerAttack:
                        value = 24;
                        break;
                    case Status.Dodge:
                        value = 6;
                        break;
                    case Status.ManaPerSecond:
                        value = 36;
                        break;
                }
                hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
            }
            
            for (let i in hero.heroConfiguration.utGearLines) {
                let level = hero.heroConfiguration.utLevel[i];
                if (level === null) {
                    continue;
                }
                
                let s: [Status, Status] = hero.heroConfiguration.utGearLines[i];
                for(let status of s) {
                    let value = 12;
                    switch (status) {
                        case Status.PBlock:
                        case Status.MBlock:
                        case Status.PCritResistance:
                        case Status.MCritResistance:
                        case Status.PDef:
                        case Status.MDef:
                        case Status.CritDmg:
                        case Status.ManaPerAttack:
                            value = 24;
                            break;
                        case Status.Dodge:
                        case Status.Tough:
                        case Status.BlockDef:
                            value = 6;
                            break;
                        case Status.ManaPerSecond:
                            value = 36;
                            break;
                    }
                    value = value * 0.75;
                    let multiplier = [1.0, 10/9, 11/9, 12/9, 13/9, 14/9];
                    // Assume in average, we get 70/90 stats in option
                    value = value * 7 / 9 + value * (multiplier[level] - 1);
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
                }
            }
        }
    });
}