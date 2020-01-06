import React from "react";
import { RootState } from "../redux/types";
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
  changeHeroGearSets
} from "../redux/hero/actions";
import { connect } from "react-redux";
import { HeroName, HeroClassMapping } from "../model/hero";
import {
  Pivot,
  PivotLinkSize,
  PivotLinkFormat,
  PivotItem,
  Label
} from "office-ui-fabric-react";

const mapStateToProps = (state: RootState) => {
  return {
    selectedHeroClass: state.selectedNav.heroClass,
    heroConfiguration: state.heroConfiguration
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
  changeHeroGearSets: changeHeroGearSets
};

export type HeroConfigurationProps = typeof mapActionToProps &
  ReturnType<typeof mapStateToProps>;

type LocalState = {
  selectedHero: HeroName | null;
};

class HeroConfiguration extends React.Component<
  HeroConfigurationProps,
  LocalState
> {
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
  }
  render() {
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}>
          {(this.props.selectedHeroClass == null
            ? []
            : HeroClassMapping[this.props.selectedHeroClass]
          ).map(heroName => {
            return (
              <PivotItem headerText={heroName}>
                <Label>{heroName}</Label>
              </PivotItem>
            );
          })}
        </Pivot>
        {this.props.selectedHeroClass}
        {this.state.selectedHero}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionToProps)(HeroConfiguration);
