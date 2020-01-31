import {HeroClassType} from "./hero-class-type";
import {Effect, EffectDestination, EffectMultiplierType, EffectType} from "./effect";
import {createStarEffect, StarEffectGroup, StarLevel} from "./star-effect";
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
  override?: boolean;
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

HeroInfos.Annette = {
  heroClass: HeroClassType.Mechanic,
  damageType: DamageType.Magic,
  name: HeroName.Annette,
  skills: [
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 50,
          coolDown: 11,
          duration: 11
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 25,
          coolDown: 11,
          duration: 11
        })
      ],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.CcImmunity).with({
          destination: EffectDestination.Allies,
          coolDown: 10,
          duration: 10
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Crit,
          value: 25,
          coolDown: 10,
          duration: 10
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 5,
          coolDown: 10
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 25,
          coolDown: 10,
          duration: 10
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          status: Status.AtkSpd,
          value: 25
        }),
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatAtk,
          value: 34614*1.25
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatAtk,
          value: 34614*0.5
        })],
      dark: []
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.AtkSpd,
      value: 10
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Allies,
      status: Status.AtkSpd,
      value: 20
    }),
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Allies,
      status: Status.FlatAtk,
      value: 0.05,
      fromStatus: Status.FlatAtk
    })
  ],
  uw: new StarEffectGroup(),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Crit,
          destination: EffectDestination.Enemies,
          value: -25,
          duration: 11,
          coolDown: 11
        }),
        {}
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(),
    new StarEffectGroup()
  ],
  sw: [[], [], []]
};

