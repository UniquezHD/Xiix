import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import "./App.css";
import "./css/settings.css";
import "./css/addgame.css";
import "./css/addgamesteam.css";
import "./css/volume.css";
import "./css/options.css";
import { Grid, Modal } from "@mantine/core";
import { GameData } from "./data/GameData";
import Clock from "./components/Clock";

//#region Icons
import SettingsIcon from "./assets/ui/settings.svg?react";
import RestartIcon from "./assets/ui/restart.svg?react";
import EthernetIcon from "./assets/ui/ethernet.svg?react";
import VolumeIcon from "./assets/ui/volume.svg?react";
import VolumeUpIcon from "./assets/ui/volumeup.svg?react";
import VolumeDownIcon from "./assets/ui/volumedown.svg?react";
import VolumeMuteIcon from "./assets/ui/volumemute.svg?react";
import CloseIcon from "./assets/ui/close.svg?react";
import PlayIcon from "./assets/ui/play.svg?react";
import WrenchIcon from "./assets/ui/wrench.svg?react";
import ControllerIcon from "./assets/ui/controller.svg?react";
import EditIcon from "./assets/ui/edit.svg?react";
import SteamIcon from "./assets/ui/steam.svg?react";
import USBIcon from "./assets/ui/usb.svg?react";
import GameIcon from "./assets/ui/game.svg?react";
import InstallIcon from "./assets/ui/install.svg?react";
import BrushIcon from "./assets/ui/brush.svg?react";
// https://allsvgicons.com/
//#endregion

import { IoMdSettings } from "react-icons/io";
import { GiConsoleController } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import {
  FaHeadphones,
  FaVolumeHigh,
  FaWifi,
  FaMusic,
  FaVolumeXmark,
} from "react-icons/fa6";
import { BsUsbSymbol } from "react-icons/bs";
import Keyboard from "./components/Keyboard";

type Game = {
  name: string;
  processName: string;
  exePath: string;
  args: string;
  cover: string;
  type: string;
};

// Todo: g'r icon st're og vis title p[ iconet n[r top baren er [bnet ]]]

// Todo: add music icon til topbar
// Todo: add mulighed for at ;ndre lyden p[ alle processes ]
// Todo: add game system via usb

// Todo: skift wifi icon og text til ethernet
// Todo: change icons til .svg icons

function App() {
  const [activeMenuBar, setActiveMenubar] = useState(0);
  const [isHeadphones, setIsHeadphones] = useState(1);
  const [isUsb, setIsUsb] = useState(1);
  const [isEthernet, setIsEthernet] = useState(true);
  const [isController, setIsController] = useState("disconnected");
  const [isMuted, setIsMuted] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [keyboardOutput, setKeyboardOutput] = useState("");

  const [usbDir, setUsbDir] = useState<any>();

  const [currentPlaying, setCurrentPlaying] = useState<Game | null>(null);

  const [focusedGame, setFocusedGame] = useState<Game | null>(null);

  const [isFirstBoot, setIsFirstBoot] = useState(false);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const [modalOpened, setModalOpened] = useState(true);

  type ModalTypes =
    | "Add Game"
    | "Music"
    | "Volume"
    | "Settings"
    | "Options"
    | "Add Steam Game"
    | "Add USB Game";

  const [currentModelType, setCurrentModalType] =
    useState<ModalTypes>("Add Game");

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
      setCurrentModalType(undefined);
    },
  });

  const [previousVolume, setPreviousVolume] = useState(100);

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

  const CheckStatus = () => {
    window.electron.send("check-status", {});
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

  const InstallSteamGame = (id: number) => {
    //steam.exe -applaunch 3527290
  };

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

  useEffect(() => {
    window.volumeAPI.get().then(setCurrentVolume);

    window.electron.on("game-closed", (data) => {
      setCurrentPlaying(null);
      console.log("game-closed:", data);
    });

    window.electron.on("game-started", (data) => {
      setCurrentPlaying(data);
      console.log("Game started:", data);
    });

    window.electron.on("controller-disconnected", (data) => {
      setIsController(data.message);
      console.log("Controller: ", data);
    });

    window.electron.on("controller-connected", (data) => {
      setIsController(data.message);
      console.log("Controller: ", data);
    });

    window.electron.on("ethernet-status", (data) => {
      setIsEthernet(data.status);
      console.log("Wifi: ", data);
    });
  }, []);

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
      {isFirstBoot ? (
        <>
          <div className="boot-screen">
            <img
              className="boot-screen-logo"
              src="src\assets\logo.png"
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
                  src="/src/assets/logo.png"
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
                    GetUsbDir();
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
                  {isController === "connected" && (
                    <div className="status-item">
                      <GiConsoleController />
                    </div>
                  )}

                  {isUsb && (
                    <div className="status-item">
                      <BsUsbSymbol />
                    </div>
                  )}

                  {isHeadphones && (
                    <div className="status-item">
                      <FaHeadphones />
                    </div>
                  )}

                  <div className="volume-status">
                    {isMuted ? (
                      <FaVolumeXmark />
                    ) : (
                      <span>{currentVolume}%</span>
                    )}
                  </div>

                  {isEthernet && (
                    <div className="status-item">
                      <FaWifi />
                    </div>
                  )}
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
              style={{ margin: "0 auto 0" /* background: "#000" */ }}
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

                        <GiConsoleController size={25} />
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

                {currentModelType == "Add Game" && (
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

                {currentModelType == "Add USB Game" && (
                  <>
                    <div className="addgameusb-container">
                      <div className="addgameusb-header">
                        <div className="addgameusb-title">
                          <div className="addgameusb-title-icon">
                            <SteamIcon />
                          </div>

                          <div>
                            <h2>Add USB Game</h2>
                            <p>Install games</p>
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

                {currentModelType == "Add Steam Game" && (
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

                {currentModelType == "Music" && (
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

                {currentModelType == "Volume" && (
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
                      <div className="settings-section-title">System</div>

                      <button
                        className="settings-container-button"
                        data-controller-focus
                        data-controller-group="Settings-modal"
                        onClick={() => setKeyboardOpen(true)}
                      >
                        <div className="settings-button-icon">
                          <BrushIcon />
                        </div>

                        <div className="settings-button-content">
                          <span>Theme</span>
                          <small>Change UI theme</small>
                        </div>
                      </button>

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
                        onClick={() => setKeyboardOpen(true)}
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
                        onClick={() => CheckStatus()}
                      >
                        <div className="settings-button-icon">
                          <RestartIcon />
                        </div>

                        <div className="settings-button-content">
                          <span>Restart Frontend</span>
                          <small>Reload the application interface</small>
                        </div>
                      </button>

                      <button
                        className="settings-container-button"
                        data-controller-focus
                        data-controller-group="Settings-modal"
                        onClick={() => {
                          // RestartBackend();
                        }}
                      >
                        <div className="settings-button-icon">
                          <RestartIcon />
                        </div>

                        <div className="settings-button-content">
                          <span>Restart Backend</span>
                          <small>Restart background services</small>
                        </div>
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
