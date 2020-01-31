import {BattleCalculation, UnitCalculation} from "./types";
import {Effect, EffectDestination, EffectMultiplierType, EffectType} from "../effect";
import {Status} from "../status";
import {normalize} from "./normalizer";
import {BattleInfo} from "../../redux/hero/types";

function _updateFinalStatus(hero: UnitCalculation) {
        Object.values(Status).forEach(status => {
            hero.finalStats[status] = hero.basicStats[status]! + hero.buffs[status]!;
        });
        hero.finalStats[Status.Atk] = hero.buffs[Status.Atk];
        hero.finalStats[Status.FlatAtk] = hero.basicStats[Status.FlatAtk]! * (1 + normalize(hero, Status.Atk) / 100) * (1 + hero.basicStats[Status.Atk]! / 100) + hero.buffs[Status.FlatAtk]!;
        // hero.finalStats[Status.Atk] = 0;
        hero.finalStats[Status.FlatHp] = hero.basicStats[Status.FlatHp]! * (1 + hero.basicStats[Status.Hp]! / 100)* (1 + hero.buffs[Status.Hp]! / 100) + hero.buffs[Status.FlatHp]!;
        hero.finalStats[Status.Hp] = 0;
        hero.finalStats[Status.FlatPDef] = (hero.basicStats[Status.FlatPDef]! + hero.basicStats[Status.FlatDef]!) * (1 + hero.basicStats[Status.PDef]! / 100 + hero.basicStats[Status.Def]! / 100) * (1 + hero.buffs[Status.PDef]! / 100 + hero.buffs[Status.Def]! / 100) + hero.buffs[Status.FlatPDef]! + hero.buffs[Status.FlatDef]!;
        hero.finalStats[Status.FlatMDef] = (hero.basicStats[Status.FlatMDef]! + hero.basicStats[Status.FlatDef]!) * (1 + hero.basicStats[Status.MDef]! / 100 + hero.basicStats[Status.Def]! / 100) * (1 + hero.buffs[Status.MDef]! / 100 + hero.buffs[Status.Def]! / 100) + hero.buffs[Status.FlatMDef]! + hero.buffs[Status.FlatDef]!;
        hero.finalStats[Status.FlatDef] = 0;
        hero.finalStats[Status.PDef] = 0;
        hero.finalStats[Status.MDef] = 0;
        hero.finalStats[Status.PDodge] = hero.finalStats[Status.PDodge]! + hero.finalStats[Status.Dodge]!;
        hero.finalStats[Status.MDodge] = hero.finalStats[Status.MDodge]! + hero.finalStats[Status.Dodge]!;
        hero.finalStats[Status.Dodge] = 0;
        hero.finalStats[Status.PBlock] = hero.finalStats[Status.PBlock]! + hero.finalStats[Status.Block]!;
        hero.finalStats[Status.MBlock] = hero.finalStats[Status.MBlock]! + hero.finalStats[Status.Block]!;
        hero.finalStats[Status.Block] = 0;
        hero.finalStats[Status.PBlockDef] = hero.finalStats[Status.PBlockDef]! + hero.finalStats[Status.BlockDef]!;
        hero.finalStats[Status.MBlockDef] = hero.finalStats[Status.MBlockDef]! + hero.finalStats[Status.BlockDef]!;
        hero.finalStats[Status.BlockDef] = 0;
        hero.finalStats[Status.PTough] = hero.finalStats[Status.PTough]! + hero.finalStats[Status.Tough]!;
        hero.finalStats[Status.MTough] = hero.finalStats[Status.MTough]! + hero.finalStats[Status.Tough]!;
        hero.finalStats[Status.Tough] = 0;
        hero.finalStats[Status.PCritResistance] = hero.finalStats[Status.PCritResistance]! + hero.finalStats[Status.CritResistance]!;
        hero.finalStats[Status.MCritResistance] = hero.finalStats[Status.MCritResistance]! + hero.finalStats[Status.CritResistance]!;
        hero.finalStats[Status.CritResistance] = 0;
        hero.finalStats[Status.PDps] = hero.finalStats[Status.PDps]! + hero.finalStats[Status.Dps]!;
        hero.finalStats[Status.MDps] = hero.finalStats[Status.MDps]! + hero.finalStats[Status.Dps]!;
        hero.finalStats[Status.Dps] = 0;
        hero.finalStats[Status.PWeakness] = hero.finalStats[Status.PWeakness]! + hero.finalStats[Status.Weakness]!;
        hero.finalStats[Status.MWeakness] = hero.finalStats[Status.MWeakness]! + hero.finalStats[Status.Weakness]!;
        hero.finalStats[Status.Weakness] = 0;
}

function updateFinalStats(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            _updateFinalStatus(hero);
        }
    });

    _updateFinalStatus(battle.enemy);
}

function effectiveValue(effect: Effect, battleInfo: BattleInfo) : number{
    let starting = effect.starting ?? 0;
    let ending = effect.ending ?? battleInfo.duration;
    let value: number = effect.value;
    value *= (ending - starting) / battleInfo.duration;
    if (effect.duration !== undefined && effect.coolDown !== undefined) {
        let ratio = effect.duration / effect.coolDown;
        if (ratio < 1) {
            value *= ratio;
        }
    }
    
    let cd = 1;
    if (effect.multiplier !== undefined) {
        switch (effect.multiplier.type) {
            case EffectMultiplierType.ByNumOfEnemeis:
                value *= battleInfo.numOfHeroes;
                break;
            case EffectMultiplierType.ByCooldown:
                cd = effect.coolDown!;
            case EffectMultiplierType.ByDodge:
            case EffectMultiplierType.NormalAttack:
            case EffectMultiplierType.TakingHit:
                let maxTime = cd * effect.multiplier!.maxStack!;
                if (maxTime >= battleInfo.duration) {
                    value *= battleInfo.duration / cd / 2;
                }
                else {
                    value *= effect.multiplier!.maxStack! * (maxTime / 2 + battleInfo.duration - maxTime) / battleInfo.duration;
                }
                break;
        }
    }
    
    return value;
}

