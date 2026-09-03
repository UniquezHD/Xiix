import { useState } from "react";
import { useGamepad, type ControllerAction } from "../hooks/useGamepad";

import { SteamData } from "../data/SteamData";

import "../css/steamdblookup.css";

type SteamDBLookupProps = {
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
};

function SteamDBLookup({ onSubmit, onCancel }: SteamDBLookupProps) {
  const [gameID, setGameID] = useState<string>("");

  let searchQuery = "Game name";

  useGamepad({
    onAction: (action: ControllerAction) => {
      switch (action) {
        case "circle":
          onCancel?.();
          break;
      }
    },
  });

  const HandleEnter = () => {
    onSubmit?.("f");
  };

  const SelectGame = (gameID: string) => {
    setGameID(gameID);
  };

  return (
    <>
      <div className="steam-lookup-overlay">
        <div className="steam-lookup-container">
          <div className="steam-lookup-top">
            <h3>{searchQuery}</h3>
          </div>

          <div className="steam-lookup-list">
            {/* loop game list */}

            {SteamData.map((item) => {
              return (
                <div
                  className="steam-lookup-list-item"
                  onClick={() => {
                    SelectGame(item.gameID);
                  }}
                >
                  <img height={50} src={item.cover} alt="" />
                  <span>Name: {item.name}</span>
                  <span>Publisher: {item.publisher}</span>
                  <span>Release Date: {item.release}</span>
                  <span>ID: {item.gameID}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SteamDBLookup;
