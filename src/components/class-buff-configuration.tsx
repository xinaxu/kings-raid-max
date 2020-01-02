import React from "react"
import {RootState} from "../redux/types";
import {changeClassBuff} from "../redux/class-buff/actions";
import "office-ui-fabric-react/dist/css/fabric.min.css"
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import {connect} from "react-redux";
import { Status } from "../model/status";
import { HeroClassType } from "../model/hero-class-type";

const mapStateToProps = (state: RootState) => {
    return {
        selectedHeroClass: state.selectedNav.heroClass
    };
};

const mapActionToProps = {
    onChangeClassBuff: changeClassBuff
}

export type ClassBuffConfigurationProps = typeof mapActionToProps & ReturnType<typeof mapStateToProps>;

class ClassBuffConfiguration extends React.Component<ClassBuffConfigurationProps> {
    constructor(props: Readonly<ClassBuffConfigurationProps>) {
        super(props);
        this.onChangeClassBuff = this.onChangeClassBuff.bind(this);
    }
    
    onChangeClassBuff(ev?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: IChoiceGroupOption): void {
        if (option !== undefined && this.props.selectedHeroClass != undefined) {
            let values = option.key.split("/");
            this.props.onChangeClassBuff(this.props.selectedHeroClass, values[0] as Status.Atk| Status.Hp, Number(values[1]));
        }
    }

    render() {
        return (
            <div className={"ms-Grid"} dir={"ltr"}>
                <div className={"ms-Grid-row"}>
                    <div className="ms-Grid-col ms-sm6">
                        <ChoiceGroup
                            className="defaultChoiceGroup"
                            defaultSelectedKey="0"
                            options={[
                                {
                                    key: `${Status.Atk}/0`,
                                    text: '0.0 %'
                                },
                                {
                                    key: `${Status.Atk}/1`,
                                    text: '1.0 %'
                                }
                            ]}
                            onChange={this.onChangeClassBuff}
                            label="Pick the Attack Class Buff"
                        />
                    </div>
                    <div className="ms-Grid-col ms-sm6">
                    </div>
                </div>
            </div>);
    }
}

export default connect(mapStateToProps, mapActionToProps)(ClassBuffConfiguration);