HeroInfos.Aselica = {
  heroClass: HeroClassType.Knight,
  damageType: DamageType.Magic,
  name: HeroName.Aselica,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 4,
          coolDown: 9,
          destination: EffectDestination.Enemies
        })
      ],
      override: true,
      light: [
        new Effect(EffectType.Cc).with({
          duration: 4,
          coolDown: 9,
          destination: EffectDestination.Enemies
        }),
        new Effect(EffectType.StatusChange).with({
          duration: 5,
          coolDown: 9,
          status: Status.AtkSpd,
          value: 35
        })
      ],
      dark: [
        new Effect(EffectType.Cc).with({
          duration: 4,
          coolDown: 7,
          destination: EffectDestination.Enemies
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          duration: 15,
          coolDown: 20,
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          value: 34564 * 1.5
        }),
        new Effect(EffectType.CooldownReduction).with({
          coolDown: 20,
          destination: EffectDestination.TopDps,
          value: 0.2
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 4,
          coolDown: 20,
          destination: EffectDestination.Enemies
        }),
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 20,
          status: Status.FlatPDef,
          value: 46573,
          destination: EffectDestination.Allies
        }),
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 20,
          status: Status.FlatMDef,
          value: -25706,
          destination: EffectDestination.Enemies
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          duration: 15,
          coolDown: 20,
          status: Status.FlatMDef,
          value: -25706,
          destination: EffectDestination.Enemies
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 2,
          coolDown: 10,
          destination: EffectDestination.Enemies
        }),
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 20,
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -20
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 20,
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -10
        })
      ],
      dark: []
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.PBlock,
      value: 20
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.TopDps,
      status: Status.FlatPDef,
      value: 0.2,
      fromStatus: Status.FlatPDef
    })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.SingleEnemy,
        status: Status.MWeakness,
        value: 20,
        coolDown: 10,
        duration: 10
      }),
      { values: [20, 24, 28, 34, 42, 50] }
    )
  ),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Enemies,
          coolDown: 9
        }),
        {}
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 20,
          status: Status.FlatPDef,
          value: 46573 * 0.5,
          destination: EffectDestination.Allies
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          duration: 15,
          coolDown: 20,
          status: Status.FlatMDef,
          value: -25706 * 0.5,
          destination: EffectDestination.Enemies
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          duration: 10,
          coolDown: 10,
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 10
        }),
        { values: [19, 12, 14, 17, 21, 25] }
      )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.Morrah = {
  heroClass: HeroClassType.Knight,
  damageType: DamageType.Magic,
  name: HeroName.Morrah,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 3,
          coolDown: 6,
          destination: EffectDestination.Enemies
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          status: Status.AtkSpd,
          duration: 15,
          coolDown: 6,
          value: 20
        })
      ],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatMDef,
          duration: 20,
          coolDown: 12,
          value: 10000,
          destination: EffectDestination.Allies
        }),
        new Effect(EffectType.StatusChange).with({
          status: Status.MBlock,
          duration: 20,
          coolDown: 12,
          value: 37.5,
          destination: EffectDestination.Allies
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 3,
          coolDown: 20,
          destination: EffectDestination.Enemies
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Recovery,
          value: -100
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          status: Status.MDef,
          value: 50,
          duration: 10,
          coolDown: 10
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 40
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.MBlock,
      value: 20
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Enemies,
      status: Status.Recovery,
      value: -20
    })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.SingleEnemy,
        status: Status.Atk,
        value: -10
      }),
      { values: [-10, -12, -14, -17, -21, -25] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.SingleEnemy,
        status: Status.MWeakness,
        value: 20
      }),
      { values: [20, 24, 28, 34, 42, 50] }
    )
  ),
  ut: [
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Tough,
          duration: 20,
          coolDown: 12,
          value: 10,
          destination: EffectDestination.Allies
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.MCritResistance,
          duration: 20,
          coolDown: 12,
          value: 25,
          destination: EffectDestination.Allies
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.MDef,
          duration: 7,
          coolDown: 20,
          value: -25,
          destination: EffectDestination.Enemies
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.AtkSpd,
          value: -14,
          destination: EffectDestination.Enemies
        }),
        {
          values: [14, 17, 21, 25, 30, 36]
        }
      )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.Neraxis = {
  heroClass: HeroClassType.Knight,
  damageType: DamageType.Magic,
  name: HeroName.Neraxis,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 3,
          coolDown: 8
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.AtkSpd,
          value: -30,
          duration: 10,
          coolDown: 8
        })
      ],
      light: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 2,
          coolDown: 8
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 25,
          duration: 10,
          coolDown: 8
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 13488*1.5,
          duration: 15,
          coolDown: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatDef,
          value: 13488*1.5,
          duration: 15,
          coolDown: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -30,
          duration: 15,
          coolDown: 15
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 13488,
          duration: 15,
          coolDown: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatDef,
          value: 13488,
          duration: 15,
          coolDown: 15
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.AtkSpd,
          value: -30,
          duration: 15,
          coolDown: 15
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MDef,
          value: -20,
          duration: 15,
          coolDown: 20
        }),
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 6,
          coolDown: 20
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MDef,
          value: -10,
          duration: 15,
          coolDown: 20
        }),
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatDef,
          value: 18962
        }),
        new Effect(EffectType.StatusChange).with({
          status: Status.Tough,
          value: 15
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          status: Status.AtkSpd,
          value: 30
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatDef,
          value: 18962*0.5
        }),
        new Effect(EffectType.StatusChange).with({
          status: Status.Tough,
          value: 15*0.5
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CCResistance,
      value: 10
    })
  ],
  t5Dark: [],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.FlatPDef,
        fromStatus: Status.FlatPDef,
        value: 0.04,
        duration: 10,
        coolDown: 10
      }),
      {
        values: [0.04, 0.048, 0.057, 0.069, 0.083, 0.1]
      }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.FlatMDef,
        fromStatus: Status.FlatMDef,
        value: 0.04,
        duration: 10,
        coolDown: 10
      }),
      {
        values: [0.04, 0.048, 0.057, 0.069, 0.083, 0.1]
      }
    )
  ),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Def,
          value: 10,
          duration: 10,
          coolDown: 8
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatDef,
          value: 5000,
          duration: 15,
          coolDown: 15
        }),
        { values: [1000, 2000, 3000, 4000, 5000, 6000] }
      ),
      createStarEffect(
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Enemies,
          coolDown: 15
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 6,
          coolDown: 20
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.SingleSkillCooldownReduction).with({ value: 3 }),
        { values: [3, 4, 5, 6, 7, 8] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Block,
          value: 20,
          coolDown: 10,
          duration: 5
        }),
        { values: [20, 24, 29, 35, 42, 50] }
      )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.Rephy = {
  heroClass: HeroClassType.Priest,
  damageType: DamageType.Magic,
  name: HeroName.Rephy,
  skills: [
    {
      neither: [],
      light: [],
      dark: [
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Allies,
          coolDown: 5
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Allies,
          coolDown: 12
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatMDef,
          value: 10000,
          coolDown: 12,
          duration: 20
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatMDef,
          value: 0.1,
          fromStatus: Status.FlatMDef,
          coolDown: 12,
          duration: 20
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.AtkSpd,
          value: -25,
          coolDown: 20,
          duration: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Weakness,
          value: 25,
          coolDown: 20,
          duration: 15
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [],
      light: [],
      dark: []
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({
      status: Status.Atk,
      value: 15
    }),
    new Effect(EffectType.StatusChange).with({
      status: Status.Def,
      value: 15
    }),
    new Effect(EffectType.StatusChange).with({
      status: Status.Hp,
      value: 15
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      status: Status.Def,
      value: -20,
      destination: EffectDestination.SingleEnemy,
      coolDown: 5,
      duration: 5
    })
  ],
  uw: new StarEffectGroup(),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.CCAcc,
          value: 10,
          coolDown: 8,
          duration: 10
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatMDef,
          value: 1000,
          coolDown: 12,
          duration: 20
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.SingleSkillCooldownReduction).with({
          value: 0.12
        }),
        { values: [0.12, 0.14, 0.17, 0.21, 0.25, 0.3] }
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Atk,
          value: 20,
          coolDown: 7,
          duration: 4
        }),
        { values: [20, 24, 29, 35, 42, 50] }
      )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.Jane = {
  heroClass: HeroClassType.Knight,
  damageType: DamageType.Physical,
  name: HeroName.Jane,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          duration: 5,
          coolDown: 8,
          destination: EffectDestination.Enemies
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 8,
          duration: 10,
          status: Status.MWeakness,
          value: 25
        })
      ],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 6,
          duration: 30,
          status: Status.MWeakness,
          value: 25
        })
      ],
      override: true,
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 6,
          duration: 10,
          status: Status.MWeakness,
          value: 25
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 6,
          duration: 30,
          status: Status.MWeakness,
          value: 25,
          _dispellable: false
        })
      ]
    },
    {
      neither: [],
      light: [],
      dark: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 7.5,
          coolDown: 12
        })
      ]
    },
    {
      neither: [],
      light: [],
      dark: []
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.MBlock,
      value: 20
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      status: Status.Atk,
      value: 50,
      coolDown: 20,
      duration: 20
    }),
    new Effect(EffectType.StatusChange).with({
      status: Status.Recovery,
      value: 50,
      coolDown: 20,
      duration: 20
    })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.Atk,
        destination: EffectDestination.Enemies,
        value: -14
      }),
      { values: [-14, -17, -20, -24, -29, -35] }
    )
  ),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.CCResistance,
          destination: EffectDestination.Enemies,
          duration: 10,
          coolDown: 8,
          value: -25
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.MBlock,
          destination: EffectDestination.Enemies,
          duration: 10,
          coolDown: 8,
          value: -20
        }),
        { values: [-20, -24, -29, -35, -42, -50] }
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 12,
          duration: 12,
          status: Status.MDef,
          value: -30
        }),
        {}
      )
    ),
    new StarEffectGroup()
  ],
  sw: [[], [], []]
};
HeroInfos.Mediana = {
  heroClass: HeroClassType.Priest,
  damageType: DamageType.Physical,
  name: HeroName.Mediana,
  skills: [
    {
      neither: [],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Atk,
          value: 10,
          duration: 10,
          coolDown: 15
        })
      ],
      dark: []
    },
    { neither: [], light: [], dark: [] },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          duration: 15,
          coolDown: 23,
          value: 33635 * 1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          duration: 15,
          coolDown: 23,
          value: 0.2 * 1.5,
          fromStatus: Status.FlatAtk
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          duration: 15,
          coolDown: 23,
          value: 33635 * 0.4
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          duration: 15,
          coolDown: 23,
          value: 0.2 * 0.4,
          fromStatus: Status.FlatAtk
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Crit,
          duration: 15,
          coolDown: 23,
          value: 40
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 2055 * 1.25
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.PCritResistance,
          value: 20
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.PBlock,
          value: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.PCritResistance,
          value: -20
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.PCritResistance,
          value: 10
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.PWeakness,
          value: 20
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CCResistance,
      value: 10
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Allies,
      status: Status.Atk,
      value: 40,
      coolDown: 40
    })
  ],
  uw: new StarEffectGroup(),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.CritDmg,
          value: 20,
          duration: 10,
          coolDown: 15
        }),
        { values: [20, 24, 28, 34, 42, 50] }
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.CcImmunity).with({
          destination: EffectDestination.TopDps,
          duration: 2,
          coolDown: 23
        }),
        { durations: [2, 3, 4, 5, 6, 7] }
      ),
      createStarEffect(
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.TopDps,
          coolDown: 23
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 2055 * 1.25
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.PTough,
          value: 4
        }),
        { values: [4, 4.8, 5.8, 7, 8.4, 10] }
      )
    )
  ],
  sw: [[], [], []]
};

