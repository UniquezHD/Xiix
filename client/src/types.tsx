export type ModalTypes =
  | "Add Game"
  | "Music"
  | "Volume"
  | "Settings"
  | "Options"
  | "Add Steam Game"
  | "Add USB Game"
  | "System Information"
  | "Restart Services"
  | "User Settings"
  | "Setup Steam";


export type GameType = {
  name: string;
  processName: string;
  exePath: string;
  args: string;
  cover: string;
  type: string;
  gameID: number;
};

export type KeyboardType = {
  isOpen: boolean;
  isPassword: boolean;
};

export type GameData = {
  games: GameType[];
};

export type VersionType = {
  frontend: string;
  backend: string;
};

export type StorageType = {
  Name: string;
  FreeSpace: string;
  TotalSpace: string;
  SpaceUsed: string;
};

export type SteamGameType = {
  gameName: string;
  gameID: string;
};