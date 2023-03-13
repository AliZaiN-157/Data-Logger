const { BrowserWindow, app, Menu } = require("electron");

const path = require("path");

const handleWindow = require("./handler/mainHandler");

let template = [];

function createmainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Inventory Management System | Home",
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // Handle Communications
  handleWindow(mainWindow);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
  mainWindow.maximize();
}

app.on("ready", () => {
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createmainWindow();
});

function HomeWindow() {
  const HomeWindow = new BrowserWindow({
    title: "Data Logger | Main",
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  HomeWindow.webContents.openDevTools();

  HomeWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
  HomeWindow.maximize();
}

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
