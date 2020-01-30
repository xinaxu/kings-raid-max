import {BattleCalculation} from "./types";
import {Status} from "../status";
import {DamageType} from "../hero";
import {normalize} from "./normalizer";

export function calculateTankiness(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            let tankiness = hero.finalStats[Status.FlatHp]!;
            let defence, dodge, block, blockdef, tough;
            if (battle.info.attackType === DamageType.Physical) {
                defence = hero.finalStats[Status.FlatPDef]!;
                dodge = normalize(hero, Status.PDodge);
                block = normalize(hero, Status.PBlock);
                blockdef = normalize(hero, Status.PBlockDef);
                tough = normalize(hero, Status.PTough);
            }
            else {
                defence = hero.finalStats[Status.FlatMDef]!;
                dodge = normalize(hero, Status.MDodge);
                block = normalize(hero, Status.MBlock);
                blockdef = normalize(hero, Status.MBlockDef);
                tough = normalize(hero, Status.MTough);
            }
            
            tankiness /= (1 - dodge / 100);
            tankiness /= (1 - 0.5 * block / 100 - block / 100 * blockdef / 100);
            tankiness /= (1 - tough / 100);
            tankiness /= (1- 0.9817 * defence / (19360.3675 + defence));
            
            tankiness /= battle.enemy.finalStats[Status.FlatAtk]!;
            hero.tankiness = Math.round(tankiness);
        }
    });
}