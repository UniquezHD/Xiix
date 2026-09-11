import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import { Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import type {
  ModalTypes,
  KeyboardPasswordOutputType,
  GameType,
  KeyboardType,
  GameData,
  StorageType,
  VersionType,
  SteamGameType,
} from "./types";

import Logo from "../src/assets/logo-white.png";

//#region Icons
import SettingsSolidIcon from "./assets/ui/settings-solid.svg?react";
import EthernetIcon from "./assets/ui/ethernet.svg?react";
import EthernetOffIcon from "./assets/ui/ethernetoff.svg?react";
import VolumeSolidIcon from "./assets/ui/volume-solid.svg?react";
import VolumeMuteIcon from "./assets/ui/volumemute.svg?react";
import ControllerIcon from "./assets/ui/controller.svg?react";
import ControllerErrorIcon from "./assets/ui/controllererror.svg?react";
import USBIcon from "./assets/ui/usb.svg?react";
import USBOffIcon from "./assets/ui/usboff.svg?react";
import HeadphonesIcon from "./assets/ui/headphones.svg?react";
import HeadphonesOffIcon from "./assets/ui/headphonesoff.svg?react";
import MusicIcon from "./assets/ui/music.svg?react";
import AddIcon from "./assets/ui/add.svg?react";
import LoadingPacman from "./assets/ui/loading-pacman.svg?react";

// https://allsvgicons.com/
//#endregion

//#region Components
import Clock from "./components/Clock";
import Keyboard from "./components/Keyboard";
import ControllerDiagram from "./components/ControllerDiagram";
import SteamDBLookup from "./components/SteamDBLookup";
import { GameModal } from "./components/modal/Modal";
//#endregion Components

// Todo: add mulighed for at ;ndre lyden p[ alle processes ]
// Todo: add game system via usb

// Todo: XiiX logo som controller
// Todo: language support
// Todo: Select controller type

// Todo: make Modal a component to avoid multiple .css files and duplicate in app.jsx

function App() {
  const [activeMenuBar, setActiveMenubar] = useState(0);

  const [isFirstBoot, _setIsFirstBoot] = useState(false);

  const [isHeadphones, _setIsHeadphones] = useState(false);
  const [isUsb, _setIsUsb] = useState(false);
  const [isEthernet, setIsEthernet] = useState(true);
  const [isController, setIsController] = useState("disconnected");
  const [isMuted, setIsMuted] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const [gameData, setGameData] = useState<GameData | null>(null);

  const [keyboardOpen, setKeyboardOpen] = useState<KeyboardType>({
    isOpen: false,
    isPassword: false,
  });

  const [keyboardOutput, setKeyboardOutput] = useState("");
  const [keyboardPasswordOutput, setKeyboardPasswordOutput] =
    useState<KeyboardPasswordOutputType>();

  const [steamDBLookupOpen, setSteamDBLookupOpen] = useState(false);
  const [selectedSteamDBLookup, setSelectedSteamDBLookup] =
    useState<SteamGameType | null>(null);

  const [controllerDiagram, setControllerDiagram] = useState(false);

  const [version, setVersion] = useState<VersionType>();
  const [storageInfo, setStorageInfo] = useState<StorageType>();

  const [usbDir, setUsbDir] = useState<GameType | null>(null);

  const [currentPlaying, setCurrentPlaying] = useState<GameType | null>(null);

  const [focusedGame, setFocusedGame] = useState<GameType | null>(null);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Solarized");

  const [controllerDropdownOpen, setControllerDropdownOpen] = useState(false);
  const [selectedController, setSelectedController] = useState("PS4");

  const [config, setConfig] = useState<any>();

  const [modalOpened, setModalOpened] = useState(false);

  const [currentModelType, setCurrentModalType] = useState<ModalTypes | null>(
    "Options",
  );

  const ActiveControllerGroup = () => {
    if (steamDBLookupOpen) {
      return "steam-lookup";
    }

    if (keyboardOpen.isOpen) {
      return "keyboard";
    }

    if (modalOpened) {
      if (currentModelType === "Options") {
        return "game-modal";
      } else {
        return `${currentModelType}-modal`;
      }
    }

    return undefined;
  };

  console.log("Active group:", ActiveControllerGroup());

  useControllerNavigation({
    modalOpen: modalOpened,
    activeGroup: ActiveControllerGroup(),
    controllerDiagram: controllerDiagram,

    onOptions: () => {
      if (!modalOpened) {
        setCurrentModalType("Options");
        setModalOpened(true);
      }
    },

    onCloseModal: () => {
      if (keyboardOpen) {
        setKeyboardOpen({ isOpen: false, isPassword: false });
        return;
      }
      setModalOpened(false);
      setCurrentModalType(null);
    },

    onCloseControllerDiagram: () => {
      setControllerDiagram(false);
    },
  });

  const [previousVolume, setPreviousVolume] = useState(100);

  const ShowNotification = (message: string, title: string = "Success") => {
    notifications.show({
      styles: {
        title: {
          color: "var(--app-primary)",
        },
      },
      style: { backgroundColor: "var(--app-bg)" },
      color: "var(--app-primary)",
      title: title,
      message: message,
    });
  };

  useEffect(() => {
    window.electron.volumeAPI.get().then(setCurrentVolume);

    GetConfig();

    CheckStatus();
    GetGames();
  }, []);

  useEffect(() => {
    window.electron.on("get-version", (data) => {
      setVersion(data as VersionType);
      console.log("Version: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("ethernet-status", (data) => {
      setIsEthernet((data as { status: boolean }).status);
      console.log("Internet: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("get-storage", (data) => {
      setStorageInfo(data as StorageType);
      console.log("Storage: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("send-notification", (data) => {
      ShowNotification(
        (data as { message: string }).message,
        (data as { type: string }).type,
      );
    });
  }, []);

  useEffect(() => {
    window.electron.on("controller-connected", (data) => {
      setIsController((data as { message: string }).message);
      console.log("Controller: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("controller-disconnected", (data) => {
      setIsController((data as { message: string }).message);
      console.log("Controller: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("game-started", (data) => {
      setCurrentPlaying(data as GameType);
      console.log("Game started:", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("game-closed", (data) => {
      setCurrentPlaying(null);
      console.log("game-closed:", data);

      ShowNotification("Game closed");
    });
  }, []);

  useEffect(() => {
    window.electron.on("install-steam-game-finished", (data) => {
      console.log("install-steam-game-finished:", data);

      setIsInstalling(false);

      setModalOpened(false);

      ShowNotification("Steam game installed");

      GetGames();
    });
  }, []);

  useEffect(() => {
    window.electron.on("uninstall-steam-game-finished", (data) => {
      console.log("uninstall-steam-game-finished:", data);

      setModalOpened(false);

      ShowNotification("Steam game uninstalled");

      GetGames();
    });
  }, []);

  const GetConfig = () => {
    window.electron.config.get().then((config) => {
      setConfig(config);
      console.log(config);
    });
  };

  const CheckStatus = () => {
    window.electron.send("check-status", {});
  };

  const ToggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;

      if (newMuted) {
        setPreviousVolume(currentVolume);

        window.electron.volumeAPI.set(1);
        setCurrentVolume(1);
        ShowNotification(`Muted`);
      } else {
        window.electron.volumeAPI.set(previousVolume);
        setCurrentVolume(previousVolume);
        ShowNotification(`Unmuted`);
      }

      return newMuted;
    });
  };

  const VolumeSet = (amount: number) => {
    if (amount > 100) {
      amount = 100;
    } else if (amount < 0) {
      amount = 0;
    }

    window.electron.volumeAPI.set(amount);
    setCurrentVolume(amount);

    ShowNotification(`Volume set to ${amount}`);
  };

  const VolumeUp = (amount: number) => {
    const newVolume = Math.min(currentVolume + amount, 100);

    window.electron.volumeAPI.set(newVolume);
    setCurrentVolume(newVolume);

    ShowNotification(`Volume set to ${newVolume}`);
  };

  const VolumeDown = (amount: number) => {
    const newVolume = Math.max(currentVolume - amount, 0);

    window.electron.volumeAPI.set(newVolume);
    setCurrentVolume(newVolume);

    ShowNotification(`Volume set to ${newVolume}`);
  };

  const CloseGame = (processName: string, type: string) => {
    window.electron.send("close-game", {
      processName,
      type,
    });
  };

  const InstallSteamGame = (gameID: number, gameName?: string) => {
    // add steam username and password in settings for first setup

    setIsInstalling(true);

    window.electron.send("install-steam-game", {
      gameID: gameID,
      gameName: gameName,
    });
  };

  const RepairSteamGame = (gameID: number, gameName?: string) => {
    // add steam username and password in settings for first setup

    setIsInstalling(true);

    window.electron.send("repair-steam-game", {
      gameID: gameID,
      gameName: gameName,
    });
  };

  const InstallGame = (
    name?: string,
    processName?: string,
    exePath?: string,
    args?: string,
    cover?: string,
    type?: string,
  ) => {
    window.electron.send("install-game", {
      name,
      processName,
      args,
      exePath,
      cover,
      type,
    });
  };

  const UninstallGame = (
    name?: string,
    processName?: string,
    exePath?: string,
    args?: string,
    cover?: string,
    type?: string,
    gameID?: number,
  ) => {
    window.electron.send("uninstall-game", {
      name,
      processName,
      args,
      exePath,
      cover,
      type,
      gameID,
    });
  };

  const StartGame = (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    cover: string,
    type: string,
  ) => {
    if (currentPlaying == null) {
      window.electron.send("start-game", {
        name,
        processName,
        exePath,
        args,
        cover,
        type,
      });
    } else {
      ShowNotification("Other game running", "Error");
    }
  };

  const GetUsbDir = () => {
    window.electron.directory.get().then((dir) => {
      setUsbDir(dir);
      console.log(dir);
    });
  };

  const GetGames = () => {
    window.electron.gameData.get().then((games) => {
      setGameData(games);
      console.log("Games: ", games);
    });
  };

  return (
    <>
      {keyboardOpen.isOpen && (
        <Keyboard
          isPassword={keyboardOpen.isPassword}
          onSubmit={(value) => {
            if (value.isPassword) {
              setKeyboardPasswordOutput({
                value: value.value,
                valuePassword: value.valuePassword,
              });
            } else {
              setKeyboardOutput(value.value);
            }

            setKeyboardOpen({ isOpen: false, isPassword: false });
          }}
        />
      )}

      {steamDBLookupOpen && (
        <SteamDBLookup
          gameName={keyboardOutput}
          onSubmit={(gameData) => {
            setKeyboardOutput(gameData.gameID);
            setSelectedSteamDBLookup(gameData);
            console.log("Selected Steam game:", gameData);
          }}
          onCancel={() => {
            setSteamDBLookupOpen(false);
          }}
        />
      )}

      {controllerDiagram && <ControllerDiagram isController={isController} />}

      {isFirstBoot ? (
        <>
          <div className="boot-screen">
            <img className="boot-screen-logo" src={Logo} alt="" />
            <LoadingPacman className="boot-screen-loading" />
          </div>
        </>
      ) : (
        <>
          <div className={`top-bar ${activeMenuBar ? "top-bar-expanded" : ""}`}>
            <div className="top-bar-container">
              <div className="top-bar-left">
                <img className="top-bar-logo" src={Logo} alt="" />

                <div className="top-bar-game">
                  <span className="top-bar-game-label">
                    {currentPlaying?.name != undefined ? "NOW PLAYING" : ""}
                  </span>

                  <span className="top-bar-game-name">
                    {currentPlaying?.name}
                  </span>
                </div>
              </div>

              <div className="top-bar-navigation">
                <button
                  data-controller-navigation="topbar"
                  data-controller-group="topbar"
                  data-controller-focus
                  className="top-bar-nav-button"
                  onBlur={() => setActiveMenubar(0)}
                  onFocus={() => setActiveMenubar(1)}
                  onClick={() => {
                    setCurrentModalType("Add Game");
                    setModalOpened(true);
                  }}
                >
                  <AddIcon />

                  <span className="top-bar-nav-label">Add Game</span>
                </button>

                <button
                  data-controller-navigation="topbar"
                  data-controller-group="topbar"
                  data-controller-focus
                  className="top-bar-nav-button"
                  onBlur={() => setActiveMenubar(0)}
                  onFocus={() => setActiveMenubar(1)}
                  onClick={() => {
                    setCurrentModalType("Music");
                    setModalOpened(true);
                  }}
                >
                  <MusicIcon />

                  <span className="top-bar-nav-label">Music</span>
                </button>

                <button
                  data-controller-navigation="topbar"
                  data-controller-group="topbar"
                  data-controller-focus
                  className="top-bar-nav-button"
                  onBlur={() => setActiveMenubar(0)}
                  onFocus={() => setActiveMenubar(1)}
                  onClick={() => {
                    setCurrentModalType("Volume");
                    setModalOpened(true);
                  }}
                >
                  <VolumeSolidIcon />

                  <span className="top-bar-nav-label">Volume</span>
                </button>

                <button
                  data-controller-navigation="topbar"
                  data-controller-group="topbar"
                  data-controller-focus
                  className="top-bar-nav-button"
                  onBlur={() => setActiveMenubar(0)}
                  onFocus={() => setActiveMenubar(1)}
                  onClick={() => {
                    setCurrentModalType("Settings");
                    setModalOpened(true);
                  }}
                >
                  <SettingsSolidIcon />

                  <span className="top-bar-nav-label">Settings</span>
                </button>
              </div>

              <div className="top-bar-right">
                <div className="status-bar">
                  <Tooltip
                    color="var(--app-bg)"
                    label={
                      isController === "connected"
                        ? "Controller Connected"
                        : "Controller Disconnected"
                    }
                    events={{ hover: true, focus: true, touch: false }}
                  >
                    <button
                      data-controller-navigation="topbar"
                      data-controller-group="topbar"
                      data-controller-focus
                      className="status-item"
                    >
                      {isController === "connected" ? (
                        <ControllerIcon />
                      ) : (
                        <ControllerErrorIcon />
                      )}
                    </button>
                  </Tooltip>

                  <Tooltip
                    color="var(--app-bg)"
                    label={isUsb ? "USB Connected" : "USB Disconnected"}
                    events={{ hover: true, focus: true, touch: false }}
                  >
                    <button
                      data-controller-navigation="topbar"
                      data-controller-group="topbar"
                      data-controller-focus
                      className="status-item"
                    >
                      {isUsb ? <USBIcon /> : <USBOffIcon />}
                    </button>
                  </Tooltip>

                  <Tooltip
                    color="var(--app-bg)"
                    label={
                      isHeadphones
                        ? "Headphones Connected"
                        : "Headphones Disconnected"
                    }
                    events={{ hover: true, focus: true, touch: false }}
                  >
                    <button
                      data-controller-navigation="topbar"
                      data-controller-group="topbar"
                      data-controller-focus
                      className="status-item"
                    >
                      {isHeadphones ? (
                        <HeadphonesIcon />
                      ) : (
                        <HeadphonesOffIcon />
                      )}
                    </button>
                  </Tooltip>

                  <Tooltip
                    color="var(--app-bg)"
                    label="System Volume"
                    events={{ hover: true, focus: true, touch: false }}
                  >
                    <button
                      data-controller-navigation="topbar"
                      data-controller-group="topbar"
                      data-controller-focus
                      className="volume-status"
                    >
                      {isMuted ? (
                        <VolumeMuteIcon />
                      ) : (
                        <span>{currentVolume}%</span>
                      )}
                    </button>
                  </Tooltip>

                  <Tooltip
                    color="var(--app-bg)"
                    label={
                      isEthernet
                        ? "Ethernet Connected"
                        : "Ethernet Disconnected"
                    }
                    events={{ hover: true, focus: true, touch: false }}
                  >
                    <button
                      data-controller-navigation="topbar"
                      data-controller-group="topbar"
                      data-controller-focus
                      className="status-item"
                    >
                      {isEthernet ? <EthernetIcon /> : <EthernetOffIcon />}
                    </button>
                  </Tooltip>
                </div>

                <div className="top-bar-clock">
                  <Clock />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`games-grid ${activeMenuBar ? "grid-top-bar-expanded" : ""}`}
            >
              {gameData && gameData.games.length > 0 ? (
                <>
                  {gameData &&
                    gameData.games.map((item: GameType) => (
                      <div key={item.name} className="games-grid-col">
                        <button
                          className="game-container"
                          style={{
                            backgroundImage: `url(${item.cover})`,
                          }}
                          data-controller-focus
                          data-controller-group="games"
                          onContextMenu={() => {
                            setCurrentModalType("Options");
                            setModalOpened(true);
                          }}
                          onClick={() => {
                            StartGame(
                              item.name,
                              item.processName,
                              item.exePath,
                              item.args,
                              item.cover,
                              item.type,
                            );
                          }}
                          onFocus={() => setFocusedGame(item)}
                        >
                          {currentPlaying?.name === item.name && (
                            <div className="game-container-playing-icon">
                              <div className="wave-effect" />

                              <ControllerIcon />
                            </div>
                          )}

                          <div className="game-container-titlebar">
                            {item.name}
                          </div>
                        </button>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className="no-games">
                    <h2>No Games found</h2>
                    <span>
                      Click the <AddIcon /> icon to add games
                    </span>
                  </div>
                </>
              )}
            </div>

            <GameModal
              opened={modalOpened}
              onClose={() => {
                setModalOpened(false);
                setKeyboardOutput("");
              }}
              currentModalType={currentModelType}
              setCurrentModalType={setCurrentModalType}
              GetUsbDir={GetUsbDir}
              /* Options */
              focusedGame={focusedGame}
              currentPlaying={currentPlaying}
              CloseGame={CloseGame}
              StartGame={StartGame}
              RepairSteamGame={RepairSteamGame}
              UninstallGame={UninstallGame}
              isInstalling={isInstalling}
              setIsInstalling={setIsInstalling}
              /* Options */

              /* Volume */
              ToggleMute={ToggleMute}
              VolumeDown={VolumeDown}
              VolumeUp={VolumeUp}
              VolumeSet={VolumeSet}
              isMuted={isMuted}
              keyboardOutput={keyboardOutput}
              setKeyboardOpen={setKeyboardOpen}
              /* Volume */

              /* Add USB Game */
              InstallGame={InstallGame}
              usbDir={usbDir}
              /* Add USB Game */

              /* Settings */
              CheckStatus={CheckStatus}
              setControllerDiagram={setControllerDiagram}
              /* Settings */

              /* System Information */
              currentVolume={currentVolume}
              gameData={gameData}
              isController={isController}
              isEthernet={isEthernet}
              storageInfo={storageInfo}
              version={version}
              /* System Information */

              /* Add Steam Game */
              InstallSteamGame={InstallSteamGame}
              selectedSteamDBLookup={selectedSteamDBLookup}
              setSteamDBLookupOpen={setSteamDBLookupOpen}
              /* Add Steam Game */

              /* User Settings */
              controllerDropdownOpen={controllerDropdownOpen}
              selectedController={selectedController}
              selectedTheme={selectedTheme}
              setControllerDropdownOpen={setControllerDropdownOpen}
              setSelectedController={setSelectedController}
              setSelectedTheme={setSelectedTheme}
              setThemeDropdownOpen={setThemeDropdownOpen}
              themeDropdownOpen={themeDropdownOpen}
              /* User Settings */

              /* User Settings */
              keyboardPasswordOutput={keyboardPasswordOutput}
              /* User Settings */
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;
