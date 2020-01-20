import {BattleCalculation} from "./types";
import {Status} from "../status";
import {DamageType} from "../hero";

export function calculateTankiness(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            let tankiness = hero.stats[Status.Hp]!;
            let defence, dodge, block, blockdef, tough;
            if (battle.enemy.damageType === DamageType.Physical) {
                defence = hero.stats[Status.PDef]!;
                dodge = hero.stats[Status.PDodge]!;
                block = hero.stats[Status.PBlock]!;
                blockdef = hero.stats[Status.PBlockDef]!;
                tough = hero.stats[Status.PTough]!;
            }
            else {
                defence = hero.stats[Status.MDef]!;
                dodge = hero.stats[Status.MDodge]!;
                block = hero.stats[Status.MBlock]!;
                blockdef = hero.stats[Status.MBlockDef]!;
                tough = hero.stats[Status.MTough]!;
            }
            
            tankiness /= (1 - dodge / 100);
            tankiness /= (1 - 0.5 * block / 100 - block / 100 * blockdef / 100);
            tankiness /= (1 - tough / 100);
            tankiness /= (1- 0.9817 * defence / (19360.3675 + defence));
            hero.tankiness = Math.round(tankiness);
        }
    });
}