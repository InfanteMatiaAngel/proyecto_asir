// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Notification} = require('electron')
const path = require('path');
const anatraz = require('./database');
const db = require('./database');

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    /*parent: loginWindow,
    modal: true,
    width: 800,
    height: 600,*/
    //fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('login.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
/*app.whenReady().then(() => {
  createWindow()*/
  app.whenReady().then(() => {
    createWindow()
    mainWindow.maximize()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//-------------------------------------------------------------//

//Comunicación entre procesos para login
ipcMain.handle('login', (event, obj) => {
  checkUser(obj)
});

//Comunicación entre procesos para introducir datos
ipcMain.handle('addProveedor',(event,proveedor) =>{
  addProveedor(proveedor)
});

//Función para validar credenciales de usuario

function checkUser(obj){
  const {nombre,password} = obj
  const sql= "SELECT * FROM usuarios WHERE nombre=? AND password=?"
  db.all(sql,[nombre,password], (error,results) =>{
    if(error){ console.log(error);}
    
    if(results.length > 0){
      mainWindow.loadFile('./index.html');
    }else{
      new Notification({
        title:"login",
        body: 'nombre o password equivocado'
      }).show()
    }
  })
}

//-------------------------------------------------------------//
// Funciones para insertar datos en las distintas tablas
// Función para insertar datos en proveedores
function addProveedor(proveedor){
  const {prov_nombre,cif,tipo_via,via,numero,codigo_postal,localidad,provincia} = proveedor
  const insert_proveedor = "INSERT INTO proveedores (nombre,cif,tipo_via,calle,numero,codigo_postal,localidad,provincia) VALUES (?,?,?,?,?,?,?,?)"
  anatraz.query(insert_proveedor,[prov_nombre,cif,tipo_via,via,numero,codigo_postal,localidad,provincia], proveedor)
}