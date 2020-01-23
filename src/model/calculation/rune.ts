import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

export function updateRunes(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            for (let status of hero.heroConfiguration.uwRunes) {
                if (status === null) {
                    continue;
                }

                let value = 20;
                switch (status) {
                    case Status.ManaPerAttack:
                        value = 40;
                        break;
                }
                hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
            }

            let status = hero.heroConfiguration.armorRunes[0];
            if (status !== null) {
                let value = 20;
                switch (status) {
                    case Status.CritDmg:
                    case Status.PDef:
                    case Status.MDef:
                        value = 40;
                        break;
                }
                hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
            }

            status = hero.heroConfiguration.armorRunes[1];
            if (status !== null) {
                let value = 20;
                switch (status) {
                    case Status.ManaPerDamage:
                        value = 60;
                        break;
                }
                hero.effects.push(new Effect(EffectType.BasicStatus).with({status: status, value: value}));
            }
        }
    });
}
