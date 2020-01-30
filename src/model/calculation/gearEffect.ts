import { BattleCalculation } from "./types";

export function updateGearEffect(battle: BattleCalculation) {
  battle.heroes.forEach(hero => {
    if (hero !== undefined) {
        if (hero.heroConfiguration.uwLevel !== null) {
            hero.heroInfo.uw.starEffects.forEach(starEffect => {
                hero.effects.push(starEffect[hero.heroConfiguration.uwLevel!]);
            });
        }
        if (hero.heroConfiguration.utPrimary !== null && hero.heroConfiguration.utLevel[hero.heroConfiguration.utPrimary - 1] !== null) {
            hero.heroInfo.ut[hero.heroConfiguration.utPrimary - 1].starEffects.forEach(starEffect => {
                hero.effects.push(starEffect[hero.heroConfiguration.utLevel[hero.heroConfiguration.utPrimary! - 1]!]);
            });
        }
    }
  });
}
