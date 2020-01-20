import {BattleCalculation} from "./types";
import {EffectDestination, EffectType} from "../effect";
import {Status} from "../status";

export function applyEffects(battle: BattleCalculation) {
    Object.values(Status).forEach(status => {
        battle.enemy.stats[status] = 0;
    });
    
    battle.heroes.forEach(hero => {
        if (hero === undefined) {
            return;
        }

        Object.values(Status).forEach(status => {
            hero.stats[status] = 0;
        });
    });

    battle.heroes.forEach(hero => {
        if (hero === undefined) {
            return;
        }

        // Self and allies percentage buff
        hero.effects.forEach(effect => {
            if (effect.type === EffectType.StatusChange && effect.isPercentage && effect.fromStatus === undefined) {
                switch (effect.destination) {
                    case EffectDestination.Self:
                        hero.stats[effect.status]! += effect.value;
                        break;
                    case EffectDestination.Allies:
                        battle.heroes.forEach(allyhero => {
                            if (allyhero !== undefined) {
                                allyhero.stats[effect.status]! += effect.value;
                            }
                        });
                        break;
                }
            }
        });

        // Self Basic Status
        let hp = 0, atk = 0, mdef = 0, pdef = 0;
        hero.effects.forEach(effect => {
            if (effect.type === EffectType.BasicStatus) {
                switch (effect.status) {
                    case Status.Hp:
                        hp += effect.value;
                        break;
                    case Status.Atk:
                        atk += effect.value;
                        break;
                    case Status.Def:
                        pdef += effect.value;
                        mdef += effect.value;
                        break;
                    case Status.PDef:
                        pdef += effect.value;
                        break;
                    case Status.MDef:
                        mdef += effect.value;
                        break;
                    default:
                        hero.stats[effect.status]! += effect.value;
                        break;
                }
            }
        });

        hero.stats[Status.Hp] = hp * (1 + hero.stats[Status.Hp]! / 100);
        hero.stats[Status.Atk] = atk * (1 + hero.stats[Status.Atk]! / 100);
        hero.stats[Status.PDef] = pdef * (1 + (hero.stats[Status.PDef]! + hero.stats[Status.Def]!) / 100);
        hero.stats[Status.MDef] = pdef * (1 + (hero.stats[Status.MDef]! + hero.stats[Status.Def]!) / 100);
        hero.stats[Status.Def] = 0;

        // Self or Allies flat buff
        hero.effects.forEach(effect => {
            if (effect.type === EffectType.StatusChange && !effect.isPercentage) {
                switch (effect.destination) {
                    case EffectDestination.Self:
                        hero.stats[effect.status]! += effect.value;

                        break;
                    case EffectDestination.Allies:
                        battle.heroes.forEach(allyhero => {
                            if (allyhero !== undefined) {
                                allyhero.stats[effect.status]! += effect.value;
                            }
                        });
                        break;
                }
            }
        });

        // Cross percentage buff
        hero.effects.forEach(effect => {
            if (effect.type === EffectType.StatusChange && effect.fromStatus !== undefined) {
                switch (effect.destination) {
                    case EffectDestination.Self:
                        hero.stats[effect.status]! += effect.value * hero.stats[effect.fromStatus]!;
                        break;
                    case EffectDestination.Allies:
                        battle.heroes.forEach(allyhero => {
                            if (allyhero !== undefined) {
                                allyhero.stats[effect.status]! += effect.value * hero.stats[effect.fromStatus!]!;
                            }
                        });
                        break;
                    case EffectDestination.TopDps:
                        let topDps = Math.max.apply(Math, battle.heroes.map(_ => _?.stats[Status.Atk] ?? 0));
                        let topDpsHero = battle.heroes.find(_ => _?.stats[Status.Atk] === topDps);
                        if (topDpsHero !== undefined) {
                            topDpsHero.stats[effect.status]! += effect.value * hero.stats[effect.fromStatus]!;
                        }
                        break;
                }
            }
        });
    });
}