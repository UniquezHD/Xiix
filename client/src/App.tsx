import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import "./App.css";
import "./css/settings.css";
import "./css/addgame.css";
import "./css/addgamesteam.css";
import "./css/addgameusb.css";
import "./css/volume.css";
import "./css/options.css";
import "./css/systeminfo.css";
import "./css/selecttheme.css";
import "./css/restartservices.css";
import { Grid, Modal, Tooltip } from "@mantine/core";
import { GameData } from "./data/GameData";
import Clock from "./components/Clock";

import { notifications } from "@mantine/notifications";

import Logo from '../src/assets/logo-white.png'

//#region Icons
import SettingsIcon from "./assets/ui/settings.svg?react";
import RestartIcon from "./assets/ui/restart.svg?react";
import EthernetIcon from "./assets/ui/ethernet.svg?react";
import EthernetOffIcon from "./assets/ui/ethernetoff.svg?react";
import VolumeIcon from "./assets/ui/volume.svg?react";
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
// https://allsvgicons.com/
//#endregion

//https://www.koeitecmoamerica.com/manual/rtk8-remake/en/2200.html

import { IoMdSettings } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaVolumeHigh, FaMusic, FaVolumeXmark } from "react-icons/fa6";
import Keyboard from "./components/Keyboard";
import ControllerDiagram from "./components/ControllerDiagram";

type Game = {
  name: string;
  processName: string;
  exePath: string;
  args: string;
  cover: string;
  type: string;
};

type Version = {
  frontend: string;
  backend: string;
};

type StorageInfo = {
  name: string;
  freeSpace: string;
  totalFreeSpace: string;
  SpaceUsed: string;
};

// Todo: add mulighed for at ;ndre lyden p[ alle processes ]
// Todo: add game system via usb

// Todo: XiiX logo som controller
// Todo: language support
// Todo: Select controller type
// Todo: InstallSteamGame()
// Todo: InstallUSBGame()
// Todo: Notification title Mangler Color

// Todo: Add storage amount in system information

