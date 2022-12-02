const {app,BrowserWindow} = require('electron');
const isDev = require("electron-is-dev");
const remote = require('@electron/remote/main')
remote.initialize()
 
function createWindow() {
    console.log('hello');
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true
        }
    })
 
    win.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
    remote.enable(win.webContents);
}
 
app.on('ready', createWindow)
 
app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})
 
app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})