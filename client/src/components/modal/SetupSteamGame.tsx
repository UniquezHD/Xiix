import SteamIcon from "../../assets/ui/steam.svg?react";
import LoginIcon from "../../assets/ui/login.svg?react";
import { KeyboardType, KeyboardPasswordOutputType } from "../../types";

type SetupSteamGameModalProps = {
  keyboardOutput: string;
  setKeyboardOpen: React.Dispatch<React.SetStateAction<KeyboardType>>;
  keyboardPasswordOutput: KeyboardPasswordOutputType | undefined;
};

export function SetupSteamGameModal({
    keyboardOutput,
    setKeyboardOpen,
    keyboardPasswordOutput,
}: SetupSteamGameModalProps) {
  return (
    <div className="steamsetup-container">
      <div className="steamsetup-header">
        <div className="steamsetup-title">
          <div className="steamsetup-title-icon">
            <SteamIcon />
          </div>

          <div>
            <h2>Steam Setup</h2>
            <p>Login to steam</p>
          </div>
        </div>
      </div>

      <div className="steamsetup-section">
        <div className="steamsetup-section-title">Login</div>

        <input
          className="steamsetup-keyboard-input"
          placeholder="Username"
          value={keyboardOutput}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: false })}
          data-controller-focus
          data-controller-group="Setup Steam-modal"
        />

        <input
          className="steamsetup-keyboard-input"
          placeholder="Password"
          value={keyboardPasswordOutput?.valuePassword}
          onClick={() => setKeyboardOpen({ isOpen: true, isPassword: true })}
          data-controller-focus
          data-controller-group="Setup Steam-modal"
        />

        <button
          className="steamsetup-container-button"
          data-controller-focus
          data-controller-group="Setup Steam-modal"
          onClick={() => {}}
        >
          <div className="steamsetup-button-icon">
            <LoginIcon />
          </div>

          <div className="steamsetup-button-content">
            <span>Login</span>
            <small>Login to steam</small>
          </div>
        </button>
      </div>
    </div>
  );
}
