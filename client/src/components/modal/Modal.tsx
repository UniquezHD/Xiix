import { Modal } from "@mantine/core";
import { AddGameModal } from "./AddGameModal";
import { OptionsModal } from "./OptionsModal";
import { VolumeModal } from "./VolumeModal";

import { AddUSBGameModalModal } from "./AddUSBGameModal";
import { SettingsModal } from "./SettingsModal";
import { RestartServicesModal } from "./RestartServicesModal";
import { SystemInformationModal } from "./SystemInformationModal";

import type {
  ModalTypes,
  GameType,
  KeyboardType,
  GameData,
  StorageType,
  VersionType,
  SteamGameType,
  KeyboardPasswordOutputType
} from "../../types";
import { AddSteamGameModal } from "./AddSteamGameModal";
import { UserSettingsModal } from "./UserSettingsModal";
import { SetupSteamGameModal } from "./SetupSteamGame";

type GameModalProps = {
  opened: boolean;
  onClose: () => void;

  currentModalType: ModalTypes | null;
  setCurrentModalType: React.Dispatch<React.SetStateAction<ModalTypes | null>>;

  GetUsbDir: () => void;

  /* Options */
  focusedGame: GameType | null;
  currentPlaying: GameType | null;

  CloseGame: (processName: string, type: string) => void;

  StartGame: (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    cover: string,
    type: string,
  ) => void;

  RepairSteamGame: (gameID: number, name: string) => void;

  UninstallGame: (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    cover: string,
    type: string,
    gameID: number,
  ) => void;

  isInstalling: boolean;
  setIsInstalling: (value: boolean) => void;
  /* Options */

  /* Volume */
  isMuted: boolean;

  VolumeSet: (amount: number) => void;

  VolumeUp: (amount: number) => void;

  VolumeDown: (amount: number) => void;

  ToggleMute: () => void;

  keyboardOutput: string;
  setKeyboardOpen: React.Dispatch<React.SetStateAction<KeyboardType>>;
  /* Volume */

  /* Add USB Game */
  InstallGame: (
    name?: string,
    processName?: string,
    exePath?: string,
    args?: string,
    cover?: string,
    type?: string,
    gameID?: number,
  ) => void;

  usbDir: GameType | null;
  /* Add USB Game */

  /* Settings */
  CheckStatus: () => void;
  setControllerDiagram: (value: boolean) => void;
  /* Settings */

  /* System Information */
  isController: string;
  isEthernet: boolean;
  gameData: GameData | null;
  currentVolume: number;
  storageInfo: StorageType | undefined;
  version: VersionType | undefined;
  /* System Information */

  /* Add Steam Game */
  InstallSteamGame: (gameID: number, gameName?: string) => void;
  selectedSteamDBLookup: SteamGameType | null;
  setSteamDBLookupOpen: (value: boolean) => void;
  /* Add Steam Game */

  /* User Settings */
  setControllerDropdownOpen: (open: any) => boolean;
  setThemeDropdownOpen: (open: any) => boolean;

  setSelectedController: (value: string) => void;
  setSelectedTheme: (value: string) => void;

  selectedController: string;
  selectedTheme: string;

  controllerDropdownOpen: boolean;
  themeDropdownOpen: boolean;
  /* User Settings */

  /* Setup Steam */
  keyboardPasswordOutput: KeyboardPasswordOutputType | undefined;
  /* Setup Steam */
};