export function applyEffects(battle: BattleCalculation) {
    // Enemy init
    Object.values(Status).forEach(status => {
        battle.enemy.basicStats[status] = 0;
        battle.enemy.buffs[status] = 0;
        battle.enemy.finalStats[status] = 0;
    });

    // Heroes init
    battle.heroes.forEach(hero => {
        if (hero === undefined) {
            return;
        }

        Object.values(Status).forEach(status => {
            hero.basicStats[status] = 0;
            hero.buffs[status] = 0;
            hero.finalStats[status] = 0;
        });
    });

    // Heroes Basic Status
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            hero.effects.filter(effect => effect.type === EffectType.BasicStatus).forEach(effect => {
                hero.basicStats[effect.status]! += effect.value;
            });
        }
    });

    // Enemy Basic Status
    battle.enemy.effects.filter(effect => effect.type === EffectType.BasicStatus).forEach(effect => {
        battle.enemy.basicStats[effect.status]! += effect.value;
    });

    // Apply Buffs, excluding TopDps or CrossStatus
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            hero.effects.filter(effect => effect.type === EffectType.StatusChange && effect.fromStatus === undefined && effect.destination !== EffectDestination.TopDps).forEach(effect => {
                switch (effect.destination) {
                    case EffectDestination.Self:
                        hero.buffs[effect.status]! += effectiveValue(effect, battle.info);
                        break;
                    case EffectDestination.Allies:
                        battle.heroes.forEach(ally => {
                            if (ally !== undefined) {
                                ally.buffs[effect.status]! += effectiveValue(effect, battle.info);
                            }
                        });
                        break;
                    case EffectDestination.Enemies:
                    case EffectDestination.SingleEnemy:
                        battle.enemy.buffs[effect.status]! += effectiveValue(effect, battle.info);
                        break;
                }
            });
        }
    });
    
    // Update enemy final stats
    Object.values(Status).forEach(status => {
        battle.enemy.finalStats[status] = battle.enemy.basicStats[status]! + battle.enemy.buffs[status]!;
    });

    battle.enemy.finalStats[Status.FlatAtk] = battle.enemy.basicStats[Status.FlatAtk]! * (1 + battle.enemy.basicStats[Status.Atk]! / 100) * (1 + battle.enemy.buffs[Status.Atk]! / 100) + battle.enemy.buffs[Status.FlatAtk]!;
    battle.enemy.finalStats[Status.FlatPDef] = (battle.enemy.basicStats[Status.FlatPDef]! + battle.enemy.basicStats[Status.FlatDef]!) * (1 + battle.enemy.buffs[Status.PDef]! / 100 + battle.enemy.buffs[Status.Def]! / 100) + battle.enemy.buffs[Status.FlatPDef]! + battle.enemy.buffs[Status.FlatDef]!;
    battle.enemy.finalStats[Status.FlatMDef] = (battle.enemy.basicStats[Status.FlatMDef]! + battle.enemy.basicStats[Status.FlatDef]!) * (1 + battle.enemy.buffs[Status.MDef]! / 100 + battle.enemy.buffs[Status.Def]! / 100) + battle.enemy.buffs[Status.FlatMDef]! + battle.enemy.buffs[Status.FlatDef]!;
    battle.enemy.finalStats[Status.FlatDef] = 0;
    
    updateFinalStats(battle);
    
    // Apply Buffs, Cross Status, but not Top Dps
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            hero.effects.filter(effect => effect.type === EffectType.StatusChange && effect.fromStatus !== undefined && effect.destination !== EffectDestination.TopDps).forEach(effect => {
                switch (effect.destination) {
                    case EffectDestination.Self:
                        hero.buffs[effect.status]! += effectiveValue(effect, battle.info) * hero.finalStats[effect.fromStatus!]!;
                        break;
                    case EffectDestination.Allies:
                        battle.heroes.forEach(ally => {
                            if (ally !== undefined) {
                                ally.buffs[effect.status]! += effectiveValue(effect, battle.info) * hero.finalStats[effect.fromStatus!]!;
                            }
                        });
                        break;
                }
            });
        }
    });
    
    updateFinalStats(battle);
    
    // Apply Buffs, Top Dps
    let topDps = Math.max.apply(Math, battle.heroes.map(_ => _?.finalStats[Status.FlatAtk] ?? 0));
    let topDpsHero = battle.heroes.find(_ => _?.finalStats[Status.FlatAtk] === topDps);
    if (topDpsHero !== undefined) {
        battle.heroes.forEach(hero => {
            if (hero !== undefined) {
                hero.effects.filter(effect => effect.type === EffectType.StatusChange && effect.destination === EffectDestination.TopDps).forEach(effect => {
                    if (effect.fromStatus === undefined) {
                        topDpsHero!.buffs[effect.status]! += effectiveValue(effect, battle.info);
                    }
                    else {
                        topDpsHero!.buffs[effect.status]! += effectiveValue(effect, battle.info) * hero.finalStats[effect.fromStatus]!;
                    }
                });
            }
        });
    }
    
    updateFinalStats(battle);
}