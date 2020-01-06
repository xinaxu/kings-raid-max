import { Status } from "./status";

export enum EffectType {
  StatusChange,
  StatusChangeAbsolute,
  CcImmunity,
  Cc,
  CooldownReduction,
  SingleSkillCooldownReduction,
  Dispel
}

export enum EffectDestination {
  Self = "self",
  Allies = "allies",
  TopDps = "top dps",
  SingleEnemy = "single enemry",
  Enemies = "all enemies"
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
  maxStack: number | undefined;
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
  allyStackEfficiency?: number;
  _dispellable?: boolean;

  constructor(type: EffectType) {
    this.type = type;
  }

  description(): string {
    let descriptions: string[] = [];

    if (this.starting !== undefined) {
      descriptions.push(`After ${this.starting} seconds, `);
    }

    if (this.ending !== undefined) {
      descriptions.push(`For ${this.ending} seconds, `);
    }

    if (this.trigger !== undefined) {
      descriptions.push(`${this.trigger}, `);
    }

    switch (this.type) {
      case EffectType.StatusChangeAbsolute:
      case EffectType.StatusChange:
        descriptions.push(
          `${this.value! > 0 ? "increase" : "reduce"} ${this.destination} ${
            this.status
          } by ${this.value! > 0 ? this.value! : -this.value!} ${
            this.type === EffectType.StatusChange ? " percentage" : ""
          }` + (this.fromStatus !== undefined ? ` of ${this.fromStatus}` : "")
        );

        break;
      case EffectType.Cc:
        descriptions.push(`stun ${this.destination}`);
        break;

      case EffectType.CcImmunity:
        descriptions.push(`${this.destination} gains CC immunity`);
        break;

      case EffectType.CooldownReduction:
        descriptions.push(
          `reduce ${this.destination} cooldown by ${this.value!} seconds`
        );
        break;

      case EffectType.SingleSkillCooldownReduction:
        descriptions.push(
          `reduce ${this.destination} specific skill cooldown by ${this.value!} seconds`
        );
        break;

      case EffectType.Dispel:
        switch (this.destination) {
          case EffectDestination.Self:
          case EffectDestination.Allies:
          case EffectDestination.TopDps:
            descriptions.push(
              `dispel all negative effects from ${this.destination}`
            );
            break;
          default:
            descriptions.push(
              `dispel all possitive effects from ${this.destination}`
            );
            break;
        }
        break;
    }

    if (this.duration !== undefined) {
      descriptions.push(` for ${this.duration} seconds`);
    }

    if (this.multiplier !== undefined) {
      descriptions.push(` ${this.multiplier.type}`);
      if (this.multiplier.maxStack !== undefined) {
        descriptions.push(
          `, same effects stacks for ${this.multiplier.maxStack} times`
        );
      }
    }

    if (this.allyStackEfficiency !== undefined) {
      descriptions.push(
        `, same effect from allies stack only ${this.allyStackEfficiency}`
      );
    }

    if (!this.dispellable()) {
      descriptions.push(`, this effect cannot be dispelled`);
    }

    descriptions.push(". ");

    if (this.coolDown) {
      descriptions.push(`[CoolDown: ${this.coolDown}]`);
    }

    let description: string = descriptions.join("");
    return description[0].toUpperCase() + description.slice(1);
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
    if (override.starting !== undefined) {
      this.starting = override.starting;
    }
    if (override.ending !== undefined) {
      this.ending = override.ending;
    }
    if (override._dispellable !== undefined) {
      this._dispellable = override._dispellable;
    }
    if (override.allyStackEfficiency !== undefined) {
      this.allyStackEfficiency = override.allyStackEfficiency;
    }

    return this;
  }
}
