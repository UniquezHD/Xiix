import { useState, useEffect } from "react";
import { useGamepad, type ControllerAction } from "../hooks/useGamepad";

import "../css/steamdblookup.css";

import ButtonPS4Circle from "../assets/buttons_ps/PlayStation_button_C.svg";

type SteamGameInfo = {
  gameName: string
  gameID: string
}

type SteamDBLookupProps = {
  gameName: string;
  onSubmit?: (value: SteamGameInfo) => void;
  onCancel?: () => void;
};

type SteamInfo = {
  name: string;
  publisher: string;
  release: string;
  gameID: string;
  cover: string;
};

function SteamDBLookup({ gameName, onSubmit, onCancel }: SteamDBLookupProps) {
  const [steamList, setSteamList] = useState<SteamInfo[] | null>(null);

  useGamepad({
    onAction: (action: ControllerAction) => {
      switch (action) {
        case "circle":
          onCancel?.();
          break;
      }
    },
  });

  const GetSteamData = () => {
    try {
      fetch(
        `/steam/api/storesearch/?term=${encodeURIComponent(gameName)}&cc=us&l=en`,
      ).then((res) => {
        res.json().then((json) => {
          const games: SteamInfo[] = (json.items ?? []).map((game: any) => ({
            name: game.name,
            publisher: "",
            release: "",
            gameID: String(game.id),
            cover: game.tiny_image,
            /* cover: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`, */
          }));

          setSteamList(games);
        });
      });

      console.log(
        `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
          gameName,
        )}&cc=us&l=en`,
      );
    } catch (error) {
      console.error("Failed to get Steam data:", error);
      setSteamList(null);
    } finally {
    }
  };

  const SelectGame = (gameID: string, gameName: string) => {

    let selectedGame: SteamGameInfo = {
      gameID: gameID,
      gameName: gameName,
    }

    onSubmit?.(selectedGame);
    onCancel?.();
  };

  useEffect(() => {
    GetSteamData();
  }, [gameName]);

  return (
    <>
      <div className="steam-lookup-overlay">
        <div className="steam-lookup-container">
          <div className="steam-lookup-top">
            <h3>{gameName}</h3>
          </div>

          <div className="steam-lookup-list">
            {steamList?.map((item) => (
              <button
                key={item.gameID}
                className="steam-lookup-list-item"
                data-controller-focus
                data-controller-group="steam-lookup"
                onClick={() => {
                  SelectGame(item.gameID, item.name);
                }}
              >
                <img src={item.cover} alt={item.name} />

                <div className="steam-lookup-list-info">
                  <span>{item.name}</span>
                  <span>ID: {item.gameID}</span>
                </div>
              </button>
            ))}

            {steamList?.length === 0 && (
              <div className="steam-lookup-no-games-found">No games found</div>
            )}

          </div>
            <div className="steam-lookup-help">
              <span>Press</span>
              <img
                className="steam-lookup-help-icons"
                src={ButtonPS4Circle}
                alt=""
              />
              <span>to Exit</span>
            </div>
        </div>
      </div>
    </>
  );
}

export default SteamDBLookup;
