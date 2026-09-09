import LoadingPacman from "../../assets/ui/loading-pacman.svg?react";
import WrenchIcon from "../../assets/ui/wrench.svg?react";
import EditIcon from "../../assets/ui/edit.svg?react";
import PlayIcon from "../../assets/ui/play.svg?react";
import HammerIcon from "../../assets/ui/hammer.svg?react";
import CloseIcon from "../../assets/ui/close.svg?react";
import DeleteIcon from "../../assets/ui/delete.svg?react";

import type { GameType } from "../../types";

type OptionsModalProps = {
  focusedGame: GameType | null;
  currentPlaying: GameType | null;

  onClose: () => void;

  CloseGame: (
    processName: string,
    type: string
  ) => void;

  StartGame: (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    cover: string,
    type: string
  ) => void;

  RepairSteamGame: (
    gameID: number,
    name: string
  ) => void;

  UninstallGame: (
    name: string,
    processName: string,
    exePath: string,
    args: string,
    cover: string,
    type: string,
    gameID: number
  ) => void;

  isInstalling: boolean;
  setIsInstalling: (value: boolean) => void;
};

export function OptionsModal({
  focusedGame,
  currentPlaying,
  onClose,
  CloseGame,
  StartGame,
  RepairSteamGame,
  UninstallGame,
  isInstalling,
  setIsInstalling,
}: OptionsModalProps) {
  return (
    <div className="options-container">

      <div className="options-game">
        <img
          className="options-game-cover"
          src={focusedGame?.cover}
          alt=""
        />

        <div className="options-game-info">
          <span className="options-game-label">
            GAME
          </span>

          <h2>{focusedGame?.name}</h2>

          <span className="options-game-type">
            Game type: {focusedGame?.type}
          </span>
        </div>
      </div>

      <div className="options-section">
        <div className="options-section-title">
          Actions
        </div>

        {currentPlaying?.name === focusedGame?.name && (
          <button
            className="options-container-button"
            data-controller-group="game-modal"
            data-controller-focus
            onClick={() => {
              if (!focusedGame) return;

              CloseGame(
                focusedGame.processName,
                focusedGame.type
              );

              onClose();
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
              focusedGame.type
            );

            onClose();
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
            <HammerIcon />
          </div>

          <div className="options-button-content">
            <span>Mods</span>
            <small>Manage installed mods</small>
          </div>

          <div className="options-button-arrow">
            ›
          </div>
        </button>

        {focusedGame?.type === "Steam" && (
          <button
            className="options-container-button"
            data-controller-group="game-modal"
            data-controller-focus
            onClick={() => {
              if (!focusedGame) return;

              RepairSteamGame(
                focusedGame.gameID,
                focusedGame.name
              );

              setIsInstalling(true);
            }}
          >
            <div className="options-button-icon">
              <WrenchIcon />
            </div>

            <div className="options-button-content">
              <span>Repair</span>
              <small>Repair this game</small>
            </div>

            {isInstalling && (
              <LoadingPacman
                className="options-button-loading"
              />
            )}
          </button>
        )}

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

            onClose();
          }}
        >
          <div className="options-button-icon">
            <DeleteIcon />
          </div>

          <div className="options-button-content">
            <span>Uninstall</span>
            <small>Uninstall this game</small>
          </div>
        </button>
      </div>
    </div>
  );
}