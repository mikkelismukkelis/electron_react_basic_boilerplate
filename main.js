const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron')
const path = require('path')
// If not packaged, then true, in dev mode
const isDev = !app.isPackaged

const taskbarIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png')
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png')

let mainWin

const createSplashWindow = () => {
  const splashWin = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
    },
  })

  splashWin.loadFile('splash.html')
  return splashWin
}

const createMainWindow = () => {
  mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: taskbarIcon,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWin.loadFile('index.html')
  isDev && mainWin.webContents.openDevTools()
  return mainWin
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  })
}

if (process.platform === 'darwin') {
  app.dock.setIcon(taskbarIcon)
}

let tray = null
app.whenReady().then(() => {
  // Custom menu from template
  const template = require('./utils/Menu').createTemplate(app)
  const menu = new Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  tray = new Tray(trayIcon)
  // lets use same menu as in app, if needed make own for tray
  tray.setContextMenu(menu)

  const splashWin = createSplashWindow()
  mainWin = createMainWindow()

  mainWin.once('ready-to-show', () => {
    // splashWin.destroy()
    // mainWin.show()
    setTimeout(() => {
      splashWin.destroy()
      mainWin.show()
    }, 3000)
  })
})

ipcMain.on('notify', (_, title, message) => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('Electron app')
  }
  new Notification({ title: title, body: message }).show()
})

ipcMain.on('app-quit', () => {
  app.quit()
})

// For mac usage
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// For mac usage
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
