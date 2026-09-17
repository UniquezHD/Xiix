export type GameDataType = {
  name: string;
  processName: string;
  exePath: string;
  args: string;
  cover: string;
  type: string;
  gameID: string;
};

export type VersionType = {
  frontend: string;
  backend: string;
};

export type SteamGameInfoType = {
  gameName: string;
  gameID: string;
};