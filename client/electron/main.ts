import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { Server } from "socket.io";

const io = new Server(3000, {
  cors: { origin: "*" },
});

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loudness = require("loudness");

const fs = require("fs");

const FRONTEND_VERSION = "0.0.1";

const APPLICATION_PATH = "C:\\XiiX";
const USB_PATH = "C:\\USB";

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

type GameData = {
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

function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    autoHideMenuBar: true,
    icon: path.join(process.env.VITE_PUBLIC, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.once("ready-to-show", () => {
    win?.show();
    win?.focus();
  });

  win.maximize();

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

ipcMain.handle("get-game-data", () => {
  try {
    const rawdata = fs.readFileSync(
      `${APPLICATION_PATH}\\GameData.json`,
      "utf8",
    );
    const gameData = JSON.parse(rawdata);

    return gameData;
  } catch (err) {
    console.log(err);
    return null;
  }
});

ipcMain.handle("get-usb-dir", () => {
  try {
    if (process.platform === "linux") {
      let rawdata = fs.readFileSync("/media/");

      let installInfo = JSON.parse(rawdata);

      console.log(installInfo);

      return installInfo;
    } else if (process.platform === "win32") {
      let rawdata = fs.readFileSync(`${USB_PATH}\\info.json`);

      let installInfo = JSON.parse(rawdata);

      console.log(installInfo);

      return installInfo;
    }
  } catch (err) {
    console.error("usb not connected");
    return null;
  }
});

ipcMain.handle("get-volume", async () => {
  const vol = await loudness.getVolume();
  return vol;
});

ipcMain.handle("set-volume", async (_, value: number) => {
  await loudness.setVolume(value);
});

io.on("connection", (socket) => {
  console.log("C# Connected");

  ipcMain.on("start-game", (_event, gameData: GameData) => {
    console.log("Received from React:", gameData);

    socket.emit("start-game", {
      Name: gameData.name,
      ProcessName: gameData.processName,
      ExePath: gameData.exePath,
      Args: gameData.args,
      Type: gameData.type,
      Cover: gameData.cover,
    });
  });

  ipcMain.on("install-game", (_event, installGameInfo: GameData) => {
    console.log("InstallGameInfo:", installGameInfo);

    socket.emit("install-game", {
      Name: installGameInfo.name,
      ProcessName: installGameInfo.processName,
      ExePath: installGameInfo.exePath,
      Args: installGameInfo.args,
      Type: installGameInfo.type,
      Cover: installGameInfo.cover,
    });
  });

  socket.on("game-installed-status", (data) => {
    win?.webContents.send("game-installed-status", data);
  });

  ipcMain.on("check-status", () => {
    socket.emit("status", {});
  });

  ipcMain.on("close-game", (_event, gameData: GameData) => {
    console.log("Received from React:", gameData);

    socket.emit("close-game", {
      ProcessName: gameData.processName,
      Type: gameData.type,
    });
  });

  socket.on("game-closed", (data) => {
    console.log("C# says:", data);
    win?.webContents.send("game-closed", data);
    win?.show();
  });

  socket.on("game-started", (data) => {
    console.log("C# says:", data);
    win?.webContents.send("game-started", data);

    setTimeout(() => {
      win?.hide();
    }, 3000);
  });

  socket.on("controller-ps-home", () => {
    if (win?.isVisible()) {
      win?.hide();
    } else {
      win?.show();
    }
  });

  socket.on("ethernet-status", (data) => {
    win?.webContents.send("ethernet-status", data);
  });

  socket.on("get-storage", (data) => {
    console.log(data);
    win?.webContents.send("get-storage", data.storageInfo);
  });

  socket.on("get-version", (data) => {
    console.log(data);

    let versionData: Version = {
      frontend: FRONTEND_VERSION,
      backend: data.backend,
    };

    console.log(versionData);

    win?.webContents.send("get-version", versionData);
  });

  socket.on("controller-disconnected", (data) => {
    win?.webContents.send("controller-disconnected", data);
  });

  socket.on("controller-connected", (data) => {
    win?.webContents.send("controller-connected", data);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
