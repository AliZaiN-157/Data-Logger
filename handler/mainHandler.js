const { ipcMain } = require("electron");
const BackendConnector = require("../Backend/backendConnector");

const mainHandler = (mainWindow) => {
  const backendConnector = new BackendConnector(mainWindow);

  ipcMain.handle("getAllData", async (event, args) => {
    const result = await backendConnector.getAllData();
    console.log(result);
  });
};

module.exports = mainHandler;
