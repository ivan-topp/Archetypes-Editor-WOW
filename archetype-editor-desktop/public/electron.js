const electron = require('electron');
const { app, BrowserWindow, ipcMain, dialog } = electron;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  });
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

ipcMain.on('fs:save', (event, filename, data) => {
  if (filename) {
      fs.writeFile(filename, data,//JSON.stringify(data),
          (error) => {
              if (error) {
                mainWindow.webContents.send('log', { type: "error", msg: "El archivo " + path.basename(filename) + " no se logró guardar."});
              } else {
                  mainWindow.webContents.send("fs:save", path.resolve(filename), path.basename(filename));
                  mainWindow.webContents.send('log', { type: "success", msg: "El archivo " + path.basename(filename) + " se guardó correctamente."});
              }
          }
      );
  }
});

ipcMain.on('fs:saveas', (event, filename, data, key, closeTab, fileTarget) => {
  dialog.showSaveDialog(
      mainWindow,
      {
          defaultPath: filename,
          filters: [
              { name: 'Archivo JSON', extensions: ['json'] }
          ]
      },
      (filename) => {
          if (filename) {
              fs.writeFile(filename, data,//JSON.stringify(data),
                  (error) => {
                      if (error) {
                        mainWindow.webContents.send('log', { type: "error", msg: "El archivo " + path.basename(filename) + " no se logró guardar."});
                      } else {
                          mainWindow.webContents.send("fs:saveas", path.resolve(filename), path.basename(filename), key);
                          if (closeTab !== null) {
                            mainWindow.webContents.send("closeTab", key);
                          }
                          mainWindow.webContents.send('log', { type: "success", msg: "El archivo " + path.basename(filename) + " se guardó correctamente."});
                      }
                  }
              );
          }
      }
  );
});