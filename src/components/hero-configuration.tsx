import React from "react";
import {RootState} from "../redux/types";
import {
    changeHeroOwnership,
    changeHeroTranscendence,
    changeHeroSkill,
    changeHeroUwLevel,
    changeHeroUtLevel,
    changeHeroUtPrimary,
    changeHeroGearLine,
    changeHeroUtGearLine,
    changeHeroSwLevel,
    changeHeroAccessory,
    changeHeroUwRunes,
    changeHeroArmorRunes,
    changeHeroEnchants,
    changeHeroGearSets, changeHeroArtifact
} from "../redux/hero/actions";
import {connect} from "react-redux";
import {HeroName, HeroClassMapping, SkillTranscendence, Accessory, GearSet} from "../model/hero";
import {
    Pivot,
    PivotLinkSize,
    PivotLinkFormat,
    PivotItem,
    Image,
    Toggle,
    Stack,
    Text, Checkbox, Dropdown, IDropdownOption, ChoiceGroup, IChoiceGroupOption
} from "office-ui-fabric-react";
import {Card} from "@uifabric/react-cards";
import {StarLevel} from "../model/star-effect";
import {Status} from "../model/status";
import { ArtifactName } from "../model/artifact";

const mapStateToProps = (state: RootState) => {
    return {
        selectedHeroClass: state.selectedNav.heroClass,
        heroConfiguration: state.heroConfiguration.heroConfiguration
    };
};

const mapActionToProps = {
    changeHeroOwnership: changeHeroOwnership,
    changeHeroTranscendence: changeHeroTranscendence,
    changeHeroSkill: changeHeroSkill,
    changeHeroUwLevel: changeHeroUwLevel,
    changeHeroUtLevel: changeHeroUtLevel,
    changeHeroUtPrimary: changeHeroUtPrimary,
    changeHeroGearLine: changeHeroGearLine,
    changeHeroUtGearLine: changeHeroUtGearLine,
    changeHeroSwLevel: changeHeroSwLevel,
    changeHeroAccessory: changeHeroAccessory,
    changeHeroUwRunes: changeHeroUwRunes,
    changeHeroArmorRunes: changeHeroArmorRunes,
    changeHeroEnchants: changeHeroEnchants,
    changeHeroGearSets: changeHeroGearSets,
    changeHeroArtifact: changeHeroArtifact
};

export type HeroConfigurationProps = typeof mapActionToProps &
    ReturnType<typeof mapStateToProps>;

type LocalState = {
    selectedHero: HeroName | null;
};

