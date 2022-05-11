const { ipcRenderer } = require('electron')

let btnlogin;
let nombre; 
let password;

window.onload = function() { 
  nombre = document.getElementById("nombre")
  password = document.getElementById("password")
  btnlogin = document.getElementById("btnlogin")

  btnlogin.onclick = function(){
    
   const obj = {nombre:nombre.value, password:password.value }

    ipcRenderer.invoke("login", obj)
  }
}