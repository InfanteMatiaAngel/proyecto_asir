// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let btnDesplegar
let btnRecoger
let nav
let enlaces


window.onload = function() {
    btnDesplegar =  document.getElementById("btnDesplegar")
    btnRecoger = document.getElementById("btnRecoger")
    nav = document.querySelector("nav")
    enlaces = document.querySelectorAll("nav>p")
    
    btnDesplegar.addEventListener("click",desplegar)

    btnRecoger.addEventListener("click",recoger)
        
    }
   

function desplegar() {
        btnDesplegar.style.display = "none"
        btnRecoger.style.display = "block"
        nav.style.width = "180px"
        for (let enlace of enlaces){
                enlace.style.display = "block"
        }
}
function recoger() {
    btnDesplegar.style.display = "block"
    btnRecoger.style.display = "none"
    nav.style.width = "5px"
    for (let enlace of enlaces){
        enlace.style.display = "none"
    }
}