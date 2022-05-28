const { ipcRenderer } = require("electron")

let nombreProducto
let envase
let tipoProducto
let bntAddProducto
let showProducts

let btnIngredientes
let materiasPrimas = ipcRenderer.sendSync('materiasPrimas')
let btnAddIngrediente
let idProducto
let selectMateriaPrima
let cantidad
let id_producto
let showIngredientes
let listaIngredientes
let pIngrendientes
console.log(materiasPrimas);

window.onload = function() {
    getProductos()



    nombreProducto = document.getElementById("nombreProducto")
    envase = document.getElementById("envase")
    tipoProducto = document.getElementById("tipoProducto")
    bntAddProducto = document.getElementById("btnAddProducto")
    showProducts = document.getElementById("showProducts")

    bntAddProducto.onclick = function() {
        const producto = {
            nombre : nombreProducto.value,
            envase : envase.value,
            tipo: tipoProducto.value
        }
        ipcRenderer.invoke("addProducto",producto)
    }
}

async function getProductos() {
    ipcRenderer.invoke('getProducto')
}
ipcRenderer.on('producto',(event,results) => {
    let showProducto = "<h1>Productos</h1>"
    const productos = results
    productos.forEach(element => {
        showProducto += `<p>${element.nombre} <button id='${element.id_producto}' value=${element.id_producto} class='btnIngredientes'>+</button></p>`
    });
    showProducts.innerHTML = showProducto
    btnIngredientes = document.querySelectorAll(".btnIngredientes")
    btnIngredientes.forEach(boton =>{
        boton.addEventListener("click", addIngrediente)
    })
});
function addIngrediente(e){

    let producto = e.target.parentElement
    showIngredientes = e.target
    console.log(showIngredientes)
    pIngrendientes = document.getElementById('pIngredientes')

    if(listaIngredientes){
        listaIngredientes.remove()
    }

    if(pIngrendientes){
        pIngrendientes.remove()
    }

    idProducto = e.target.value
    id_producto = { id_producto: e.target.value }


        producto.innerHTML += `
            <p id = 'pIngredientes'>
                <select id='materiasPrimas'></select>
                <input type='number' name='cantidad' id='cantidad' placeholder='Cantidad'>
                <button id = 'btnAddIngrediente' class = 'btnVerde' >Añadir Ingrediente</button>
            <p>
            <ul id='listaIngredientes'>
            </ul>`

        fnShowIngredientes()
}


async function insertIngrediente() {
    const ingrediente = {
        id_producto : idProducto,
        id_materia_prima : selectMateriaPrima.value,
        cantidad : cantidad.value
    }
    console.log(ingrediente)
    ipcRenderer.invoke('addIngrediente',ingrediente)
    fnShowIngredientes()

}

function fnShowIngredientes() {
    let ingredientes = ipcRenderer.sendSync('showIngredientes',id_producto)
    console.log(ingredientes);
    listaIngredientes = document.getElementById("listaIngredientes")
    listaIngredientes.innerHTML = ""
    for(let ingrediente of ingredientes){
        console.log(ingrediente)
        listaIngredientes.innerHTML += `<li>${ingrediente.materia_prima} <button class = 'delIngrediente'>X</button></li>`
    }
    selectMateriaPrima = document.getElementById('materiasPrimas')
    selectMateriaPrima.innerHTML = "<option>Seleccione un ingrediente</option>"
    cantidad = document.getElementById('cantidad')
    btnAddIngrediente = document.getElementById('btnAddIngrediente')
    btnAddIngrediente.addEventListener("click",insertIngrediente)
    for(let materiaPrima of materiasPrimas){
        selectMateriaPrima.innerHTML += `<option value=${materiaPrima.id_materia_prima}>${materiaPrima.materia_prima}</option>`
    }

}




