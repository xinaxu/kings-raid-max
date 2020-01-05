import React from "react";
import {
  Stack,
  Text,
  ITextStyles,
  Image,
  ChoiceGroup,
  IChoiceGroupOption
} from "office-ui-fabric-react";
import { artifacts, ArtifactName } from "../model/artifact";
import { RootState } from "../redux/types";
import { changeArtifactConfiguration } from "../redux/artifact/actions";
import { connect } from "react-redux";
import { Card, ICardSectionStyles } from "@uifabric/react-cards";

const mapStateToProps = (state: RootState) => {
  return {
    artifactConfiguration: state.artifactConfiguration
  };
};

const mapActionToProps = {
  onChangeArtifactConfiguration: changeArtifactConfiguration
};

export type ArtifactConfigurationProps = typeof mapActionToProps &
  ReturnType<typeof mapStateToProps>;

class ArtifactConfiguration extends React.Component<
  ArtifactConfigurationProps
> {
  constructor(props: Readonly<ArtifactConfigurationProps>) {
    super(props);
    this.onChangeArtifactConfiguration = this.onChangeArtifactConfiguration.bind(
      this
    );
  }
  onChangeArtifactConfiguration(
    ev?: React.FormEvent<HTMLInputElement | HTMLElement>,
    option?: IChoiceGroupOption
  ) {
    if (option !== undefined) {
      let keys = option.key.split("/");
      let artifactName = keys[0] as ArtifactName;
      let level = keys[1] === "null" ? null : Number(keys[1]);
      this.props.onChangeArtifactConfiguration(
        artifactName,
        level as 0 | 1 | 2 | 3 | 4 | 5 | null
      );
    }
  }
  render() {
    return (
      <div>
        <h1> Artifact Configuration</h1>
        <Stack wrap horizontal tokens={{ childrenGap: "m", padding: "m" }}>
          {Object.values(ArtifactName).map(artifactName => {
            return (
              <Card key={artifactName} styles={{ root: { width: 200 } }}>
                <Card.Item fill styles={{ root: { height: 50 } }}>
                  <Text variant="xLarge">{artifactName}</Text>
                </Card.Item>
                <Card.Item fill>
                  <Image
                    src={require(`../assets/artifact/${artifactName}.png`)}
                    width={160}
                    height={160}
                  />
                </Card.Item>
                <Card.Item fill>
                  <Text variant="small">
                    {artifacts[artifactName] !== undefined ? artifacts[artifactName]!.description(this.props.artifactConfiguration[artifactName] !== undefined ? this.props.artifactConfiguration[artifactName]! : null).map(desc => {return (
                      <p>
                        {desc}
                      </p>
                    );}) : ""}
                  </Text>
                </Card.Item>
                <Card.Item fill>
                  <ChoiceGroup
                    selectedKey={
                      this.props.artifactConfiguration[artifactName] ===
                        undefined ||
                      this.props.artifactConfiguration[artifactName] === null
                        ? `${artifactName}/null`
                        : `${artifactName}/${this.props.artifactConfiguration[artifactName]}`
                    }
                    onChange={this.onChangeArtifactConfiguration}
                    options={[
                      {
                        key: `${artifactName}/null`,
                        text: "I don't own this artifact",

                      },
                      {
                        key: `${artifactName}/0`,
                        text: "0 star"
                      },
                      {
                        key: `${artifactName}/1`,
                        text: "1 star"
                      },
                      {
                        key: `${artifactName}/2`,
                        text: "2 star"
                      },
                      {
                        key: `${artifactName}/3`,
                        text: "3 star"
                      },
                      {
                        key: `${artifactName}/4`,
                        text: "4 star"
                      },
                      {
                        key: `${artifactName}/5`,
                        text: "5 star"
                      }
                    ]}
                  />
                </Card.Item>
              </Card>
            );
          })}
        </Stack>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(ArtifactConfiguration);
