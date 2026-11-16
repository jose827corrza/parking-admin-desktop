import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('secureStore', {
    setItem: (key: string, value: string) => ipcRenderer.invoke('store:set', key, value),
    getItem: (key: string) => ipcRenderer.invoke('store:get', key),
    removeItem: (key: string) => ipcRenderer.invoke('store:remove', key),
    clear: () => ipcRenderer.invoke('store:clear'),
});