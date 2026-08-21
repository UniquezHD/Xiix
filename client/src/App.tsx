import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import "./App.css";
import "./css/settings.css";
import "./css/addgame.css";
import "./css/volume.css";
import "./css/options.css";
import { Grid, Modal } from "@mantine/core";
import { GameData } from "./data/GameData";
import Clock from "./components/Clock";

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

// https://allsvgicons.com/

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
  cover: string;
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

  const [currentPlaying, setCurrentPlaying] = useState<Game | null>(null);

  const [focusedGame, setFocusedGame] = useState<Game | null>(null);

  const [isFirstBoot, setIsFirstBoot] = useState(false);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const [modalOpened, setModalOpened] = useState(true);

  type ModalTypes = "Add Game" | "Music" | "Volume" | "Settings" | "Options";

  const [currentModelType, setCurrentModalType] =
    useState<ModalTypes>("Settings");

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

  const CloseGame = (processName: string) => {
    window.electron.send("close-game", {
      processName,
    });
  };

  const StartGame = (
    name: string,
    processName: string,
    exePath: string,
    args: string = "",
  ) => {
    if (currentPlaying == null) {
      window.electron.send("start-game", {
        name,
        processName,
        exePath,
        args,
      });
    } else {
      console.log("other game running");
    }
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
            console.log("Keyboard:", value);

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
          <div
            className="top-bar"
            style={{ height: activeMenuBar ? "200px" : "50px" }}
          >
            <div className="top-bar-container">
              <div className="top-bar-item">
                <img
                  src="src\assets\logo.png"
                  height={40}
                  style={{ marginTop: ".2rem" }}
                  alt=""
                />
                <span style={{ marginLeft: "1rem" }}>
                  {currentPlaying?.name}
                </span>
              </div>
              <div className="middle-group">
                <div className="top-bar-item">
                  <button
                    data-controller-navigation="topbar"
                    data-controller-group="topbar"
                    className="top-bar-item-btns"
                    onBlur={() => setActiveMenubar(0)}
                    onFocus={() => setActiveMenubar(1)}
                    data-controller-focus
                    onClick={() => {
                      setCurrentModalType("Add Game");
                      setModalOpened(true);
                    }}
                  >
                    <FaPlus style={{ marginTop: ".5rem" }} />
                  </button>
                  <span
                    style={{
                      opacity: activeMenuBar ? "1" : "0",
                      transition: ".5s",
                    }}
                  >
                    {activeMenuBar ? <span>Add Game</span> : <></>}
                  </span>
                </div>
                <div className="top-bar-item">
                  <button
                    data-controller-navigation="topbar"
                    data-controller-group="topbar"
                    className="top-bar-item-btns"
                    onBlur={() => setActiveMenubar(0)}
                    onFocus={() => setActiveMenubar(1)}
                    data-controller-focus
                    onClick={() => {
                      setCurrentModalType("Music");
                      setModalOpened(true);
                    }}
                  >
                    <FaMusic style={{ marginTop: ".5rem" }} />
                  </button>
                  <span
                    style={{
                      opacity: activeMenuBar ? "1" : "0",
                      transition: ".5s",
                    }}
                  >
                    {activeMenuBar ? <span>Music</span> : <></>}
                  </span>
                </div>
                <div className="top-bar-item">
                  <button
                    data-controller-navigation="topbar"
                    data-controller-group="topbar"
                    className="top-bar-item-btns"
                    onBlur={() => setActiveMenubar(0)}
                    onFocus={() => setActiveMenubar(1)}
                    data-controller-focus
                    onClick={() => {
                      setCurrentModalType("Volume");
                      setModalOpened(true);
                    }}
                  >
                    <FaVolumeHigh style={{ marginTop: ".5rem" }} />
                  </button>
                  {activeMenuBar ? <span>Volume</span> : <></>}
                </div>
                <div className="top-bar-item">
                  <button
                    data-controller-navigation="topbar"
                    data-controller-group="topbar"
                    onBlur={() => setActiveMenubar(0)}
                    onFocus={() => setActiveMenubar(1)}
                    className="top-bar-item-btns"
                    data-controller-focus
                    onClick={() => {
                      console.log("yes");
                      setCurrentModalType("Settings");
                      setModalOpened(true);
                    }}
                  >
                    <IoMdSettings style={{ marginTop: ".5rem" }} />
                  </button>
                  {activeMenuBar ? <span>Settings</span> : <></>}
                </div>
              </div>
              <div className="top-bar-item">
                <div className="status-bar">
                  {isController == "connected" ? (
                    <GiConsoleController size={28} />
                  ) : (
                    <></>
                  )}

                  {isUsb ? <BsUsbSymbol size={28} /> : <></>}

                  {isHeadphones ? <FaHeadphones size={25} /> : <></>}

                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: 24,
                      marginTop: "-0.3rem",
                    }}
                  >
                    {isMuted ? (
                      <FaVolumeXmark size={30} style={{ marginTop: ".2rem" }} />
                    ) : (
                      <>{currentVolume}%</>
                    )}
                  </span>

                  {isEthernet ? <FaWifi size={25} /> : <></>}
                </div>
                <Clock />
              </div>
            </div>
          </div>

          <div /* className="games-container-wrapper" */>
            <Grid
              className="games-grid"
              style={{ margin: "0 auto 0" /* background: "#000" */ }}
              rowGap="xl"
              columnGap="lg"
            >
              {GameData.map((item: Game, _i: number) => {
                return (
                  <>
                    <Grid.Col className="games-grid-col" span={1.5}>
                      <button
                        className="game-container"
                        style={{ backgroundImage: `url(${item.cover})` }}
                        data-controller-focus
                        data-controller-group="games"
                        onClick={() => {
                          StartGame(item.name, item.processName, item.exePath);
                        }}
                        onFocus={() => setFocusedGame(item)}
                      >
                        {currentPlaying?.name == item.name ? (
                          <div className="game-container-playing-icon">
                            <div className="wave-effect"></div>
                            <GiConsoleController size={28} />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="game-container-titlebar">
                          {item.name}
                        </div>
                      </button>
                    </Grid.Col>
                  </>
                );
              })}
            </Grid>

            <Modal
              withCloseButton={false}
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
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

                        <span className="options-game-process">
                          {focusedGame?.processName}
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

                          CloseGame(focusedGame.processName);
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
                    <span>Add Game</span>

                    <button
                      data-controller-focus
                      data-controller-group="Add Game-modal"
                      onClick={() => setModalOpened(false)}
                    >
                      Close
                    </button>
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
