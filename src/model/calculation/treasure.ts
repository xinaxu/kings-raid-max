import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

const treasureHpMap = {
    0: 1361742,
    1: 1497907,
    2: 1770264,
    3: 2178785,
    4: 2723485,
    5: 3404349
};

export function updateTreasure(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            for (let ut of hero.heroConfiguration.utLevel) {
                if (ut !== null) {
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({
                        status: Status.FlatHp,
                        value: treasureHpMap[ut]
                    }));
                }
            }
        }
    });
}