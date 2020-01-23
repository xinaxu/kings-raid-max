import {HeroClassType} from "./hero-class-type";
import {Effect, EffectDestination, EffectMultiplierType, EffectType} from "./effect";
import {StarEffectGroup, StarLevel, createStarEffect} from "./star-effect";
import {Status} from "./status";
import {ArtifactName} from "./artifact";

export enum HeroName {
    // Knight
    Phillop = "Phillop",
    Clause = "Clause",
    Demia = "Demia",
    Morrah = "Morrah",
    Jane = "Jane",
    Ricardo = "Ricardo",
    Aselica = "Aselica",
    Neraxis = "Neraxis",
    Sonia = "Sonia",
    Glenwys = "Glenwys",
    Loman = "Loman",
    Dosarta = "Dosarta",

    // Warrior
    Kasel = "Kasel",
    Gau = "Gau",
    Naila = "Naila",
    Theo = "Theo",
    Viska = "Viska",
    Priscilla = "Priscilla",
    Seria = "Seria",
    Scarlet = "Scarlet",
    Kirze = "Kirze",
    Chase = "Chase",
    Bernheim = "Bernheim",
    Nicky = "Nicky",

    // Assassin
    Roi = "Roi",
    Epis = "Epis",
    Reina = "Reina",
    Fluss = "Fluss",
    Tanya = "Tanya",
    Ezekiel = "Ezekiel",
    Erze = "Erze",
    Laudia = "Laudia",
    Mirianne = "Mirianne",
    Nia = "Nia",
    Gladi = "Gladi",
    Kibera = "Kibera",

    // Archer
    Selene = "Selene",
    Dimael = "Dimael",
    Luna = "Luna",
    Arch = "Arch",
    Yanne = "Yanne",
    Zafir = "Zafir",
    Yuria = "Yuria",
    Requina = "Requina",
    Shamilla = "Shamilla",

    // Mechanic
    Lakrak = "Lakrak",
    Miruru = "Miruru",
    Rodina = "Rodina",
    Annette = "Annette",
    Mitra = "Mitra",
    Oddy = "Oddy",
    Crow = "Crow",
    Chrisha = "Chrisha",
    Kara = "Kara",
    Cecilia = "Cecilia",
    Pansirone = "Pansirone",
    Hanus = "Hanus",

    // Wizard
    Cleo = "Cleo",
    Maria = "Maria",
    Lorraine = "Lorraine",
    Pavel = "Pavel",
    Aisha = "Aisha",
    Lewisia = "Lewisia",
    Nyx = "Nyx",
    Ophelia = "Ophelia",
    Lilia = "Lilia",
    Artemia = "Artemia",
    Esker = "Esker",
    Dakaris = "Dakaris",
    Veronica = "Veronica",
    Cain = "Cain",

    // Priest
    Frey = "Frey",
    Kaulah = "Kaulah",
    Rephy = "Rephy",
    Baudouin = "Baudouin",
    Leo = "Leo",
    Laias = "Laias",
    Cassandra = "Cassandra",
    Mediana = "Mediana",
    Rehartna = "Rehartna",
    Lavril = "Lavril",
    Lucias = "Lucias",
    Shea = "Shea",
    May = "May",
    Juno = "Juno"
}

export type HeroSkill = {
    neither: Effect[];
    light: Effect[];
    dark: Effect[];
    override?: boolean
};

export enum DamageType {
    Physical = "physical",
    Magic = "magic"
}

export type HeroInfo = {
    heroClass: HeroClassType;
    name: HeroName;
    damageType: DamageType;
    skills: [HeroSkill, HeroSkill, HeroSkill, HeroSkill];
    t5Light: Effect[];
    t5Dark: Effect[];
    uw: StarEffectGroup;
    ut: [StarEffectGroup, StarEffectGroup, StarEffectGroup, StarEffectGroup];
    sw: [Effect[], Effect[], Effect[]];
};

