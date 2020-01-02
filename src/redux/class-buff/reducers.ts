import {CHANGE_CLASS_BUFF, ClassBuffAction, ClassBuffState} from "./types";
import {Status} from "../../model/status";


export function classBuffReducer(state: ClassBuffState = {}, action: ClassBuffAction): ClassBuffState {
    switch (action.type) {
        case CHANGE_CLASS_BUFF:
                let newState: ClassBuffState = {...state};
                newState[action.payload.classType] = {
                    [Status.Hp]: state[action.payload.classType] === undefined ? 0 : state[action.payload.classType]![Status.Hp] ,
                    [Status.Atk]: state[action.payload.classType] === undefined ? 0 : state[action.payload.classType]![Status.Atk]
                };
                newState[action.payload.classType]![action.payload.status] = action.payload.newValue;
                return newState;
        default:
            return state;
    }
}