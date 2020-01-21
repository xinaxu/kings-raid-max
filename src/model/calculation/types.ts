import { Effect } from "../effect";
import { Status } from "../status";
import {DamageType, HeroConfiguration, HeroInfo} from "../hero";
import {BattleInfo} from "../../redux/hero/types";

export type UnitCalculation = {
    effects: Effect[]
    buffs: Partial<Record<Status, number>>
    basicStats: Partial<Record<Status, number>>
    finalStats: Partial<Record<Status, number>>
}

export type HeroCalculation = {
    effects: Effect[]
    buffs: Partial<Record<Status, number>>
    basicStats: Partial<Record<Status, number>>
    finalStats: Partial<Record<Status, number>>
    heroInfo: HeroInfo
    heroConfiguration: HeroConfiguration
    dps: number
    tankiness: number
    dispel: number
    cc: number
    cleanse: number
}

export type EnemyCalculation = {
    effects: Effect[]
    buffs: Partial<Record<Status, number>>
    basicStats: Partial<Record<Status, number>>
    finalStats: Partial<Record<Status, number>>
}

export type BattleCalculation = {
    heroes: (HeroCalculation | undefined)[]
    enemy: EnemyCalculation
    info: BattleInfo
}