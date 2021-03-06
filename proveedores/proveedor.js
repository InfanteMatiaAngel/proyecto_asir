const { ipcRenderer } = require('electron')



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

//Variables para mostrar proveedores
let filasProveedores


window.onload = function() {
    // Elementos DOM del formulario
    prov_nombre = document.getElementById("prov_nombre")
    cif = document.getElementById("cif")
    tipo_via = document.getElementById("tipo_via")
    via = document.getElementById("via")
    numero = document.getElementById("numero")
    codigo_postal = document.getElementById("codigo_postal")
    localidad = document.getElementById("localidad")
    provincia = document.getElementById("provincia")
    btnAddProveedor = document.getElementById("btnAddProveedor")

    //Elementos DOM de la tabla
    filasProveedores = document.getElementById("filasProveedores")

    btnAddProveedor.onclick = function() {
        const proveedor = {
            prov_nombre:prov_nombre.value,
            cif:cif.value,
            tipo_via:tipo_via.value,
            via:via.value,
            numero:numero.value,
            codigo_postal:codigo_postal.value,
            localidad:localidad.value,
            provincia:provincia.value,
            telefono: telefono.value
        }
        ipcRenderer.invoke("addProveedor",proveedor)
    }

    getproveedor()

}

async function getproveedor() {
    ipcRenderer.invoke('getProveedor')
}

ipcRenderer.on('proveedores', (event, results) => {  
    let template = ""
    const list = results
    list.forEach(element => {
       template+=`
          <tr>
             <td>${element.nombre}</td>
             <td>${element.cif}</td>
             <td>${element.direccion}</td>
             <td>${element.telefono}</td>
             <td>
               <button class="btnDelete"
                 id="${element.id_proveedor}"
                 > 
                 X
               </button>
              </td>
          </tr>
       ` 
    });
      
    filasProveedores.innerHTML = template 
    btnDelete = document.querySelectorAll(".btnDelete")
    btnDelete.forEach(boton =>{
      boton.addEventListener("click" , deleteProveedor)
   })
 
 
 });

 async function deleteProveedor(e){
   const idProveedor = { id_proveedor:parseInt(e.target.id)}
   await ipcRenderer.invoke('deleteProveedor', idProveedor)    
}

