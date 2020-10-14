const { app, BrowserWindow, Tray } = require('electron')

let tray = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 200,
    height: 300,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');

  tray = Tray('img/front.png');

  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = win.getBounds();

    if (win.isVisible()) {
      win.hide();
    } else {
      win.setBounds({
        x: x - width / 2,
        y: y - height,
        height,
        width,
      })
      win.show();
    }
  });

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
