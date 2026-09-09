import GameIcon from "../../assets/ui/game.svg?react";
import USBIcon from "../../assets/ui/usb.svg?react";
import SteamIcon from "../../assets/ui/steam.svg?react";

import type { ModalTypes } from "../../types";

type AddGameModalProps = {
  GetUsbDir: () => void;
  setCurrentModalType: React.Dispatch<
    React.SetStateAction<ModalTypes | null>
  >;
};

export function AddGameModal({
  GetUsbDir,
  setCurrentModalType,
}: AddGameModalProps) {
  return (
   <div className="addgame-container">
      <div className="addgame-header">
        <div className="addgame-title">
          <div className="addgame-title-icon">
            <GameIcon />
          </div>

          <div>
            <h2>Add Game</h2>
            <p>Install games</p>
          </div>
        </div>
      </div>

      <div className="addgame-section">
        <div className="addgame-section-title">
          Action
        </div>

        <button
          className="addgame-container-button"
          data-controller-focus
          data-controller-group="Add Game-modal"
          onClick={() => {
            GetUsbDir();
            setCurrentModalType("Add USB Game");
          }}
        >
          <div className="addgame-button-icon">
            <USBIcon />
          </div>

          <div className="addgame-button-content">
            <span>USB</span>
            <small>Install game from USB</small>
          </div>

          <div className="addgame-button-arrow">
            ›
          </div>
        </button>

        <button
          className="addgame-container-button"
          data-controller-focus
          data-controller-group="Add Game-modal"
          onClick={() => {
            setCurrentModalType("Add Steam Game");
          }}
        >
          <div className="addgame-button-icon">
            <SteamIcon />
          </div>

          <div className="addgame-button-content">
            <span>Steam</span>
            <small>Install game from steam</small>
          </div>

          <div className="addgame-button-arrow">
            ›
          </div>
        </button>
      </div>
    </div>
  );
}