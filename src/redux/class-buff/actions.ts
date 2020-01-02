import {HeroClassType} from "../../model/hero-class-type";
import {Status} from "../../model/status";
import {CHANGE_CLASS_BUFF, ClassBuffAction} from "./types";

export function changeClassBuff(classType: HeroClassType, status: Status.Atk | Status.Hp, newValue: number) : ClassBuffAction {
    return {
        type: CHANGE_CLASS_BUFF,
        payload: {
            classType: classType,
            status: status,
            newValue: newValue
        }
    };
}