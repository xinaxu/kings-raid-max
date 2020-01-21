import {HeroClassType} from "../hero-class-type";
import {StarLevel} from "../star-effect";
import {Status} from "../status";
import {Effect, EffectType} from "../effect";
import {BattleCalculation} from "./types";

const uwAttackValues: Record<HeroClassType, Record<StarLevel | 'null', number>> = {
    Knight: {
        0: 38484,
        1: 42332,
        2: 50029,
        3: 61574,
        4: 76968,
        5: 96209,
        'null': 27928
    },
    Warrior: {
        0: 43615,
        1: 47976,
        2: 56699,
        3: 69784,
        4: 87230,
        5: 109037,
        'null': 31576
    },
    Assassin: {
        0: 47957,
        1: 52752,
        2: 62344,
        3: 76731,
        4: 95914,
        5: 119892,
        'null': 34734
    },
    Archer: {
        0: 53976,
        1: 59373,
        2: 70169,
        3: 86362,
        4: 107952,
        5: 134940,
        'null': 39174
    },
    Mechanic: {
        0: 49239,
        1: 54163,
        2: 64011,
        3: 78783,
        4: 98479,
        5: 123099,
        'null': 35721
    },
    Wizard: {
        0: 50325,
        1: 55357,
        2: 65422,
        3: 80520,
        4: 100650,
        5: 125812,
        'null': 36510
    },
    Priest: {
        0: 50325,
        1: 55357,
        2: 65422,
        3: 80520,
        4: 100650,
        5: 125812,
        'null': 36510
    },
};

export function updateWeapon(battle: BattleCalculation) {
    battle.heroes.forEach(hero => {
        if (hero !== undefined) {
            let baseAttack = uwAttackValues[hero.heroInfo.heroClass][hero.heroConfiguration.uwLevel === null ? 'null' : hero.heroConfiguration.uwLevel];
            hero.effects.push(new Effect(EffectType.BasicStatus).with({status: Status.FlatAtk, value: baseAttack}));
        }
    });
}