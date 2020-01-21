import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

export function updateArtifact(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            hero.heroConfiguration
        }
    });
}