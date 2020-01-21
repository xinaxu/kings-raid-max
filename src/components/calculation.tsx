import {RootState} from "../redux/types";
import React from "react"
import {connect} from "react-redux";
import {
    ChoiceGroup,
    Dropdown,
    DropdownMenuItemType,
    IChoiceGroupOption,
    IDropdownOption, Image, Label, PivotItem, Toggle,
    Stack,
    Text
} from "office-ui-fabric-react";
import {Card} from "@uifabric/react-cards";
import {HeroClassMapping, HeroName} from "../model/hero";
import {HeroClassType} from "../model/hero-class-type";
import {changeBattleType, changeHeroSelection} from "../redux/hero/actions";
import {BattleType, BattleInfos} from "../redux/hero/types";
import {Status} from "../model/status";

const mapStateToProps = (state: RootState) => {
    return {
        calculation: state.heroConfiguration.calculation,
    };
};

const mapActionToProps = {
    onChangeBattleType: changeBattleType,
    onChangeHeroSelection: changeHeroSelection
};

export type CalculationProps = typeof mapActionToProps &
    ReturnType<typeof mapStateToProps>;

class Calculation extends React.Component<CalculationProps> {
    constructor(props: Readonly<CalculationProps>) {
        super(props);
    }

    render() {
        let options: IDropdownOption[] = [];
        for (let heroClass in HeroClassMapping) {
            options.push({
                key: heroClass,
                text: heroClass,
                itemType: DropdownMenuItemType.Header
            });
            options = options.concat(HeroClassMapping[heroClass as HeroClassType].map(heroName => {
                return {key: heroName, text: heroName} as IDropdownOption;
            }));
        }

        let sequence: number[] = [];
        for (let i = 0; i < BattleInfos[this.props.calculation.battleType].numOfHeroes; ++i) {
            sequence.push(i);
        }

        return (
            <Stack tokens={{childrenGap: 20}}>
                <Card horizontal>
                    <Card.Item>
                        <ChoiceGroup selectedKey={this.props.calculation.battleType}
                                     options={Object.values(BattleType).map(battleType => {
                                         return {key: battleType, text: battleType};
                                     })}
                                     onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                         this.props.onChangeBattleType(option!.key as BattleType);
                                     }}/>
                    </Card.Item>
                    <Card.Item>
                        <div>
                            {Object.values(Status).map(status => {
                                return [status, this.props.calculation.battleCalculation.enemy.finalStats[status]!];
                            }).filter(value => {
                                return value[1] !== 0 && value[1] !== undefined;
                            }).map(value => {
                                return (
                                    <div key={value[0]}>
                                        <Label>{value[0]}:</Label>
                                        {value[1].toLocaleString()}
                                    </div>
                                );
                            })}
                        </div>
                    </Card.Item>
                </Card>
                {sequence.map(i => {
                    return (
                        <Card key={i} horizontal>
                            <Card.Item styles={{root: {width: 124}}}>
                                <Dropdown selectedKey={this.props.calculation.heroes[i].heroName}
                                          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                              this.props.onChangeHeroSelection(i, option!.key as HeroName);
                                          }}
                                          options={options}/>
                                {
                                    this.props.calculation.heroes[i].heroName === null ? (<div></div>) : (
                                        <div><Image
                                            src={require(`../assets/hero/${this.props.calculation.heroes[i].heroName}.png`)}
                                        />
                                        </div>
                                    )
                                }
                            </Card.Item>

                            <Card.Item>
                                {
                                    this.props.calculation.heroes[i].heroName === null ? (<div></div>) : (
                                        <div>
                                            <Label>DPS:</Label>
                                            {this.props.calculation.battleCalculation.heroes[i]?.dps.toLocaleString()}
                                            <Label>Tankiness:</Label>
                                            {this.props.calculation.battleCalculation.heroes[i]?.tankiness.toLocaleString()}
                                            <Label>CC:</Label>
                                            {this.props.calculation.battleCalculation.heroes[i]?.cc.toLocaleString()}
                                            <Label>Dispel:</Label>
                                            {this.props.calculation.battleCalculation.heroes[i]?.dispel.toLocaleString()}
                                            <Label>Cleanse:</Label>
                                            {this.props.calculation.battleCalculation.heroes[i]?.cleanse.toLocaleString()}
                                        </div>
                                    )
                                }
                            </Card.Item>
                            <Card.Item>
                                {
                                    this.props.calculation.heroes[i].heroName === null ? (<div></div>) : (
                                        <div>
                                            <Toggle label={"Show Details"} defaultChecked={false}
                                                    onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                                                        document.getElementById(`${this.props.calculation.heroes[i].heroName}-details`)!.style.display = checked === true ? "inline" : "none";
                                                    }}/>
                                            <div id={`${this.props.calculation.heroes[i].heroName}-details`}
                                                 style={{display: "none"}}>
                                                {Object.values(Status).map(status => {
                                                    return [status, this.props.calculation.battleCalculation.heroes[i]?.finalStats[status]!];
                                                }).filter(value => {
                                                    return value[1] !== 0 && value[1] !== undefined;
                                                }).map(value => {
                                                    return (
                                                        <div key={value[0]}>
                                                            <Label>{value[0]}:</Label>
                                                            {value[1].toLocaleString()}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                            </Card.Item>
                        </Card>
                    );
                })}
            </Stack>
        );
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(Calculation);