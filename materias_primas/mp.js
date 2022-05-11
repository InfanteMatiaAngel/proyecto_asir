let addTipo = 'true';
let addMarca = 'true'

document.getElementById('addTipo').onclick = function(){
    if(addTipo == 'true'){
        document.getElementById('formInsertTipo').style.display = 'block'
        addTipo = 'false'
    }else{
        document.getElementById('formInsertTipo').style.display = 'none'
        addTipo = 'true'
    }
}

document.getElementById('addMarca').onclick = function(){
    if(addMarca == 'true'){
        document.getElementById('formInsertMarca').style.display = 'block'
        addMarca = 'false'
    }else{
        document.getElementById('formInsertMarca').style.display = 'none'
        addMarca = 'true'
    }
}