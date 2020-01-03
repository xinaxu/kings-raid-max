import { Status } from "./status";

export enum EffectType {
  StatusChange,
  StatusChangeAbsolute,
  CcImmunity,
  Cc,
  CooldownReduction,
  Dispel
}

export enum EffectDestination {
  Self,
  Allies,
  TopDps,
  SingleEnemy,
  Enemies
}

export enum EffectTrigger {
  LowHp = "when Hp is low",
  MaxMp = "when Mana is full",
  TakingHit = "when taking hit",
  SingleEnemey = "when there is only one enemy",
  NormalAttack = "when attacking"
}

export enum EffectMultiplierType {
  TakingHit = "everytime taking a hit",
  NormalAttack = "everytime attaking",
  ByNumOfBattles = "everytime entering a new battle",
  ByNumOfEnemeis = "for each enemy",
  ByCooldown = "for each cool down",
  ByDodge = "everytime dodging an attack"
}

export type EffectMultiplier = {
  type: EffectMultiplierType;
  maxStack: number;
};

export class Effect {
  type: EffectType = EffectType.StatusChange;
  destination: EffectDestination = EffectDestination.Self;
  status?: Status;
  value?: number;
  fromStatus?: Status;
  trigger?: EffectTrigger;
  multiplier?: EffectMultiplier;
  coolDown?: number;
  duration?: number;
  starting?: number;
  ending?: number;
  private _dispellable?: boolean;

  constructor(type: EffectType) {
    this.type = type;
  }

  dispellable(): boolean {
    if (this._dispellable !== undefined) {
      return this._dispellable;
    }

    if (
      this.coolDown !== undefined ||
      this.starting !== undefined ||
      this.ending !== undefined ||
      this.duration !== undefined
    ) {
      return true;
    }

    if (
      this.multiplier !== undefined &&
      ![
        EffectMultiplierType.ByNumOfBattles,
        EffectMultiplierType.ByNumOfEnemeis
      ].includes(this.multiplier.type)
    ) {
      return true;
    }

    return false;
  }

  withDestination(destination: EffectDestination): this {
    this.destination = destination;
    return this;
  }

  withValue(value: number): this {
    this.value = value;
    return this;
  }

  withCoolDown(coolDown: number): this {
    this.coolDown = coolDown;
    return this;
  }

  withDuration(duration: number): this {
    this.duration = duration;
    return this;
  }

  withStarting(starting: number): this {
    this.starting = starting;
    return this;
  }

  withEnding(ending: number): this {
    this.ending = ending;
    return this;
  }

  withMultiplier(multiplier: EffectMultiplier): this {
    this.multiplier = multiplier;
    return this;
  }

  withStatus(status: Status): this {
    this.status = status;
    return this;
  }

  withFromStatus(fromStatus: Status): this {
    this.fromStatus = fromStatus;
    return this;
  }

  withCondition(trigger: EffectTrigger): this {
    this.trigger = trigger;
    return this;
  }

  withDispellable(dispellable: boolean): this {
    this._dispellable = dispellable;
    return this;
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
  }): this {
    if (override.type !== undefined) {
      this.type = override.type;
    }
    if (override.destination !== undefined) {
      this.destination = override.destination;
    }
    if (override.status !== undefined) {
      this.status = override.status;
    }
    if (override.value !== undefined) {
      this.value = override.value;
    }
    if (override.fromStatus !== undefined) {
      this.fromStatus = override.fromStatus;
    }
    if (override.trigger !== undefined) {
      this.trigger = override.trigger;
    }
    if (override.multiplier !== undefined) {
      this.multiplier = override.multiplier;
    }
    if (override.coolDown !== undefined) {
      this.coolDown = override.coolDown;
    }
    if (override.duration !== undefined) {
      this.duration = override.duration;
    }
    if (override.duration !== undefined) {
      this.duration = override.duration;
    }
    if (override.starting !== undefined) {
      this.starting = override.starting;
    }
    if (override.ending !== undefined) {
      this.ending = override.ending;
    }
    if (override._dispellable !== undefined) {
      this._dispellable = override._dispellable;
    }

    return this;
  }
}