// HeroInfos.Rehartna = {
//   heroClass: HeroClassType.Priest,
//   damageType: DamageType.Physical,
//   name: HeroName.Rehartna,
//   skills: [
//     {
//       neither: [
//         new Effect(EffectType.Cc).with({
//           destination: EffectDestination.Enemies,
//           coolDown: 13,
//           duration: 5
//         }),
//         new Effect(EffectType.StatusChange).with({
//           destination: EffectDestination.Enemies,
//           status: Status.Atk,
//           value: -25,
//           coolDown: 13,
//           duration: 10
//         })
//       ],
//       light: [
//         new Effect(EffectType.Dispel).with({
//           destination: EffectDestination.Enemies,
//           coolDown: 13
//         })
//       ],
//       dark: [
//         new Effect(EffectType.StatusChange).with({
//           destination: EffectDestination.Enemies,
//           status: Status.Pen,
//           value: -25,
//           coolDown: 13,
//           duration: 10
//         })
//       ]
//     }
//   ]
// };
HeroInfos.Shea = {
  heroClass: HeroClassType.Priest,
  damageType: DamageType.Magic,
  name: HeroName.Shea,
  skills: [
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Tough,
          value: 70,
          duration: 8,
          coolDown: 8
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.CritResistance,
          value: 25,
          duration: 8,
          coolDown: 8
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.CcImmunity).with({
          destination: EffectDestination.Allies,
          coolDown: 8,
          duration: 8
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.AtkSpd,
          value: 25,
          duration: 8,
          coolDown: 8
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 63228 * 2,
          duration: 8,
          coolDown: 8
        }),
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Enemies,
          coolDown: 1
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 63228 * 0.4,
          duration: 8,
          coolDown: 8
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Weakness,
          value: 15,
          duration: 8,
          coolDown: 8
        })
      ]
    },
    {
      neither: [],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Def,
          value: -10,
          duration: 8,
          coolDown: 8
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CCResistance,
      value: 10
    })
  ],
  t5Dark: [],
  uw: new StarEffectGroup(),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.CCResistance,
          value: 10,
          coolDown: 8,
          duration: 8
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Acc,
          value: 25,
          coolDown: 8,
          duration: 8
        }),
        {}
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 8,
          duration: 2
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 8,
          duration: 8,
          status: Status.CritDmg,
          value: 20
        }),
        { values: [20, 24, 28, 34, 42, 50] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Self,
          coolDown: 3,
          status: Status.Atk,
          duration: 5,
          value: 20
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Self,
          coolDown: 3,
          status: Status.AtkSpd,
          duration: 5,
          value: 10
        }),
        {
          values: [10, 12, 14, 17, 21, 25]
        }
      )
    )
  ],
  sw: [[], [], []]
};

