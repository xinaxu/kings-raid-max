import {HeroClassType} from "../model/hero-class-type";
import {compose, createStore} from 'redux';
import {RootState} from './types';
import {allReducers} from "./reducers";
import {HERO_CONFIGURATION} from './navigation/types';

const initialState: RootState = {
    selectedNav: {
        header: HERO_CONFIGURATION,
        heroClass: HeroClassType.Tank
    },
    classBuffs: {
    }
};

declare global {
    interface Window {
        devToolsExtension?: typeof compose;
    }
}

export const store = createStore(
    allReducers,
    initialState,
    window.devToolsExtension && window.devToolsExtension());