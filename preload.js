const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("backendConnector", {
  invoke: async (channel, data = {}) => {
    console.log(channel);
    const _data = JSON.stringify(data);
    console.log(data);
    const response = await ipcRenderer.invoke(channel, data);
    const result = JSON.parse(response);
    return result;
  },
  handle: (channel, callable, event, data) =>
    ipcRenderer.on(channel, callable(event, data)),
});
