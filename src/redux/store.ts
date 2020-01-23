import {HeroClassType} from "../model/hero-class-type";
import {compose, createStore} from "redux";
import {RootState} from "./types";
import {allReducers} from "./reducers";
import {HERO_CONFIGURATION} from "./navigation/types";
import {BattleInfos, BattleType} from "./hero/types";

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
                    basicStats: {},
                    finalStats: {},
                    buffs: {},
                    effects: []
                },
                info: BattleInfos[BattleType.WorldBoss1]
            }
        }
    },
};

// const initialState: RootState =
//         defaultState

const initialState: RootState =
    initialSession === null
        ? defaultState
        : JSON.parse(initialSession);

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