HeroInfos.Veronica = {
  heroClass: HeroClassType.Wizard,
  damageType: DamageType.Magic,
  name: HeroName.Veronica,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 2,
          coolDown: 9
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 21,
          duration: 10,
          status: Status.FlatAtk,
          value: 50584 * 1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 21,
          duration: 10,
          status: Status.Dps,
          value: 15
        })
      ],
      override: true,
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 21,
          duration: 10,
          status: Status.FlatAtk,
          value: 50584 * 1.9
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 21,
          duration: 10,
          status: Status.Dps,
          value: 15
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 16,
          duration: 10,
          status: Status.FlatAtk,
          value: 50584 * 1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 16,
          duration: 10,
          status: Status.Dps,
          value: 15
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 10,
          coolDown: 21
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 21,
          duration: 10,
          status: Status.MWeakness,
          value: 30
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 21,
          duration: 10,
          status: Status.MWeakness,
          value: 30
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 5056
        }),
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 2 * 0.5,
          coolDown: 9
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 16,
          duration: 10,
          status: Status.FlatAtk,
          value: 50584 * 0.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 16,
          duration: 10,
          status: Status.Dps,
          value: 15 * 0.5
        }),
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          duration: 10 * 0.5,
          coolDown: 21
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 21,
          duration: 10,
          status: Status.Weakness,
          value: 30 * 0.5
        })
      ],
      light: [
      ],
      dark: []
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Crit, value: 15 })
  ],
  t5Dark: [],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.Cc).with({
        destination: EffectDestination.Enemies,
        duration: 2 * 0.4,
        coolDown: 9
      }),
      { durations: [0.8, 1.0, 1.2, 1.4, 1.6, 1.8] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        coolDown: 16,
        duration: 10,
        status: Status.FlatAtk,
        value: 50584 * 0.4
      }),
      {
        values: [
          50584 * 0.4,
          50584 * 0.5,
          50584 * 0.6,
          50584 * 0.7,
          50584 * 0.8,
          50584 * 0.9
        ]
      }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        coolDown: 16,
        duration: 10,
        status: Status.Dps,
        value: 15 * 0.4
      }),
      { values: [15 * 0.4, 15 * 0.5, 15 * 0.6, 15 * 0.7, 15 * 0.8, 15 * 0.9] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Enemies,
        coolDown: 21,
        duration: 10,
        status: Status.Weakness,
        value: 30 * 0.4
      }),
      { values: [30 * 0.4, 30 * 0.5, 30 * 0.6, 30 * 0.7, 30 * 0.8, 30 * 0.9] }
    ),
    createStarEffect(
      new Effect(EffectType.Cc).with({
        destination: EffectDestination.Enemies,
        duration: 10 * 0.4,
        coolDown: 21
      }),
      {
        durations: [10 * 0.4, 10 * 0.5, 10 * 0.6, 10 * 0.7, 10 * 0.8, 10 * 0.9]
      }
    )
  ),
  ut: [
    new StarEffectGroup(),
    new StarEffectGroup(
        createStarEffect(
            new Effect(EffectType.StatusChange).with({
              destination: EffectDestination.Allies,
              status: Status.FlatAtk, coolDown: 16, value: 50584*(1.4 + 1.5)
            }),
            { durations: [1.6, 1.9, 2.3, 2.7, 3.3, 4] }
        ),
        createStarEffect(
            new Effect(EffectType.StatusChange).with({
              destination: EffectDestination.Allies,
              status: Status.Dps, coolDown: 16, value: 15*(1 + 1.5)
            }),
            { durations: [1.6, 1.9, 2.3, 2.7, 3.3, 4] }
        )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.SingleSkillCooldownReduction).with({
          value: 2.5
        }),
        {}
      )
    ),
    new StarEffectGroup(
        createStarEffect(
            new Effect(EffectType.StatusChange).with({
              destination: EffectDestination.Allies,
              status: Status.FlatAtk,
              value: 5056 * 0.5
            }),
            {}
        ),
    createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.CritDmg,
          value: 20, coolDown: 20, duration: 10
        }),
        {values: [20,24,29,35,42,50]}
    )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.Glenwys = {
  heroClass: HeroClassType.Knight,
  damageType: DamageType.Physical,
  name: HeroName.Glenwys,
  skills: [
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 9,
          duration: 10,
          status: Status.PWeakness,
          value: 28
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 9,
          duration: 10,
          status: Status.AtkSpd,
          value: -25
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 15,
          duration: 12
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 15,
          duration: 10,
          status: Status.PWeakness,
          value: 25
        })
      ],
      dark: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 15,
          duration: 5
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 17,
          duration: 3
        }),
        new Effect(EffectType.Dispel).with({
          destination: EffectDestination.Allies,
          coolDown: 17
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatAtk,
          value: 20015 * 1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatDef,
          value: 9059 * 1.5
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 17,
          duration: 10,
          status: Status.PCritResistance,
          value: -25
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatAtk,
          value: 20015 * 1.0
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatDef,
          value: 9059 * 1.0
        })
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 7371 * 1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Dps,
          value: 10,
          ending: 20
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Tough,
          value: 10,
          ending: 20
        }),
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Dps,
          value: 10,
          ending: 20
        }),],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Tough,
          value: 10,
          ending: 20
        }),]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 10 })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Allies,
      status: Status.FlatAtk,
      fromStatus: Status.FlatPDef,
      value: 0.08
    }),
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.Allies,
      status: Status.FlatAtk,
      fromStatus: Status.FlatMDef,
      value: 0.08
    })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.Atk,
        value: 2,
        coolDown: 1 / (1 / 9 + 1 / 15 + 1 / 17),
        multiplier: { maxStack: 4, type: EffectMultiplierType.ByCooldown }
      }),
      { values: [2, 2.4, 2.8, 3.4, 4, 5] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.CritDmg,
        value: 4,
        coolDown: 1 / (1 / 9 + 1 / 15 + 1 / 17),
        multiplier: { maxStack: 4, type: EffectMultiplierType.ByCooldown }
      }),
      { values: [4, 4.8, 5.6, 6.9, 8.4, 10] }
    )
  ),
  ut: [
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.SingleSkillCooldownReduction).with({
          value: 4.5
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 10.5,
          duration: 12,
          status: Status.Recovery,
          value: -20
        }),
        { values: [-20, -24, -28, -34, -42, -50] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatAtk,
          value: 20015 * 0.5
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 17,
          duration: 20,
          status: Status.FlatDef,
          value: 9059 * 0.5
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          coolDown: 17,
          duration: 10,
          status: Status.PWeakness,
          value: 10
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 7371 * 0.5
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.CritDmg,
          value: 30,
          ending: 20
        }),
        {
          values: [30, 36, 42, 50, 63, 75]
        }
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Dps,
          value: 30,
          ending: 20
        }),
        {
          values: [10, 12, 14, 17, 21, 25]
        }
      )
    )
  ],
  sw: [[], [], []]
};
HeroInfos.May = {
  heroClass: HeroClassType.Priest,
  damageType: DamageType.Magic,
  name: HeroName.May,
  skills: [
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 4630 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 5 * 3 }
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Pen,
          value: 7 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 5 * 3 }
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.AtkSpd,
          value: 10 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 5 * 3 }
        })
      ],
      override: true,
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 4630 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 8 * 3 }
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Pen,
          value: 7 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 8 * 3 }
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.AtkSpd,
          value: 10 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: { type: EffectMultiplierType.ByCooldown, maxStack: 8 * 3 }
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.FlatAtk,
          value: 4630 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: {
            type: EffectMultiplierType.ByCooldown,
            maxStack: 5 * 3
          },
          _dispellable: false
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.Pen,
          value: 7 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: {
            type: EffectMultiplierType.ByCooldown,
            maxStack: 5 * 3
          },
          _dispellable: false
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          status: Status.AtkSpd,
          value: 10 / 3,
          duration: 120,
          coolDown: 8,
          multiplier: {
            type: EffectMultiplierType.ByCooldown,
            maxStack: 5 * 3
          },
          _dispellable: false
        })
      ]
    },
    {
      neither: [],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 20,
          duration: 12 * 1.1
        })
      ],
      light: [],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 15,
          duration: (7 / 3) * 4
        })
      ],
      override: true,
      light: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 12,
          duration: (7 / 3) * 4
        })
      ],
      dark: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 15,
          duration: (7 / 3) * 4
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CCResistance,
      value: 10
    })
  ],
  t5Dark: [],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.CooldownReduction).with({ value: 1.4 }),
      { values: [1.4, 1.7, 2.1, 2.5, 3, 3.5] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.Pen,
        value: 2 / 3,
        coolDown: 8,
        duration: 120,
        multiplier: { maxStack: 8 * 3, type: EffectMultiplierType.ByCooldown }
      }),
      { values: [2 / 3, 2.4 / 3, 2.9 / 3, 3.5 / 3, 4.2 / 3, 5.0 / 3] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        destination: EffectDestination.Allies,
        status: Status.AtkSpd,
        value: 2 / 3,
        coolDown: 8,
        duration: 120,
        multiplier: { maxStack: 8 * 3, type: EffectMultiplierType.ByCooldown }
      }),
      { values: [2/ 3, 2.4 / 3, 2.9 / 3, 3.5 / 3, 4.2 / 3, 5.0 / 3] }
    )
  ),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Allies,
          coolDown: 8,
          duration: 20,
          status: Status.MDef,
          value: 2,
          multiplier: { maxStack: 8, type: EffectMultiplierType.ByCooldown }
        }),
        { values: [2, 2.4, 2.9, 3.4, 4.2, 5] }
      )
    ),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.Enemies,
          coolDown: 20,
          duration: 4 * 1.1
        }),
        {}
      )
    ),
    new StarEffectGroup()
  ],
  sw: [[], [], []]
};
HeroInfos.Lavril = {
  heroClass: HeroClassType.Priest,
  damageType: DamageType.Magic,
  name: HeroName.Lavril,
  skills: [
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.CritResistance,
          value: -30,
          coolDown: 10,
          duration: 10
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.MWeakness,
          value: 25,
          coolDown: 10,
          duration: 10
        })
      ],
      dark: []
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.CritDmg,
          value: 50,
          coolDown: 24,
          duration: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.CritDmg,
          value: 0.15,
          fromStatus: Status.CritDmg,
          coolDown: 24,
          duration: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.AtkSpd,
          value: -25,
          coolDown: 24,
          duration: 15
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.MWeakness,
          value: 25,
          coolDown: 24,
          duration: 15
        })
      ],
      light: [
          new Effect(EffectType.Dispel).with({destination: EffectDestination.SingleEnemy, coolDown: 24})
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Atk,
          value: 25,
          coolDown: 24,
          duration: 15})
      ]
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 22.5,
          coolDown: 25,
          duration: 10
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -22.5,
          coolDown: 25,
          duration: 10
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 22.5,
          coolDown: 17.5,
          duration: 10
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -22.5,
          coolDown: 17.5,
          duration: 10
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 22.5,
          coolDown: 25,
          duration: 10
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.Atk,
          value: -22.5,
          coolDown: 25,
          duration: 10
        })
      ],
      override: true
    },
    {
      neither: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          value: 28447*1.5
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.ManaPerSecond,
          value: 100
        })
      ],
      light: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Pen,
          value: 30
        })
      ],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Def,
          value: 15
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CritDmg,
      value: 20
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      destination: EffectDestination.TopDps,
      status: Status.Atk,
      value: 3,
      multiplier: { maxStack: 20, type: EffectMultiplierType.TakingHit }
    })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.CritDmg,
        destination: EffectDestination.TopDps,
        value: 30
      }),
      { values: [30, 36, 42, 51, 63, 75] }
    )
  ),
  ut: [
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Recovery,
          destination: EffectDestination.SingleEnemy,
          value: -20,
          duration: 5,
          coolDown: 10
        }),
        { values: [-20, -24, -29, -35, -42, -50] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Recovery,
          destination: EffectDestination.TopDps,
          value: 50,
          duration: 15,
          coolDown: 24
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.CritDmg,
          destination: EffectDestination.TopDps,
          value: 20,
          duration: 15,
          coolDown: 24
        }),
        { values: [20, 24, 28, 34, 42, 50] }
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.MDef,
          destination: EffectDestination.SingleEnemy,
          value: -10,
          duration: 15,
          coolDown: 24
        }),
        { values: [-10, -12, -14, -17, -21, -25] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.Enemies,
          status: Status.MWeakness,
          value: 8,
          coolDown: 17.5,
          duration: 12
        }),
        { values: [8, 9.6, 11.2, 13.6, 16.8, 20] }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.FlatAtk,
          value: 28447 * 0.5
        }),
        {}
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.TopDps,
          status: Status.Recovery,
          value: 10
        }),
        { values: [10, 12, 14, 17, 21, 25] }
      )
    )
  ],
  sw: [[], [], []]
};

