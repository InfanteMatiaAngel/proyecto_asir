// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { ipcRenderer } = require('electron')

//variables del login
let btnlogin;
let nombre; 
let password;

//variables para añadir proveedor
let prov_nombre
let cif
let tipo_via
let via
let numero
let codigo_postal
let localidad
let provincia
let btnAddProveedor


window.onload = function() { 

  // Proceso para validar credenciales
  nombre = document.getElementById("nombre")
  password = document.getElementById("password")
  btnlogin = document.getElementById("btnlogin")

  btnlogin.onclick = function(){
    
   const obj = {nombre:nombre.value, password:password.value }

    ipcRenderer.invoke("login", obj)
  }
  // Proceso para insertar datos en proveedores
  prov_nombre = document.getElementById("prov_nombre")
  cif = document.getElementById("cif")
  tipo_via = document.getElementById("tipo_via")
  via = document.getElementById("via")
  numero = document.getElementById("numero")
  codigo_postal = document.getElementById("codigo_postal")
  localidad = getElementById("localidad")
  provincia = getElementById("provincia")
  btnAddProveedor = getElementById("btnAddProveedor")

  btnAddProveedor.onclick = function(){
      const proveedor = {
          nombre:prov_nombre.value,
          cif:cif.value,
          tipo_via:tipo_via.value,
          via:via.value,
          numero:numero.value,
          codigo_postal:codigo_postal.value,
          localidad:localidad.value,
          provincia:provincia.value
      }
      ipcRenderer.invoke("addProveedor",proveedor)
  }
 
}