export let HeroInfos: Partial<Record<HeroName, HeroInfo>> = {};
HeroInfos.Laudia = {
    heroClass: HeroClassType.Assassin,
    damageType: DamageType.Magic,
    name: HeroName.Laudia,
    skills: [
        {
            neither: [
                new Effect(EffectType.Cc).with({destination: EffectDestination.SingleEnemy, coolDown: 8, duration: 3}),
            ], light: [], dark: [
                new Effect(EffectType.StatusChange).with({
                    destination: EffectDestination.SingleEnemy,
                    status: Status.MWeakness,
                    value: 25,
                    coolDown: 8,
                    duration: 10
                }),
            ]
        },
        {
            neither: [
                // Given this skill is always used before using skill 3
                new Effect(EffectType.StatusChange).with({
                    status: Status.FlatAtk,
                    value: 25288 * 1.5,
                    coolDown: 10,
                    duration: 10
                }),
                new Effect(EffectType.StatusChange).with({
                    status: Status.CritDmg,
                    value: 70,
                    coolDown: 10,
                    duration: 10
                }),
            ], light: [], dark: []
        }, {neither: [], light: [], dark: []},
        {
            neither: [
                new Effect(EffectType.StatusChange).with({
                    status: Status.Pen,
                    value: 3 * 1.5 * 10,
                    _dispellable: false
                }),
                new Effect(EffectType.StatusChange).with({
                    status: Status.FlatDef,
                    value: 1680 * 1.5 * 10,
                    _dispellable: false
                }),
            ], light: [], dark: [
                new Effect(EffectType.StatusChange).with({status: Status.Tough, value: 2 * 10, _dispellable: false}),
            ]
        }],
    t5Light: [
        new Effect(EffectType.StatusChange).with({status: Status.Atk, value: 15}),
        new Effect(EffectType.StatusChange).with({status: Status.Def, value: 15}),
        new Effect(EffectType.StatusChange).with({status: Status.Hp, value: 15}),
        new Effect(EffectType.StatusChange).with({status: Status.AtkSpd, value: 10}),
    ],
    t5Dark: [
        new Effect(EffectType.StatusChange).with({status: Status.Acc, value: 30, duration: 10, ending: 10}),
        new Effect(EffectType.StatusChange).with({status: Status.CCAcc, value: 30, duration: 10, ending: 10}),
        new Effect(EffectType.CcImmunity).with({duration: 7, ending: 7}),
    ],
    uw: new StarEffectGroup(
        createStarEffect(new Effect(EffectType.StatusChange).with({
            status: Status.Pen,
            value: 3 * 1.5 * 4,
            _dispellable: false
        }), {
            values: [3 * 1.5 * 4, 3 * 1.5 * 5, 3 * 1.5 * 6, 3 * 1.5 * 7, 3 * 1.5 * 8, 3 * 1.5 * 10]
        }),
        createStarEffect(new Effect(EffectType.StatusChange).with({
            status: Status.FlatDef,
            value: 3 * 1.5 * 4,
            _dispellable: false
        }), {
            values: [1680 * 1.5 * 4, 1680 * 1.5 * 5, 1680 * 1.5 * 6, 1680 * 1.5 * 7, 1680 * 1.5 * 8, 1680 * 1.5 * 10]
        }),
        // Assume taking S4 dark
        createStarEffect(new Effect(EffectType.StatusChange).with({
            status: Status.Tough,
            value: 2 * 4,
            _dispellable: false
        }), {
            values: [2 * 4, 2 * 5, 2 * 6, 2 * 7, 2 * 8, 2 * 10]
        })
    ),
    ut: [new StarEffectGroup(), new StarEffectGroup(),
        new StarEffectGroup(
            createStarEffect(new Effect(EffectType.StatusChange).with({
                status: Status.Pen,
                value: 10,
                _dispellable: true
            }), {
                values: [10, 12, 14, 17, 21, 25]
            })
        ),
        new StarEffectGroup(
            createStarEffect(new Effect(EffectType.StatusChange).with({
                status: Status.AtkSpd,
                value: 10,
                _dispellable: true
            }), {
                values: [10, 12, 14, 17, 21, 25]
            }),
            createStarEffect(new Effect(EffectType.StatusChange).with({
                status: Status.FlatDef,
                value: 1680 * 20 * 0.5,
                _dispellable: false
            }), {})
        )],
    sw: [[], [], []]
};

export enum SkillTranscendence {
    Neither = "neither",
    Light = "light",
    Dark = "dark"
}

export enum GearSet {
    BlackDragon = "Black Dragon",
    FireDragon = "Fire Dragon",
    Lava = "Lava",
    IceDragon = "IceDragon",
    DarkLegion = "Dark Legion",
    BeastOfChaos = "Beast of Chaos"
}

export enum Accessory {
    Bracelet = "Bracelet",
    Ring = "Ring",
    Earring = "Earring",
    Necklace = "Necklace"
}

export const HeroClassMapping: Record<HeroClassType, HeroName[]> = {
    Knight: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Knight) as HeroName[],
    Warrior: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Warrior) as HeroName[],
    Assassin: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Assassin) as HeroName[],
    Archer: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Archer) as HeroName[],
    Mechanic: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Mechanic) as HeroName[],
    Wizard: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Wizard) as HeroName[],
    Priest: Object.keys(HeroInfos).filter(name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Priest) as HeroName[],
};

export type HeroConfiguration = {
    owned: boolean
    t1: [boolean, boolean, boolean, boolean, boolean];
    t2: [boolean, boolean, boolean, boolean, boolean];
    t3: [
        SkillTranscendence,
        SkillTranscendence,
        SkillTranscendence,
        SkillTranscendence
    ];
    t5: [boolean, boolean];
    uwLevel: StarLevel | null;
    utLevel: [
        StarLevel | null,
        StarLevel | null,
        StarLevel | null,
        StarLevel | null
    ];
    utPrimary: 1 | 2 | 3 | 4 | null;
    gearLines: [
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status,
        Status
    ];
    utGearLines: [
        [Status, Status],
        [Status, Status],
        [Status, Status],
        [Status, Status]
    ];
    swLevel: 0 | 1 | 2 | null;
    accessory: Accessory;
    uwRunes: [Status | null, Status | null, Status | null];
    armorRunes: [Status | null, Status | null];
    enchants: [Status | null, Status | null, Status | null, Status | null]
    gearSets: [GearSet, GearSet]
    artifact: ArtifactName | null
};
