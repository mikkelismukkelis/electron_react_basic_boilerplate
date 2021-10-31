const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(title, message) {
      ipcRenderer.send('notify', title, message)
    },
  },
  batteryApi: {},
  fileApi: {},
})
