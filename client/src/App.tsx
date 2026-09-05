import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import { Grid, Modal, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import Logo from "../src/assets/logo-white.png";

//#region Icons
import SettingsIcon from "./assets/ui/settings.svg?react";
import SettingsSolidIcon from "./assets/ui/settings-solid.svg?react";
import RestartIcon from "./assets/ui/restart.svg?react";
import EthernetIcon from "./assets/ui/ethernet.svg?react";
import EthernetOffIcon from "./assets/ui/ethernetoff.svg?react";
import VolumeIcon from "./assets/ui/volume.svg?react";
import VolumeSolidIcon from "./assets/ui/volume-solid.svg?react";
import VolumeUpIcon from "./assets/ui/volumeup.svg?react";
import VolumeDownIcon from "./assets/ui/volumedown.svg?react";
import VolumeMuteIcon from "./assets/ui/volumemute.svg?react";
import CloseIcon from "./assets/ui/close.svg?react";
import PlayIcon from "./assets/ui/play.svg?react";
import WrenchIcon from "./assets/ui/wrench.svg?react";
import ControllerIcon from "./assets/ui/controller.svg?react";
import ControllerErrorIcon from "./assets/ui/controllererror.svg?react";
import EditIcon from "./assets/ui/edit.svg?react";
import SteamIcon from "./assets/ui/steam.svg?react";
import USBIcon from "./assets/ui/usb.svg?react";
import USBOffIcon from "./assets/ui/usboff.svg?react";
import GameIcon from "./assets/ui/game.svg?react";
import InstallIcon from "./assets/ui/install.svg?react";
import BrushIcon from "./assets/ui/brush.svg?react";
import MoonIcon from "./assets/ui/moon.svg?react";
import SunIcon from "./assets/ui/sun.svg?react";
import SolarisIcon from "./assets/ui/solaris.svg?react";
import InfoIcon from "./assets/ui/info.svg?react";
import HeadphonesIcon from "./assets/ui/headphones.svg?react";
import HeadphonesOffIcon from "./assets/ui/headphonesoff.svg?react";
import ServicesIcon from "./assets/ui/services.svg?react";
import MusicIcon from "./assets/ui/music.svg?react";
import AddIcon from "./assets/ui/add.svg?react";
import UserIcon from "./assets/ui/user.svg?react";
import CheckmarkIcon from "./assets/ui/checkmark-solid.svg?react";
import XboxIcon from "./assets/ui/xbox.svg?react";
import PlaystationIcon from "./assets/ui/playstation.svg?react";
import DeleteIcon from "./assets/ui/delete.svg?react";
import SearchIcon from "./assets/ui/search.svg?react";

import LoadingPacman from "./assets/ui/loading-pacman.svg?react";

// https://allsvgicons.com/
//#endregion

import Clock from "./components/Clock";
import Keyboard from "./components/Keyboard";
import ControllerDiagram from "./components/ControllerDiagram";
import SteamDBLookup from "./components/SteamDBLookup";

type Game = {
  name: string;
  processName: string;
  exePath: string;
  args: string;
  cover: string;
  type: string;
  gameID: string;
};

type GameData = {
  games: Game[];
};

type Version = {
  frontend: string;
  backend: string;
};

type StorageInfo = {
  Name: string;
  FreeSpace: string;
  TotalSpace: string;
  SpaceUsed: string;
};

type SteamGameInfo = {
  gameName: string
  gameID: string
};

// Todo: add mulighed for at ;ndre lyden p[ alle processes ]
// Todo: add game system via usb

// Todo: XiiX logo som controller
// Todo: language support
// Todo: Select controller type

// Todo: add steamdb lookup

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

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [steamDBLookupOpen, setSteamDBLookupOpen] = useState(false);
  const [selectedSteamDBLookup, setSelectedSteamDBLookup] = useState<SteamGameInfo | null>(null);

  const [controllerDiagram, setControllerDiagram] = useState(false);

  const [version, setVersion] = useState<Version>();
  const [storageInfo, setStorageInfo] = useState<StorageInfo>();

  const [keyboardOutput, setKeyboardOutput] = useState("");

  const [usbDir, setUsbDir] = useState<Game>();

  const [currentPlaying, setCurrentPlaying] = useState<Game | null>(null);

  const [focusedGame, setFocusedGame] = useState<Game | null>(null);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Solarized");

  const [controllerDropdownOpen, setControllerDropdownOpen] = useState(false);
  const [selectedController, setSelectedController] = useState("PS4");

  type ModalTypes =
    | "Add Game"
    | "Music"
    | "Volume"
    | "Settings"
    | "Options"
    | "Add Steam Game"
    | "Add USB Game"
    | "System Information"
    | "Restart Services"
    | "User Settings";

  const [modalOpened, setModalOpened] = useState(false);

  const [currentModelType, setCurrentModalType] = useState<ModalTypes | null>(
    "Options",
  );

  const activeControllerGroup = steamDBLookupOpen
    ? "steam-lookup"
    : keyboardOpen
      ? "keyboard"
      : modalOpened
        ? currentModelType === "Options"
          ? "game-modal"
          : `${currentModelType}-modal`
        : undefined;

  console.log("Active group:", activeControllerGroup);

  useControllerNavigation({
    modalOpen: modalOpened,
    activeGroup: activeControllerGroup,
    controllerDiagram: controllerDiagram,

    onOptions: () => {
      if (!modalOpened) {
        setCurrentModalType("Options");
        setModalOpened(true);
      }
    },

    onCloseModal: () => {
      if (keyboardOpen) {
        setKeyboardOpen(false);
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

    CheckStatus();
    GetGames();
  }, []);

  useEffect(() => {
    window.electron.on("get-version", (data) => {
      setVersion(data as Version);
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
      setStorageInfo(data as StorageInfo);
      console.log("Storage: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("game-installed-status", (data) => {
      switch ((data as { message: string }).message) {
        case "success":
          ShowNotification(`Game Installed`);
          GetGames();
          setModalOpened(false);
          break;

        case "failed":
          ShowNotification(`Game Failed to Install`, "Error");
          setModalOpened(false);
          break;

        case "already-exists":
          ShowNotification(`Game Already Installed`, "Error");
          setModalOpened(false);
          break;

        default:
          break;
      }

      console.log("Game installed: ", data);
    });
  }, []);

  useEffect(() => {
    window.electron.on("game-uninstalled-status", (data) => {
      switch ((data as { message: string }).message) {
        case "success":
          ShowNotification(`Game Uninstalled`);
          GetGames();
          setModalOpened(false);
          break;

        case "failed":
          break;
        default:
          break;
      }
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
      setCurrentPlaying(data as Game);
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

      ShowNotification("Steam game installed");

      GetGames();
    });
  }, []);

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
      gameName: gameName
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
    gameID?: string
  ) => {
    window.electron.send("uninstall-game", {
      name,
      processName,
      args,
      exePath,
      cover,
      type,
      gameID
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
      {keyboardOpen && (
        <Keyboard
          onSubmit={(value) => {
            setKeyboardOutput(value);

            setKeyboardOpen(false);
          }}
        />
      )}

      {steamDBLookupOpen && (
        <SteamDBLookup
          gameName={keyboardOutput}
          onSubmit={(gameData) => {
            setKeyboardOutput(gameData.gameID);
            setSelectedSteamDBLookup(gameData)
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
            <Grid
              className={`games-grid ${activeMenuBar ? "grid-top-bar-expanded" : ""}`}
              style={{ margin: "0 auto 0" }}
              rowGap="xl"
              columnGap="lg"
            >
              {gameData && gameData.games.length > 0 ? (
                <>
                  {gameData &&
                    gameData.games.map((item: Game) => (
                      <Grid.Col
                        key={item.name}
                        className="games-grid-col"
                        span={1.5}
                      >
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
                      </Grid.Col>
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
            </Grid>

            <Modal
              withCloseButton={false}
              opened={modalOpened}
              onClose={() => {
                setModalOpened(false);
                setKeyboardOutput("");
              }}
              centered
              title={
                currentModelType == "Options"
                  ? focusedGame?.name
                  : currentModelType
              }
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
                {currentModelType === "Options" && (
                  <div className="options-container">
                    <div className="options-game">
                      <img
                        className="options-game-cover"
                        src={focusedGame?.cover}
                        alt=""
                      />

                      <div className="options-game-info">
                        <span className="options-game-label">GAME</span>

                        <h2>{focusedGame?.name}</h2>

                        <span className="options-game-type">
                          Game type: {focusedGame?.type}
                        </span>
                      </div>
                    </div>

                    <div className="options-section">
                      <div className="options-section-title">Actions</div>

                      {currentPlaying?.name === focusedGame?.name && (
                        <>
                          <button
                            className="options-container-button"
                            data-controller-group="game-modal"
                            data-controller-focus
                            onClick={() => {
                              if (!focusedGame) return;

                              CloseGame(
                                focusedGame.processName,
                                focusedGame.type,
                              );
                              setModalOpened(false);
                            }}
                          >
                            <div className="options-button-icon">
                              <CloseIcon />
                            </div>

                            <div className="options-button-content">
                              <span>Close Game</span>
                              <small>Close this game</small>
                            </div>
                          </button>
                        </>
                      )}

                      <button
                        className="options-container-button"
                        data-controller-group="game-modal"
                        data-controller-focus
                        onClick={() => {
                          if (!focusedGame) return;

                          StartGame(
                            focusedGame.name,
                            focusedGame.processName,
                            focusedGame.exePath,
                            focusedGame.args,
                            focusedGame.cover,
                            focusedGame.type,
                          );

                          setModalOpened(false);
                        }}
                      >
                        <div className="options-button-icon">
                          <PlayIcon />
                        </div>

                        <div className="options-button-content">
                          <span>Start Game</span>
                          <small>Launch this game</small>
                        </div>
                      </button>

                      <button
                        className="options-container-button"
                        data-controller-group="game-modal"
                        data-controller-focus
                        onClick={() => {
                          console.log("Edit game");
                        }}
                      >
                        <div className="options-button-icon">
                          <EditIcon />
                        </div>

                        <div className="options-button-content">
                          <span>Edit</span>
                          <small>Edit game data</small>
                        </div>
                      </button>

                      <button
                        className="options-container-button"
                        data-controller-group="game-modal"
                        data-controller-focus
                        onClick={() => {
                          console.log("Edit game");
                        }}
                      >
                        <div className="options-button-icon">
                          <WrenchIcon />
                        </div>

                        <div className="options-button-content">
                          <span>Mods</span>
                          <small>Manage installed mods</small>
                        </div>
                        <div className="options-button-arrow">›</div>
                      </button>

                      <button
                        className="options-container-button"
                        data-controller-group="game-modal"
                        data-controller-focus
                        onClick={() => {
                          if (!focusedGame) return;

                          UninstallGame(
                            focusedGame.name,
                            focusedGame.processName,
                            focusedGame.exePath,
                            focusedGame.args,
                            focusedGame.cover,
                            focusedGame.type,
                            focusedGame.gameID
                          );

                          setModalOpened(false);
                        }}
                      >
                        <div className="options-button-icon">
                          <DeleteIcon />
                        </div>

                        <div className="options-button-content">
                          <span>Uinstall</span>
                          <small>Uninstall this game</small>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {currentModelType === "Add Game" && (
                  <>
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
                        <div className="addgame-section-title">Action</div>

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
                          <div className="addgame-button-arrow">›</div>
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
                          <div className="addgame-button-arrow">›</div>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentModelType === "Add USB Game" && (
                  <>
                    <div className="addgameusb-container">
                      <div className="addgameusb-header">
                        <div className="addgameusb-title">
                          <div className="addgameusb-game">
                            <img
                              className="addgameusb-game-cover"
                              src={usbDir?.cover}
                              alt=""
                            />

                            <div className="addgameusb-game-info">
                              <span className="addgameusb-game-label">
                                GAME
                              </span>

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
                  </>
                )}

                {currentModelType === "Add Steam Game" && (
                  <>
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
                          onClick={() => setKeyboardOpen(true)}
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
                            InstallSteamGame(parseInt(keyboardOutput), selectedSteamDBLookup?.gameName);
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
                  </>
                )}

                {currentModelType === "Music" && (
                  <>
                    <span>Music</span>

                    <button
                      data-controller-focus
                      data-controller-group="Music-modal"
                      onClick={() => setModalOpened(false)}
                    >
                      Close
                    </button>
                  </>
                )}

                {currentModelType === "Volume" && (
                  <>
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
                          onClick={() => setKeyboardOpen(true)}
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
                  </>
                )}

                {currentModelType === "User Settings" && (
                  <>
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
                        <div className="usersettings-section-title">
                          Settings
                        </div>

                        <div className="usersettings-dropdown">
                          <button
                            className="usersettings-container-button"
                            data-controller-focus
                            data-controller-group="User Settings-modal"
                            onClick={() =>
                              setControllerDropdownOpen((open) => !open)
                            }
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
                                controllerDropdownOpen
                                  ? "usersettings-button-arrow-open"
                                  : ""
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
                            onClick={() =>
                              setThemeDropdownOpen((open) => !open)
                            }
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
                                themeDropdownOpen
                                  ? "usersettings-button-arrow-open"
                                  : ""
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
                  </>
                )}

                {currentModelType === "System Information" && (
                  <>
                    <div className="systeminfo-container">
                      <div className="systeminfo-header">
                        <div className="systeminfo-title">
                          <div className="systeminfo-title-icon">
                            <InfoIcon />
                          </div>

                          <div>
                            <h2>System Information</h2>
                            <p>View System Information</p>
                          </div>
                        </div>
                      </div>

                      <div className="systeminfo-section">
                        <div className="systeminfo-section-title">Info</div>

                        <button
                          style={{ display: "none" }}
                          data-controller-focus
                          data-controller-group="System Information-modal"
                          onClick={() => {}}
                        ></button>

                        <div className="systeminfo-container-info">
                          <ul className="systeminfo-info">
                            <li>
                              <span>Installed Games</span>{" "}
                              <span>{gameData && gameData.games.length}</span>
                            </li>
                            <li>
                              <span>Total System Storage</span>{" "}
                              <span>{storageInfo?.TotalSpace}</span>
                            </li>
                            <li>
                              <span>Space Used</span>{" "}
                              <span>{storageInfo?.SpaceUsed}</span>
                            </li>
                            <li>
                              <span>Free Space</span>{" "}
                              <span>{storageInfo?.FreeSpace}</span>
                            </li>
                            <li>
                              <span>Internet Status</span>{" "}
                              <span>
                                {isEthernet ? "Connected" : "Disconnected"}
                              </span>
                            </li>
                            <li>
                              <span>Controller Status</span>{" "}
                              <span>
                                {isController === "connected"
                                  ? "Connected"
                                  : "Disconnected"}
                              </span>
                            </li>
                            <li>
                              <span>System Volume</span>{" "}
                              <span>{currentVolume}%</span>
                            </li>
                            <li>
                              <span>Frontend Version</span>{" "}
                              <span>{version?.frontend}</span>
                            </li>
                            <li>
                              <span>Backend Version</span>{" "}
                              <span>{version?.backend}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentModelType === "Restart Services" && (
                  <>
                    <div className="restartservices-container">
                      <div className="restartservices-header">
                        <div className="restartservices-title">
                          <div className="restartservices-title-icon">
                            <ServicesIcon />
                          </div>

                          <div>
                            <h2>Restart</h2>
                            <p>Manage Services</p>
                          </div>
                        </div>
                      </div>

                      <div className="restartservices-section">
                        <div className="restartservices-section-title">
                          Services
                        </div>

                        <button
                          className="restartservices-container-button"
                          data-controller-focus
                          data-controller-group="Restart Services-modal"
                          onClick={() => {}}
                        >
                          <div className="restartservices-button-icon">
                            <RestartIcon />
                          </div>

                          <div className="restartservices-button-content">
                            <span>Frontend</span>
                            <small>Restart frontend</small>
                          </div>
                        </button>

                        <button
                          className="restartservices-container-button"
                          data-controller-focus
                          data-controller-group="Restart Services-modal"
                          onClick={() => {}}
                        >
                          <div className="restartservices-button-icon">
                            <RestartIcon />
                          </div>

                          <div className="restartservices-button-content">
                            <span>Backend</span>
                            <small>Restart backend</small>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentModelType === "Settings" && (
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
                      <div className="settings-section-title">
                        User Settings
                      </div>

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
                        onClick={() => setKeyboardOpen(true)}
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
                )}
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default App;
