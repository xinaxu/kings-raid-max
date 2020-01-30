import { BattleCalculation } from "./types";
import { SkillTranscendence } from "../hero";
import { Effect } from "../effect";

export function updateSkill(battle: BattleCalculation) {
  battle.heroes.forEach(hero => {
    if (hero !== undefined) {
      [0, 1, 2, 3].forEach(i => {
        let effects: Effect[] = hero.heroInfo.skills[i].neither;
        switch (hero.heroConfiguration.t3[i]) {
          case SkillTranscendence.Light:
            if (hero.heroInfo.skills[i].override === true) {
                effects = [];
            } 
            effects = [...effects, ...hero.heroInfo.skills[i].light];
            break;
          case SkillTranscendence.Dark:
            if (hero.heroInfo.skills[i].override === true) {
                effects = [];
            } 
            effects = [...effects, ...hero.heroInfo.skills[i].dark];
            break;
        }
        effects.forEach(effect => hero.effects.push(effect));
      });

      if (hero.heroConfiguration.t5[0]) {
          hero.heroInfo.t5Light.forEach(effect => hero.effects.push(effect));
      }

      if (hero.heroConfiguration.t5[1]) {
          hero.heroInfo.t5Dark.forEach(effect => hero.effects.push(effect));
      }
    }
  });
}
