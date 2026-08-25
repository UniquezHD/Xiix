"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
electron.contextBridge.exposeInMainWorld("volumeAPI", {
  get: () => electron.ipcRenderer.invoke("get-volume"),
  set: (value) => electron.ipcRenderer.invoke("set-volume", value)
});
electron.contextBridge.exposeInMainWorld("directory", {
  get: () => electron.ipcRenderer.invoke("get-usb-dir")
});
electron.contextBridge.exposeInMainWorld("windowState", {
  set: (value) => electron.ipcRenderer.invoke("set-window-state", value)
});
electron.contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => electron.ipcRenderer.send(channel, data),
  on: (channel, callback) => electron.ipcRenderer.on(channel, (_, data) => callback(data))
});
