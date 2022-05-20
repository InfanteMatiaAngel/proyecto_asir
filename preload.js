// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer} = require('electron')





let proveedor
let materiaPrima
let productos
let almacen

window.onload = function() { 

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
    
}


