// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer} = require('electron')





let proveedor
let materiaPrima
let productos
let almacen

let idProducto

let getProductos = ipcRenderer.sendSync('productos') 

window.onload = function() { 

  showProducciones()
  proveedor = document.getElementById('proveedores')
  proveedor.onclick = function(){
    ipcRenderer.invoke('winProveedor');
  }

  materiaPrima = document.getElementById('materiaPrima')
  materiaPrima.onclick = function(){
    ipcRenderer.invoke('winMateriaPrima')
  }

  productos = document.getElementById('producto')
  productos.onclick = function(){
    ipcRenderer.invoke('winProductos')
  }
  almacen = document.getElementById('almacen')
  almacen.onclick = function() {
    ipcRenderer.invoke('winAlmacen')
  }
  document.getElementById('btnAddProduccion').addEventListener('click',showProductos)

}

function showProductos() {
  let listaProductos = document.getElementById('listaProductos')
  let pAddProduccion = document.getElementById('pAddProduccion')
  pAddProduccion.innerHTML = `
        <button id = 'exitAddProduccion'>Salir</button>
        <input type='text' name = 'findProducto' id = 'findProducto' placeholder = 'Buscar Producto' >`
  
  let exitAddProduccion = document.getElementById('exitAddProduccion')
  exitAddProduccion.addEventListener('click',fnExitAddProduccion)
  let findProducto = document.getElementById('findProducto')
  findProducto.addEventListener('keyup',fnFindProducto)
  let listProductos = ""
  for(let producto of getProductos){
    listProductos += `
    <article class='producto' id = ${producto.id_producto}>
      <figure>
        <img src='./src/img/${producto.id_producto}.jpg' alt='${producto.nombre}'>
        <figcaption value = ${producto.id_producto}>${producto.nombre}</figcaption>
      </figure>
    </article>`
  }
  listaProductos.innerHTML += listProductos
  let productos = document.querySelectorAll('.producto')
  productos.forEach(producto => {
    producto.addEventListener('click',addProduccion)
  })
  
}

function fnFindProducto(e){
  let listaProductos = document.getElementById('listaProductos')
  let findProducto = document.getElementById('findProducto')
  let listProductos = ""
  let arg = findProducto.value+'%'
  let findedProduct = ipcRenderer.sendSync('findProducto',arg)
  for(let producto of findedProduct){
    listProductos += `
    <article class='producto' id = ${producto.id_producto}>
      <figure>
        <img src='./src/img/${producto.id}.jpg' alt='${producto.nombre}'>
        <figcaption value = ${producto.id_producto}>${producto.nombre}</figcaption>
      </figure>
    </article>`
  }
     
   listaProductos.innerHTML = listProductos
  }
function fnExitAddProduccion(){
  let listaProductos = document.getElementById('listaProductos')
  let pAddProduccion = document.getElementById('pAddProduccion')
  listaProductos.innerHTML = ""
  pAddProduccion.innerHTML = `<button id="btnAddProduccion">Añadir Producción</button>`
  let btnAddProduccion = document.getElementById('btnAddProduccion')
  btnAddProduccion.addEventListener('click',showProductos)
}

