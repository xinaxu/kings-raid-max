import {
  Effect,
  EffectType,
  EffectDestination,
  EffectTrigger,
  EffectMultiplier
} from "./effect";
import { Status } from "./status";

export type StarEffect = [Effect, Effect, Effect, Effect, Effect, Effect];

export type StarLevel = 0 | 1 | 2 | 3 | 4 | 5;

export class StarEffectGroup {
  constructor(...starEffects: StarEffect[]) {
    this.starEffects = starEffects;
  }

  starEffects: StarEffect[];

  description(level: StarLevel | null): string[] {
    if (level === null) {
      return [];
    }
    
    return this.starEffects.map(starEffect => starEffect[level].description());
  }

  with(override: {
    type?: EffectType;
    destination?: EffectDestination;
    status?: Status;
    value?: number;
    fromStatus?: Status;
    trigger?: EffectTrigger;
    multiplier?: EffectMultiplier;
    coolDown?: number;
    duration?: number;
    starting?: number;
    ending?: number;
    _dispellable?: boolean;
    allyStackEfficiency?: number;
  }): this {
    for (let starEffect of this.starEffects) {
      for (let effect of starEffect) {
        if (override.type !== undefined) {
          effect.type = override.type;
        }
        if (override.destination !== undefined) {
          effect.destination = override.destination;
        }
        if (override.status !== undefined) {
          effect.status = override.status;
        }
        if (override.value !== undefined) {
          effect.value = override.value;
        }
        if (override.fromStatus !== undefined) {
          effect.fromStatus = override.fromStatus;
        }
        if (override.trigger !== undefined) {
          effect.trigger = override.trigger;
        }
        if (override.multiplier !== undefined) {
          effect.multiplier = override.multiplier;
        }
        if (override.coolDown !== undefined) {
          effect.coolDown = override.coolDown;
        }
        if (override.duration !== undefined) {
          effect.duration = override.duration;
        }
        if (override.starting !== undefined) {
          effect.starting = override.starting;
        }
        if (override.ending !== undefined) {
          effect.ending = override.ending;
        }
        if (override._dispellable !== undefined) {
          effect._dispellable = override._dispellable;
        }
        if (override.allyStackEfficiency !== undefined) {
          effect.allyStackEfficiency = override.allyStackEfficiency;
        }
      }
    }

    return this;
  }
}

export function createStarEffect(
  baseEffect: Effect,
  {
    values,
    coolDowns,
    durations
  }: {
    values?: [number, number, number, number, number, number];
    coolDowns?: [number, number, number, number, number, number];
    durations?: [number, number, number, number, number, number];
  }
): StarEffect {
  let result: StarEffect = [
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect),
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect),
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect),
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect),
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect),
    Object.assign( Object.create( Object.getPrototypeOf(baseEffect)), baseEffect)
  ];

  for (let i in result) {
    if (values !== undefined) {
      result[i].value = values[i];
    }
    if (coolDowns !== undefined) {
      result[i].coolDown = coolDowns[i];
    }
    if (durations !== undefined) {
      result[i].duration = durations[i];
    }
  }

  return result;
}
