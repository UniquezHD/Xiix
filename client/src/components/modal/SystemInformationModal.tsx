import InfoIcon from "../../assets/ui/info.svg?react";

import type { GameData, StorageType, VersionType } from "../../types";

type SystemInformationModalProps = {
    isController: string;
    isEthernet: boolean;
    currentVolume: number;
    gameData: GameData | null;

    storageInfo: StorageType | undefined;
    version: VersionType | undefined;
};

export function SystemInformationModal({
    isController,
    isEthernet,
    currentVolume,
    gameData,
    storageInfo,
    version,
}: SystemInformationModalProps) {
  return (
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
              <span>Space Used</span> <span>{storageInfo?.SpaceUsed}</span>
            </li>
            <li>
              <span>Free Space</span> <span>{storageInfo?.FreeSpace}</span>
            </li>
            <li>
              <span>Internet Status</span>{" "}
              <span>{isEthernet ? "Connected" : "Disconnected"}</span>
            </li>
            <li>
              <span>Controller Status</span>{" "}
              <span>
                {isController === "connected" ? "Connected" : "Disconnected"}
              </span>
            </li>
            <li>
              <span>System Volume</span> <span>{currentVolume}%</span>
            </li>
            <li>
              <span>Frontend Version</span> <span>{version?.frontend}</span>
            </li>
            <li>
              <span>Backend Version</span> <span>{version?.backend}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
