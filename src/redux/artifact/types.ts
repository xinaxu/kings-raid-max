import { ArtifactName } from "../../model/artifact";
import { StarLevel } from "../../model/star-effect";

export type ArtifactConfigurationState = Partial<Record<ArtifactName, StarLevel | null>>;

export const CHANGE_ARTIFACT_LEVEL = "CHANGE_ARTIFACT_LEVEL";
export type ArtifactConfigurationActionPayload = {
  artifactName: ArtifactName;
  newLevel: StarLevel | null;
};

export type ArtifactConfigurationAction = {
  type: typeof CHANGE_ARTIFACT_LEVEL;
  payload: ArtifactConfigurationActionPayload;
};
