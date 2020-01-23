import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

export function updateEnchants(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            for (let status of hero.heroConfiguration.enchants) {
                if (status === null) {
                    continue;
                }
                
                let value = 8;
                switch (status) {
                    case Status.PBlock:
                    case Status.MBlock:
                    case Status.PCritResistance:
                    case Status.MCritResistance:
                    case Status.PBlockDef:
                    case Status.MBlockDef:
                    case Status.PDef:
                    case Status.MDef:
                    case Status.CritDmg:
                        value = 16;
                }
                hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
            }
        }
    });
}