import SettingsIcon from "../../assets/ui/settings.svg?react";
import UserIcon from "../../assets/ui/user.svg?react";
import EthernetIcon from "../../assets/ui/ethernet.svg?react";
import ControllerIcon from "../../assets/ui/controller.svg?react";
import InfoIcon from "../../assets/ui/info.svg?react";
import RestartIcon from "../../assets/ui/restart.svg?react";

import type { ModalTypes } from "../../types";

type SettingsModalProps = {

  setCurrentModalType: React.Dispatch<
      React.SetStateAction<ModalTypes | null>
    >;

    CheckStatus: () => void;
    setControllerDiagram: (value: boolean) => void;
};

export function SettingsModal({
  setCurrentModalType,
  CheckStatus,
  setControllerDiagram,
}: SettingsModalProps) {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="settings-title">
          <div className="settings-title-icon">
            <SettingsIcon />
          </div>

          <div>
            <h2>Settings</h2>
            <p>Manage your application</p>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">User Settings</div>

        <button
          className="settings-container-button"
          data-controller-focus
          data-controller-group="Settings-modal"
          onClick={() => setCurrentModalType("User Settings")}
        >
          <div className="settings-button-icon">
            <UserIcon />
          </div>

          <div className="settings-button-content">
            <span>User Settings</span>
            <small>Change User settings</small>
          </div>
          <div className="settings-button-arrow">›</div>
        </button>

        <div className="settings-section-title">Troubleshoot</div>

        <button
          className="settings-container-button"
          data-controller-focus
          data-controller-group="Settings-modal"
          onClick={() => {}}
        >
          <div className="settings-button-icon">
            <EthernetIcon />
          </div>

          <div className="settings-button-content">
            <span>Check Internet</span>
            <small>Test your current network connection</small>
          </div>
        </button>

        <button
          className="settings-container-button"
          data-controller-focus
          data-controller-group="Settings-modal"
          onClick={() => setControllerDiagram(true)}
        >
          <div className="settings-button-icon">
            <ControllerIcon />
          </div>

          <div className="settings-button-content">
            <span>Check Controller</span>
            <small>Test your current controller connection</small>
          </div>
          <div className="settings-button-arrow">›</div>
        </button>

        <button
          className="settings-container-button"
          data-controller-focus
          data-controller-group="Settings-modal"
          onClick={() => {
            CheckStatus();
            setCurrentModalType("System Information");
          }}
        >
          <div className="settings-button-icon">
            <InfoIcon />
          </div>

          <div className="settings-button-content">
            <span>About</span>
            <small>Check system information</small>
          </div>
          <div className="settings-button-arrow">›</div>
        </button>

        <div className="settings-section-title">System</div>

        <button
          className="settings-container-button"
          data-controller-focus
          data-controller-group="Settings-modal"
          onClick={() => {
            setCurrentModalType("Restart Services");
          }}
        >
          <div className="settings-button-icon">
            <RestartIcon />
          </div>

          <div className="settings-button-content">
            <span>Restart</span>
            <small>Restart services</small>
          </div>
          <div className="settings-button-arrow">›</div>
        </button>
      </div>
    </div>
  );
}
