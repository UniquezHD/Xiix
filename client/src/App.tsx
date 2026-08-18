import { useState, useEffect } from "react";
import { useControllerNavigation } from "./hooks/useControllerNavigation";
import "./App.css";
import { Grid, Modal } from "@mantine/core";
import { GameData } from "./data/GameData";
import Clock from "./components/Clock";

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


type Game = {
  name: string;
  processName: string;
  exePath: string;
  cover: string;
};

// Todo: g'r icon st're og vis title p[ iconet n[r top baren er [bnet ]]]

// Todo: add music icon til topbar
// Todo: add mulighed for at ;ndre lyden p[ alle processes ]
// Todo: add ps4 like on-screen keyboard
// Todo: add game system via usb

// Todo: skift wifi icon og text til ethernet

function App() {
  const [activeMenuBar, setActiveMenubar] = useState(0);
  const [isHeadphones, setIsHeadphones] = useState(1);
  const [isUsb, setIsUsb] = useState(1);
  const [isEthernet, setIsEthernet] = useState();
  const [isController, setIsController] = useState("disconnected");
  const [isMuted, setIsMuted] = useState(false);

  const [currentPlaying, setCurrentPlaying] = useState<Game | null>(null);

  const [focusedGame, setFocusedGame] = useState<Game | null>(null);

  const [isFirstBoot, setIsFirstBoot] = useState(false);

  const [currentVolume, setCurrentVolume] = useState<number>(0);

  const [modalOpened, setModalOpened] = useState(false);

  type ModalTypes = "Add Game" | "Music" | "Volume" | "Settings" | "Options";

  const [currentModelType, setCurrentModalType] = useState<ModalTypes>();

  const activeControllerGroup = modalOpened
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
              styles={{
                header: {
                  backgroundColor: "#a8b4ff",
                },
              }}
            >
              <div className="controller-modal">
                {currentModelType == "Options" && (
                  <>
                    <div className="options-container">
                      <div className="options-container-item">
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
                          Close Game
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
                          Start Game
                        </button>
                        <button
                          className="options-container-button"
                          data-controller-group="game-modal"
                          data-controller-focus
                          onClick={() => {
                            console.log("Edit game");
                          }}
                        >
                          Mods
                        </button>
                      </div>
                      <div className="options-container-item">
                        <img
                          style={{
                            border: "2px solid #6f7bd9",
                            borderRadius: "15px",
                          }}
                          src={focusedGame?.cover}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
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
                      <div className="volume-container-item">
                        <span>Current volume: {currentVolume}%</span>
                      </div>
                      <div className="volume-container-item">
                        <button
                          className="volume-container-button"
                          data-controller-focus
                          data-controller-group="Volume-modal"
                          onClick={() => {
                            VolumeUp(10);
                          }}
                        >
                          Volume Up
                        </button>

                        <button
                          className="volume-container-button"
                          data-controller-focus
                          data-controller-group="Volume-modal"
                          onClick={() => {
                            VolumeDown(10);
                          }}
                        >
                          Volume Down
                        </button>

                        <button
                          className="volume-container-button"
                          data-controller-focus
                          data-controller-group="Volume-modal"
                          onClick={() => {
                            ToggleMute();
                          }}
                        >
                          {isMuted ? "Unmute" : "Mute"}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentModelType == "Settings" && (
                  <>
                    <span>Settings</span>

                    <button
                      data-controller-focus
                      data-controller-group="Settings-modal"
                    >
                      Close
                    </button>
                  </>
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
