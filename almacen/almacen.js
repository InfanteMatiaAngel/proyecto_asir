const { ipcRenderer } = require('electron')

//Variables para añadir mercancía
let lote
let selectProveedor
let selectMateriaPrima
let temperatura
let cantidad
let fechaEntrada
let fechaCaducidad
let btnAddMercancia

let materiasPrimas = ipcRenderer.sendSync('materiasPrimas')
let proveedores = ipcRenderer.sendSync('proveedores2')
//Variables para mostrar mercancía
let showMercancia


window.onload = function() {

    lote = document.getElementById('lote')
    selectProveedor = document.getElementById('proveedor')
    selectMateriaPrima = document.getElementById('materiaPrima')
    temperatura = document.getElementById('temperatura')
    cantidad = document.getElementById('cantidad')
    stock = document.getElementById('stock')
    fechaEntrada = document.getElementById('fechaEntrada')
    fechaCaducidad = document.getElementById('fechaCaducidad')
    btnAddMercancia = document.getElementById('btnAddMercancia')

    showMercancia = document.getElementById('showMercancia')

    for(let materiaPrima of materiasPrimas){
        selectMateriaPrima.innerHTML += `<option value=${materiaPrima.id_materia_prima}>${materiaPrima.materia_prima}</option>`
    }
    for(let proveedor of proveedores){
        selectProveedor.innerHTML += `<option value=${proveedor.id_proveedor}>${proveedor.nombre}</option>`
    }

    btnAddMercancia.onclick = function(){
        const mercancia = {
            lote: lote.value,
            idProveedor: selectProveedor.value,
            idMateriaPrima: selectMateriaPrima.value,
            temperatura: temperatura.value,
            cantidad: cantidad.value,
            stock: stock.value,
            fechaEntrada: fechaEntrada.value,
            fechaCaducidad: fechaCaducidad.value
        }
        ipcRenderer.invoke('addAlmacen',mercancia)
    }

    getAlmacen()

}
async function getAlmacen(){
    ipcRenderer.invoke('getAlmacen')
}
ipcRenderer.on('almacen',(event,results) => {
    let listMercancias = ""
    const mercancias = results
    mercancias.forEach(mercancia => {
        listMercancias += `<p>${mercancia.materia_prima} ${mercancia.lote}`
    })
    showMercancia.innerHTML = listMercancias
})