// Modules to control application life and create native browser window
const { error } = require('console');
const {app, BrowserWindow, ipcMain, Notification, contextBridge} = require('electron')
const path = require('path');
const anatraz = require('./database/database');
const db = require('./login/logindb');

//------ Variables para las ventanas -----//
let proveedorWindow 
let mainWindow
let loginWindow
let materiaPrimaWindow
let productoWindow


//------ Funciones para crear las ventanas -----//

//Ventana de login
function createLoginWindow () {
  loginWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 400,
    height: 300,
    show: false,
    webPreferences: {
      preload: path.join(__dirname,'./login/login.js')
    }
  })
  loginWindow.loadFile('./login/login.html')
  loginWindow.on('ready-to-show', () =>{
    loginWindow.show()
  })
}
//Ventana principal
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}
// Ventana proveedores
function createProveedorWindow () {
    proveedorWindow = new BrowserWindow({
      parent: mainWindow,
      modal : true,
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname,'./proveedores/proveedor.js')
      }
    })
    proveedorWindow.loadFile('./proveedores/proveedor.html')
    proveedorWindow.webContents.openDevTools()
  }

  //Ventana materias primas
  function createMateriaPrimaWindow () {
    materiaPrimaWindow = new BrowserWindow({
      parent: mainWindow,
      modal : true,
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname,'./materias_primas/materias_primas.js')
      }
    })
    materiaPrimaWindow.loadFile('./materias_primas/materias_primas.html')
    materiaPrimaWindow.webContents.openDevTools()
  }

  //Ventana productos
  function createProductoWindow () {
    productoWindow = new BrowserWindow({
      parent: mainWindow,
      modal : true,
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname,'./productos/productos.js')
      }
    })
    productoWindow.loadFile('./productos/productos.html')
    productoWindow.webContents.openDevTools()
  }

  //Ventana almacen
  function createAlmacenWindow () {
    almacenWindow = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname,'./almacen/almacen.js')
      }
    })
    almacenWindow.loadFile('./almacen/almacen.html')
    almacenWindow.webContents.openDevTools();
  }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

  app.whenReady().then(() => {
    createLoginWindow()
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


ipcMain.handle('winProveedor',() =>{
  createProveedorWindow()
});

ipcMain.handle('winMateriaPrima', () => {
  createMateriaPrimaWindow()
})

ipcMain.handle('winProductos', () => {
  createProductoWindow()
})

ipcMain.handle('winAlmacen', () => {
  createAlmacenWindow()
})
// ----- INTRODUCIR DATOS ----- //
//Comunicación entre procesos para introducir proveedores

ipcMain.handle('addProveedor', (event,proveedor) => {
  addProveedor(proveedor)
})

//Comunicación entre procesos para introducir Materias Primas
ipcMain.handle('addMateriaPrima', (event,materiaPrima) => {
  addMateriaPrima(materiaPrima)
})

//Comunicación entre procesos para introducir marcas
ipcMain.handle('addMarca', (event,marca) => {
  addMarca(marca)
})

//Comunicación entre procesos para introducir tipos
ipcMain.handle('addTipo', (event,tipo) => {
  addTipo(tipo)
})

//Comunicación entre procesos para introducir distribuir
ipcMain.handle('addDistribuir', (event,dist) => {
  addDistribuir(dist)
})

//Comunicación entre procesos para introducir productos
ipcMain.handle('addProducto',(event,producto) => {
  addProducto(producto)
})

ipcMain.handle('addIngrediente',(event,ingrediente) => {
  addIngrediente(ingrediente)
})

//Comunicación entre procesos para introducir almacen
ipcMain.handle('addAlmacen', (event,mercancia) => {
  addAlmacen(mercancia)
})

ipcMain.handle('addProduccion',(event,produccion) => {
  addProduccion(produccion)
})

ipcMain.handle('addFabricar',(event,fabricar) => {
  addFabricar(fabricar)
})
// ----- CONSULTAR DATOS ----- //
//Comunicación entre procesos para consultar proveedores
ipcMain.handle('getProveedor',() => {
  getProveedor();
})
ipcMain.handle('getProveedorMP',() => {
  getProveedorMP();
})

ipcMain.handle('getTipo', () => {
  getTipo();
})

ipcMain.handle('getMarca', (event,idMarca) => {
  getMarca(idMarca);
})

ipcMain.handle('getMarcas', () => {
  getMarcas();
})

ipcMain.handle('getMateriaPrima', () =>{
  getMateriaPrima();
})

ipcMain.handle('getProducto', () => {
  getProductos();
})

ipcMain.handle('getMateriaPrima2', () => {
  getMateriaPrima2();
})

ipcMain.handle('getAlmacen', () =>{
  getAlmacen();
})

//Comunicación entre procesos para eliminar proveedores
ipcMain.handle('deleteProveedor', (event, obj) => {
  deleteProveedor(obj)
});



//Función para validar credenciales de usuario

function checkUser(obj){
  const {nombre,password} = obj
  const sql= "SELECT * FROM usuarios WHERE nombre=? AND password=?"
  db.all(sql,[nombre,password], (error,results) =>{
    if(error){ console.log(error);}
    
    if(results.length > 0){
      loginWindow.close();
      createWindow();
    }
    else{
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
  const {prov_nombre,cif,tipo_via,via,numero,codigo_postal,localidad,provincia,telefono} = proveedor
  anatraz.serialize(function(){
    const insert_proveedor = anatraz.prepare("INSERT INTO proveedores (nombre,cif,tipo_via,calle,numero,codigo_postal,localidad,provincia,telefono) VALUES (?,?,?,?,?,?,?,?,?)")
    insert_proveedor.run(prov_nombre,cif,tipo_via,via,numero,codigo_postal,localidad,provincia,telefono)
  })
}

//Función para insertar datos en materias_primas
function addMateriaPrima(materiaPrima){
  const {id_marca,id_tmp,unidad} = materiaPrima
  anatraz.serialize(function(){
    const insert_mp = anatraz.prepare("INSERT INTO materias_primas (id_marca,id_tipo_materia_prima,unidad) VALUES (?,?,?)")
    insert_mp.run(id_marca,id_tmp,unidad)
  })
}

//Función para insertar datos en marcas
function addMarca(marca){
  const {nombreMarca} = marca
  anatraz.serialize(function(){
    const insert_marca = anatraz.prepare("INSERT INTO marcas (nombre) VALUES (?)")
    insert_marca.run(nombreMarca)
  })
}

//Función para insertar datos en distribuir
function addDistribuir(dist){
  const {id_proveedor,id_marca} = dist
  anatraz.serialize(function(){
    const insert_distribuir = anatraz.prepare("INSERT INTO marcas VALUES (?,?)")
    insert_distribuir.run(id_proveedor,id_marca)
  })
}

//Función para insertar datos en tipo_materia_prima
function addTipo(tipo){
  const {mp_tipo} = tipo
  anatraz.serialize(function(){
    const insert_marca = anatraz.prepare("INSERT INTO tipo_materia_prima (tipo) VALUES (?)")
    insert_marca.run(mp_tipo)
  })
}

//Función para insertar datos en productos
function addProducto(producto){
  const {nombre,envase,tipo} = producto
  anatraz.serialize(function(){
    const insert_producto = anatraz.prepare("INSERT INTO productos (nombre,envase,tipo) VALUES (?,?,?)")
    insert_producto.run(nombre,envase,tipo)
  })
}

//Función para insertar datos en ingredientes
function addIngrediente(ingrediente){
  const {id_producto,id_materia_prima,cantidad} = ingrediente
  anatraz.serialize(function(){
    const insert_ingrediente =  anatraz.prepare("INSERT INTO ingredientes VALUES (?,?,?)")
    insert_ingrediente.run(id_producto,id_materia_prima,cantidad)
  })
}

//Función para insertar datos en almacen
function addAlmacen(mercancia){
  const {lote,idProveedor,idMateriaPrima,temperatura,cantidad,stock,fechaEntrada,fechaCaducidad} = mercancia
  anatraz.serialize(function(){
    const insert_almacen = anatraz.prepare("INSERT INTO almacen (lote,id_proveedor,id_materia_prima,temperatura,cantidad,stock,fecha_entrada,fecha_caducidad) VALUES (?,?,?,?,?,?,?,?)")
    insert_almacen.run(lote,idProveedor,idMateriaPrima,temperatura,cantidad,stock,fechaEntrada,fechaCaducidad)
  })
}

function addProduccion(produccion){
  const {idProducto,loteProduccion,cantidad,fechaProduccion,fechaCaducidad} = produccion
  anatraz.serialize(function(){
    const insertProduccion = anatraz.prepare("INSERT INTO produccion (id_producto,lote_produccion,cantidad,fecha_produccion,fecha_caducidad) VALUES (?,?,?,?,?)")
    insertProduccion.run(idProducto,loteProduccion,cantidad,fechaProduccion,fechaCaducidad)
  })
}

//Función para insertar datos en fabricar
function addFabricar(fabricar){
  const {idProduccion,idAlmacen} = fabricar
  console.log(fabricar)
  anatraz.serialize(function(){
    const insertFabricar = anatraz.prepare("INSERT INTO fabricar (id_produccion,id_almacen) VALUES (?,?)")
    insertFabricar.run(idProduccion,idAlmacen)
  })
}

//Funciones para consultar datos en las distintas tablas
// Función para consultar datos en proveedores


function getProveedor(){
  const sqlProveedor = "SELECT * FROM proveedores"
  anatraz.all(sqlProveedor,(error,results) => {
    proveedorWindow.webContents.send('proveedores',results)
  })
}


//Función para consultar datos en materias_primas
function getMateriaPrima(){
  const sqlMateriaPrima = "SELECT t.tipo ||' ' || m.nombre as materia_prima FROM materias_primas JOIN tipo_materia_prima t USING (id_tipo_materia_prima) JOIN marcas m USING (id_marca)"
  anatraz.all(sqlMateriaPrima,(error,results) => {
    materiaPrimaWindow.webContents.send('materiasPrimas',results)
  })
}


//Función para consultar datos en tipo_materia_prima
function getTipo(){
  const sqlTipo = "Select id_tipo_materia_prima,tipo FROM tipo_materia_prima"
  anatraz.all(sqlTipo,(error,results) => {
    materiaPrimaWindow.webContents.send('tipo', results)
  })
}

//Función para consultar un dato en marcas
function getMarca(nombreMarca) {
  const {nombre_marca} = nombreMarca
  const sqlMarca = "SELECT id_marca FROM marcas WHERE nombre = ?"
  anatraz.all(sqlMarca,nombre_marca,(error,results) => {
    materiaPrimaWindow.webContents.send('marca',results)
  })
}

//Función para consultar datos en marcas
function getMarcas() {
  const sqlMarcas = "SELECT id_marca,nombre FROM marcas"
  anatraz.all(sqlMarcas,(error,results) => {
    materiaPrimaWindow.webContents.send('marcas',results)
  })
}

//Función para consultar datos en productos
function getProductos() {
  const sqlProducts = "SELECT id_producto,nombre FROM productos ORDER BY tipo,nombre "
  anatraz.all(sqlProducts,(error,results) => {
    productoWindow.webContents.send('producto',results)
  })
}

//Función para consultar datos en almacen
function getAlmacen() {
  const sqlAlmacen = "SELECT DISTINCT t.tipo ||' ' || m.nombre as materia_prima, a.lote, a.temperatura, a.fecha_entrada, a.fecha_caducidad, p.nombre as proveedor FROM materias_primas mp JOIN almacen a USING (id_materia_prima) JOIN proveedores p USING (id_proveedor) JOIN tipo_materia_prima t USING (id_tipo_materia_prima) JOIN marcas m USING (id_marca) JOIN ingredientes i USING (id_materia_prima)"
  anatraz.all(sqlAlmacen,(error,results) => {
    almacenWindow.webContents.send('almacen',results)
  })
}


//Funciones para eliminar datos de las distintas tablas
// Función para eliminar datos de proveedores

function deleteProveedor(idProveedor){
  const { id_proveedor }  = idProveedor
  const deleteProveedor = "DELETE FROM proveedores WHERE id_proveedor = ?"
  anatraz.all(deleteProveedor, id_proveedor, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    getProveedor()  
  });
}

function updateProveedor(proveedor){
  const {id_proveedor,prov_nombre,cif,tipo_via,via,numero,codigo_postal,localidad,provincia} = proveedor
  const updateProveedor = "UPDATE proveedores SET nombre = ?,cif = ?,tipo_via = ?,via = ?,numero = ?,codigo_postal = ?,localidad = ?,provincia = ? WHERE id_proveedor = ?"
  anatraz.all(updateProveedor,[prov_nombre,,cif,tipo_via,via,numero,codigo_postal,localidad,provincia,id_proveedor],() =>{
  
  })
}



//
ipcMain.on('materiasPrimas',(event) => {
  const sqlMateriaPrima = "SELECT mp.id_materia_prima id_materia_prima,t.tipo ||' ' || m.nombre as materia_prima FROM materias_primas mp JOIN tipo_materia_prima t USING (id_tipo_materia_prima) JOIN marcas m USING (id_marca)"
  anatraz.all(sqlMateriaPrima,(error,results) => {
    event.returnValue = results 
  })
   
}) 
ipcMain.on('showIngredientes',(event,idProducto) => {
  const { id_producto } = idProducto
  console.log(idProducto)
  const sqlIngrediente = "SELECT t.tipo ||' ' || m.nombre as materia_prima FROM materias_primas JOIN tipo_materia_prima t USING (id_tipo_materia_prima) JOIN marcas m USING (id_marca) JOIN ingredientes i USING (id_materia_prima) WHERE i.id_producto = ?"
  anatraz.all(sqlIngrediente,id_producto,(error,results) => {
    event.returnValue = results
  }) 
})

ipcMain.on('proveedores2',(event) => {
  const sqlProveedor = "SELECT * FROM proveedores"
  anatraz.all(sqlProveedor,(error,results) => {
    event.returnValue = results
  })
})

ipcMain.on('productos',(event) => {
  const sqlProducts = "SELECT id_producto,nombre FROM productos ORDER BY tipo,nombre "
  anatraz.all(sqlProducts,(error,results) => {
    event.returnValue = results
  })
})

ipcMain.on('findProducto',(event,arg) => {
  const nombre = arg
  const sqlProducts = "SELECT id_producto,nombre FROM productos WHERE nombre LIKE ?"
  anatraz.all(sqlProducts,nombre,(error,results) => {
    event.returnValue = results
  })
})

ipcMain.on('getIngredientes',(event,idProducto) =>{
  const id_producto = idProducto
  const sqlFabricar = "SELECT a.id_almacen FROM almacen a JOIN ingredientes i USING (id_materia_prima) WHERE i.id_producto = ? AND a.stock > 0"
  anatraz.all(sqlFabricar,id_producto,(error,results) => {
    event.returnValue = results 
  })
})

ipcMain.on('getProduccion',(event,idProducto) =>{
  const id_producto = idProducto
  const sqlFabricar = "SELECT MAX(id_produccion) as id_produccion FROM produccion WHERE id_producto = ?"
  anatraz.get(sqlFabricar,id_producto,(error,results) => {
    event.returnValue = results 
  })
})

ipcMain.on('getProducciones',(event) => {
  const sqlProducciones = "SELECT * FROM producciones"
  anatraz.all(sqlProducciones,(error,results) => {
    event.returnValue = results
  })
})

ipcMain.on('produccionIngredientes',(event,idProduccion) =>{
  const id_produccion = idProduccion
  const sqlIngredientes = "SELECT t.tipo ||' ' || m.nombre as materia_prima, a.lote, a.fecha_caducidad,prov.nombre FROM almacen a JOIN proveedores prov USING (id_proveedor) JOIN materias_primas mp USING (id_materia_prima) JOIN marcas m USING (id_marca) JOIN tipo_materia_prima t USING (id_tipo_materia_prima) JOIN fabricar f USING (id_almacen) WHERE f.id_produccion = ?"
  anatraz.all(sqlIngredientes,id_produccion,(error,results) => {
    event.returnValue = results
  })
})

ipcMain.on('getCantidad',(event,idProducto) =>{
  const id_producto = idProducto
  const sqlIngredientes = "SELECT id_materia_prima,cantidad FROM ingredientes WHERE id_producto = ?"
  anatraz.all(sqlIngredientes,id_producto,(error,results) =>{
    event.returnValue = results
  })
})

ipcMain.on('minCaducidad',(event,materiaPrima) =>{
  const id_materia_prima = materiaPrima
  const sqlMinCaducidad = "SELECT MIN(fecha_caducidad) as fecha_caducidad FROM almacen WHERE id_materia_prima = ?"
  anatraz.all(sqlMinCaducidad,id_materia_prima,(error,results) =>{
    event.returnValue = results
  })
})

ipcMain.on('updateStock',(event,ingredient,minCaducidad) =>{
  const {id_materia_prima,stock} = ingredient
  const fecha_caducidad = minCaducidad
  const updateStock = "UPDATE almacen SET stock = stock - ? WHERE id_materia_prima = ? AND fecha_caducidad = ?"
  anatraz.all(updateStock,(stock,id_materia_prima,fecha_caducidad))
})