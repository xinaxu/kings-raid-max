import {BattleCalculation} from "./types";
import {Effect, EffectDestination, EffectType} from "../effect";
import {Status} from "../status";
import {GearSet} from "../hero";

export function updateGearSet(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            if (hero.heroConfiguration.gearSets[0] === hero.heroConfiguration.gearSets[1]) {
                switch (hero.heroConfiguration.gearSets[0]) {
                    case GearSet.BlackDragon:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.ManaPerAttack, value: 46, _dispellable: false}));
                        break;
                    case  GearSet.FireDragon:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 23, _dispellable: false}));
                        break;
                    case  GearSet.DarkLegion:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 13, _dispellable: false, destination: EffectDestination.Allies}));
                        break;
                    case  GearSet.Lava:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 46, _dispellable: false}));
                        break;
                    case  GearSet.IceDragon:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 23, _dispellable: false}));
                        break;
                    case  GearSet.BeastOfChaos:
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dps, value: 27, _dispellable: false}));
                        hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 27, _dispellable: false}));
                        break;
                }
            }
            else {
                for(let gearSet of hero.heroConfiguration.gearSets) {
                    switch (gearSet) {
                        case GearSet.BlackDragon:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.ManaPerAttack, value: 20, _dispellable: false}));
                            break;
                        case  GearSet.FireDragon:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Crit, value: 10, _dispellable: false}));
                            break;
                        case  GearSet.DarkLegion:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 5, _dispellable: false, destination: EffectDestination.Allies}));
                            break;
                        case  GearSet.Lava:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.CritDmg, value: 20, _dispellable: false}));
                            break;
                        case  GearSet.IceDragon:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 10, _dispellable: false}));
                            break;
                        case  GearSet.BeastOfChaos:
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Dps, value: 12, _dispellable: false}));
                            hero.effects.push(new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 12, _dispellable: false}));
                            break;
                    }
                }
            }
        }
    });
}