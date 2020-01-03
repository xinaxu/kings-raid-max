import React from "react";
import { INavLink, Nav } from "office-ui-fabric-react/lib/Nav";
import { HeroClassType } from "../model/hero-class-type";
import { RootState } from "../redux/types";
import {
  ARTIFACT_CONFIGURATION,
  CLASS_BUFF,
  HERO_CONFIGURATION,
  NavigationHeader
} from "../redux/navigation/types";
import { connect } from "react-redux";
import { selectNavigation } from "../redux/navigation/actions";

const mapStateToProps = (state: RootState) => {
  return {
    selectedHeader: state.selectedNav.header,
    selectedHeroClass: state.selectedNav.heroClass
  };
};

const mapActionToProps = {
  onChangeNavigation: selectNavigation
};

export type NavigationProps = typeof mapActionToProps &
  ReturnType<typeof mapStateToProps>;

class Navigation extends React.Component<NavigationProps> {
  constructor(props: Readonly<NavigationProps>) {
    super(props);
    this.onLinkClick = this.onLinkClick.bind(this);
  }

  onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    if (item !== undefined && item.key !== undefined) {
      let splits = item.key.split("/");
      this.props.onChangeNavigation(
        splits[0] as NavigationHeader,
        splits[1] as HeroClassType
      );
    }
  }

  render() {
    return (
      <Nav
        styles={{
          root: {
            width: "100%",
            overflowY: "auto"
          }
        }}
        onLinkClick={this.onLinkClick}
        groups={[
          {
            name: "Hero",
            links: Object.values(HeroClassType).map(type => ({
              name: type,
              url: `#/${HERO_CONFIGURATION}/${type}`,
              key: `${HERO_CONFIGURATION}/${type}`
            }))
          },
          {
            name: "Artifact",
            links: [
              {
                name: "Configuration",
                url: `#/${ARTIFACT_CONFIGURATION}`,
                key: `${ARTIFACT_CONFIGURATION}`
              }
            ]
          },
          {
            name: "Class Buff",
            links: Object.values(HeroClassType).map(type => ({
              name: type,
              url: `#/${CLASS_BUFF}/${type}`,
              key: `${CLASS_BUFF}/${type}`
            }))
          }
        ]}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionToProps)(Navigation);
