import {BattleCalculation} from "./types";
import {Status} from "../status";
import {DamageType} from "../hero";
import {normalize} from "./normalizer";

export function calculateDps(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            let dps: number = hero.finalStats[Status.FlatAtk]!;
            let crit = normalize(hero, Status.Crit);
            if (crit > 100) {
                crit = 100;
            }
            
            let critDmg = hero.finalStats[Status.CritDmg]!;
            let amp = hero.heroInfo.damageType === DamageType.Physical ? hero.finalStats[Status.PDps]! : hero.finalStats[Status.MDps]!;
            
            dps *= 1 + crit / 100 * (critDmg / 100 + 1);
            dps *= 1 + amp / 100;

            let def: number = hero.heroInfo.damageType === DamageType.Magic ? battle.enemy.finalStats[Status.FlatMDef]! : battle.enemy.finalStats[Status.FlatPDef]!;
            let pen: number = normalize(hero, Status.Pen);
            let defPenetrated = def * (1 - pen / 100);
            let mitigation = 0.9817 * defPenetrated / (19360.3675 + defPenetrated);
            dps *= (1 - mitigation);
            hero.dps = Math.round(dps);
        }
    });
}