function App() {
  const [activeMenuBar, setActiveMenubar] = useState(0);

  const [isFirstBoot, _setIsFirstBoot] = useState(false);
  const [isHeadphones, _setIsHeadphones] = useState(false);
  const [isUsb, _setIsUsb] = useState(false);
  const [isEthernet, setIsEthernet] = useState(true);
  const [isController, setIsController] = useState("disconnected");
  const [isMuted, setIsMuted] = useState(false);

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [controllerDiagram, setControllerDiagram] = useState(false);

  const [version, setVersion] = useState<Version>();
  const [_storageInfo, _setStorageInfo] = useState<StorageInfo>();

  const [keyboardOutput, setKeyboardOutput] = useState("");

  const [usbDir, setUsbDir] = useState<any>();

  const [currentPlaying, setCurrentPlaying] = useState<Game | null>(null);

  const [focusedGame, setFocusedGame] = useState<Game | null>(null);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  type ModalTypes =
    | "Add Game"
    | "Music"
    | "Volume"
    | "Settings"
    | "Options"
    | "Add Steam Game"
    | "Add USB Game"
    | "Theme"
    | "System Information"
    | "Restart Services";

  const [modalOpened, setModalOpened] = useState(false);

  const [currentModelType, setCurrentModalType] =
    useState<ModalTypes | null>("Options");

  const activeControllerGroup = keyboardOpen
    ? "keyboard"
    : modalOpened
      ? currentModelType === "Options"
        ? "game-modal"
        : `${currentModelType}-modal`
      : undefined;

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

  useEffect(() => {
    window.volumeAPI.get().then(setCurrentVolume);

    CheckStatus();
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
      /* setStorageInfo(data); */
      console.log("Storage: ", data);
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

        window.volumeAPI.set(1);
        setCurrentVolume(1);
      } else {
        window.volumeAPI.set(previousVolume);
        setCurrentVolume(previousVolume);
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

    window.volumeAPI.set(amount);
    setCurrentVolume(amount);

    /* Mangler Color title */

    /* m_3feedf16 mantine-Notification-title */
    notifications.show({
      style: { backgroundColor: "var(--app-bg)" },
      color: "var(--app-primary)",
      title: "Success",
      message: `Volume set to ${amount}`,
    });
  };

  const VolumeUp = (amount: number) => {
    const newVolume = Math.min(currentVolume + amount, 100);

    window.volumeAPI.set(newVolume);
    setCurrentVolume(newVolume);
  };

  const VolumeDown = (amount: number) => {
    const newVolume = Math.max(currentVolume - amount, 0);

    window.volumeAPI.set(newVolume);
    setCurrentVolume(newVolume);
  };

  const CloseGame = (processName: string, type: string) => {
    //taskkill /F /IM pcsx2-qt.exe force close emulator

    window.electron.send("close-game", {
      processName,
      type,
    });
  };

 /*  const InstallSteamGame = (id: number) => {
    //steam.exe -applaunch 3527290
  }; */

  const StartGame = (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    type: string,
  ) => {
    if (currentPlaying == null) {
      window.electron.send("start-game", {
        name,
        processName,
        exePath,
        args,
        type,
      });
    } else {
      console.log("other game running");
    }
  };

  const GetUsbDir = () => {
    window.directory.get().then((dir) => {
      setUsbDir(dir);
      console.log(dir);
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

      {controllerDiagram && <ControllerDiagram isController={isController} />}

      {isFirstBoot ? (
        <>
          <div className="boot-screen">
            <img
              className="boot-screen-logo"
              src={Logo}
              alt=""
            />
          </div>
        </>
      ) : (
        <>
          <div className={`top-bar ${activeMenuBar ? "top-bar-expanded" : ""}`}>
            <div className="top-bar-container">
              <div className="top-bar-left">
                <img
                  className="top-bar-logo"
                  src={Logo}
                  alt=""
                />

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
                  <FaPlus />

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
                  <FaMusic />

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
                  <FaVolumeHigh />

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
                  <IoMdSettings />

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
                        <FaVolumeXmark />
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
              {GameData.map((item: Game) => (
                <Grid.Col key={item.name} className="games-grid-col" span={1.5}>
                  <button
                    className="game-container"
                    style={{
                      backgroundImage: `url(${item.cover})`,
                    }}
                    data-controller-focus
                    data-controller-group="games"
                    onClick={() => {
                      StartGame(
                        item.name,
                        item.processName,
                        item.exePath,
                        item.args,
                        item.type,
                      );
                    }}
                    onFocus={() => setFocusedGame(item)}
                  >
                    {currentPlaying?.name === item.name && (
                      <div className="game-container-playing-icon">
                        <div className="wave-effect" />

                        <ControllerIcon /* size={25} */ />
                      </div>
                    )}

                    <div className="game-container-titlebar">{item.name}</div>
                  </button>
                </Grid.Col>
              ))}
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

                      <button
                        className="options-container-button"
                        data-controller-group="game-modal"
                        data-controller-focus
                        onClick={() => {
                          if (!focusedGame) return;

                          CloseGame(focusedGame.processName, focusedGame.type);
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

                        {/* usb data */}

                        <button
                          className="addgameusb-container-button"
                          data-controller-focus
                          data-controller-group="Add USB Game-modal"
                          onClick={() => {}}
                        >
                          <div className="addgameusb-button-icon">
                            <InstallIcon />
                          </div>

                          <div className="addgameusb-button-content">
                            <span>Install</span>
                            <small>Install game</small>
                          </div>
                          <div className="addgameusb-button-arrow">›</div>
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
                          placeholder="Game ID"
                          value={keyboardOutput}
                          onClick={() => setKeyboardOpen(true)}
                          data-controller-focus
                          data-controller-group="Add Steam Game-modal"
                        />
                        <button
                          className="addgamesteam-container-button"
                          data-controller-focus
                          data-controller-group="Add Steam Game-modal"
                          onClick={() => {}}
                        >
                          <div className="addgamesteam-button-icon">
                            <InstallIcon />
                          </div>

                          <div className="addgamesteam-button-content">
                            <span>Install</span>
                            <small>Install game</small>
                          </div>
                          <div className="addgamesteam-button-arrow">›</div>
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

                {currentModelType === "Theme" && (
                  <>
                    <div className="theme-container">
                      <div className="theme-header">
                        <div className="theme-title">
                          <div className="theme-title-icon">
                            <BrushIcon />
                          </div>

                          <div>
                            <h2>Theme</h2>
                            <p>Manage theme</p>
                          </div>
                        </div>
                      </div>

                      <div className="theme-section">
                        <div className="theme-section-title">Themes</div>

                        <button
                          className="theme-container-button"
                          data-controller-focus
                          data-controller-group="Theme-modal"
                          onClick={() => {}}
                        >
                          <div className="theme-button-icon">
                            <SolarisIcon />
                          </div>

                          <div className="theme-button-content">
                            <span>Solarized</span>
                            <small>Sets theme</small>
                          </div>
                        </button>

                        <button
                          className="theme-container-button"
                          data-controller-focus
                          data-controller-group="Theme-modal"
                          onClick={() => {}}
                        >
                          <div className="theme-button-icon">
                            <MoonIcon />
                          </div>

                          <div className="theme-button-content">
                            <span>Dark</span>
                            <small>Sets theme</small>
                          </div>
                        </button>

                        <button
                          className="theme-container-button"
                          data-controller-focus
                          data-controller-group="Theme-modal"
                          onClick={() => {}}
                        >
                          <div className="theme-button-icon">
                            <SunIcon />
                          </div>

                          <div className="theme-button-content">
                            <span>Light</span>
                            <small>Sets theme</small>
                          </div>
                        </button>
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
                              <span>{GameData.length}</span>
                            </li>
                            <li>
                              <span>System Storage</span>{" "}
                              <span>{/* system storage */}</span>
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
                      <div className="settings-section-title">UI</div>

                      <button
                        className="settings-container-button"
                        data-controller-focus
                        data-controller-group="Settings-modal"
                        onClick={() => setCurrentModalType("Theme")}
                      >
                        <div className="settings-button-icon">
                          <BrushIcon />
                        </div>

                        <div className="settings-button-content">
                          <span>Theme</span>
                          <small>Change UI theme</small>
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
