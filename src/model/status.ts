export enum Status {
    FlatAtk = "Attack Value",
    FlatDef = "Defence Value",
    FlatPDef = "Physical Defence Value",
    FlatMDef = "Magic Defence Value",
    FlatHp = "HP Value",
    Atk = "Attack",
    Def = "Defence",
    PDef = "Physical Defence",
    MDef = "Magic Defence",
    Hp = "HP",
    AtkSpd = "Attack Speed",
    Pen = "Penetration",
    Crit = "Critical Chance",
    CritDmg = "Critical Damage",
    Acc = "Accuracy",
    CCAcc = "CC Accuracy",
    DebuffAcc = "Debuff Accuracy",
    Lifesteal = "Lifesteal",
    CritResistance = "Critical Damage Resistance",
    PCritResistance = "Physical Critical Damage Resistance",
    MCritResistance = "Magic Critical Damage Resistance",
    Tough = "Toughness",
    PTough = "Physical Toughness",
    MTough = "Magic Toughness",
    Block = "Block Chance",
    PBlock = "Physical Block Chance",
    MBlock = "Magic Block Chance",
    BlockDef = "Block Damage Reduction",
    PBlockDef = "Physical Block Damage Reduction",
    MBlockDef = "Magic Block Damage Reduction",
    Dodge = "Dodge",
    PDodge = "Physical Dodge",
    MDodge = "Magic Dodge",
    CCResistance = "CC Resistance",
    Weakness = "Damage Received",
    PWeakness = "Physical Damage Received",
    MWeakness = "Magic Damage Received",
    Dps = "Damage to Boss",
    PDps = "Physical Damage to Boss",
    MDps = "Magic Damage to Boss",
    Recovery = "Healing Received",
    ManaPerSecond = "Mana generation per second",
    ManaPerAttack = "Mana generation per attack",
    ManaPerDamage = "Mana generation per received damage"
}

export const GearLineOptions = [
    Status.Atk, Status.AtkSpd, Status.Crit, Status.CritDmg, Status.Pen, Status.Lifesteal, Status.Dodge, Status.PDodge, Status.MDodge, Status.Block, Status.PBlock
    , Status.MBlock, Status.Def, Status.PDef, Status.MDef, Status.Hp, Status.Acc, Status.DebuffAcc, Status.CCResistance, Status.CritResistance, Status.PCritResistance, Status.MCritResistance,
    Status.ManaPerSecond, Status.ManaPerAttack
]

export const UniqueTreasureGearLineOptions = [...GearLineOptions, Status.Tough, Status.PTough, Status.MTough, Status.Recovery, Status.BlockDef,  Status.PBlockDef, Status.MBlockDef];

export const GearEnchantmentOptions = [
    Status.Crit, Status.Lifesteal, Status.PCritResistance, Status.PTough, Status.PDef, Status.PBlockDef, Status.PBlock, Status.PDodge, Status.Acc, Status.CCResistance,
    Status.Atk, Status.Hp, Status.CCAcc, Status.Pen, Status.CritDmg, Status.AtkSpd, Status.Recovery, Status.ManaPerDamage,
    Status.MCritResistance, Status.MTough, Status.MDef, Status.MBlockDef, Status.MBlock, Status.MDodge
];

export const UwRuneOptions = [
    Status.Atk,Status.Pen, Status.Lifesteal, Status.ManaPerAttack, Status.MBlockDef, Status.PBlockDef, Status.PTough, Status.MTough
];

export const Armor1RuneOptions = [
    Status.PBlock, Status.MBlock, Status.Hp, Status.CritDmg, Status.PDef, Status.MDef, Status.Acc, Status.CCResistance
];

export const Armor2RuneOptions = [
    Status.PDodge, Status.MDodge, Status.ManaPerDamage, Status.Crit
];