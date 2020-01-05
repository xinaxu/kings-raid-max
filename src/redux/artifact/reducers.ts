import {
  ArtifactConfigurationState,
  ArtifactConfigurationAction,
  CHANGE_ARTIFACT_LEVEL
} from "./types";

export function artifactConfigurationReducer(
  state: ArtifactConfigurationState = {},
  action: ArtifactConfigurationAction
): ArtifactConfigurationState {
  switch (action.type) {
    case CHANGE_ARTIFACT_LEVEL:
      let newState: ArtifactConfigurationState = { ...state };
      newState[action.payload.artifactName] = action.payload.newLevel;
      return newState;
    default:
      return state;
  }
}
