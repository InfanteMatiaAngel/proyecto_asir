// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



let main = document.getElementById('main');
let add_produccion = document.getElementById('add_produccion');

add_produccion.onclick = function(){
    console.log(add_produccion.value);
}
let add_mercancia = document.getElementById('add_mercancia');
add_mercancia.onclick = function(){
    console.log(add_mercancia.value);
}
let add_proveedor = document.getElementById('add_proveedor');
add_proveedor.onclick = function(){
    console.log(add_proveedor.value);
    main.innerHTML = win_proveedor;
}
let add_materia_prima = document.getElementById('add_materia_prima');
add_materia_prima.onclick = function(){
    console.log(add_materia_prima.value);
    main.innerHTML = win_materia_prima;
}
let add_producto = document.getElementById('add_producto');
add_producto.onclick = function(){
    console.log(add_producto.value);
}            


//------------------------------------------------------//
//Variables para insertar el HTML
        // ---- VENTANA DE AÑADIR PROVEEDORES ----//

let win_proveedor = `    <form id="win_add_proveedor">
<label for="prov_nombre">Nombre</label>
<input type="text" name="prov_nombre" id="prov_nombre">

<label for="cif">CIF</label>
<input type="text" name="cif" id="cif"><br>

<label for="tipo_via">Tipo de Vía</label>
<input type="text" name="tipo_via" id="tipo_via">

<label for="via">Vía</label>
<input type="text" name="via" id="via">

<label for="numero">Número</label>
<input type="text" name="numero" id="numero">

<label for="codigo_postal">Código Postal</label>
<input type="text" name="codigo_postal" id="codigo_postal"><br>

<label for="localidad">Localidad</label>
<input type="text" name="localidad" id="localidad">

<label for="provincia">Provincia</label>
<input type="text" name="provincia" id="provincia"><br>

<button id="btnAddProveedor"> Registrar </button>

</form>`

        // ---- VENTANA DE AÑADIR MATERIAS PRIMAS ----//
let win_materia_prima = `      <form id="win_add_materia_prima">
<label for="mp_tipo">Tipo</label>
<select name="mp_tipo" id="mp_tipo">
    <option value="#">Selecciona un tipo</option>
</select>
<label for="mp_proveedor">Proveedor</label>
<select name="mp_proveedor" id="mp_proveedor">
  <option value="#">Selecciona un proveedor</option>
</select>
<label for="mp_marca">Proveedor</label>
<select name="mp_marca" id="mp_marca">
<option value="#">Selecciona una marca</option>
</select>
<label for="mp_unidad">Unidad</label>
<input type="text" name="mp_unidad" id="mp_unidad">
</form>`

//------------------------------------------------------//