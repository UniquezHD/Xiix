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
  exePath: string;
  args: string;
  processName: string;
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

ipcMain.handle("get-usb-dir", () => {
  try {
    if (process.platform === "linux") {

      let rawdata = fs.readFileSync("/media/");

      let installInfo = JSON.parse(rawdata);

      console.log(installInfo)

      return installInfo;
    } else if (process.platform === "win32") {
      let rawdata = fs.readFileSync("C:\\USB\\info.json");

      let installInfo = JSON.parse(rawdata);

      console.log(installInfo)

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
    });
  });

  ipcMain.emit("check-status", () => {
    socket.emit("status", {});
  });

  ipcMain.on("close-game", (_event, gameData: GameData) => {
    console.log("Received from React:", gameData);

    socket.emit("close-game", {
      ProcessName: gameData.processName,
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

  socket.emit("status", {});

  socket.on("ethernet-status", (data) => {
    win?.webContents.send("ethernet-status", data);
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
