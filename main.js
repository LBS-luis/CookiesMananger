// import
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
// const sqlite3 = require('./sqlite3')

// window creator function
let mainWindow
function createWindow (w,h,file) {
      mainWindow = new BrowserWindow({
      width: w,
      height: h,
      minWidth:800,
      minHeight:650,
      frame: false,
      webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools: true
          }
    })
  
    mainWindow.loadFile(__dirname + file)
  }


// app init / main window
 
  app.whenReady().then(() => {
    createWindow(800,650,'/view/main/index.html')
  })
  
  

//app quit
app.on('window-all-closed', function () {
    app.quit()
  })

//botões da aplicação
ipcMain.on('closeApp',()=>{
  mainWindow.close()
  // if have mora than one tab the app will not be closed
})

ipcMain.on('minApp',()=>{
  mainWindow.minimize()
})

  
  
  