import {HeroClassType} from "../model/hero-class-type";
import {compose, createStore} from "redux";
import {RootState} from "./types";
import {allReducers} from "./reducers";
import {HERO_CONFIGURATION} from "./navigation/types";
import {BattleType} from "./hero/types";

const initialSession = window.localStorage.getItem("session");
const defaultState: RootState = {
    selectedNav: {
        header: HERO_CONFIGURATION,
        heroClass: HeroClassType.Tank
    },
    artifactConfiguration: {},
    classBuffs: {},
    heroConfiguration: {
        heroConfiguration: {},
        calculation: {
            battleType: BattleType.WorldBoss,
            heroes: [{heroName: null, dps: 0.0, tankiness: 0.0, isDps: false, isTank: false}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
                isDps: false,
                isTank: false
            }, {heroName: null, dps: 0.0, tankiness: 0.0, isDps: false, isTank: false}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
                isDps: false,
                isTank: false
            }, {heroName: null, dps: 0.0, tankiness: 0.0, isDps: false, isTank: false}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
                isDps: false,
                isTank: false
            }, {heroName: null, dps: 0.0, tankiness: 0.0, isDps: false, isTank: false}, {
                heroName: null,
                dps: 0.0,
                tankiness: 0.0,
                isDps: false,
                isTank: false
            }]
        }
    },
}

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
