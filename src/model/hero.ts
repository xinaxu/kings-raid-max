import {HeroClassType} from "./hero-class-type";
import {Effect} from "./effect";
import {StarEffectGroup, StarLevel} from "./star-effect";
import {Status} from "./status";

export enum HeroName {
    // Tank
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
    name: string;
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
    Tank: [HeroName.Phillop, HeroName.Clause, HeroName.Aselica, HeroName.Demia, HeroName.Dosarta, HeroName.Glenwys, HeroName.Jane, HeroName.Loman, HeroName.Morrah, HeroName.Neraxis, HeroName.Ricardo, HeroName.Sonia],
    Warrior: [HeroName.Bernheim, HeroName.Chase, HeroName.Gau, HeroName.Kasel, HeroName.Kirze, HeroName.Naila, HeroName.Nicky, HeroName.Priscilla, HeroName.Scarlet, HeroName.Seria, HeroName.Theo, HeroName.Viska],
    Assassin: [HeroName.Epis, HeroName.Erze, HeroName.Ezekiel, HeroName.Fluss, HeroName.Gladi, HeroName.Laudia, HeroName.Mirianne, HeroName.Nia, HeroName.Reina, HeroName.Roi, HeroName.Tanya],
    Archer: [HeroName.Arch, HeroName.Dimael, HeroName.Luna, HeroName.Requina, HeroName.Selene, HeroName.Shamilla, HeroName.Yanne, HeroName.Yuria, HeroName.Zafir],
    Mechanic: [HeroName.Cecilia, HeroName.Annette, HeroName.Chrisha, HeroName.Crow, HeroName.Hanus, HeroName.Kara, HeroName.Lakrak, HeroName.Miruru, HeroName.Mitra, HeroName.Oddy, HeroName.Rodina],
    Wizard: [HeroName.Aisha, HeroName.Artemia, HeroName.Cleo, HeroName.Dakaris, HeroName.Esker, HeroName.Lewisia, HeroName.Lilia, HeroName.Lorraine, HeroName.Maria, HeroName.Nyx, HeroName.Ophelia, HeroName.Pavel, HeroName.Veronica],
    Priest: [HeroName.Baudouin, HeroName.Cassandra, HeroName.Frey, HeroName.Juno, HeroName.Kaulah, HeroName.Laias, HeroName.Lavril, HeroName.Leo, HeroName.Lucias, HeroName.May, HeroName.Mediana, HeroName.Rephy, HeroName.Shea],
}

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
};
