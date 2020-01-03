import React from "react";
import { RootState } from "../redux/types";
import { changeClassBuff } from "../redux/class-buff/actions";
import "office-ui-fabric-react/dist/css/fabric.min.css";
import {
  ChoiceGroup,
  IChoiceGroupOption
} from "office-ui-fabric-react/lib/ChoiceGroup";
import { connect } from "react-redux";
import { Status } from "../model/status";

const mapStateToProps = (state: RootState) => {
  return {
    selectedHeroClass: state.selectedNav.heroClass,
    classBuffs: state.classBuffs
  };
};

const mapActionToProps = {
  onChangeClassBuff: changeClassBuff
};

export type ClassBuffConfigurationProps = typeof mapActionToProps &
  ReturnType<typeof mapStateToProps>;

const classBuffLevels: number[] = [
  0,
  0.8,
  1.6,
  2.8,
  4,
  5.2,
  6.4,
  8,
  9.6,
  11.2,
  12.8,
  14.4,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32
];
let attackBuffLevels = classBuffLevels.map(level => ({
  key: `${Status.Atk}/${level}`,
  text: `${level} %`
}));
let hpBuffLevels = classBuffLevels.map(level => ({
  key: `${Status.Hp}/${level}`,
  text: `${level} %`
}));

class ClassBuffConfiguration extends React.Component<
  ClassBuffConfigurationProps
> {
  constructor(props: Readonly<ClassBuffConfigurationProps>) {
    super(props);
    this.onChangeClassBuff = this.onChangeClassBuff.bind(this);
  }

  onChangeClassBuff(
    ev?: React.FormEvent<HTMLInputElement | HTMLElement>,
    option?: IChoiceGroupOption
  ): void {
    if (option !== undefined && this.props.selectedHeroClass !== null) {
      let values = option.key.split("/");
      this.props.onChangeClassBuff(
        this.props.selectedHeroClass,
        values[0] as Status.Atk | Status.Hp,
        Number(values[1])
      );
    }
  }

  render() {
    return (
      <div className={"ms-Grid"} dir={"ltr"}>
        <div className={"ms-Grid-row"}>
          <div className="ms-Grid-col ms-sm12">
            <h1>{this.props.selectedHeroClass} Class Buff</h1>
          </div>
        </div>
        <div className={"ms-Grid-row"}>
          <div className="ms-Grid-col ms-sm6">
            <ChoiceGroup
              className="defaultChoiceGroup"
              selectedKey={`${Status.Atk}/${
                this.props.classBuffs[this.props.selectedHeroClass!]?.Attack
              }`}
              options={attackBuffLevels}
              onChange={this.onChangeClassBuff}
              label="Attack Buff:"
            />
          </div>
          <div className="ms-Grid-col ms-sm6">
            <ChoiceGroup
              className="defaultChoiceGroup"
              selectedKey={`${Status.Hp}/${
                this.props.classBuffs[this.props.selectedHeroClass!]?.HP
              }`}
              options={hpBuffLevels}
              onChange={this.onChangeClassBuff}
              label="HP Buff:"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(ClassBuffConfiguration);
