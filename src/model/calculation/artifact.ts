import {BattleCalculation} from "./types";
import { artifacts } from "../artifact";

export function updateArtifact(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            if (hero.heroConfiguration.artifact[0]!==null) {
                artifacts[hero.heroConfiguration.artifact[0]]!.starEffects.forEach(starEffect => {
                    hero.effects.push(starEffect[hero.heroConfiguration.artifact[1]]);
                });
            }
        }
    });
}