class HeroConfiguration extends React.Component<HeroConfigurationProps,
    LocalState> {
    constructor(props: Readonly<HeroConfigurationProps>) {
        super(props);
        if (this.props.selectedHeroClass != null) {
            this.state = {
                selectedHero: HeroClassMapping[this.props.selectedHeroClass!][0]
            };
        } else {
            this.state = {
                selectedHero: null
            };
        }
        this.onLinkClick = this.onLinkClick.bind(this);
    }

    onLinkClick(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        if (item !== undefined) {
            let heroName = item.props.headerText as HeroName;
            this.setState({selectedHero: heroName});
        }
    }

    render() {
        let artifactOption = Object.values(ArtifactName).map(name => {
            return {key: name as string, text: name as string};
        });
        artifactOption.unshift({key: 'None', text: 'None'});
        return (
            <div>
                <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} onLinkClick={this.onLinkClick}
                       defaultChecked={false}>
                    {(this.props.selectedHeroClass == null
                            ? []
                            : HeroClassMapping[this.props.selectedHeroClass]
                    ).map(heroName => {
                        return (
                            <PivotItem headerText={heroName} key={heroName}>
                                <Image
                                    src={require(`../assets/hero/${heroName}.png`)}
                                />
                                <Stack tokens={{childrenGap: 20}} horizontal wrap>
                                    <Toggle onText="I own this hero" offText="I don't own this hero"
                                            checked={this.props.heroConfiguration[heroName]?.owned === true}
                                            onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                                                this.props.changeHeroOwnership(heroName, checked!)
                                            }}/>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Transcendence Tier 1
                                            </Text>
                                        </Card.Item>
                                        <Card.Item>
                                            {[1, 2, 3, 4, 5].map(i => {
                                                return (
                                                    <Checkbox key={i} label={`Tier 1 # ${i}`}
                                                              checked={this.props.heroConfiguration[heroName]?.t1[i - 1]}
                                                              onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
                                                                  this.props.changeHeroTranscendence(heroName, 1, i as 1 | 2 | 3 | 4 | 5, checked!);
                                                              }}/>
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Transcendence Tier 2
                                            </Text>
                                        </Card.Item>
                                        <Card.Item>
                                            {[1, 2, 3, 4, 5].map(i => {
                                                return (
                                                    <Checkbox key={i} label={`Tier 2 # ${i}`}
                                                              checked={this.props.heroConfiguration[heroName]?.t2[i - 1]}
                                                              onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
                                                                  this.props.changeHeroTranscendence(heroName, 2, i as 1 | 2 | 3 | 4 | 5, checked!);
                                                              }}/>
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Skill Transcendence
                                            </Text>
                                        </Card.Item>
                                        <Card.Item>
                                            {[1, 2, 3, 4].map(i => {
                                                return (
                                                    <Dropdown key={i}
                                                              label={`Skill # ${i}`}
                                                              selectedKey={this.props.heroConfiguration[heroName]?.t3[i - 1]}
                                                              options={[{
                                                                  key: SkillTranscendence.Neither,
                                                                  text: SkillTranscendence.Neither
                                                              },
                                                                  {
                                                                      key: SkillTranscendence.Light,
                                                                      text: SkillTranscendence.Light
                                                                  },
                                                                  {
                                                                      key: SkillTranscendence.Dark,
                                                                      text: SkillTranscendence.Dark
                                                                  }]}
                                                              onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                  this.props.changeHeroSkill(heroName, i as 1 | 2 | 3 | 4, option!.key as SkillTranscendence);
                                                              }}
                                                    />
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Unique Weapon
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            <ChoiceGroup
                                                selectedKey={
                                                    this.props.heroConfiguration[heroName]?.uwLevel ===
                                                    null
                                                        ? "null"
                                                        : this.props.heroConfiguration[heroName]?.uwLevel?.toString()
                                                }
                                                onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                                    this.props.changeHeroUwLevel(heroName, option!.key === "null" ? null : Number(option!.key) as StarLevel);
                                                }}
                                                options={[
                                                    {
                                                        key: `null`,
                                                        text: "I don't own this unique weapon",
                                                    },
                                                    {
                                                        key: `0`,
                                                        text: "0 star"
                                                    },
                                                    {
                                                        key: `1`,
                                                        text: "1 star"
                                                    },
                                                    {
                                                        key: `2`,
                                                        text: "2 star"
                                                    },
                                                    {
                                                        key: `3`,
                                                        text: "3 star"
                                                    },
                                                    {
                                                        key: `4`,
                                                        text: "4 star"
                                                    },
                                                    {
                                                        key: `5`,
                                                        text: "5 star"
                                                    }
                                                ]}
                                            />
                                        </Card.Item>
                                    </Card>
                                    {[1, 2, 3, 4].map(ut => {
                                        return (
                                            <Card key={ut}>
                                                <Card.Item>
                                                    <Text variant={"xLarge"}>
                                                        Unique Treasure #{ut}
                                                    </Text>
                                                </Card.Item>
                                                <Card.Item fill>
                                                    <ChoiceGroup
                                                        selectedKey={
                                                            this.props.heroConfiguration[heroName]?.utLevel[ut - 1] ===
                                                            null
                                                                ? "null"
                                                                : this.props.heroConfiguration[heroName]?.utLevel[ut - 1]?.toString()
                                                        }
                                                        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                                            this.props.changeHeroUtLevel(heroName, ut as 1 | 2 | 3 | 4, option!.key === "null" ? null : Number(option!.key) as StarLevel);
                                                        }}
                                                        options={[
                                                            {
                                                                key: `null`,
                                                                text: "I don't own this unique treasure",
                                                            },
                                                            {
                                                                key: `0`,
                                                                text: "0 star"
                                                            },
                                                            {
                                                                key: `1`,
                                                                text: "1 star"
                                                            },
                                                            {
                                                                key: `2`,
                                                                text: "2 star"
                                                            },
                                                            {
                                                                key: `3`,
                                                                text: "3 star"
                                                            },
                                                            {
                                                                key: `4`,
                                                                text: "4 star"
                                                            },
                                                            {
                                                                key: `5`,
                                                                text: "5 star"
                                                            }
                                                        ]}
                                                    />
                                                </Card.Item>
                                            </Card>
                                        );
                                    })}
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Primary Unique Treasure
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            <ChoiceGroup
                                                selectedKey={
                                                    this.props.heroConfiguration[heroName]?.utPrimary ===
                                                    null
                                                        ? "null"
                                                        : this.props.heroConfiguration[heroName]?.utPrimary?.toString()
                                                }
                                                onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                                    this.props.changeHeroUtPrimary(heroName, option!.key === "null" ? null : Number(option!.key) as 1 | 2 | 3 | 4);
                                                }}
                                                options={[
                                                    {
                                                        key: `null`,
                                                        text: "I don't have a primary unique treasure",
                                                    },
                                                    {
                                                        key: `1`,
                                                        text: "#1"
                                                    },
                                                    {
                                                        key: `2`,
                                                        text: "#2"
                                                    },
                                                    {
                                                        key: `3`,
                                                        text: "#3"
                                                    },
                                                    {
                                                        key: `4`,
                                                        text: "#4"
                                                    },
                                                ]}
                                            />
                                        </Card.Item>
                                    </Card>
                                    {[1, 2, 3, 4].map(ut => {
                                        return (
                                            <Card>
                                                <Card.Item>
                                                    <Text variant={"xLarge"}>
                                                        Unique Treasure #{ut} Gear line
                                                    </Text>
                                                </Card.Item>
                                                <Card.Item fill>
                                                    {[1, 2].map(i => {
                                                        return (
                                                            <Dropdown key={i}
                                                                      label={`Gear Line # ${i}`}
                                                                      selectedKey={this.props.heroConfiguration[heroName]?.utGearLines[ut - 1][i - 1]}
                                                                      options={Object.values(Status).map(status => {
                                                                          return {key: status, text: status};
                                                                      })}
                                                                      onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                          this.props.changeHeroUtGearLine(heroName, ut as 1 | 2 | 3 | 4, i as 1 | 2, option!.key as Status);
                                                                      }}
                                                            />
                                                        );
                                                    })}
                                                </Card.Item>
                                            </Card>
                                        );
                                    })}
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Accessory
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            <ChoiceGroup
                                                selectedKey={
                                                    this.props.heroConfiguration[heroName]?.accessory
                                                }
                                                onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                                    this.props.changeHeroAccessory(heroName, option!.key as Accessory);
                                                }}
                                                options={Object.values(Accessory).map(accessory => {
                                                    return {key: accessory, text: accessory};
                                                })}
                                            />
                                        </Card.Item>
                                    </Card>
                                    {[1, 2].map(i => {
                                        return (
                                            <Card>
                                                <Card.Item>
                                                    <Text variant={"xLarge"}>
                                                        Gear Set # {i}
                                                    </Text>
                                                </Card.Item>
                                                <Card.Item fill>
                                                    <ChoiceGroup
                                                        selectedKey={
                                                            this.props.heroConfiguration[heroName]?.gearSets[i - 1]
                                                        }
                                                        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                                            this.props.changeHeroGearSets(heroName, 1, option!.key as GearSet);
                                                        }}
                                                        options={Object.values(GearSet).map(gearSet => {
                                                            return {key: gearSet, text: gearSet};
                                                        })}
                                                    />
                                                </Card.Item>
                                            </Card>
                                        );
                                    })}
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Unique Weapon Runes
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            {[1, 2, 3].map(i => {
                                                return (
                                                    <Dropdown key={i}
                                                              label={`Rune # ${i}`}
                                                              selectedKey={this.props.heroConfiguration[heroName]?.uwRunes[i - 1]}
                                                              options={Object.values(Status).map(status => {
                                                                  return {key: status, text: status};
                                                              })}
                                                              onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                  this.props.changeHeroUwRunes(heroName, i as 1 | 2 | 3, option!.key as Status);
                                                              }}
                                                    />
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Armor Runes
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            {[1, 2].map(i => {
                                                return (
                                                    <Dropdown key={i}
                                                              label={`Armor Rune # ${i}`}
                                                              selectedKey={this.props.heroConfiguration[heroName]?.armorRunes[i - 1]}
                                                              options={Object.values(Status).map(status => {
                                                                  return {key: status, text: status};
                                                              })}
                                                              onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                  this.props.changeHeroArmorRunes(heroName, i as 1 | 2, option!.key as Status);
                                                              }}
                                                    />
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Enchantments
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            {[1, 2, 3, 4].map(i => {
                                                return (
                                                    <Dropdown key={i}
                                                              label={`Enchantment # ${i}`}
                                                              selectedKey={this.props.heroConfiguration[heroName]?.enchants[i - 1]}
                                                              options={Object.values(Status).map(status => {
                                                                  return {key: status, text: status};
                                                              })}
                                                              onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                  this.props.changeHeroEnchants(heroName, i as 1 | 2 | 3 | 4, option!.key as Status, 0.0);
                                                              }}
                                                    />
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Artifact
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            <Dropdown 
                                                      label={"Choose equipped artifact"}
                                                      selectedKey={this.props.heroConfiguration[heroName]?.artifact === null ? 'None' : this.props.heroConfiguration[heroName]?.artifact}
                                                      options={artifactOption}
                                                      onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                          if (option !== undefined) {
                                                              this.props.changeHeroArtifact(heroName, option.key === 'None' ? null : (option.key as ArtifactName));
                                                          }
                                                      }}
                                            />
                                        </Card.Item>
                                    </Card>
                                    <Card>
                                        <Card.Item>
                                            <Text variant={"xLarge"}>
                                                Gear line
                                            </Text>
                                        </Card.Item>
                                        <Card.Item fill>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => {
                                                return (
                                                    <Dropdown key={i}
                                                              label={`Gear Line # ${i}`}
                                                              selectedKey={this.props.heroConfiguration[heroName]?.gearLines[i - 1]}
                                                              options={Object.values(Status).map(status => {
                                                                  return {key: status, text: status};
                                                              })}
                                                              onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                                                  this.props.changeHeroGearLine(heroName, i as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12, option!.key as Status);
                                                              }}
                                                    />
                                                );
                                            })}
                                        </Card.Item>
                                    </Card>
                                </Stack>
                            </PivotItem>
                        );
                    })}
                </Pivot>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapActionToProps)(HeroConfiguration);
