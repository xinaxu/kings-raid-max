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
import { BattleType } from "../redux/hero/types";

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

        let sequence = [0, 1, 2, 3, 4, 5, 6, 7];
        if (this.props.calculation.battleType === BattleType.GuildRaid) {
            sequence = [0, 1, 2, 3];
        }

        return (
            <Stack tokens={{childrenGap: 20}}>
                <Card>
                    <Card.Item>
                        <Text variant="xLarge">
                            Battle Type
                        </Text>
                    </Card.Item>
                    <Card.Item>
                        <ChoiceGroup selectedKey={this.props.calculation.battleType}
                                     options={Object.values(BattleType).map(battleType => {
                                         return {key: battleType, text: battleType};
                                     })}
                                     onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
                                         this.props.onChangeBattleType(option!.key as BattleType);
                                     }}/>
                    </Card.Item>
                </Card>
                {sequence.map(i => {
                    return (
                        <Card key={i} horizontal>
                            <Card.Item styles={{root: {width: 124}}}>
                                <Dropdown selectedKey={this.props.calculation.heroes[i].heroName}
                                          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                              this.props.onChangeHeroSelection(i, option!.key as HeroName, this.props.calculation.heroes[i].isDps, this.props.calculation.heroes[i].isTank);
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
                                            <Toggle label="Calculate DPS"
                                                    checked={this.props.calculation.heroes[i].isDps}
                                                    onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                                                        this.props.onChangeHeroSelection(i, this.props.calculation.heroes[i].heroName, checked!, this.props.calculation.heroes[i].isTank);
                                                    }}/> 
                                                    {this.props.calculation.heroes[i].isDps ? this.props.calculation.heroes[i].dps : "N/A"}
                                            <Toggle label="Calculate Tankiness"
                                                    checked={this.props.calculation.heroes[i].isTank}
                                                    onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
                                                        this.props.onChangeHeroSelection(i, this.props.calculation.heroes[i].heroName, this.props.calculation.heroes[i].isDps, checked!);
                                                    }}/>
                                            {this.props.calculation.heroes[i].isTank ? this.props.calculation.heroes[i].tankiness : "N/A"}
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