export function GameModal({
  opened,
  onClose,
  currentModalType,
  setCurrentModalType,

  GetUsbDir,

  /* Options */
  focusedGame,
  currentPlaying,
  CloseGame,
  RepairSteamGame,
  StartGame,
  UninstallGame,
  isInstalling,
  setIsInstalling,
  /* Options */

  /* Volume */
  isMuted,
  VolumeSet,
  VolumeUp,
  VolumeDown,
  ToggleMute,
  keyboardOutput,
  setKeyboardOpen,
  /* Volume */

  /* Add USB Game */
  InstallGame,
  usbDir,
  /* Add USB Game */

  /* Settings */
  CheckStatus,
  setControllerDiagram,
  /* Settings */

  /* System Information */
  isController,
  isEthernet,
  gameData,
  currentVolume,
  storageInfo,
  version,
  /* System Information */

  /* Add Steam Game */
  InstallSteamGame,
  selectedSteamDBLookup,
  setSteamDBLookupOpen,
  /* Add Steam Game */

  /* User Settings */
  setControllerDropdownOpen,
  setThemeDropdownOpen,
  setSelectedController,
  setSelectedTheme,
  selectedController,
  selectedTheme,
  controllerDropdownOpen,
  themeDropdownOpen,
  /* User Settings */
  
  /* Setup Steam */
  keyboardPasswordOutput
  /* Setup Steam */

}: GameModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      title={currentModalType}
      size="600px"
      radius="lg"
      styles={{
        content: {
          background: "var(--app-bg)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.5)",
        },

        header: {
          background: "var(--app-bg)",
          color: "var(--text-primary)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "18px 22px",
        },

        title: {
          fontSize: "1rem",
          fontWeight: 600,
        },

        body: {
          background: "var(--app-bg)",
          padding: "22px",
        },
      }}
    >
      <div className="controller-modal">
        {currentModalType === "Options" && (
          <>
            <OptionsModal
              focusedGame={focusedGame}
              currentPlaying={currentPlaying}
              onClose={onClose}
              CloseGame={CloseGame}
              StartGame={StartGame}
              RepairSteamGame={RepairSteamGame}
              UninstallGame={UninstallGame}
              isInstalling={isInstalling}
              setIsInstalling={setIsInstalling}
            />
          </>
        )}

        {currentModalType === "Add Game" && (
          <AddGameModal
            GetUsbDir={GetUsbDir}
            setCurrentModalType={setCurrentModalType}
          />
        )}

        {currentModalType === "Add USB Game" && (
          <>
            <AddUSBGameModalModal
              InstallGame={InstallGame}
              isInstalling={isInstalling}
              usbDir={usbDir}
            />
          </>
        )}

        {currentModalType === "Add Steam Game" && (
          <>
            <AddSteamGameModal
              InstallSteamGame={InstallSteamGame}
              isInstalling={isInstalling}
              keyboardOutput={keyboardOutput}
              selectedSteamDBLookup={selectedSteamDBLookup}
              setKeyboardOpen={setKeyboardOpen}
              setSteamDBLookupOpen={setSteamDBLookupOpen}
            />
          </>
        )}

        {currentModalType === "Music" && <></>}

        {currentModalType === "Volume" && (
          <>
            <VolumeModal
              ToggleMute={ToggleMute}
              VolumeDown={VolumeDown}
              VolumeSet={VolumeSet}
              VolumeUp={VolumeUp}
              keyboardOutput={keyboardOutput}
              setKeyboardOpen={setKeyboardOpen}
              isMuted={isMuted}
            />
          </>
        )}

        {currentModalType === "Setup Steam" && (
          <>
            <SetupSteamGameModal
              keyboardOutput={keyboardOutput}
              keyboardPasswordOutput={keyboardPasswordOutput}
              setKeyboardOpen={setKeyboardOpen}
            />
          </>
        )}

        {currentModalType === "User Settings" && (
          <>
            <UserSettingsModal
              controllerDropdownOpen={controllerDropdownOpen}
              selectedController={selectedController}
              selectedTheme={selectedTheme}
              setControllerDropdownOpen={setControllerDropdownOpen}
              setCurrentModalType={setCurrentModalType}
              setSelectedController={setSelectedController}
              setSelectedTheme={setSelectedTheme}
              setThemeDropdownOpen={setThemeDropdownOpen}
              themeDropdownOpen={themeDropdownOpen}
            />
          </>
        )}

        {currentModalType === "System Information" && (
          <>
            <SystemInformationModal
              currentVolume={currentVolume}
              gameData={gameData}
              isController={isController}
              isEthernet={isEthernet}
              storageInfo={storageInfo}
              version={version}
            />
          </>
        )}

        {currentModalType === "Restart Services" && (
          <>
            <RestartServicesModal />
          </>
        )}

        {currentModalType === "Settings" && (
          <>
            <SettingsModal
              CheckStatus={CheckStatus}
              setControllerDiagram={setControllerDiagram}
              setCurrentModalType={setCurrentModalType}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
