import { Effect } from "../effect";
import { Status } from "../status";
import {DamageType, HeroConfiguration, HeroInfo} from "../hero";

export type HeroCalculation = {
    effects: Effect[]
    stats: Partial<Record<Status, number>>
    heroInfo: HeroInfo
    heroConfiguration: HeroConfiguration
    dps: number
    tankiness: number
}

export type EnemyCalculation = {
    damageType: DamageType
    effects: Effect[]
    stats: Partial<Record<Status, number>>
}

export type BattleCalculation = {
    heroes: (HeroCalculation | undefined)[]
    enemy: EnemyCalculation
}