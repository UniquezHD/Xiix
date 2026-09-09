import VolumeUpIcon from "../../assets/ui/volumeup.svg?react";
import VolumeDownIcon from "../../assets/ui/volumedown.svg?react";
import VolumeMuteIcon from "../../assets/ui/volumemute.svg?react";
import VolumeIcon from "../../assets/ui/volume.svg?react";

import type { KeyboardType } from "../../types";

type VolumeModalProps = {

  isMuted: boolean,

  keyboardOutput: string;
  setKeyboardOpen: React.Dispatch<React.SetStateAction<KeyboardType>>;

  VolumeSet: (
    amount: number,
  ) => void;

  VolumeUp: (
    amount: number,
  ) => void;

  VolumeDown: (
    amount: number,
  ) => void;

  ToggleMute: () => void;
};

export function VolumeModal({
  keyboardOutput,
  setKeyboardOpen,
  VolumeSet,
  ToggleMute,
  isMuted,
  VolumeDown,
  VolumeUp
}: VolumeModalProps) {
  return (
    <div className="volume-container">
      <div className="volume-header">
        <div className="volume-title">
          <div className="volume-title-icon">
            <VolumeIcon />
          </div>

          <div>
            <h2>Volume</h2>
            <p>Manage volume</p>
          </div>
        </div>
      </div>

      <div className="volume-section">
        <div className="volume-section-title">System</div>

        <input
          className="volume-keyboard-input"
          placeholder="Volume"
          value={keyboardOutput}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: false })}
          data-controller-focus
          data-controller-group="Volume-modal"
        />

        <button
          className="volume-container-button"
          data-controller-focus
          data-controller-group="Volume-modal"
          onClick={() => {
            VolumeSet(parseInt(keyboardOutput));
          }}
        >
          <div className="volume-button-icon">
            <VolumeUpIcon />
          </div>

          <div className="volume-button-content">
            <span>Set Volume</span>
            <small>Sets the volume</small>
          </div>
        </button>

        <button
          className="volume-container-button"
          data-controller-focus
          data-controller-group="Volume-modal"
          onClick={() => {
            ToggleMute();
          }}
        >
          <div className="volume-button-icon">
            <VolumeMuteIcon />
          </div>

          <div className="volume-button-content">
            <span>{isMuted ? "Unmute" : "Mute"}</span>
            <small>Toggle system volume</small>
          </div>
        </button>

        <button
          className="volume-container-button"
          data-controller-focus
          data-controller-group="Volume-modal"
          onClick={() => {
            VolumeUp(10);
          }}
        >
          <div className="volume-button-icon">
            <VolumeUpIcon />
          </div>

          <div className="volume-button-content">
            <span>Volume Up</span>
            <small>Turn volume up</small>
          </div>
        </button>

        <button
          className="volume-container-button"
          data-controller-focus
          data-controller-group="Volume-modal"
          onClick={() => {
            VolumeDown(10);
          }}
        >
          <div className="volume-button-icon">
            <VolumeDownIcon />
          </div>

          <div className="volume-button-content">
            <span>Volume Down</span>
            <small>Turn volume down</small>
          </div>
        </button>
      </div>
    </div>
  );
}
