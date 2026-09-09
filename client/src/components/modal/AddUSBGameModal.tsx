import InstallIcon from "../../assets/ui/install.svg?react";
import LoadingPacman from "../../assets/ui/loading-pacman.svg?react";

import type { GameType } from "../../types";

type AddUSBGameModalModalProps = {
  usbDir: GameType | null;
  isInstalling: boolean;
  
  InstallGame: (
    name?: string,
    processName?: string,
    exePath?: string,
    args?: string,
    cover?: string,
    type?: string,
    gameID?: number
  ) => void;

};

export function AddUSBGameModalModal({
  usbDir,
  isInstalling,
  InstallGame
}: AddUSBGameModalModalProps) {
  return (
    <div className="addgameusb-container">
      <div className="addgameusb-header">
        <div className="addgameusb-title">
          <div className="addgameusb-game">
            <img className="addgameusb-game-cover" src={usbDir?.cover} alt="" />

            <div className="addgameusb-game-info">
              <span className="addgameusb-game-label">GAME</span>

              <h2>{usbDir?.name}</h2>

              <span className="addgameusb-game-type">
                Game type: {usbDir?.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="addgameusb-section">
        <div className="addgameusb-section-title">Action</div>

        <button
          className="addgameusb-container-button"
          data-controller-focus
          data-controller-group="Add USB Game-modal"
          /* disabled={isInstalling} */
          onClick={() => {
            InstallGame(
              usbDir?.name,
              usbDir?.processName,
              usbDir?.exePath,
              usbDir?.args,
              usbDir?.cover,
              usbDir?.type,
              0
            );
          }}
        >
          <div className="addgameusb-button-icon">
            <InstallIcon />
          </div>

          <div className="addgameusb-button-content">
            <span>Install</span>
            <small>Install game</small>
          </div>
          {isInstalling && (
            <>
              <LoadingPacman className="addgameusb-button-loading" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
