import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld("volumeAPI", {
  get: () => ipcRenderer.invoke("get-volume"),
  set: (value: number) => ipcRenderer.invoke("set-volume", value),
});

contextBridge.exposeInMainWorld("windowState", {
  set: (value: number) => ipcRenderer.invoke("set-window-state", value),
});

contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, data: object) => ipcRenderer.send(channel, data),

  on: (channel: string, callback: (data: unknown) => void) => ipcRenderer.on(channel, (_, data) => callback(data))
});

