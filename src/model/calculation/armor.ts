import {Accessory} from "../hero";
import {HeroClassType} from "../hero-class-type";
import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

const pArmorValues: Record<HeroClassType, number> = {
  Knight: 34105 + 7832,
  Warrior: 34105 + 6528,
  Assassin: 22739 + 6968,
  Archer: 22739 + 4784,
  Mechanic: 22739 + 4784,
  Wizard: 11372 + 3480,
  Priest: 11372 + 4352
};

const mArmorValues: Record<HeroClassType, number> = {
  Knight: 34105 + 6096,
  Warrior: 34105 + 7832,
  Assassin: 11372 + 6096,
  Archer: 11372 + 3912,
  Mechanic: 11372 + 3912,
  Wizard: 22739 + 5224,
  Priest: 22739 + 5440
};

export function updateArmor(battle: BattleCalculation) {
  battle.heroes.forEach(hero => {
    if (hero !== undefined) {
      hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.PDef, value: pArmorValues[hero.heroInfo.heroClass]}));
      hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MDef, value: mArmorValues[hero.heroInfo.heroClass]}));
      switch (hero.heroConfiguration.accessory) {
        case Accessory.Ring:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Hp, value: 1089487}));
          break;
        case Accessory.Earring:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Atk, value: 23702}));
          break;
        case Accessory.Bracelet:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.PDef, value: 11369}));
          break;
        case Accessory.Necklace:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MDef, value: 11369}));
          break;
      }
    }
  });
}