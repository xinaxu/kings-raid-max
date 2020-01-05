import { ArtifactName } from "../../model/artifact";
import { StarLevel } from "../../model/star-effect";
import { CHANGE_ARTIFACT_LEVEL, ArtifactConfigurationAction } from "./types";

export function changeArtifactConfiguration(
  artifactName: ArtifactName,
  newLevel: StarLevel | null
): ArtifactConfigurationAction {
  return {
    type: CHANGE_ARTIFACT_LEVEL,
    payload: {
      artifactName: artifactName,
      newLevel: newLevel
    }
  };
}
