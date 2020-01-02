import {HeroClassType} from "../../model/hero-class-type";
import {Status} from "../../model/status";

export type ClassBuffState = Partial<Record<HeroClassType, {
    [Status.Atk]: number,
    [Status.Hp]: number
}>>;

export const CHANGE_CLASS_BUFF="CHANGE_CLASS_BUFF";
export type ClassBuffActionPayload = {
    classType: HeroClassType,
    status: Status.Atk | Status.Hp,
    newValue: number
}
export type ClassBuffAction = {
    type: typeof CHANGE_CLASS_BUFF
    payload: ClassBuffActionPayload
}