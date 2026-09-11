import CheckmarkIcon from "../../assets/ui/checkmark-solid.svg?react";
import SunIcon from "../../assets/ui/sun.svg?react";
import SteamIcon from "../../assets/ui/steam.svg?react";
import ControllerIcon from "../../assets/ui/controller.svg?react";
import UserIcon from "../../assets/ui/user.svg?react";
import PlaystationIcon from "../../assets/ui/playstation.svg?react";
import XboxIcon from "../../assets/ui/xbox.svg?react";
import BrushIcon from "../../assets/ui/brush.svg?react";
import SolarisIcon from "../../assets/ui/solaris.svg?react";
import MoonIcon from "../../assets/ui/moon.svg?react";
import { ModalTypes } from "../../types";

type UserSettingsModalProps = {
    setCurrentModalType: React.Dispatch<
        React.SetStateAction<ModalTypes | null>
      >;

      setControllerDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
      setThemeDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;

      setSelectedController: (value: string) => void;
      setSelectedTheme: (value: string) => void;

      selectedController: string;
      selectedTheme: string;

      controllerDropdownOpen: boolean;
      themeDropdownOpen: boolean;
};

export function UserSettingsModal({
    setCurrentModalType,
    setControllerDropdownOpen,
    setThemeDropdownOpen,
    setSelectedController,
    setSelectedTheme,
    selectedController,
    selectedTheme,
    controllerDropdownOpen,
    themeDropdownOpen,
}: UserSettingsModalProps) {
  return (
    <div className="usersettings-container">
      <div className="usersettings-header">
        <div className="usersettings-title">
          <div className="usersettings-title-icon">
            <UserIcon />
          </div>

          <div>
            <h2>User Settings</h2>
            <p>Manage user settings</p>
          </div>
        </div>
      </div>

      <div className="usersettings-section">
        <div className="usersettings-section-title">Settings</div>

        <button
          className="usersettings-container-button"
          data-controller-focus
          data-controller-group="User Settings-modal"
          onClick={() => {
            setCurrentModalType("Setup Steam");
          }}
        >
          <div className="usersettings-button-icon">
            <SteamIcon />
          </div>

          <div className="usersettings-button-content">
            <span>Setup Steam</span>
            <small>Login to steam</small>
          </div>
          <div className="usersettings-button-arrow">›</div>
        </button>

        <div className="usersettings-dropdown">
          <button
            className="usersettings-container-button"
            data-controller-focus
            data-controller-group="User Settings-modal"
            onClick={() => setControllerDropdownOpen((open: boolean) => !open)}
          >
            <div className="usersettings-button-icon">
              <ControllerIcon />
            </div>

            <div className="usersettings-button-content">
              <span>Controller</span>
              <small>{selectedController}</small>
            </div>

            <div
              className={`usersettings-button-arrow ${
                controllerDropdownOpen ? "usersettings-button-arrow-open" : ""
              }`}
            >
              ›
            </div>
          </button>

          {controllerDropdownOpen && (
            <div className="usersettings-dropdown-menu">
              <button
                className="usersettings-dropdown-option"
                data-controller-focus
                data-controller-group="User Settings-modal"
                onClick={() => {
                  setSelectedController("PS4");
                  setControllerDropdownOpen(false);
                }}
              >
                <div className="usersettings-dropdown-icon">
                  <PlaystationIcon />
                </div>

                <div className="usersettings-dropdown-content">
                  <span>PS4</span>
                  <small>PS4 Controller</small>
                </div>

                {selectedController === "PS4" && (
                  <div className="usersettings-dropdown-check">
                    <CheckmarkIcon />
                  </div>
                )}
              </button>

              <button
                className="usersettings-dropdown-option"
                data-controller-focus
                data-controller-group="User Settings-modal"
                onClick={() => {
                  setSelectedController("Xbox");
                  setControllerDropdownOpen(false);
                }}
              >
                <div className="usersettings-dropdown-icon">
                  <XboxIcon />
                </div>

                <div className="usersettings-dropdown-content">
                  <span>Xbox</span>
                  <small>Xbox Controller</small>
                </div>

                {selectedController === "Xbox" && (
                  <div className="usersettings-dropdown-check">
                    <CheckmarkIcon />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="usersettings-dropdown">
          <button
            className="usersettings-container-button"
            data-controller-focus
            data-controller-group="User Settings-modal"
            onClick={() => setThemeDropdownOpen((open: boolean) => !open)}
          >
            <div className="usersettings-button-icon">
              <BrushIcon />
            </div>

            <div className="usersettings-button-content">
              <span>Theme</span>
              <small>{selectedTheme}</small>
            </div>

            <div
              className={`usersettings-button-arrow ${
                themeDropdownOpen ? "usersettings-button-arrow-open" : ""
              }`}
            >
              ›
            </div>
          </button>

          {themeDropdownOpen && (
            <div className="usersettings-dropdown-menu">
              <button
                className="usersettings-dropdown-option"
                data-controller-focus
                data-controller-group="User Settings-modal"
                onClick={() => {
                  setSelectedTheme("Solarized");
                  setThemeDropdownOpen(false);
                }}
              >
                <div className="usersettings-dropdown-icon">
                  <SolarisIcon />
                </div>

                <div className="usersettings-dropdown-content">
                  <span>Solarized</span>
                  <small>Solarized theme</small>
                </div>

                {selectedTheme === "Solarized" && (
                  <div className="usersettings-dropdown-check">
                    <CheckmarkIcon />
                  </div>
                )}
              </button>

              <button
                className="usersettings-dropdown-option"
                data-controller-focus
                data-controller-group="User Settings-modal"
                onClick={() => {
                  setSelectedTheme("Dark");
                  setThemeDropdownOpen(false);
                }}
              >
                <div className="usersettings-dropdown-icon">
                  <MoonIcon />
                </div>

                <div className="usersettings-dropdown-content">
                  <span>Dark</span>
                  <small>Dark theme</small>
                </div>

                {selectedTheme === "Dark" && (
                  <div className="usersettings-dropdown-check">
                    <CheckmarkIcon />
                  </div>
                )}
              </button>

              <button
                className="usersettings-dropdown-option"
                data-controller-focus
                data-controller-group="User Settings-modal"
                onClick={() => {
                  setSelectedTheme("Light");
                  setThemeDropdownOpen(false);
                }}
              >
                <div className="usersettings-dropdown-icon">
                  <SunIcon />
                </div>

                <div className="usersettings-dropdown-content">
                  <span>Light</span>
                  <small>Light theme</small>
                </div>

                {selectedTheme === "Light" && (
                  <div className="usersettings-dropdown-check">
                    <CheckmarkIcon />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
