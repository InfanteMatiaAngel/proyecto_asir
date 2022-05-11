// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer, contextBridge } = require('electron')





let proveedor
let materiaPrima

window.onload = function() { 

proveedor = document.getElementById('proveedores')
proveedor.onclick = function(){
  ipcRenderer.invoke('winProveedor');
}
materiaPrima = document.getElementById('materiaPrima')
materiaPrima.onclick = function(){
  ipcRenderer.invoke('winMateriaPrima')
}
  
  /*contextBridge.exposeInMainWorld('proveedorAdd',{
    insertProveedor : () => ipcRenderer.invoke("addProveedor",proveedor)
  })*/
 
}
     // Proceso para insertar datos en proveedores
     /*
   
     btnAddProveedor.onclick =  function(){
         console.log("botón pulsado")   
        
         /*
         window.proveedorAdd.insertProveedor();
         
     }*/



