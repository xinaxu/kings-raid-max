import { StarEffectGroup, createStarEffect } from "./star-effect";
import { Effect, EffectType, EffectTrigger } from "./effect";
import { Status } from "./status";

export enum ArtifactName {
  DrinkingHornOfAncientCow = "Drinking Horn of Ancient Cow",
  GoldenCatStatue = "Golden Cat Statue",
  PocketWatchOfAncientCivilization = "Pocket Watch of Ancient Civilization",
  TheAncientScope = "The Ancient Scope",
  MadamesBronzeMirrors = "Madame's Bronze Mirrors",
  SealedChainOfAncientGod = "Sealed Chain of Ancient God",
  Mask = "Mask of Goblin",
  JudgementOfLightBracelet = "Judgment of Light Bracelet",
  EarthProtection = "Earth Protection",
  BlessingOfEarth = "Blessing of Earth",
  EarthCore = "Earth Core",
  TarotCardOfLoss = "Tarot Card of Loss",
  SolarStone = "Solar Stone",
  OrbsOfContract = "Orbs of Contract",
  FeatherOfSacrifice = "Feather of Sacrifice",
  AssassinsVeil = "Assassin's Veil",
  TridentOfTheDeep = "Trident of the Deep",
  GuardianCrystalOfTheDeep = "Guardian Crystal of the Deep",
  InfernalGreatsword = "Infernal Greatsword",
  InfernalWhip = "Infernal Whip",
  BookOfTheMad = "Book of the Mad",
  LionOfProtection = "Lion of Protection",
  CrossPumpkinHead = "Cross Pumpkin Head",
  AngryPumpkinHead = "Angry Pumpkin Head",
  FancyTraditionalPendant = "Fancy Traditional Pendant",
  CoolingDelicacyInTheSummer = "Cooling Delicacy in the Summer",
  LulusNecklace = "Lulu's Necklace",
  HappyPumpkinsHead = "Happy Pumpkin Head",
  FantasticHybridAnimals = "Fantastic Hybrid Animals",
  AbyssalCrown = "Abyssal Crown",
  WarmTurkeyDish = "Warm Turkey Dish",
  ChristmasTreeOfHolyNight = "Christmas Tree of Holy Night",
  AcademicAchievementAward = "Academic Achievement Award",
  HeartCottonCandy = "Heart Cotton Candy",
  AncientGodKingsCoin = "Ancient God King's Coin",
  PendulumOfFantasy = "Pendulum of Fantasy",
  MasterChefsRecipeBook = "Master Chef's Recipe Book",
  JunosSpecialDesert = "Juno's Special Dessert",
  PumpkinStuckEvilSpirit = "Pumpkin-Stuck Evil Spirit",
  ForgeHammerMKII = "Forge Hammer MK-II"
}

export const artifacts: Partial<Record<ArtifactName, StarEffectGroup>> = {
  [ArtifactName.DrinkingHornOfAncientCow]: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({ status: Status.Atk }),
      { values: [10, 12, 14, 17, 20, 25] }
    ),
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.AtkSpd
      }),
      { values: [10, 12, 14, 17, 20, 25] }
    )
  ).with({ trigger: EffectTrigger.NormalAttack }),
  [ArtifactName.GoldenCatStatue]: new StarEffectGroup(
    createStarEffect(
      new Effect(EffectType.StatusChange).with({
        status: Status.Atk,
        ending: 15
      }),
      { values: [40, 48, 57, 69, 83, 100] }
    )
  )
};
