import {HeroClassType} from "../model/hero-class-type";
import {compose, createStore} from "redux";
import {RootState} from "./types";
import {allReducers} from "./reducers";
import {HERO_CONFIGURATION} from "./navigation/types";
import {BattleType} from "./hero/types";
import {DamageType} from "../model/hero";

const initialSession = window.localStorage.getItem("session");
const defaultState: RootState = {
    selectedNav: {
        header: HERO_CONFIGURATION,
        heroClass: HeroClassType.Knight
    },
    artifactConfiguration: {},
    classBuffs: {},
    heroConfiguration: {
        heroConfiguration: {},
        calculation: {
            battleType: BattleType.WorldBoss1,
            heroes: [{heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null,
            }, {heroName: null}, {
                heroName: null
            }, {heroName: null}, {
                heroName: null
            }],
            battleCalculation: {
                heroes: [],
                enemy: {
                    damageType: DamageType.Physical,
                    stats: {},
                    effects: []
                }
            }
        }
    },
}

const initialState: RootState =
        defaultState

// const initialState: RootState =
//     initialSession === null
//         ? defaultState
//         : JSON.parse(initialSession);

declare global {
    interface Window {
        devToolsExtension?: typeof compose;
    }
}

export const store = createStore(
    allReducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
);
