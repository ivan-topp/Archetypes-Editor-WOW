const electron = require('electron');
const { app, BrowserWindow, ipcMain, dialog } = electron;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { remote } = require('electron');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.openDevTools();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', 'build', 'index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.on('resize', () => {
      mainWindow.webContents.send('mainWindow:isMaximized', mainWindow.isMaximized());
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('mainWindow:minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('mainWindow:close', () => {
  mainWindow.close();
});

ipcMain.on('mainWindow:isMaximized', () => {
  mainWindow.webContents.send('mainWindow:isMaximized', mainWindow.isMaximized());
});

ipcMain.on('mainWindow:maximize', () => {
  mainWindow.maximize();
  mainWindow.webContents.send('mainWindow:isMaximized', true);
});

ipcMain.on('mainWindow:restore', () => {
  mainWindow.restore();
  mainWindow.webContents.send('mainWindow:isMaximized', false);
});

