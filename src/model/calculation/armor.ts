import {Accessory} from "../hero";
import {HeroClassType} from "../hero-class-type";
import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";
import {Status} from "../status";

const pArmorValues: Record<HeroClassType, number> = {
  Knight: 34105,
  Warrior: 34105,
  Assassin: 22739,
  Archer: 22739,
  Mechanic: 22739,
  Wizard: 11372,
  Priest: 11372
};

const mArmorValues: Record<HeroClassType, number> = {
  Knight: 34105,
  Warrior: 34105,
  Assassin: 11372,
  Archer: 11372,
  Mechanic: 11372,
  Wizard: 22739,
  Priest: 22739
};

export function updateArmor(battle: BattleCalculation) {
  battle.heroes.forEach(hero => {
    if (hero !== undefined) {
      hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: pArmorValues[hero.heroInfo.heroClass]}));
      hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: mArmorValues[hero.heroInfo.heroClass]}));
      switch (hero.heroConfiguration.accessory) {
        case Accessory.Ring:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 1089487}));
          break;
        case Accessory.Earring:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 23702}));
          break;
        case Accessory.Bracelet:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 11369}));
          break;
        case Accessory.Necklace:
          hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 11369}));
          break;
      }
    }
  });
}