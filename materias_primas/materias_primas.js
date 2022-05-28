const { ipcRenderer } = require("electron")


let btnInsertTipo
let insertTipo
let selectTipo

let btnInsertMarca
let insertMarca
let selectMarca

let unidad
let btnInsertMp
let showMP
window.onload = function() {

    getMarcas()
    getTipo()
    getMateriaPrima()

    //Registrar tipos de materia prima
    insertTipo = document.getElementById("mp_tipo")
    btnInsertTipo = document.getElementById("insertTipo")
    selectTipo = document.getElementById("tipo")

    btnInsertTipo.onclick = function() {
        const tipo = {mp_tipo: insertTipo.value}
        ipcRenderer.invoke("addTipo",tipo)
        console.log("tipo añadido")
    }

    //Registrar marcas de materias primas
    btnInsertMarca = document.getElementById("btnInsertMarca")
    insertMarca = document.getElementById("mp_marca")
    selectMarca = document.getElementById("marca")
    showMP = document.getElementById("showMP")



    btnInsertMarca.onclick = function() {
        const marca = {nombreMarca: insertMarca.value}
        ipcRenderer.invoke("addMarca",marca)
    }
    //Registrar las materias primas
    unidad = document.getElementById("unidad")
    btnInsertMp = document.getElementById("btnInsertMp")
    btnInsertMp.onclick = function() {
        const materiaPrima = {
           id_marca: selectMarca.value,
           id_tmp: selectTipo.value,
           unidad: unidad.value 
        }
        ipcRenderer.invoke("addMateriaPrima",materiaPrima);
    }
}




//mostrar los tipos de materia prima ya registrados
async function getTipo() {
    ipcRenderer.invoke('getTipo')
}
ipcRenderer.on('tipo',(event,results) =>{
    let optionTipo = "<option> Seleccione un tipo</option>"
    const tipos = results
    tipos.forEach(element => {
        optionTipo+=`<option value=${element.id_tipo_materia_prima}>
                    ${element.tipo}
                    </option>`
    });
    selectTipo.innerHTML = optionTipo
})

// Mostrar las marcas de materias primas ya registradas
async function getMarcas() {
    ipcRenderer.invoke('getMarcas')
}
ipcRenderer.on('marcas',(event,results) =>{
    let optionMarca = "<option>Seleccione una marca </option>"
    const marcas = results
    marcas.forEach(element => {
        optionMarca+=`<option value = ${element.id_marca}>
        ${element.nombre}
        </option>`
    });
    selectMarca.innerHTML = optionMarca
})


async function getMateriaPrima() {
    ipcRenderer.invoke('getMateriaPrima');
}

ipcRenderer.on('materiasPrimas',(event,results) => {
    let filaMateriaPrima = "<h1>Materias Primas</h1>"
    const materias_Primas = results
    materias_Primas.forEach(element => {
        filaMateriaPrima+=`<p>${element.materia_prima}</p>`
    });
    showMP.innerHTML = filaMateriaPrima
})