function addProduccion(e) {
  idProducto = e.target.id
  console.log(idProducto)
  let listaProductos = document.getElementById('listaProductos')
  listaProductos.innerHTML = ""
  let pAddProduccion = document.getElementById('pAddProduccion')
  
  pAddProduccion.innerHTML = `
  <form>
    <table id='tablaAddProduccion'>
      <thead>
        <tr>
          <th>
            <label for='fechaProduccion'>Fecha de Producción</label>
          </th>
          <th>
            <label for='fechaCaducidad'>Fecha de caducidad</label>
          </th>
          <th>
            <label for='cantidad'>Cantidad</label>
          </th>
        </tr>
        <tr>
          <td>
            <input type='date' name='fechaProduccion' id='fechaProduccion'>
          </td>
          <td>
            <input type='date'  name='fechaCaducidad' id='fechaCaducidad'>
          </td>
          <td>
            <input type='number' name='cantidad' id='cantidad'>
          </td>
        </tr>
    </table>
      <button id='btnAddProduccion' type='submit'>Registrar</button>
  </form>
    `
  let fechaProduccion = document.getElementById('fechaProduccion')
  let fechaCaducidad = document.getElementById('fechaCaducidad')
  let cantidad = document.getElementById('cantidad')
  let loteProduccion
  fechaProduccion.onchange = function() {
    fecha = fechaProduccion.value.toString()
    loteProduccion = fecha.substr(8,2)+fecha.substr(5,2)+fecha.substr(0,4)
  }
  let btnAddProduccion = document.getElementById('btnAddProduccion')
  btnAddProduccion.addEventListener('click',insertProduccion)
  function insertProduccion(){
    const produccion = {
      idProducto: idProducto,
      loteProduccion: loteProduccion,
      cantidad: cantidad.value,
      fechaProduccion: fechaProduccion.value,
      fechaCaducidad: fechaCaducidad.value
    }
    console.log(idProducto)
    ipcRenderer.invoke('addProduccion',produccion)
    /*updateStock(idProducto)*/
    insertFabricar(idProducto)
  }
  
}
/*function updateStock(idProducto){
  let ingredientes = ipcRenderer.sendSync('getCantidad',idProducto)
  for(let ingrediente of ingredientes){
    const ingredient = {
      id_materia_prima : ingrediente.id_materia_prima,
      stock : ingrediente.cantidad
    }
    let minCaducidad = ipcRenderer.sendSync('minCaducidad',ingrediente.id_materia_prima)
    ipcRenderer.sendSync('updateStock',ingredient,minCaducidad.fecha_caducidad)
  }
}*/
function insertFabricar(idProducto) {
  let ingredientes = ipcRenderer.sendSync('getIngredientes',idProducto)
  let produccion = ipcRenderer.sendSync('getProduccion',idProducto)
  console.log(produccion)
  let fabricar
  for (let ingrediente of ingredientes){
    fabricar = {
      idProduccion : produccion.id_produccion,
      idAlmacen : ingrediente.id_almacen
    }
    console.log(produccion.id_produccion)
    ipcRenderer.invoke('addFabricar',(fabricar))
  }
}

function showProducciones() {
  let registros
  registros = document.getElementById('registros')
  let listProducciones = ""
  let producciones = ipcRenderer.sendSync('getProducciones')
  for(let produccion of producciones){
    listProducciones += `
      <tr>
        <td>${produccion.nombre}</td>
        <td>${produccion.fecha_produccion}</td>
        <td>${produccion.fecha_caducidad}</td>
        <td>${produccion.lote_produccion}</td>
        <td>
          <button id='${produccion.id_produccion}' class='btnShowIngredientes'>
          Mostrar Materias
          </button>
        </td>
      </tr>
    `
  }
  registros.innerHTML = listProducciones
  let btnShowIngredientes
  btnShowIngredientes = document.querySelectorAll('.btnShowIngredientes')
  btnShowIngredientes.forEach(boton => {
    boton.addEventListener('click',showIngredientes)
  })
}

function showIngredientes(e){
  let tbody = e.target.parentElement.parentElement.parentElement
  let abuelo = e.target.parentElement.parentElement
  let hermano = abuelo.nextSibling
  if(document.getElementById('filaIngredientes')){
    document.getElementById('filaIngredientes').remove()
  }
  let filaIngredientes = document.createElement('tr')
  let celdaIngredientes = document.createElement('td')
  celdaIngredientes.setAttribute('colspan','5')
  filaIngredientes.id = 'filaIngredientes'

  tbody.insertBefore(filaIngredientes,hermano)
  filaIngredientes.appendChild(celdaIngredientes) 
  
  let listIngredientes = ""
  let idProduccion = e.target.id
  let ingredientes = ipcRenderer.sendSync('produccionIngredientes',idProduccion)
  for(let ingrediente of ingredientes){
    listIngredientes += `<p>${ingrediente.materia_prima} <strong>Lote:</strong> ${ingrediente.lote} <strong>Fecha de caducidad:</strong> ${ingrediente.fecha_caducidad} <strong>Proveedor:</strong> ${ingrediente.nombre}`
  }
  celdaIngredientes.innerHTML = listIngredientes

}

