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
  | "Setup Steam"
  | "Friends";


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

export type KeyboardPasswordOutputType = {
  value: string;
  valuePassword: string;
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

export type FriendListType = {
  friends: FriendType[];
};

export type FriendType = {
  userID: number;
  username: string;
  activity: string;
  profilePicture: string;
  onlineStatus: boolean;
}