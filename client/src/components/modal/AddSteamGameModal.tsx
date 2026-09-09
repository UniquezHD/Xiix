import SteamIcon from "../../assets/ui/steam.svg?react";
import SearchIcon from "../../assets/ui/search.svg?react";
import InstallIcon from "../../assets/ui/install.svg?react";
import LoadingPacman from "../../assets/ui/loading-pacman.svg?react";
import { KeyboardType, SteamGameType } from "../../types";

type AddSteamGameModalProps = {
    isInstalling: boolean;
    keyboardOutput: string;
    setKeyboardOpen: React.Dispatch<React.SetStateAction<KeyboardType>>;
    selectedSteamDBLookup: SteamGameType | null;
    setSteamDBLookupOpen: (value: boolean) => void;

    InstallSteamGame: (gameID: number, gameName?: string) => void;

};

export function AddSteamGameModal({
    isInstalling,
    keyboardOutput,
    setKeyboardOpen,
    setSteamDBLookupOpen,
    InstallSteamGame,
    selectedSteamDBLookup,
}: AddSteamGameModalProps) {
  return (
    <div className="addgamesteam-container">
      <div className="addgamesteam-header">
        <div className="addgamesteam-title">
          <div className="addgamesteam-title-icon">
            <SteamIcon />
          </div>

          <div>
            <h2>Add Steam Game</h2>
            <p>Install games</p>
          </div>
        </div>
      </div>

      <div className="addgamesteam-section">
        <div className="addgamesteam-section-title">Action</div>

        <input
          className="addgamesteam-keyboard-input"
          placeholder="AppID or Game title"
          value={keyboardOutput}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: false })}
          data-controller-focus
          data-controller-group="Add Steam Game-modal"
        />

        <button
          className="addgamesteam-container-button"
          data-controller-focus
          data-controller-group="Add Steam Game-modal"
          onClick={() => {
            setSteamDBLookupOpen(true);
          }}
        >
          <div className="addgamesteam-button-icon">
            <SearchIcon />
          </div>

          <div className="addgamesteam-button-content">
            <span>Search</span>
            <small>Search for Steam AppID</small>
          </div>
        </button>

        <button
          className="addgamesteam-container-button"
          data-controller-focus
          data-controller-group="Add Steam Game-modal"
          disabled={isInstalling}
          onClick={() => {
            InstallSteamGame(
              parseInt(keyboardOutput),
              selectedSteamDBLookup?.gameName,
            );
          }}
        >
          <div className="addgamesteam-button-icon">
            <InstallIcon />
          </div>

          <div className="addgamesteam-button-content">
            <span>Install</span>
            <small>Install game</small>
          </div>
          {isInstalling && (
            <>
              <LoadingPacman className="addgamesteam-button-loading" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
