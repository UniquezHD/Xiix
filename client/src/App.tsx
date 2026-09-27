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
import FriendsIcon from "./assets/ui/friends.svg?react";

// https://allsvgicons.com/
//#endregion

//#region Components
import Clock from "./components/Clock";
import Keyboard from "./components/Keyboard";
import ControllerDiagram from "./components/ControllerDiagram";
import SteamDBLookup from "./components/SteamDBLookup";
import { GameModal } from "./components/modal/Modal";
import Friends from "./components/Friends";
//#endregion Components

// Todo: add game system via usb

// Todo: language support

// Todo: Select controller type backend

// Todo: clean up css

// Todo: switch to onClose in all components 

//Todo: fix keyboardPasswordOutput possible undefined

function App() {
  const [activeMenuBar, setActiveMenubar] = useState(0);

  const [isFirstBoot, _setIsFirstBoot] = useState(false);

  const [isHeadphones, _setIsHeadphones] = useState(false);
  const [isUsb, _setIsUsb] = useState(false);
  const [isEthernet, setIsEthernet] = useState(true);
  const [isController, setIsController] = useState("disconnected");
  const [isMuted, setIsMuted] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [gameData, setGameData] = useState<GameData | null>(null);

  const [keyboardOpen, setKeyboardOpen] = useState<KeyboardType>({
    isOpen: false,
    isPassword: false,
  });

  const [friendsOpen, setFriendsOpen] = useState(false);

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
    if (steamDBLookupOpen === true) {
      return "steam-lookup";
    }

    if (friendsOpen === true) {
      return "friends";
    }

    if (keyboardOpen.isOpen === true) {
      return "keyboard";
    }

    if (modalOpened === true) {
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
      if (keyboardOpen.isOpen === true) {
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
    setIsInstalling(true);

    window.electron.send("install-steam-game", {
      gameID: gameID,
      gameName: gameName,
    });
  };

  const RepairSteamGame = (gameID: number, gameName?: string) => {
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
      {friendsOpen && (
        <Friends
          onCancel={() => {
            setFriendsOpen(false);
          }}
        />
      )}

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
                    if (isLoggedIn != true) {
                      setCurrentModalType("Login");
                      setModalOpened(true);
                      return;
                    }
                    setFriendsOpen(true);
                  }}
                >
                  <FriendsIcon />

                  <span className="top-bar-nav-label">Friends</span>
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
                <div>
                  {isLoggedIn && (
                    <img
                      height={50}
                      width={50}
                      className="top-bar-profile-img"
                      src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgAElEQVR4nOy9B7hdV3Uu+s85V9399H501GVLto9l2bJcBbiBA6aZQBKCc50HxAnEufBSHgSUm5v3vpebQAIhjZsbk3AvJE7iEJJLCWBhA+62XGTZ6uX0tvveq8/7jbnWPkWWHQMmPkIZ/pZ3OUtr773mmGOOOcY//gH8h/yH/Iecu8Je7S+wCoSNjIygUCiI0dFRWJalPffccxgdHQ327t2Lffv2BfgxFv5qf4HVIMePH0d3d/d9jzzyyMQTTzwxuWbNmsmxsbFHLMv6BH7MRcM5JLt372Z79+6Vp70nOjs710sZ7ZIyRK1WQ2dnJ7q6ukZrtVpXe3v7ry0sLDTxYyo/9kvA7t271ePHP/5x9lu/9VvYv39/2rKsi33f39bX13eN53l9AC4TgtnNZhOMCQwMDIBzjpmZGXp8Xgixd2Ji4gEhxJPj4+P7ll+blomzWX7sFeALX/iCZVlW56//xq+/ce36tW87dfzUzmazmQmCAIzFPz8MQ3DBwRlHJKMVj61zuGDQhAZN08cty/rOqVOn7vJ9/9vFYvGstg4/lgpw7733ste85jXy1ltvvXRoaOj2b33rW2+bX5gv+J5PA6qWPU3T1ODSo5QSun7m1TAIwuRZvHJICQghyFkk53AhDMPPTE5O/kmpVJrFWSg/dgpwzz33aJOTk1smJyd/50tf+tIb5ufn1chGUaQGXNd1GIZBAwg6yNTTe6QEZxLP89TfXNdV16CDrEfrfCGEtCyz7Hn+H05NTf3BmjVraoVCgZaGs2L3cNY7gbQOk3O3Z88euXPnzi7f9z/5uc997pYTJ05Y9HearSQ02LZtS9u2mWmai+9zHm+EaEBJQU5/bJ2XTqfVIykAKQMdpBxBELBGo1kwTfPja9aseU8ul7uzVCr9y7LJdWbNWiXCzvbB/+QnP6mVSiXkcrlbP/OZz3zia1/7Wi8NEgkNIM12GjzbttXzly0C4BEH40xdp3W0Zj7nDJ7vo9lool6vx34E5yDlymaz/+vZZ5/95VKpNIdVLtrZ7t3T4D/yyCO/95WvfOUXDxw4sOi0LZ/xtM6T0CC1lON04YklaA20gFCOIQ2opmsQmli8Ni0Bgeer53pOV+fQ9pGsAu0kfN//qeE1w9dIyBvLpfKzWMVyVlsAkvvuu++Ld9xxx08mW7Z4bbct2Jat/k4zVs3a5Jey5MnyWc0SU0/n0SMpDB2ZTIYCRNi0aRM2b96M9vZ2NfgTExN49NFHcfToUTXwpFhk6R3XQ6VcVufQNS3LLEmJdz399NNfxSqVeIE7+0SN4qc+9akPTk9Pf7jRaCAIAzK96lju1C06d/+GArBkdpMCkCLRa5rZqVRKBYY6OjqUQtAyQuf4vo9KpQLHcZIBB3RNU0sNfb7rutL3fdswjBtc1/2C4zhVrEI5KxVgz549bHp62v7ABz7wN7lcLrdx40YMDg6qtb5lilvmftECkJAhSAb6xQafhBSABrqlAKRUbW1t6rlhkHJFqNXqKlBUb9QRBmFyjXhbSQoghGDJziE9MDDQPT4+fg9WoZy1uYCrrrpqQ61WG2it7zRDe3p6vj9H7wzSUoblQspEa3trS0ifkcvllMK1LAYpC72mgxSFDlIEEs/zbmj5LKtNzkon8Nprr6UBuGl2djYwDUOLZDzbq7Wqmv0krZl/+v5eQi4uA8ulZQla5r/lC7T2/cmWTwWCOBc00NKyLCY4RzqdQjqdUUpBilAulzE5Oan+ffJvu48ePXoRgCexyuSsVACaTd/5znc6aB22TINGD37go+k0ZRRF7MWCOi8lYRiq7ZxLJt1zwGSEKIzASRGEBmFYSJFT2N+Pbdu2YevWrcoS0Ge1t7fLdevWM1omSAEonTw9Pb24s0jkwv9QgFdQbNvuoSifT1syOvwAbtNlNJA0KKdv91pKQYNK0goBB0GAeqUEo7mAtPSRpoGPAE3E53FpIGXYME0Jr15G9amD+NdHv4l7Qo31bNqGrt5+5HJ5tmbNGkm+QrKTUCamFTeg7+RLP4NVKGelBaAMXEdHR/fy92ggaZ1+sX3+6UKDEgQB/NIMumUTUvroLQhs7jOwud9AyqItpYFUrgN1vQ8lN4/psVN4+JkjCGbLyDIHzqHH8MSRI2q52LVrl5r9dN3ly0lL1q5du27y1CRWm5yVCkAipcxLcscTR7Y1w18Y7GktB2ylJQgCNKoV9GsBBjtSeM8VOrYNcJg2g2EaYJoGYaYgsn1A97VA/mJEfkPefugr7Jl99+LPvl7GiVPzyAVV7Hv8MVxzzTWMfADGGAWf1OC3/Allkbwoj1Uo/Gz1ATjnZzSpp627LyIS1VoNOZ1hoEPDJ2/rw46NFrKFFFLZFExbg5HWoaVSYEYO0HLgVgYi080yQyO47MIufPrnsrh6tB86B+rzM3j0sUcXr95KMp1pR7Ha5KxUgERSfNlot2720uynmX66MxjvCijFa1oW8ibHu28YhhY50G0NUEt3BMlop6B8S5UL4BrFBxiYDECfaBTSyPR24IO39iOb4tBliMcfe1zFIFoZR1oWKFPY+uQwDAtYhXJWKgAhe063AK0b/3IsAK39vb296G6zsHNYRYde/GROuwwzfh75YEFFPRWmie6+Nrz+sl4ISCwsLGBqakr9rbX/f7n+yKspZ6UCPPjggyYQWQrFc9q+vRXTpxmrbICMjziXH09ICtKsG1mDoYEsNDkHxuqQYROIXIAFiMIAvowQRhJ6GIBJF6CBD0qIojjsKziBS1y8+YpOsEwehCcsFhfU9ZPZf7oyqvT0apOz0gnMZrM0+3PL32sBO0heKg5AnjrlDh7+7qNoT0X4nXlSGgaTFnMaPC1+tHUJQyshlXkOdtssbCsHziTgVxH5dXhOGX4wh+miDyuTwnD/GnR39yyGn1th5dUuZ50C3Hnnndpb3vKWbsaEkMmMJiFroOmamvrL8/ataGArPnD11VfJ+++/j0UGUIw0fH02Tu60tm0tS0LKRGHdwfwgtm/Yjr716yUtHU/t38+eefppzM/OKktCtQQfe+s6GIYl6XVrF9K6VkvCMKQYNVttAJGzbglIwB8dp6+xggsaNHa6BWgNPoWIKV9Qq9XYYgzA99VBYd7W81bot6UwNIg0sDSg09PT7NDBg5gYG1MOH51PYpqWOqclLfjZ6buArVu3rrptwVmnACTj4+PtFG+nAaCBb/kBnustDlwrGkivW3F8itSVSkX1nCRahvFbrhAkoVy8jqRrt/7WqNXoXNn6nJZISSHoiNE59L6yAJpQYJREIez9+/evOq+Qn41VPH/2Z3+28cEHH1QD2xK6yZSbX54CViFY318c8JaP8FJ+QpAkfiI/Vozl55Pv0Lr+vyWtZaWFLVytctYpAKFtK5XKtnhPH4FRxA2xBaABD2lZYLFCqBnbaCwqQbFYRL3ehOv6CYoHoFwCYfvooOdhSOf68AIPESKCi7Nk0BklfwgLSDO9tcbTYxjSDOeSDlrnKeNI1xdcyGWgU23r1q2r7n6fdU7g6OgoDcgwDSpBsyioMzE+jqnpSRw+eBDTk+NwnAakF6/jgYoWA6EX4rlaDb2dBQTleUjdgBQCppWCZpq0jYiXgxBwKKcAhnKpjLmZWTz11JPIZvPqerSENBp1VUFEClEul2WlUiHwByPLQSihickJWa/X1evVLqvXNr2EbN++/RHG2A7yA87Pubhm8xB6N+2AW5xBsziL+sQJNJolBJTORQQvIM88gBdIUHGIEpmggNQWUqNthHrth4nZj+JHRlu/ZRIlM9qIE37QzQR2njJAl2l6sWWZczjckGGMt+NUiVGt4adTqdR/Xm31AmedBSBpNpt/zjlfo2la1+u3ZbD7prfDWDeK+swE/OkJ1A59G7WZE3EQiAw5+QNKCWhca5CRByHjii7GQlgaoBlcnc+4BY2T92+AE85PJ7Mfw8B1jUFwF0Ijz1+HJjj0XBd41yiMnh0QZg5C1BCNfQNwnkNUn8d01T3wy3vl63p7z5/dt2+xrHDVyFmpAAcOHPjs6OjoXxay2c2dg2v+R4bNX+b7AXjkQpfxkUvFEcCglSX0aClwIX1HvTaTML1pxreAMoA04IZG6VyKMJISkAK08AMUJ4igafFrw3YBYUCkXfB2CdnZA5id4CyCIcaglSYhvTLMwOp9nzdQe8vH7gpGR0dXXXTorFSAoaGhwUq5/AanWn3TZ/7u8NbvPX0YW7YVETQrqM/Pojo9AR5WoawxZXbIuw9DZbMFM6ALwCQnjksYOoMhAMtg0JIZr55TEsgQSOXaYGYGoJkp6OkMhNsE80vQm3MQUQ2iIWA0TkHUHwJSAyCIIvOaEE0OAzoavmjbNxNee+mll34lwSsuX3Zf9aDQWecDbNiwoX14eHjspptuslVwZmxMBWYsFqDaaKJcLqFWryFIsIEtUbsDWu+TrVmyhIPCu/Rc4xwaOYU6BZQM2KYRKwSXShksoakdh8ldNWqGcvih3jfNDIxcXhWQUGZR1uYQNeaVg/rARIjHSjohmCbS6fSXPc/7e03T7n/wwQfd1aAAZ50FSMKrzQ0bNthdXV1gl1++iAb61Q9/GGMTE+q80/feNPsoDkAH5QMItBElIVvaUVCkkB4ZC6BpIXS95QTGiSaavBTUMcwMdMtCKsn5E7DEb/rwZyuLJWJ0aFohLhPryuLyLR2EEegH8D4p5e1jY2MfAvBprAI56xTg+eefX+jubqs1mo12FWFTKN848ibVYNH+30UYtOr6KRADOA4VdAqIZTX/kgJGag9PAZFIOQ20I6AtomGaSUAp/tyWPi1GGCnityy4Hy4L/8aKFmcEDcPE5GR6ETa+fv1GzTTNeawSOesUgMRxqk/Pzc0N9/f1K0+chG42QbJctxtTU4S9a9X160TqAMuyVWVPLp+DnVoqG6tX62rvrqqLKCcQuAhrZaQzAysijS1RUcLWYCv4SKwEyyFgcXhZQkYRhIjBpxSlfP755zE+Pqlg7atFzkoFqFbrDz/8+N6bt56/VQ18a/ZRXT75ALRlCyIaEPLc4+weDT6VeHV2da64Vkdbh6rwmZ2dhaNKvgQiJlAqldWMjQdbxfpJy9DV1S1LpZLKOJ5JWkpAn0nFqblcjvX398vu7m4WBHFu4tChQ99eDes/yaoLTb4cmZ8vPf3kU9/DQw9/F8eOH0O1WlV+AGX7RGIRWvCvlyOmaS6iiVo1gfmgigFvGkPRPAbDeaSaCwhrle87rk/XdByHEVqILA3Vs3Z1dc2tlkqhs84CvPXW6zsOP1//7szC48ET3/wMr3b08VLDgKencWpiAcXijAr4KAzfssEiBdGM2Bwvl0hG0I2YNYRSvPTvbMvErryGvB6pSiLHl3hqNkSxpqKIixddqQu0u1gimkiUidHOgDKLFLWMS8zq3/jiF78YByNWgZx1CjBynhlddcOY//RRIa7OZdnOwbchyg3h6Yf+BV8Hw67XvQ5/8id3IYooXbv079QWLUnNLhe2rFi0VfVrsRC3XmyBSx+Or8PSOfKHHNz9LLGItUb95RGAUCGK53jwvFrwute3f/FvP3/oC1hFsuqXgLvu2qPddtudSlHfdOP2gcHB6Mrc8MRjGy6osx5NQNN1ZHrXYnTXLRha04u2tpwCfLYsAClCXKsfb9sWq4YJTSSXPmc598+GgoeRnhC97RqGezV0d3Bs7DJha3GG8cxLDM38pdetz2mRRmjZ8hOv+enKzzWbzcNYRbLqLUCzEXXdcnP67Vdtu/2nAexE+mlAc0Gp+lxblwrOKLMLifMGhvDAqWfR19eHU6dOxrH9ZGvWYgVbPF4iBnb9Bg+WBZgGR8RjRPBgZ4ScDiw0aspfWI4VOJO0wCikAHTuL/6yc+m1O93HL9lp/8RjDzVPYpXIqrYA//UjP3vH+nb3CC8ufMrWnJ1MlmCvm0a16cPWOcZT82B2DixwEAUO1uk+3PkJcIyDcgOtSl5V768bEEysYAwRmlBcgLoWDygNWK8tsXstg6FThE/ATnMYloFCVmBdmwW3PL/Ct2ihjpeE4gQxWqiFRvL9BnZcQRgDccEffPayX7njjq5VE4FdtQrw8V9/z09eccma3w99z6YbSmJkAwgUkLF7wI0Is+wYDukPQIYeTTmw+hS2iTr82gIyuXiw6d/S4NJMbDloy+v2ZIL0oYPkpnUBOtISugmYtgBBBSxLQy6tYVNfGqb0Ua/GtQEvJS24GQWgXvvaEB1tN4BhAF2DR970/ve/fdUUiq667BTJ1i0jhTvfe8uXw8Bpo8Ft7cN1G+heexW6Mzeh7DyAQDZQrpwAq3Gk3TSa00fBp56CW3dQ00I0fQZXxXJYzPwpOAzNoOWA6FsYpYipoINq+WvVCnZ1OPjQ9UQAwcF1wvQxME1X/05oGkwEODThotb04HLjjMDPlrQQSlY6wh992AOG62DohRkOt2XF62/bsnb02S9/5d5X3R9YlQrw+ut23HzNNa+5nZ5HXi0GWZocdk8H2jouhy7yqIfH4chJNJs+xucOob/SD784jnppEl26A78pQcFakeWggF6z4alZXq/VFTKY9uRzc3OYnp6C26jh4rYQH71RoqsQU73Q4KvoHhWbaKbyISwd6DAk9o/FvEAO4kKUF1OArm6GP/y5CtZsdeF0UNHJDJg2Ce6dn103tPut60b6Dnzl6/cdwKsoq04B9uzZrd187Rt+rbN340WakYZXn1IzUBe0TjdhtnWo9fvEwj+j7hTBeQqVpovMMQey0YDbKCokUIcWICMkhEt1gD403QM8B16tCadaglctQ2+UsdYO8dbNHL+0m6GnnbaLDELnihuYaxzcsJSjKXQGy+Boy4RYW+CoVTxoxEUUhfBpzVd8AqEqFu3IuXjtaB3/5W0BRtdGKF64BRFfAFgREergvAA7ukTfsnnt5fd997H/OTExE68/r4Ksxl1AlLKt63QzA81Mo2ZkIEKq+w8hIg212glUcQIL1YPq5lNeP51LoxyMgdcpxk8DIZHSBbYUIoxkGBoBUHEl6kEEFvnQNI7OvIWegoXhNo7etgYyGWICWTLnyryr+D49FyoMTK+7oeNKm+PidQIHJwIcm/JRagTgho1MwcZgbzs2DXdgsK2ITOoEAsPATHUeqdQAUkYOTEzANb4E3boSmnPRmg998LZffOfPfmjPq3WzV4032pK9X/3E5Xmj8EBu4GI1CJWZ/WgUj6oqXdq3u9oCnuWfhy8X1OAQoaNPCZo5DdnnbOSOScBxESZg0JaJo3NpgA2DS8tkLEUOns6QzWjK4SOYVwz9IrQvwGjAhQlmpMCEpZYCwIN06+ox9IgBTMIPCGpuQGQ3Ql97I3i6H8ydhDF1F4R2HFHex7eGfJgmfbZAm30J0sYOaPIkrPJvQPMljpwc27Jj9zuefzXu96rbBXzn3qcvoEfavpHYmUEIPQ1BzptuIIMejMr3oz+1CamUhGkFyOQ42oZDyN01FN8YIFqjwzII5QNk0/HRluXoLHB0tQnWmRfIZxhyacICqskNigvVXFr3W7EDDiYMNfhMS5NGAIwyi/E5hkVAUAY7DWTyBsy2Ngg7B6ELaIzwhk2ARZDcQpvVhp62tyGT7kYjeBRV73408BgkLQsAjp2cuOXVut+rbgm4fMemq4RdUChdGUpalGFmh+DWjkHTTQgWQYeBEf4TOGwdhOclRR8WkNYB3u0gWMdg/0sG8mgNukZFo1DQL0odmwT30gj6JcEJ5KnFAUEa8N//toVqZOA163xcOAgMdAikTQ0aoYgI8kvLi9DABeEQKCJINPO0YzAgs230IZDkd8gKuBmC60C1kxJUY9D4fTB5CtAuQxSkYbrXA2EOocblrl0XvwPA774a93vVKYBucGLTWhRF+JzuROAQHb8P3YxZuw2+Ht3ytZg1vw6q8SDEDg10h70Tjr8f3m4bfKwBKvaN0byEAaR4f8vU00xeWgF1IfHbr2/iobEI//KciS88166gYoW2NvQUbAy3Ae+6oIg2gxJGS8KTpULqOSINiIvSQ8oahpBcYjof8w+BDtB7z8KObodWvRERJ4JpHZZpjv78z//MyH//758/jnNZAbadtzZlmtYmTUuDEW6fEjeSgUODlRlEs3JUmWrDSiukzwh/N0JxGLXwmDLlutBgGL2wjHY0+ieB/ByES84cIX2k8uwZ+Q30q4kFhMXlW4rUi+L4jGHXGg9XrCcOAA9N5BDpBkxLqmAQizgQ0CPB+eLtoor/64QXyxDAMHEeXYS8hvlCNxaCcaSzceqQ+AxpzWVuBlHggWs6JI+YEJrI2voNAP78nPYBtm1Zcz7xN9C++3ThegqakfAsqRCvAV3LYhP/ryjo58Mgs05ugwxhaENgtgNZoJLxeMYr2Nf38WsZY0gbEXJ2CHOppHCReGLllyMFSPwEdYYLHoY4agVoVCRqDSpBI62jvwtwb2TxWi35pfe/+814FWRVKUA6bW5VTpeaoi1hamMXSQ7N6oDnxbV7DITStaCJHDZrv4du/XroKu7vqCEyrCqMNdQjQMIwaa1mS7w/Z9j7MOX4Lb2WjDCGHFT0qzJ/ZDrooDrEFSpASYUUkCSNGJn5oApH2lhwK5iYjvDcMeDYRBUCl0NEFyH0c4pRJM4gxpYklcpdeOHWjTFW7VxVgK2bRzYyLiBoX7ZCWsjMeNADnzh7qWBTFWUqU96PX0WKXYpGcD+c6PNg2hjkRg4sle3/YCLD+IiH68zkUzT4wow1i84NyygPr0eqw0GuL95hHJtq4MCpf4YsXYfQWQlZT2Rg1+XbN+BcVYB7792jXbx13S5BN3KZaVSYHMrgRYHi7AlCA77bgO+RcxWCSQrWCLU+t8mb4XgO3KABLWKwNpWBnwZYnwauReBa7AvEtOH0eDqb6LIX5PlThC/yafFW1LEsmbXxbUuuw3UwUoDEOiCsIooEpgoTSKcCDPe14YItPVjXZ0KrXQj/RAqh5yH0YypamQyBrvt478/eugPnqgKcOEH7cT7ANRNc6KeNSqvmn9KsYYze9YkLIITQMou5fVtuVH5twyVAhgWdPMMeQLylDcz8PmNeMhngF+R745DvkpBzYShFULM/clDJMJTcU+qvGu9Am/VWDLS/Dh3Vy5Ui09H6p8sdk1QhewXOVQX4p7/7ek7T2HDsANK6H6oMHg0yZYNVejWg/LoLzw3gNRuxJ61nIZXzpUFDJ3TZBz8E3GAYJr8VIjTh2RVoaVuVgr1ckWqgEp6hyIP0XUjab6oIY2I51PP4HOIQVLuD+jxmoxn4zQg+FaNKDZEkpLEFHggVtwgTyLhKcrEUJNOBiMm0ZW6mlnc4FxUgZVsDNIlpX0x+wKKoGRjfrJBIG0IHQeQrKxD6hNGndLG2OBCaHIrjAloPgvAAoqih9uChKun6PpDYMv7foq+hGANoLx8XkLwQCxiHquFMYz4sIfIAhR6TNNuDF8TcqVydjliZ4t+ra9oaAgvv2bObnXMKcOmOzZsYS4GrHYBERJi6kG4S8fXRI9G9OPCTdm2e7yIIidXDgWS0xqfBuAGbDal7LpiJMBpTXrYfSUjewvKdLlwdS6xiNGaqTly9bimjDJqIQg8yiL/T6Uogg7ry/t3aDBZQU4WpRDVABBWCd0DnHcoiuD7xFcTLQBR6kmoaJLPI2jEuouGff88fd+3Zs7K/8TmhAF3pzrX0KDTiU1QIkMTExhKFROviIwyIyYtg3j58Ssgk5d5cz6jYfVrbEJeFR3VIiscraTlvL31f5Rn+rNZrms6MqGeW4wBPO5nOcxdQjabg+JQwSj5ZNsFgQWeDMXlM4lOQNSMnk6S1FSQxbXMd/h1l1ShAd499gbDTEddtZaoVnIvYOlWxZRDHAtRzMvuhInwIqQbQI4+P1tR4hlsYIc44SBQVNwCNCyNGUTKxLAIn6Jhiioh7h8Qsome4FWRGaIBICdURgileoXhbKMOYDYzIpMirl34TYWUSs+k59d3qPgFIgUqjjLL3rwhYGdKkz2MICX8YSbJsjEna0rrqM2gpu+51OzZQ99NzLhSsG9qweqJmwwunIs0YGnxi/KCDuoRRgWYU0UAQzJvCtxp0SRSCDJw1INGA4esYOQb4sgc1fxLhCyAw7AWf9bKKf0gpSLt4oGa0JGBqdQrzVg3FOaAZAU4aKHQ5aCs8gLbME2jHe+OljRxbtcVsKdjS780XRtpPTZRwzijAbbfdzG+77Q2MV+p9QlicqawbS24U7ZUDRGT26TH0k+ehyveTQoRhDPZU+H+KB8CGqdmIMI0o0rFh6gbk5r6GoN9FMG/DJSWiRBB9eEQsY/RxpBVk3snyxFbhxXSAvHcV7UuqktVGISCPj7iGfUTzDcwdBmoUms4DWopK0CN4C2uQKpOJJ2WNwJVjGVcVk1VSkUEp0dMhzn/dDbcF58wScPx4HXv3zkrGec9LnUcml7Z9sXVo7QpIOWKehdgC0MASA0gbIrhIu9Sn6SZE2iZoehH5dRaIGYYto5hdEkIRt7qH4uWLsgREPVNTA7il1IMbbeCdmTQ2redYvxa4aNMA1mTOV5ZL/RNSWKXQBF1vbS3j72QYRjv+HeVVV4C9e/dGzzzxzX4ujAJV+bSqeWiQaabTzVEOoFr3aRsYxwPI/IYRvfYRqjp/OpcicRw5Ywi+J5Hd3wSbeQpB7lpE+hDs9hqsziwoHCDUzEO8NYyj/YtRudjBp6we8b3wJMhDX0V9H0UKqnwIwiuEHNJ1wHyijuPISA+bTBMb0ikMpW0QpRAFqzqHNyh0UWuJU8NNvm5cfrjU0UTTus4pBSCxDUNx/55erdPat9Nj5JO59xWhg5p0pBiSyrk85bApJzCZuqbsg/QA88Q8oumHENqbEFoXIkxdjPyAobB9LyVsxdc4ffdAs7VloZPrkFNIgaPqKUh3RgFJNbsdZijU6iClA9teD80+g2VfDC8vfsaKXkjnhAJAmIP0QCFgmkVqm9eNSz4AACAASURBVEQzWpVX0daPZrqr9uGRDFRePaJaez92pGhpiGg6kmawEBl5EfisQDhbRdSYg1udQ9D0EHT9HITJkWpLMjRMJWdVfo9TVK6lcMvGmxxLii/EPIJq1Y7/QNgAun3KiQgROfPw5w5IwgYwO4+o/RLwXJ+KBaguZHoedp5UPLY1CQ6J1iNqRZLkHUKClLG//MtPaueWAiTc/wp9+yKiombL4gJLbeCSdbRVrMk4LJyPgnUjXNdB07Uhj9wNWT4I1A4hisqqQcTLFZlEApfeSLaF6vnS28H4o+obccIFWhloA2+BpfepwScl9nASIrt40SUtSzKNy6VcZufOLuATn/i/TSPyOlVal3CAy3r+KUcvalkA2gLSvj6OCmoK/aHOivfkRAyR3ExyALV1OdR6OhB51BhgGtJqwjr6RRgpHXZaR1CjNHLixZ9hEFoSfy9qGxMvNcm7y5xRDr9YROTWGNUpCtMC77wEPJoFQ50AynCJqzg8BGZkoKKdBEVr9ThSDswSNs2CP7h+uINKx0rnhAXI5Qw2NNgdWwDaxiX3hrZKrZpAEnodB0uWGjK23m9F1OiPjBIrZNLhwHzTpWjMHkajWkUkqacfENRLsLqm0H5BF8zOHmiE3llc088gCjYmlkK/lHdY5iREvBfe/GGA4ONWFszIgvW9Dpj634jcCpwaUKlVUG7+E5rusiKglevMsqdMt+z0GQEDP5YK8PM//zuOFfh9dJMpEaRuc8L5Q6L691CUjbaBYSstHD9SeZYKqiRpW1X0reDbQs3NqDArU29ZD08aKC80FJrIE8PwzCug6TPIDpWRXrcOBnEDwld+wKJQ2TmoGMRIso2xMBkRTJVgwohEDxoTxxBGFqTRqSDhfPBGRLUTCOpj0MoOiK/q6QMunjhYhnPy/KXLE+9gAj9vRTEToTLE1mLx468Ay0U5gMvlZXD8LEbUYuiI+klBVFXsYGBT8LfsBzYTINREGJiQIUOAPnjdvxrjB7PPIbN1DYyOEYgzWQLKTgpaAuh6ZF2WvlMUZtGcLSLghdgiiSxkahhs7O8oNIju+UhhEuenAP+pnUDlDPAk5fS+en0kXnUf4N49e7RSreinTA1hd7RYyUOzXM3sRMgSqJDrMu4+dZ7q6RGqhtHkC5AFCEMHs+XnWVd+c4ze73HAD0uIhgZGDaJmngLsAUT9e6BPfhrM2Y/Umi0QuZ3wxh5JLAzRh9pxUYiwIPRIwrbB+DpGeX/WnIbvaPCa1HAqgCtCRS3LD/8ZWPM4k9KCb9QxuIWjv9aLwcnzJReq+Uhs3QhBzMkKCOo0gldLXnULcII2UQ1RPPXoA6jNHn3R81Z4+qf/rZVVo60aRQOZjvniM6g5NaRwA1jnGlSqTZQrJTg1B27TV4zeYekkvKHfhDS2I2yegtm2H9bm3cpaKD+NnL9UH3jnKFDYxmB0MO6fgGg8Am4cRib/FPq2pyEjF04thFv14M+fhE9U8W4TR7YFaO+U6OshlNNK32FFaOFctgBUCTHcYIed8TE89g9/id2/sBGasQSOVbNRzX5ywmMTvaJXT0Szn3IDIQvcBjTagsk2NAMNx2cfwIzxEIJTgF4SyFTrkG4Thfa02ikYx74GndLKA3dAn/hjyOYJGOZesM2vhXv8CVXggflvgs858Q6AOaDlP7KGoOXWgjUOy3xvg1m923Ds/kfQKDchA2IUZzhxoYt6LgThmzQzBFuEuSnNih9aS55aBuKnURSxfY9/T54zCvDkN74RnX/J8CkHEjMHnsOz37wbF9z0M2c488z5/JjwaeU2TpMFmOEImu4RhG6E+piEoZpFMPiBp0gk20Q7wrABHP8KQPUGbW+EqD4CiVlo+B48j7qOVBE3E9CoXz2gDQEdlwGD70ZUfwKcm3B73w5t6rOqCmhqwkehEyidF2B2TQjFDU6iGk0S9fRSdHPlT1tpAb72wPTLD1ScTfwAI4UCu/P9Dtu9HWyD3X/hn95+0UeuaTv124Xw4Ie7eE10ZzWY9TKsoY3gdl6FeX23hsBrwndqKuLXwgqo0i7GVQ9g007D0CwwnYgcyNlrgqWOIZ0tIp/uRnlhAQuPR4gMQuMw+HWJyK1Dt3qpug/hwneBQEAE04gG3gNWPw5negqhSANmO5hZAMwBiY5rgP5bmKw+DzlxD6QoqLxSOPl3KC4Q7DvAwZEAC9sjUBc5WpEo6qyzPvDpzTFrKXEVabp61I0UNJ2QTFqS1YygubNyYP6r2T/9pcp3Hzzk+sfjbrRnvwLsHhnho46Dj/7/0ljvXrDn4guu+At//siVojHfJ8NABAGHW5xD/dQYguosshe9TilA4DXgu3X4blVl/uJ2sFLV+RH3n2VbsFJZGEZKVQ/pegZhUEOD74OdXgeTDaBuPYMT40A4QckWwgZE8BoR3HoJgmDlwgYrP4OgMQnhTCIyt8CZmkUoUqpsjPEMWOcok/ltTO3vT34RqE9CNiYQzd6PwPUxWZa4Lw2kLwJyXbHRoDpEik/xKA82tUkRUQtdW6x0XlQAFdeIeYl5WJfb9b/Y1UDHjp+6OvrH+/ddGJxamJBn/RKw9/jx6OJ1XX3T+279cmrnWy8R80eheWWV1w8CAdR8CKMOrjcx/9gDyFy9D2ZPXEIVr5Ut2NSKLUCM7CHsACF2CL2bROuCqAEe2TBTg+joyKDntTUcLgN9U4BIRygyiWaRiKdn0NXQUMgx2D4D/KdRe+4Z1B0LmQwRS6aB5gT0GtHQ/z0Yi/P4cR+KBJMYAvnhHNYNVlRBaeADtQYDkZJQdMJsMhQ8V2qapXYrcUVQvP6Tcxgt1hpKaOG8QEpDG4rXT1UH//q7hx5584+FBaDB/8JHf/Je+8JbLqBUbvTM3cDCIRX8oWYedES+C99pInAiePUqcuftQBAFL2kBqNWLRUuARRwCOnSzoCxAmd0Pj08ibWwGcBKhXECD6jePWwgWAhgUFRQRak2JZlP1llEpYN+VOH7Mg+fW1W4gTkip4j6EHuXxJXwXcBoBPIe+G4Mw2xH0rsFxYwo1B2gG1DyKgYjH6qFEfuZyGH4Omm4xQa3l6XtSxtCwoVvZZZgAQHfHYTefViQUGb2y5ZLRDvaFf63uPWstwJ7du/mVlxmDI+u7vpHZesvGgJgVTnwXYX1K8fRJn5ozSIS6hEtFHloZTIQoPfkQOq6bQJjKJAGhlRZA4QLCGEjRig6q9wnAqVrERGh4s2gPI+h8HfL5wxgYBoxtbWg+XoRXd0DYTUbXMSNQD6ly0UUt0FRdQdamDgI1+NmYKs5THECA7wXK4qiuISZHoS8Ho+sC+M4EHIuhWpYg0hBuEHkFkGIWrGInpJ7UAhLq4IxNY+LfpssGwGmXYgByDm88P/r4Zz+8+am3XhN98zP3FNyP/eUjzlmlAFddHWZ6e7J3ZUZv2why1GYPIZh/NqmOWTLnCnehGWBE3qiF4L6P0sPfQObqmxXo48V2ASpH0Hq+zJt2wxCNYB5B7igE61BsIfk8wNo99HYV4Od9lOoNNKuhStg0fSKZiJ20+UpNzXyFLvZ9VVhqJmgesgBmiqPQpaPQlYOW6VAm3A670KkfRNkKiScCqRzQRpsLcganiILkRQKbi8oQ/5FLD5HWDcl1yRSCtIqfvab+2b9/1BjeuM56xS32j1wB8oX2z7Zd/K5rKeEl61OIyuMIiydiEIUy5RKR4mBi0C2dtkuQ8JQHXTnwJDKXvzbOBCapXiJ5ivP2CclzAu6Iu3sug5HXMihFNUzZ/4i29Fp1tqEx9JQEGBmVyEZHIQXGY7bwlEnXCeB4HOkTBqbHF1DxIvCAuH0YeJoj12Eg324hlbFgZagekPwTX/EPQOvEZqMP7vCYUjbThqKVswwH+qBAY5yYymOc43JRE4H8l+S1iBiQvR7S6mWs/FVE0X3QhNN+zTrj3sMTzo0A6meNAvz+L772d/svf/fbpVmQVDKF6hTC+ecQedXEAjCMlSUKVuItE3mDTuHWhgqahcUJ+AuzkLaVYO9e2Ld3uQVYLhztaj0GyyFlXAtdO6h4HPSLczC+0wCtHozJmD1ECxQ9HIlhRNh6vo1Nm4bj3j+pHLRUO1JpQ+H+dF4Dl05cJ7BCHDjdWbQRUJiaTSkaGvqFOsyMhcaKesLlssQ6rjCN3gxA+Bi9GzJ7LVjzAOCPoyPbuPR75ZHfAXBHV1cXm52dlas6FPyZX3vHB3Zc844PeTzP9eas0GrTKE8cRX36ODXxUzP/m8ck/vopgCaTYvEiZk4jRWx7iAjbzyQa44cAvxFHA1txdBJVZBHjBs8US2/P9IDqQeuNBTTcCWjsQhi6RHDBJIyBLuhGBMOkzp/kTMbUMfSoG1z1EiTKt7b+QeSGLkRmZCdExybouTy46h5FWULaHrK4ro8xlPslKtrBmGFMLWfESSRgm9dAK1Cmc+Vci8vaW1XGJDEyWDglyPJTCmks9WFIbQgcJqyUj8vPP/ILY3ev/4X/9pErX7Gl4EeiAH/0vst+8qKdb/jDfOcIPz5fQnG6iBNjU5DFp5HWa6i5wO9+B3hkDPjAZTE6K+bsATSLFuqlsKkzfmpFx+4z5QIUePQ0ocAQzcRqXaLqPAFEO8CYDYg6okGigqP9f7xXX16KqN4jgkhFEmmCU3zBsMDNXMwDoFLDy28bV3DwQ+1PolgKMbcATM0CE1MS8+UIbngcZf9bqnnEme/WaW9HHnjzlGSNo5DchDTXQ/I4NN6eI4RT5hON6cx5WK1LwJc+suOK0V3v+sPU4Bo2PTOL8bkaeo0F9IbPolgr4X8eDPCNI8CtWySu30hwKToIBUQhM5phEgHtr2kthER5dh6FyIWnQKBxJlBh8mn/vzInkOQNFHBUMpZSd7zpMCzUpsDZ/4BNuA7qJ9Q8BVvxEEB1+qRJqChfGXnoZE08tT0lrJ8myKbHyw/TDHBPQYqXUQuEKmXsnCijWIrxf34ANAQwnZVY6DmCPrEDeuhLoRGOgHyZJY0jLICKbNJ/RIhZn4UMi0xW9iNMbYMQA2AyB4QlOFMWjozVrf+085tfvububbsO7++c/YO9e8O9e3/w/kOvqAJcuK594+iun/4HY+CinkatilRYAa/N4hP7DqN48Lj6lpcPAp98PZDR4pnfMoGBHyDwy6jMTiJQ1G9CFVg2FjwFAF3KBCbu9PLWb2fwAwSL2cSUJx/Eg6J+bCghSmcyfGHS8CG2PlQ+ppBCIZWeuXF9oArYrCwMJdIIGr7ttUswn/ku3HqoLA/ZJPrMUglo18zkqi+W5Uy+s1tCVHpShYa52CdZ29XMidpQqXJ02AbaByroc/LUEm9NwQw+nR/BOz9+B0Hrf/Ax+6EV4C3XXSd2b+3id/3Tv/T8zcfe/iV9y3U9bPY4WG0aZlDE+LFDeP/gM+B9PnIUV1FFHDT4MTOXgmm5RO5cV0TOftOFF1FgKEKlqWPBbWBjvQ5mxhRsygqoO6cg+rEf0CKRUIkhiuiQYaa+f7FfQRRwhPxloZTS5UzM0wyklm5Le3JNFQmSM+pIKhzgymQ3wP0FgHAECMCDCiSVm7OYoib+GmRWQqRFH84rD+Ip+wRM0hu6swn7aNjk0HjElncUSfoYJJqcKHdzDmGjqZjKo/Jhxse+gEzntfj1f0xhx1AaN1wMPHAsRKRHGF238LbHTzY/9qaP4WOvqg+we0uBm94J3L3nXV8qXPQzGyO3iaixAC2sYP/BI8i5R9FpB2rwVwph/clc08004ToOXD9U3rm6F01goqyj6kbwqZmTqtKNAzDqXydLgAoIJRYgBl0vWQOWeONa0jySRJ80wVQb4WQGk/NnS4j2CFpPCK0/YPpIwLQ1PrT+BsSAB9ErIbpT4DkdnOjIEPcdXk44QdSya4P1yNHSkQLIlcm1AdkswBsxfPwFiKfkPizej/ocQodDUrGJ10Q0/wC8U5/Fb950FMfmBG79RA+eOKpjvhJf5407/N/80Lv6b/phxu+HtgCN0nPiqsvWfza37R3bpVtWVbJRbRZR9Si+/PAhvO+8Yly4sQiDjitxqNKHnL1I2HCKxxXGP/AknKZEoyllscbYgjSR0Ri8chlWPhvn5JNWP3QzVe2giq7FMQCyD0nVHzSmQxgMtkn1+XE5GBV5dzybhp53YQ0GUvQ40PM+YEYK+0n/NEbsEu9QUV0nimJKf2HQkkCRQxNomAjnUohm8tDKNIl9UKNSzcqiN98NWOMQOSK9YNB5F5rTTFWLxqRWCgdIMKaYlixJZVMP47C2AIesBWUmTQFG3z2YhG5IfOj6Cj50A+1jgadPGjg0zrCx38VvvzP/e7uv3v3dN96xt/qqKMBVF234i5HLb39HQEUbjaJkQcCi+iS++thRrLeqyJhxKfSSsNhRi3RVyOmWTsFzfbgeNWQK0XAk6k1gxk/BZzos4QMJB8AZwTSLE6hVRdSyBpra49M7yinzgP6FLNq3lcFzgWo+ATLJ8YRedkFF3AMJoqsdAdO3gvGtkCyNEFVw/hhY4WGItilom2Yg62vhH0wBJVXUgTDjqQAQgYlMQ0d/5hdxIv8I4CQW4LRq4KXbQtnQIq06qmW98DmMkEFa5A8ECJwmhBGCmyYuXOvgz7+excb+ALburb+y78Qv/KBUsz/UEvC5X7n+/9l45Xt+KhBpLWwsIHLKTM4fwMLYfty7fwE3b2ooRu0V3bmovYuw1B1qlI7BbTRVfJ24cyoVSs4ApaZgJTOreIGJ1Zu7jcUbF+8ElpDBdHHiD1AYvhgQlvwwDk0KVMrA2BgwfQgoyCq8jK+sRuhLRs1IfBfMb4IFHkPoMgRuhMDx4TUrCJpHETSeQ+A8i8g7AenXEcmNCMKbEYZXIoo2Q9pN6KPfgbHuCJhWA3hddR0n/1HwPPywgXQ2jUgQ16CUMfQ9roFYviTQT5mfLGJ+TqBWFWhUGRpVCbfG4NU1SF8gdANINyJfBucPBXjoIEFOHAt1fvu9fzCq3XXnm7V/Nwvw57df9J6bb3nHr0dWAWF1ApRblfVphAsH8Uf3l3DbhS+EtsvQodIZRZLklE7EZE9ehIYToF6P1MwnBYiy7bAocR9ESBsSmjL9Sfv35RxdLej48nxAywJIA2v7r0LNewinJhvoqFHfX4CRLtES1HLL9YToi3zAUCpEeswDRfmHIjh7GFw8rOpDFZJLCOgmVzORysa01EYw42YYI3+DyJ9R31UjWnvll1rw8RyYrb+EDxALcRk/f3ge+WKALl/AsgUMj8EK4pyEDDQYmRCh1wTjNq7Z6uG//E0GF44EMpupb6o/ufHWvSjc/SNXgHv37Naena5d+BNvfd+f8M7zbG/uBCTN/toUUHoOf/PoLLa0NbGxbSUnD1X3UJbL9yXc8ng86x3i/fERKSWQqDtURpli3f0daJ4qgesSWSLQoh8dBhCKbzcOmZJfTwEgyvrFJbZJwWjgJI41R1o/HyGeQSHlwHAiFCVgxkt7TCuLOGxLoniByFWgHH4Ub/1XDBAFjKhEUCN8Xwgt7YNiQ6m2R2BkFxDY/xfEmj+CWYrQpErxxM/k3IOR8tBcxP8pztoXBIWYlDhwsooR8hVCiawdwk4JhD45hQwyk9SkCImISttYFj+3u44/+WoK//nNVQxtPvj+XxP77rlrqXL1R6MAn997dOQjd97+v6y+8+zG/BR4MvNRPoS9z0xhfKGJX7mc1vjTzD4nqJaEVx5D4NN6T4UdPjwnQlXNfoamK7HlgrWYrks1ALZGCRVqANFMmEHOFAGN+QOX6gOWEkVl7x/gevNo1BmaUxyE7RDE1EQ/PDFQWnK7opjeP74iuQY0eEktMD0qdE9C96vaBFH+ghRgAOgYPgJb3wemXYLB/NMo1Zb7YyG4Re3pVtLfni6Ud5idrqnvQySS3QV6lAhpaYoINBL7JlxVKtH38DDQDmweCNgX70vh4q3+NfsPD3UCU2M/EgXYc9tujaiab7h85M+ttddtri9Mw6/OQG9MqsF/5sgEvnXIxW9e5a4YfIV1i3QV6XMrp6A6aAdhvM4S8MOJQBwP5YaOfEeG9XfnMXZgFkJGyBvkRfsqSKRTNEexO6xUAkYcfIr4M+4Q2rq5xDAeT4YIps3RMd2BCiooNXyAikNc6kMkkNV1pC2BlG7CIJpaqvvRBZhuwaDukekBCDMHHrmqytj3JuF60wj8OnwPcFMSQRelN46Bm69Bhh1AwCwE0oEvG2DSgjAkeEoD9xWdeMxselrHMWpBhUadOgphvkrLZUyB47nU7ZQsG1UQ6bEicQkmPJWLeMOFdfzx13P4w89r2LVt/j0AfudHogC3jAITTf2N+e0/9RoCVFYXZpAN4sF//vgk/uoxB79xxUpvXaVx1WJrwykfiwEcitmjxYgh1brsEMOK689vu2TTguNEGwM/To/S9k2j0o4WAYSi/V75vVo8AUuSWAAZk0fSPbYNgUwqo1rLMYIC0RKQo3yBUINDwSIKCqkbQgkpopCnRgOmBZaxwFPtCgpmWQFk3UVQM+B0FOEbs8iM0HJgAtrFAGoIgrrazdAC2NDKqBn7IHgWoegC9xPuhzNkBYI6DT5FxRgMCkRRLFlFE2M+BAVFU/+OHD8qo6fvS53IgDturGLvgTayljf/yBTgS3uB697+hl9u6Cm4Y0fQIYsIKqew78gc/uoxDx/d5SKlUVCmNfjEfKVDahl4peNqjaPgDdG6UFDHdyOy7HAihLVAiJ27t/1GZBY+6pZnEHqBGnxyAAWnNTFSNQGcAJWqYkjEa6xyLOPrKnKJReRQ8uN4pwJ5WH4daaJ4o/2+Ff9dU5MxjDN3lIamLmEqI5kAMwiUQspAcCA7DSlCGAFHyG3om2owc3NgVgg9rYOZb4Sk6GC4DyfGPJw8AvgCCIwImfwEjKgN62s5FeGLI4BxAyq1m2GxQoY1B00thWajrHY/ykI06RzyH6Pk31JVdICqxlVeIq5Ypqyhg9dslfjaE5ldv3pr16W/e/fsI6+4AoxevePa3sH+a4+Mz+DkeA3r/Tk8tH8GE9NV/NYVDkwtjtKxlrcfMjA9B69yKgF0tLhxyJwRzo5gW0DDZcwXnfc0De1rOvDHRKRIvoLJJUxabxlTjGCSTn4J9qYW585yH8ASowjxEHi+AjFoIzxZfcESIlrp2+RoCUucPkl1gQTVypWgdc2CWVThW4qdMn0duHgnwA5DBkcROEfw+AnAdQHKGdHOgSKabcXL1MR9AbfosiXAkEQuKdGQGizPg05mnmJTLllCBl0j7AL1OCLIm6HeY8wAg6dC3aHyEYDdF9g3/O7deOUV4MRU8Q0788PorR5FW7qOv/pOFTekK/jJHTFAhWa+GvyIyBtdMHsAfn0SoUexgCTrR/x4VInj05ZMqhvl182ZPx133/eR84LLB9JVbcaNWbOo10+KAiIGh+t70MhyJAEUYtiK43JxUQUtD4pti1N0MGC6ZqkbUmo8jPZcHgGOILihAuvuDKK6G5eYq1kPaMo00SNFqOK+Qow+t+CCd06CdZ4EMhT/ryIkL5EaAzIbXH8TwC+RiP6OSe+YamlTPgHYbQzpHgkzz9HfeSlM0Y3agQF4s6TMCQdCC+msmljHv8MSc6oIhbrSUhrLIr+ZkQUkf49BNKijqYRtMbB0CN8RaNZibkHKTlo2R95mWD/A3v39LAMvOxB08UUXXaP+QehhyG7Ar89hS+40fCLRt7gVwOpG5BQh6XkiCrhBM5lmvhdn6Jou8KTY/lMni8XZ7q7e7XQe5QPIpFNBjk5mW6VlW9dP5tDLJNBouPPwvA5Y7L0IMvPAyJmrrhmFeXtcGNtKMHZNwdg9Bv3SkxBrTwL5SUAvAzoNfjuY/hpw8zeI3RjS/X9ZUHsYzVI8+HJiC0xdUxXBpGR+0ECAOUixvC9k3Lm81a6mJZpWxEg70GQaKhFHxY9QJe5pnymUsZcc1Aq3FfdYDoOgAMbIoIaJUmb9B2+h8qVX0AKs729PDff1nh+4VaQFOUEL6phzHfSZsckl8xRRzNXqUjw9vjeXcOm1yB3IjFMCKP7ibkNAa+v607u++r1731wYYd2as90hD90PYFAEULVzo36/QrVu5UEIQXlz4gOg9xb5epctLctLxFiApuuh6h9F2toOgV5E60Lw58jBTBpIdTowR+oQnS54Osnu8STbqLbqFOAnBWwDtG1U24TQm0HofgqRO6d2L8QOFxY12N6V8DMd8L3nYypbXaLq7UcjiCCcoUWd5aqnUOwD0EBSR3MS4Qe4fkTg3ucCVF0Jg0cwZASTcbUddshqhkyGEWO0hdZN4lBSrrI6wpCju6Dhm0/6/JqL0m/71JfmH37FFODKLf3niWx7SnoONBao0mjKVqkvrr5/ws8kdAhKajSpw9fpKJ2VqN6QGWMHmtFv0fPr9Tp5vhd4iddLDjjF0zVyckANomxEZC7aTr9ki3DphRIJT9HI1ZxTiDIOOLsAYceT0HULUm/C2FJSCkBLDFmA00WxztH1FSDZReQ9CBl8S21blYtDEUtaGeoWMrgIom0zvHAm/tmLdlVSMBPcsc5otJa/RxGo4X4BIsptOL4ClNDiaokIDZ8r3GSMnKL7TI2sGFJpDk1NQPqQLjBOi0cNN46C+hD+2iu2BFgZaxtV3bLQAXcrCJslNB0XGnHvKhQN9eVhsDIFpLa+DXbPZmgGJWNIw2nto9kbm/8w4Iqf51m/46P/7dvTqvLt/k25fsnDoaARQoQhUrQD0CQ0MrvwIYShaOIVRYwMoS8DhNASHrdqJxJ+sgTUMpohCBpokAWoN7HgfZsug4o7hygTQW6bRtjehNQlpBayKJJ0KGQS6TVVDDXmJKoTEpVTLopHiygfq6FyJELzCOAeI1IoE9pcD/L+Wph2Nm4fx7kK3iwFwQkZYkJ6S8QQMRNanBFcXi4uGnNI99jNnnRKWhqxnye9KgUllSKk0kBnu2Ad3RYKnRrSeQE9RXjGIC5l9ILf9gAAEnxJREFUT48gMjZjTU+Bjy+Emz/wlt4rXjELcNGG3o0xssEHpXxZWFe9eG1jWT6cKF5yQxCDV0rpFFnanYZfn4fLqPt3uBif9BzAsTu/8f/tPfW5RQUT4XlkbOk5ja1BrV1IsYS+ZEco6vIyGEPiLxOzBDWog3gIlCqPwdEBs5ZGtGb6jDPerdBenMAp8eymUj0yQOSFq+8VUETOggiy0JGj1mbQKMBjLCYJwJlNm5/FrXCc907FYebFSnB+xrbzWjCL7t5ofri7IGfmq0MGh8JQdKWB/gIw2MnR0WkqsKpleRBaqGIXcRKMtlg+otRF2LLmGO570sQNo8EbP30PvveKWIDdl+3cQYOv0Z3xFlBsBKh6EbK2lCxZJqm7Ns/0URdNJmQDOqvCNOqwDR+2KWEQcCYACkxr/vUp40PLr3/ZSH6r8g+CEDoLYapu4ZHqykn7c0k8fK6vdgeKY1dlbJbKqVp19cQhSP6GyjtERAdjqkATtW2bnwfmix6KblM5oarWJIoH3FsAgjmAzwH6DGDNA9Y0hzZnImoMQUSvhZn6T8hkb0UhfR4y6RTMjIQwGRil/mgKahyG1gbhcmVtKFpHafDIyyvLJ5L9v2qIocimlDdAC6ba3weVKeiG0b5mrfatXCa3mK9ImQDFmWgHQJaUiQwVjSglo/BwC2Ukq8epWhntnb2YrWVx3Q7vLS9nbF+WAmjZzqFTCzU8NdXEHz1cwwe/wlBsAs/PLdNi2o6Y7THAgTyj1ttJzz6dwBk2UNYKT/3zMyefav19dKQgLh5su5ZMsEJzSQlTp6XFj0kV6McGLkKH+PVf3AK0WrC0eP0oZGrSei+JpQuYnQWCUwHqVYD6P6uEDxcwzDTMTBamK4DDKUTH2xCN90DW1sJgFyPd/gakhn8Cdt95sLI5aJQJjG1VwhoW9xSmQ+gFZLw8aieA488ClSqRidPO48URzfGVQsAhVrgwtWYgtbejTVelilSt5JLnnwBnaRsd+DVECtGU/NskIib9IuDNIbI3o6/DRN211t/5ts7LfigFuKOri/3tnVdkyqJ7UzngeHKyjv7Nl+O229+LrVvPw3RVMoLJ016VbgAzs4o2HUE5rtJV8flWpI1mNYdr5vbes3t0cenZd7wUcuFuUO00Ql/5tNTlW1dtVQmnb6kfrjqEqSwfQfbiDpzLpWValWMYUWkZQ9RsQ2kOmDzEwA7q0A5xeBXAIXNPyR9Dh9n5TthD3SjslCjcwFG4RiI/ypAf0ZHpsWEXNOjZDEyrAIMql6gHoRZBo4wgJ4c1gDA05acQfPyS9PXIDXEMDgO9+V7Y6FBxBbXjX44/XxwABkEwuqYLEUpo2Xm3q6vjcapPcCgPFlL5JIPnUp8BekFsaTTPRNzSwBexQlAas3EUobYBF6/Vse9wWrvhkv43/FA+wPfSPm7pW7/ZbBtEnjG4roueni6YpoVSzVUBj0VfVjPBrG7lI6i7uzgyK5s11mz90FyByr73qdfnD3R2SeC81nVo7aNYC7V4Y5zaqxYQhfXTsP9nrhFcmmHxY7e+HaecYygUBHacKGCm2EA9vRS40izaBXwOenoLwDdDG5iCiMoAKtBA/ulJlU5G9A1Esh0EWJDzPlB1wJpMhftiTArZeEoPmtBsgfZ2DVY6QHvuStSdVpvpF7deTFlMmgAertqWOu/gIf3R8RPWdrfWiCuNE0tAATTVIyE0Elr7JWyjgpvVDwGdV2Ogpw3/+1GJd+06THjBPT+wAuw7XpL3VYa3/XQ2i3qppHL3Ku5O5qlWQbudZN40TWH7YGbByoeJ9UnKiFByCRO3ytaRI6Shi4l7Hjj+rRZBPz77C+ddIOo+PAV8kBSZUzsHquNT5J8qWkb5eYXYiMk66W/UNEKZ+2TwEXfjCrUALFR/xdr27SiMaGgE/wTtmAnzBDB2xIE3EKJaAup1oGs+QHvfM0jlNIh0CkLvUeRQAYi1PQtN88DkDDieBNMbYB2tkaT4gImo3M1kRQINqktwUdeOw4w8ZOxemFoPqngW0PIxJbDKBK4EhihiO5/SxzHLmWeI8weN6p1H2grvnWg04NASoGIAEXyPx61mZEb1JoxT4KR/BLMLgeY4mLcAaa1DGE3D0qOdH3xH9yWf+tuZx34gBSDxPI8K7FWjpnK5DEM3FKCzVqsjZ8UWQP0/1amoVIg0WeHoW7x9yexXTguMCRp5D0khHsXTcvVLgvoim47KepFZpeQHUbrFpJG0xr1Y06eVsuhdkzNoUPt4Bh66qA5wGM9z5EodmDu8AKMjUMAN4vBLEVysI0Cuo4J0vgIrS0WdU+CpDkhrB7jxOoBnwdkRcPkEGCOyCGpfWwMrHI2P6DEEB69GKXVc+QiGNogwKiKS/zbjK6N1SWU8PYpTbO0a1ubyx/L/p7JrjZGrLMPPdzkz5zJndmf20tKl7a7bbusupSUCjdxJ+8OEqmAMicEfhsTESAJKDCH8qjEgCSYigkHxjwYMkGChJgQVpIAYsBeWtgvFdi102e51di5nbudu3u/MTKctRfol+2cy2TmX97zne5/3eZ/n7aXFpWsbvq+yAHVMaU6COo2Jb5KmXMnjiLX+CK4ogDU+QZxZi9U9/8ZMwcBNV0Q7HnseFx8ANIB41113sbGxsQnXdWWlUoFhGHBqNczNzSHyG+jVGQnfMTWha65R7+zQK7aGHRQTv6Xtp8yTg7pmT+586vBK9+9U5+yteuBK1e0LaBKHnhBftWW5SIF5XgLKnTP/RxmBumSKLt5iGp/1vZgaKx/BjwrwCKTiVZiSI58RMLw+rMzXUdYa0PQANQ1w5mgKOCbFV/VnGC4M+zTS5l4Y9l6QcJmeTUHTJZMmtZFJy2ATuFidgFXyVcixPQgXDUU2EbIPLg4gbnnXqsehaw9ANQBlNJUNGiuIYwG/5qDHstbf//Qy27Jq6A/5bPraSsFHzQNqLoPrEZeRIfJcxDpVAsSFII4gT1xHggZE5UNEPZdjy4geH/jo0nhTppI5+eiAHPnRZHBRATA4OKiw0P7+frLjxPT0NA4dOoTX/vYyXNfHj69jsd3F9Wf2mmQDqJwzovMyAC0nNbAfmD3rd9IyuuwzBTppc02CT00av+5Qti64zmIKtyBoLyqi6R9LbgCvQ8IE15kKLlPPIAhNxUNsVBkCLYRIeXB5E9BDpe3PaYxcA4jWT694GB50w1OMYj3vwBqYR9o+As26HhHuABe/gZ2xsFQFdH8SQhYR+Jcnu/xz9Au61IEhvFKSR5OTMG4YT2/Y889TL3xzU9+vKoWqXvPjuOEz1iDuhAsYro80vQq6pAc7+4H6SbD6DNAMlv774dwT6a3DD/Uu9nb2XF84AKampqL5+Xnj5ptv3lQsl+NVjRPs/m0FlOoR/jgpsGucBHVaZR4NYup9gO9ABBXKBCwgF3CFqFCbltBqXT73r0/OGmLacmmvpYXuRuL10dw/efFINY/ngyuhiBQ4S5AYEowi166Ysk1LOJp6A53LSA8UbRMUTpAYNSpzqWhJcQqidAhOpA+ShyVuH6N3Nkc2Q+9yDRFLJomIYUwMJMIdXMdHQJy+dADL8pCyIjWVQxB8aRZwjBjWSIzc2jeRyh5R8nOVQgWFIgfLLcC2aOQtBbIfpvJG6QJ3JorazrEsptQdU3OCTsD1sfs+tmmxMT5jRbVXhJm6rel7qBBnsk5GVCyRpvF8SC2N0OXgOukjMcQ+g1Nogi/+Do+/6v7gsZdW9mAPKTFeeH3uHqCvr2+UBJnj8qfYniuACx9/XwYGuiRv1caGyAnSBJrLYH45sVo/fzXcWB7v/mBiXX5CtdXOPSgqA1SaFJ16m4ScaZOkhu6TX2495xdetDHsTAD5hA36LWPKpMdOi6AGKSUYTQBTu5Z8/kKCV5PAIPIlLS6yiKjcs1cAdgrmYIhUP6DZFqRuIQzm1Y3+4FiMSsyQGgDS5DTjntnfdG6+ErY+Zw/QlcM+Obxu4p1DH+w1N61+2Las26oFTzWDyBOZeJPKKY8gzkRZG9WCRK1iwncF1u76HrTKs7j7G9adKgD+z7pgADx6661y1c6BjfmU4FlWRuXj4wiXl7H20wrI3mPhXQ7DMpAyBTSbNrrHIHWyavNAOVLRrL1iy/cXiCQ78cz+pdmJgQE21RI3yMnGFuXhFxJ6R9SnGEwmfW9O+gAqDpKunOIS0C6I4GcqE5PSonNB6clNSoTWe4lT+9RVyp50pYwmOX/Q94ltRORKek/HCsGUhq4GMgl1FDHdMA+aWYfIByT8Ad4nIa0CmKwllDJmKA8iYBwIl+FX34FLyW5WQ87jmHOaCn3M0mwJdDXq1c4Ais8sWpyAdgAocCcJeqpfhjLFzSf3OuEd9w+/l7PMjytFZ5gqAcejaecAzTrgLEYozrvwXUP5E2cyEbK9HHzpdcj1Exgqvnvj1tHe/ER+oPSn/cejiw6A0nAJ7AjfuCV7EG89/iCE5yQslIan8HW/wJGzPWTtNDKWD3HqMTCpQeQk0kM2uLrwnWoPjdCYIp493fx2EHz7muGrEty062kgqgcJNsi0soZtZwBFBQ/DJBN0xsy6OAIX7Awmn4kz4ORnXwjTg5YvIT3oQA7WISxfgZsdC1lBtLAN5EWPKEohqJfgNV6Fu1hFvQhkfA22vwHDwQKOiKYqMUmjsPeS9VieY+dkgERqrnPOVDm1l9dE2tTH9v0H8fgAmBOM/NYpVX5Wa0TezIprGmEKYaDD1rgSqe7NMZhmiDRtXE0P3uwJaEPr6T8Zu64MvnZN/9jz739citsP3RcOgN2P7gv23H3j9hd+/gCEGsqMYWgco6MWLu3XEfeMK+ixUGigyGzERQd6YwG5FaA6vUhC2zBHCbMnhFPgqYO119v/mw7m5Xu/rtnx/OXE5CEXEMoCiQYfdf/o6dQSTL+VAQhHIMNo6pETxt7m/6pMoOhICdHiTCDRs+RC46T/swa6rEDyauIBQEbQNP/HqLqLoW+eQXqto7gnUpW2CadUNVrVdkMicknGbh5+7QRchwZbIjTL9PQK5AMLtk296hq+pEYNGbhPx1iAyC5BN0ZUW1ntAego26wg1Qb2leNY++7QvIRhBiPV2V1mU2sE79eXHxm8evsv+svyhtMHX/srzED2mD5yNmUqhkzGh66Tqgmhk0l1FJ08gNTIKL/v9k+/f2hm9vmnH7HEk3+2RbVajZ/5x6L3hQKA1ltvvpcPmglDd9XQEG7aeSXyYhq51T3A5h+qF6jfLKnpXa/sYOXtZ3H4/aPI14CeLDA/w9A3IaAZDF4sz6pFj9VrbEcumAhaXLb2EtRCVqodKRD/oDsDUKB8tlbY+RlAxV1cQza9DRapbFxxBPiAQKoz3+ADATJXLYApMeeklib/R9XFJaZyE4miaNVDSJmvDni1pFuY4SlkYwkrLZEiWCMkhDE5grHVHIvpEI1GCEe8gShar7qTKgO0MlbnrNvaA+2jSlqJuS2jC+L4TDGcfKMaDw2R3N3gm6mevuVMenF1LsdVg0jKCKlUkKiSKmazUGTRoFyBxkdiW/duvHr96WPHTw6/dN93Sj/lIo+LCoD5erZq+FQ+ATtuvx2DOcAqT0NuvA3ouUSRPjTS8ctFCAab6Bn6CfonXsTk3tdQOeEQkIbZSWDzuCznr7/zvavCfWz//v3qCnzr8PFtxWt7snEkEuevlhuI1Ki+J9CQ9ADq1BaOSa2VEEECg9qaoWrHH0VIKRQwIaScLSIaIBIOGn4BPcYVCNaVIL7ch+Doivp+SJ28zWRFT1UDbdaoxk7a1W4JaDqAXwFcB4goDmsajBSDrUlYOodOjCItVj0BRuaA7SlfEJ8xVliAHwSQop7Y1dLWod0Z66aukq6x8kNqfd6CvJ988dhXH37OeUXdh3ngIE7jwZ2XHRT+0i26zpBKxxBCqqETzfChWyGEESBtN8DTEgiXRAwfJmejW0dP3htyfk/N5g+XJ7MP/fLFSmP37uRqfW4ATJXrvx/XsGt0sDe6ZOJqnjr1F2h6BJSPQkRzSResxdkTsYDIbUP+untwTf96HHj8CRyd5fBXInimmNoRz7B9Xbfo171r130XCWdQ8TFbQ6QqA0gyj+waKVdXlp+HBnZZMJ63QrjwwyrqTRe+NQuBNWh+ZQHyaCtAciE8P0omg6j8i5E0ipYZaqQpXNHBXY6sztSNJ73oBJyim05YAtnOnuEotpU+Oh1L6hCTmFScTsSk2nuAczIAVyggRUdyKxS9TcnixxvOPafpUvOVIQu3JOxlASFcmGYNlgVwPYJUTOUYXJeIwzkiMnW0YDmPuF2LHqjVenZt7wtvAWoKkPkfVmLaQqoSbIAAAAAASUVORK5CYII="
                      alt=""
                    />
                  )}
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
                // Todo: setKeyboardPasswordOutput("");
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

              /* Login */
              setIsLoggedIn={setIsLoggedIn}
              /* Login */
            />
          </div>
        </>
      )}
    </>
  );
}

export default App;