HeroInfos.Laudia = {
  heroClass: HeroClassType.Assassin,
  damageType: DamageType.Magic,
  name: HeroName.Laudia,
  skills: [
    {
      neither: [
        new Effect(EffectType.Cc).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 8,
          duration: 3
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 8,
          duration: 8,
          status: Status.Block, value: -50
        }),
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          coolDown: 8,
          duration: 8,
          status: Status.CritResistance, value: -50
        }),
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          destination: EffectDestination.SingleEnemy,
          status: Status.MWeakness,
          value: 25,
          coolDown: 8,
          duration: 10
        })
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
        })
      ],
      light: [],
      dark: []
    },
    { neither: [], light: [], dark: [] },
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
        })
      ],
      light: [],
      dark: [
        new Effect(EffectType.StatusChange).with({
          status: Status.Tough,
          value: 2 * 10,
          _dispellable: false
        })
      ]
    }
  ],
  t5Light: [
    new Effect(EffectType.StatusChange).with({ status: Status.Atk, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Def, value: 15 }),
    new Effect(EffectType.StatusChange).with({ status: Status.Hp, value: 15 }),
    new Effect(EffectType.StatusChange).with({
      status: Status.AtkSpd,
      value: 10
    })
  ],
  t5Dark: [
    new Effect(EffectType.StatusChange).with({
      status: Status.Acc,
      value: 30,
      duration: 10,
      ending: 10
    }),
    new Effect(EffectType.StatusChange).with({
      status: Status.CCAcc,
      value: 30,
      duration: 10,
      ending: 10
    }),
    new Effect(EffectType.CcImmunity).with({ duration: 7, ending: 7 })
  ],
  uw: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.Pen,
        value: 3 * 1.5 * 4,
        _dispellable: false
      }),
      {
        values: [
          3 * 1.5 * 4,
          3 * 1.5 * 5,
          3 * 1.5 * 6,
          3 * 1.5 * 7,
          3 * 1.5 * 8,
          3 * 1.5 * 10
        ]
      }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.FlatDef,
        value: 3 * 1.5 * 4,
        _dispellable: false
      }),
      {
        values: [
          1680 * 1.5 * 4,
          1680 * 1.5 * 5,
          1680 * 1.5 * 6,
          1680 * 1.5 * 7,
          1680 * 1.5 * 8,
          1680 * 1.5 * 10
        ]
      }
    ),
    // Assume taking S4 dark
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.Tough,
        value: 2 * 4,
        _dispellable: false
      }),
      {
        values: [2 * 4, 2 * 5, 2 * 6, 2 * 7, 2 * 8, 2 * 10]
      }
    )
  ),
  ut: [
    new StarEffectGroup(),
    new StarEffectGroup(),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.Pen,
          value: 10,
          _dispellable: true
        }),
        {
          values: [10, 12, 14, 17, 21, 25]
        }
      )
    ),
    new StarEffectGroup(
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.AtkSpd,
          value: 10,
          coolDown: 5, duration: 5
        }),
        {
          values: [10, 12, 14, 17, 21, 25]
        }
      ),
      createStarEffect(
        new Effect(EffectType.StatusChange).with({
          status: Status.FlatDef,
          value: 1680 * 20 * 0.5,
          _dispellable: false
        }),
        {}
      )
    )
  ],
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
  Knight: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Knight
  ) as HeroName[],
  Warrior: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Warrior
  ) as HeroName[],
  Assassin: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Assassin
  ) as HeroName[],
  Archer: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Archer
  ) as HeroName[],
  Mechanic: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Mechanic
  ) as HeroName[],
  Wizard: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Wizard
  ) as HeroName[],
  Priest: Object.keys(HeroInfos).filter(
    name => HeroInfos[name as HeroName]!.heroClass === HeroClassType.Priest
  ) as HeroName[]
};

export type HeroConfiguration = {
  owned: boolean;
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
  enchants: [Status | null, Status | null, Status | null, Status | null];
  gearSets: [GearSet, GearSet];
  artifact: [ArtifactName | null, 0|1|2|3|4|5];
};
