export interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string | null;
}

export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData: any | null;
  abilities: Ability[];
  voiceLine: any | null;
}
