import {HeroClassType} from "../hero-class-type";
import {Status} from "../status";
import {BattleCalculation} from "./types";
import {Effect, EffectType} from "../effect";

export function updateBasic(battle: BattleCalculation) {
    battle.enemy.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: battle.info.attack}));
    battle.enemy.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatDef, value: battle.info.defence}));
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            switch(hero.heroInfo.heroClass) {
                case HeroClassType.Knight:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 5}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Block, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Tough, value: 25}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 1520472}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 17632}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 7832}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 6096}));
                    break;
                case HeroClassType.Warrior:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Pen, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Dodge, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.CCResistance, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 1291376}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 20032}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 6528}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 7832}));
                    break;
                case HeroClassType.Assassin:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 20}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.CritDmg, value: 30}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Dodge, value: 20}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 1233888}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 21992}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 6968}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 6968}));
                    break;
                case HeroClassType.Archer:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Pen, value: 25}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 950344}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 24824}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 4784}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 3912}));
                    break;
                case HeroClassType.Mechanic:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.CritDmg, value: 50}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Pen, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 1030920}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 22648}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 4784}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 3912}));
                    break;
                case HeroClassType.Wizard:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Pen, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MDodge, value: 20}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MBlock, value: 25}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 877832}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 26128}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 3480}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 5224}));
                    break;
                case HeroClassType.Priest:
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Crit, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.Acc, value: 10}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MBlock, value: 50}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MBlockDef, value: 25}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.MTough, value: 15}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatHp, value: 984320}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: 20688}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatPDef, value: 4352}));
                    hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatMDef, value: 5440}));
                    break;
            }
        }
    });
}
