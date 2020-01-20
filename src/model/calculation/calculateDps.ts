import {BattleCalculation} from "./types";
import {Status} from "../status";
import {DamageType} from "../hero";

export function calculateDps(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            if (hero.stats[Status.Crit]! > 100) {
                hero.stats[Status.Crit] = 100;
            }

            let dps: number = hero.stats[Status.Atk]!;
            dps *= 1 + hero.stats[Status.Crit]! / 100 * (hero.stats[Status.CritDmg]! / 100 + 1);
            if (hero.heroInfo.damageType === DamageType.Physical) {
                dps *= 1 + hero.stats[Status.PDps]! / 100;
            }
            else {
                dps *= 1 + hero.stats[Status.MDps]! / 100;
            }

            let def: number = hero.heroInfo.damageType === DamageType.Magic ? battle.enemy.stats[Status.MDef]! : battle.enemy.stats[Status.PDef]!;
            let pen: number = hero.stats[Status.Pen]!;
            let defPenetrated = def * (1 - pen / 100);
            let mitigation = 0.9817 * defPenetrated / (19360.3675 + defPenetrated);
            dps *= (1 - mitigation);
            hero.dps = Math.round(dps);
        }
    });
}