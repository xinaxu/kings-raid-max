import React from "react"
import ClassBuffConfiguration from "./class-buff-configuration";
import ArtifactConfiguration from "./artifact-configuration";
import HeroConfiguration from "./hero-configuration";
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import "office-ui-fabric-react/dist/css/fabric.min.css"
import {connect} from "react-redux";
import {RootState} from "../redux/types";
import {ARTIFACT_CONFIGURATION, CLASS_BUFF, HERO_CONFIGURATION, NavigationState} from "../redux/navigation/types";
import Navigation from "./navigation";

initializeIcons();

export type AppProps = {
    selectedNav: NavigationState
};

class App extends React.Component<AppProps> {
    constructor(props: Readonly<AppProps>) {
        super(props);
    }

    render() {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-xl2">
                        <Navigation />
                    </div>
                    <div className="ms-Grid-col ms-xl10">
                        <div>
                            <div style={{display: this.props.selectedNav.header === HERO_CONFIGURATION ? "inline" : "none"}}>
                                <HeroConfiguration/>
                            </div>
                            <div style={{display: this.props.selectedNav.header === CLASS_BUFF ? "inline" : "none"}}>
                                <ClassBuffConfiguration/>
                            </div>
                            <div style={{display: this.props.selectedNav.header === ARTIFACT_CONFIGURATION ? "inline" : "none"}}>
                                <ArtifactConfiguration/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): AppProps => {
    return {
        selectedNav: state.selectedNav
    };
};

export default connect(mapStateToProps)(App);