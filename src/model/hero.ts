import {HeroClassType} from "./hero-class-type";
import {Effect} from "./effect";
import {StarEffectGroup, StarLevel} from "./star-effect";
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
    light: Effect[];
    dark: Effect[];
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
HeroInfos.Phillop = {
    heroClass: HeroClassType.Knight,
    damageType: DamageType.Physical,
    name: HeroName.Phillop,
    skills: [{light: [], dark: []}, {light: [], dark: []}, {
        light: [],
        dark: []
    }, {light: [], dark: []}],
    t5Light: [],
    t5Dark: [],
    uw: new StarEffectGroup(),
    ut: [new StarEffectGroup(), new StarEffectGroup(), new StarEffectGroup(), new StarEffectGroup()],
    sw: [[], [], []]
};

export enum SkillTranscendence {
    Neither = "Neither",
    Light = "Light",
    Dark = "Dark"
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
