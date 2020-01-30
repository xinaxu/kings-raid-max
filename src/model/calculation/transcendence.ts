import {BattleCalculation} from "./types";
import {Effect, EffectDestination, EffectMultiplierType, EffectType} from "../effect";
import {Status} from "../status";
import {HeroClassType} from "../hero-class-type";

export function updateTranscendence(battle: BattleCalculation) {
    let experiencedFighter = false;
    let excellentStrategy = false;
    let battleCry = false;
    let eagleEye = false;
    let specialBullet = false;
    let amplifiedGunpowder = false;
    let moralRise = false;
    let goddessBlessing = false;
    let innerPeace = false;
    let swiftness = false;
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            if (hero.heroConfiguration.t1[0]) {
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 30}));
            }
            if (hero.heroConfiguration.t1[1]) {
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 30}));
            }
            if (hero.heroConfiguration.t1[2]) {
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Def, value: 30}));
            }
            if (hero.heroConfiguration.t1[3]) {
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritResistance, value: 20}));
            }
            if (hero.heroConfiguration.t1[4]) {
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dps, value: 10}));
                hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 10}));
            }
            
            switch(hero.heroInfo.heroClass) {
                case HeroClassType.Knight:
                    if (hero.heroConfiguration.t2[0]) {
                        if (!experiencedFighter) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Weakness, value: 20, destination: EffectDestination.Enemies}));
                        }
                        experiencedFighter = true;
                    }
                    if (hero.heroConfiguration.t2[1]) {
                        if (!excellentStrategy) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CCAcc, value: 15, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CCAcc, value: 5, destination: EffectDestination.Allies}));
                        }
                        excellentStrategy = true;
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        if (!battleCry) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 15, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 5, destination: EffectDestination.Allies}));
                        }
                        battleCry = true;
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Block, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CCResistance, value: 20}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 40}));
                    }
                    break;
                case HeroClassType.Warrior:
                    if (hero.heroConfiguration.t2[0]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 15}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 30}));
                    }
                    if (hero.heroConfiguration.t2[1]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 7, multiplier: {type: EffectMultiplierType.ByNumOfEnemeis, maxStack: 10}, _dispellable: false}));
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.FlatAtk, value: 0.5, fromStatus: Status.FlatPDef}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.PTough, value: 15}));
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dodge, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 10}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Lifesteal, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: 20}));
                    }
                    break;
                case HeroClassType.Assassin:
                    if (hero.heroConfiguration.t2[0]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Pen, value: 20}));
                    }
                    if (hero.heroConfiguration.t2[1]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dodge, value: 10}));
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dodge, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 10}));
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 15}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 30}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Weakness, value: 10, destination: EffectDestination.Enemies}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: -10, destination: EffectDestination.Enemies}));
                    }
                    break;
                case HeroClassType.Archer:
                    if (hero.heroConfiguration.t2[0]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 40}));
                    }
                    if (hero.heroConfiguration.t2[1]) {
                        if (!eagleEye) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Pen, value: 15, destination: EffectDestination.Allies}));
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 7.5, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Pen, value: 5, destination: EffectDestination.Allies}));
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 2.5, destination: EffectDestination.Allies}));
                        }
                        eagleEye = true;
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Recovery, value: -50, destination: EffectDestination.Enemies}));
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 15}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 30}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 4, coolDown: 5, multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 25}, _dispellable: false}));
                    }
                    break;
                case HeroClassType.Mechanic:
                    if (hero.heroConfiguration.t2[0]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Pen, value: 20}));
                    }
                    if (hero.heroConfiguration.t2[1]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.ManaPerSecond, value: 62.5, multiplier: {maxStack: 100, type: EffectMultiplierType.ByNumOfEnemeis}}));
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 40}));
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        if (!specialBullet) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: -15, destination: EffectDestination.Enemies}));
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: -15, destination: EffectDestination.Enemies}));
                        }
                        specialBullet = true;
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        if (!amplifiedGunpowder) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 30, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 10, destination: EffectDestination.Allies}));
                        }
                        amplifiedGunpowder = true;
                    }
                    break;
                case HeroClassType.Wizard:
                    if (hero.heroConfiguration.t2[1]) {
                        if (!moralRise) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 15, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 3, destination: EffectDestination.Allies}));
                        }
                        moralRise = true;
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.ManaPerSecond, value: 250}));
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 40}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Weakness, value: 15}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 20}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Pen, value: 20}));
                    }
                    break;
                case HeroClassType.Priest:
                    if (hero.heroConfiguration.t2[1]) {
                        if (!goddessBlessing) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 15, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 5, destination: EffectDestination.Allies}));
                        }
                        goddessBlessing = true;
                    }
                    if (hero.heroConfiguration.t2[2]) {
                        if (!innerPeace) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CCResistance, value: 7.5, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CCResistance, value: 2.5, destination: EffectDestination.Allies}));
                        }
                        innerPeace = true;
                    }
                    if (hero.heroConfiguration.t2[3]) {
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.ManaPerSecond, value: 250}));
                    }
                    if (hero.heroConfiguration.t2[4]) {
                        if (!swiftness) {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: 15, destination: EffectDestination.Allies}));
                        }
                        else {
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: 5, destination: EffectDestination.Allies}));
                        }
                        swiftness = true;
                    }
                    break;
            }
        }
    });
}